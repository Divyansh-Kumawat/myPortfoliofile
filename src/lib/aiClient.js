// Browser side of the /api functions. The Groq key never leaves the server.

async function toError(res) {
    try {
        const data = await res.json();
        if (data?.error) return new Error(data.error);
    } catch { /* not JSON */ }
    return new Error(`Request failed (${res.status}).`);
}

async function post(path, body, signal) {
    let res;
    try {
        res = await fetch(path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            signal,
        });
    } catch (err) {
        if (err.name === 'AbortError') throw err;
        throw new Error("Couldn't reach the AI. Check your connection and try again.");
    }
    if (!res.ok) throw await toError(res);
    return res;
}

// Streams the assistant's reply, calling onToken with each chunk of text.
export async function streamChat(messages, { signal, onToken }) {
    const res = await post('/api/chat', { messages }, signal);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        if (text) onToken(text);
    }
}

export async function analyzeJobFit(jobDescription, { signal } = {}) {
    const res = await post('/api/job-fit', { jobDescription }, signal);
    return res.json();
}
