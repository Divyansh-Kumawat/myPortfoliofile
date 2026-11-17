// Thin client for Groq's OpenAI-compatible chat completions endpoint.
import { HttpError } from './http.js';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'openai/gpt-oss-120b';

function config() {
    const apiKey = process.env.GROQ_API_KEY?.trim();
    if (!apiKey) {
        throw new HttpError(503, 'The AI is not configured yet: GROQ_API_KEY is missing on the server.');
    }
    return { apiKey, model: process.env.GROQ_MODEL?.trim() || DEFAULT_MODEL };
}

// Turns Groq's error responses into messages a visitor can read.
async function upstreamError(response) {
    let detail = '';
    try {
        const data = await response.json();
        detail = data?.error?.message || '';
    } catch { /* body wasn't JSON */ }
    console.error(`Groq ${response.status}: ${detail}`);

    if (response.status === 401 || response.status === 403) {
        return new HttpError(503, 'The AI key was rejected. Check GROQ_API_KEY.');
    }
    if (response.status === 429) {
        return new HttpError(429, 'The AI is getting a lot of traffic right now. Try again in a minute.');
    }
    if (response.status === 404 || /model/i.test(detail)) {
        return new HttpError(503, 'The configured Groq model is unavailable. Set GROQ_MODEL to a current model.');
    }
    return new HttpError(502, 'The AI service returned an error. Try again shortly.');
}

export async function groqChat({ messages, maxTokens, temperature = 0.4, json = false, stream = false, signal }) {
    const { apiKey, model } = config();

    const body = {
        model,
        messages,
        temperature,
        max_completion_tokens: maxTokens,
        stream,
    };
    // gpt-oss models think before answering; keep that short for a snappy UI.
    if (model.startsWith('openai/gpt-oss')) body.reasoning_effort = 'low';
    if (json) body.response_format = { type: 'json_object' };

    let response;
    try {
        response = await fetch(GROQ_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            signal,
        });
    } catch (err) {
        if (err.name === 'AbortError') throw err;
        throw new HttpError(502, 'Could not reach the AI service.');
    }

    if (!response.ok) throw await upstreamError(response);
    return response;
}

// Yields the text deltas from a streamed (SSE) completion.
export async function* streamDeltas(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newline;
        while ((newline = buffer.indexOf('\n')) !== -1) {
            const line = buffer.slice(0, newline).trim();
            buffer = buffer.slice(newline + 1);
            if (!line.startsWith('data:')) continue;

            const payload = line.slice(5).trim();
            if (payload === '[DONE]') return;
            try {
                const delta = JSON.parse(payload).choices?.[0]?.delta?.content;
                if (delta) yield delta;
            } catch { /* ignore keep-alives and partial frames */ }
        }
    }
}
