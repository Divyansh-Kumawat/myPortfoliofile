// Builds the profile the AI answers from, straight out of portfolioData.js, so
// the assistant never drifts from what the site itself shows.
import {
    personalData,
    projects,
    technicalSkills,
    experiences,
    certifications,
    testimonials,
} from '../../src/data/portfolioData.js';

const list = (items) => items.filter(Boolean).join(', ');

function buildProfile() {
    const work = experiences.filter((e) => e.type === 'experience');
    const education = experiences.filter((e) => e.type === 'education');

    const lines = [
        '## Profile',
        `Name: ${personalData.name}`,
        `Headline: ${personalData.tagline.trim()}`,
        `Location: ${personalData.location}`,
        `Bio: ${personalData.bio}`,
        '',
        '## Contact',
        `Email: ${personalData.email}`,
        `GitHub: ${personalData.social.github}`,
        `LinkedIn: ${personalData.social.linkedin}`,
        `X/Twitter: ${personalData.social.twitter}`,
        `Resume: ${personalData.resumeUrl}`,
        'The website also has a contact form in its Contact section.',
        '',
        '## Work experience (most recent first)',
        ...work.flatMap((e) => [
            `- ${e.title} at ${e.company} (${e.period}): ${e.description}`,
            ...(e.highlights || []).map((h) => `  * ${h}`),
        ]),
        '',
        '## Education',
        ...education.map((e) => `- ${e.title}, ${e.company} (${e.period}): ${e.description}`),
        '',
        '## Projects',
        ...projects.map((p) => {
            const links = list([p.github && `GitHub ${p.github}`, p.live && `Live ${p.live}`]);
            return `- ${p.title} [${p.category}]: ${p.description} Tech: ${list(p.tech)}.${links ? ` Links: ${links}.` : ''}`;
        }),
        '',
        '## Skills',
        ...Object.entries(technicalSkills).map(([group, items]) => `- ${group}: ${list(items)}`),
        '- also: LangGraph, agent orchestration, tool calling, RAG, prompt engineering (from current work and projects)',
        '',
        '## Certifications',
        ...certifications.map((c) => `- ${c}`),
        '',
        '## Testimonials',
        ...testimonials.map((t) => `- ${t.name} (${t.role}): "${t.content}"`),
    ];

    return lines.join('\n');
}

export const PROFILE = buildProfile();
export const OWNER = personalData.name;
export const OWNER_FIRST = personalData.name.split(' ')[0];
export const OWNER_EMAIL = personalData.email;
export const PROJECT_TITLES = projects.map((p) => p.title);
