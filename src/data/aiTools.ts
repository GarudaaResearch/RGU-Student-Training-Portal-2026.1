// ============================================================
// CII AI Training Hub — AI Tools Directory Data
// ============================================================
import type { AITool } from '../types';

export const AI_TOOLS: AITool[] = [
  // LLM Chatbots
  { id: 't01', name: 'ChatGPT', category: 'LLM Chatbots', url: 'https://chat.openai.com', description: 'OpenAI\'s flagship conversational AI. Excellent for writing, coding, analysis and brainstorming.', isPaid: false, tags: ['writing', 'coding', 'analysis'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't02', name: 'Claude', category: 'LLM Chatbots', url: 'https://claude.ai', description: 'Anthropic\'s Claude — known for long context, nuanced reasoning and safe outputs.', isPaid: false, tags: ['writing', 'reasoning', 'long-context'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't03', name: 'Gemini', category: 'LLM Chatbots', url: 'https://gemini.google.com', description: 'Google\'s multimodal AI with deep Google Search integration and real-time data.', isPaid: false, tags: ['multimodal', 'search', 'google'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't04', name: 'Grok', category: 'LLM Chatbots', url: 'https://x.ai/grok', description: 'xAI\'s Grok — real-time X/Twitter data access with witty, unfiltered responses.', isPaid: false, tags: ['real-time', 'twitter', 'witty'], isFeatured: false, addedAt: '2026-01-01' },
  { id: 't05', name: 'Perplexity', category: 'LLM Chatbots', url: 'https://perplexity.ai', description: 'AI-powered answer engine with citations. Best for research and fact-checking.', isPaid: false, tags: ['research', 'citations', 'search'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't06', name: 'DeepSeek', category: 'LLM Chatbots', url: 'https://chat.deepseek.com', description: 'Open-weight Chinese LLM with strong coding and math capabilities.', isPaid: false, tags: ['coding', 'math', 'open-source'], isFeatured: false, addedAt: '2026-01-01' },
  { id: 't07', name: 'Meta AI', category: 'LLM Chatbots', url: 'https://meta.ai', description: 'Meta\'s AI assistant integrated across WhatsApp, Instagram and Messenger.', isPaid: false, tags: ['social', 'meta', 'free'], isFeatured: false, addedAt: '2026-01-01' },
  { id: 't08', name: 'Microsoft Copilot', category: 'LLM Chatbots', url: 'https://copilot.microsoft.com', description: 'Microsoft\'s AI built on GPT-4. Integrated into Office 365 and Windows 11.', isPaid: false, tags: ['microsoft', 'office', 'productivity'], isFeatured: false, addedAt: '2026-01-01' },
  // AI Coding — IDE
  { id: 't09', name: 'Cursor', category: 'AI Coding — IDE', url: 'https://cursor.sh', description: 'AI-first code editor built on VS Code. Chat with your codebase, generate entire features.', isPaid: false, tags: ['ide', 'coding', 'vscode'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't10', name: 'Windsurf', category: 'AI Coding — IDE', url: 'https://windsurf.ai', description: 'Codeium\'s agentic IDE. Multi-file edits, autonomous debugging, flow-state coding.', isPaid: false, tags: ['ide', 'agentic', 'multi-file'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't11', name: 'GitHub Copilot', category: 'AI Coding — IDE', url: 'https://github.com/features/copilot', description: 'GitHub\'s AI pair programmer. Autocomplete, chat, PR reviews inside VS Code.', isPaid: true, tags: ['ide', 'autocomplete', 'github'], isFeatured: false, addedAt: '2026-01-01' },
  { id: 't12', name: 'Claude Code', category: 'AI Coding — IDE', url: 'https://claude.ai/code', description: 'Anthropic\'s terminal-based agentic coding tool. Full-repo understanding.', isPaid: true, tags: ['terminal', 'agentic', 'full-repo'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't13', name: 'Tabnine', category: 'AI Coding — IDE', url: 'https://tabnine.com', description: 'Privacy-first AI code completion. Works offline with local models.', isPaid: false, tags: ['autocomplete', 'privacy', 'local'], isFeatured: false, addedAt: '2026-01-01' },
  // AI Coding — App Builders
  { id: 't14', name: 'Bolt.new', category: 'AI Coding — App Builders', url: 'https://bolt.new', description: 'Full-stack web app builder in browser. From prompt to deployed app in minutes.', isPaid: false, tags: ['fullstack', 'browser', 'deploy'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't15', name: 'Lovable', category: 'AI Coding — App Builders', url: 'https://lovable.dev', description: 'Build production-ready React apps with AI. GitHub sync, Supabase backend.', isPaid: false, tags: ['react', 'fullstack', 'supabase'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't16', name: 'v0 by Vercel', category: 'AI Coding — App Builders', url: 'https://v0.dev', description: 'Vercel\'s UI generator. Describe any UI, get React + Tailwind code instantly.', isPaid: false, tags: ['ui', 'react', 'tailwind', 'vercel'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't17', name: 'Replit', category: 'AI Coding — App Builders', url: 'https://replit.com', description: 'Cloud IDE with AI agent. Build, run and deploy apps entirely in browser.', isPaid: false, tags: ['cloud-ide', 'deploy', 'collaboration'], isFeatured: false, addedAt: '2026-01-01' },
  // Image AI
  { id: 't18', name: 'Midjourney', category: 'Image AI', url: 'https://midjourney.com', description: 'Industry-leading AI image generator. Stunning artistic quality from text prompts.', isPaid: true, tags: ['image', 'art', 'design'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't19', name: 'Adobe Firefly', category: 'Image AI', url: 'https://firefly.adobe.com', description: 'Adobe\'s generative AI. Commercially safe images, integrated with Photoshop.', isPaid: false, tags: ['image', 'adobe', 'commercial'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't20', name: 'DALL-E', category: 'Image AI', url: 'https://openai.com/dall-e-3', description: 'OpenAI\'s image generation model. Excellent at following complex text instructions.', isPaid: true, tags: ['image', 'openai', 'detailed'], isFeatured: false, addedAt: '2026-01-01' },
  { id: 't21', name: 'Stable Diffusion', category: 'Image AI', url: 'https://stability.ai', description: 'Open-source image AI. Run locally or via API. Highly customizable with LoRAs.', isPaid: false, tags: ['image', 'open-source', 'local'], isFeatured: false, addedAt: '2026-01-01' },
  { id: 't22', name: 'Ideogram', category: 'Image AI', url: 'https://ideogram.ai', description: 'Best AI for text in images — logos, posters, typography-heavy designs.', isPaid: false, tags: ['image', 'text', 'logo', 'design'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't23', name: 'Google Imagen 3', category: 'Image AI', url: 'https://deepmind.google/technologies/imagen', description: 'Google\'s photorealistic image generation model. Available via Vertex AI.', isPaid: true, tags: ['image', 'photorealistic', 'google'], isFeatured: false, addedAt: '2026-01-01' },
  // Video AI
  { id: 't24', name: 'RunwayML', category: 'Video AI', url: 'https://runwayml.com', description: 'Professional AI video tools. Gen-4 for text-to-video, video editing with AI.', isPaid: true, tags: ['video', 'editing', 'generation'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't25', name: 'Pika', category: 'Video AI', url: 'https://pika.art', description: 'Easy text-to-video and image-to-video. Great for creative short clips.', isPaid: false, tags: ['video', 'creative', 'short-clips'], isFeatured: false, addedAt: '2026-01-01' },
  { id: 't26', name: 'HeyGen', category: 'Video AI', url: 'https://heygen.com', description: 'AI avatar videos. Create spokesperson videos in 175+ languages instantly.', isPaid: true, tags: ['avatar', 'spokesperson', 'multilingual'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't27', name: 'Kling AI', category: 'Video AI', url: 'https://klingai.com', description: 'Chinese AI video generator with realistic motion and physics simulation.', isPaid: false, tags: ['video', 'realistic', 'motion'], isFeatured: false, addedAt: '2026-01-01' },
  { id: 't28', name: 'Sora', category: 'Video AI', url: 'https://sora.com', description: 'OpenAI\'s video generation model. Cinematic quality, complex scene understanding.', isPaid: true, tags: ['video', 'cinematic', 'openai'], isFeatured: true, addedAt: '2026-01-01' },
  // Audio AI
  { id: 't29', name: 'ElevenLabs', category: 'Audio AI', url: 'https://elevenlabs.io', description: 'Best AI voice cloning and text-to-speech. 29 languages, realistic emotion.', isPaid: false, tags: ['voice', 'tts', 'cloning'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't30', name: 'Suno', category: 'Audio AI', url: 'https://suno.com', description: 'AI music generation from text. Full songs with vocals, instruments, mixing.', isPaid: false, tags: ['music', 'songs', 'generation'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't31', name: 'Udio', category: 'Audio AI', url: 'https://udio.com', description: 'AI music creation with fine control over style, mood and structure.', isPaid: false, tags: ['music', 'creative', 'control'], isFeatured: false, addedAt: '2026-01-01' },
  { id: 't32', name: 'Adobe Podcast AI', category: 'Audio AI', url: 'https://podcast.adobe.com', description: 'Enhance audio quality automatically. Remove noise, fix mic quality with AI.', isPaid: false, tags: ['podcast', 'audio', 'enhancement'], isFeatured: false, addedAt: '2026-01-01' },
  // Productivity AI
  { id: 't33', name: 'Notion AI', category: 'Productivity AI', url: 'https://notion.so/product/ai', description: 'AI built into Notion workspace. Summarize, generate, translate notes instantly.', isPaid: true, tags: ['notes', 'workspace', 'productivity'], isFeatured: false, addedAt: '2026-01-01' },
  { id: 't34', name: 'Zapier AI', category: 'Productivity AI', url: 'https://zapier.com/ai', description: 'AI-powered workflow automation. Connect 6000+ apps without code.', isPaid: false, tags: ['automation', 'workflow', 'no-code'], isFeatured: false, addedAt: '2026-01-01' },
  { id: 't35', name: 'n8n', category: 'Productivity AI', url: 'https://n8n.io', description: 'Open-source workflow automation with AI nodes. Self-hostable alternative to Zapier.', isPaid: false, tags: ['automation', 'open-source', 'self-hosted'], isFeatured: false, addedAt: '2026-01-01' },
  // Research AI
  { id: 't36', name: 'Consensus', category: 'Research AI', url: 'https://consensus.app', description: 'AI search engine for scientific papers. Find evidence-based answers with citations.', isPaid: false, tags: ['research', 'papers', 'citations'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't37', name: 'Elicit', category: 'Research AI', url: 'https://elicit.org', description: 'AI research assistant. Automate literature review, extract data from papers.', isPaid: false, tags: ['literature-review', 'extraction', 'papers'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't38', name: 'Semantic Scholar', category: 'Research AI', url: 'https://semanticscholar.org', description: 'Free AI-powered academic search engine covering 200M+ papers.', isPaid: false, tags: ['academic', 'papers', 'free'], isFeatured: false, addedAt: '2026-01-01' },
  { id: 't39', name: 'Research Rabbit', category: 'Research AI', url: 'https://researchrabbit.ai', description: 'Visual literature mapping. Discover related papers, citation networks.', isPaid: false, tags: ['literature', 'mapping', 'citations'], isFeatured: false, addedAt: '2026-01-01' },
  // Design AI
  { id: 't40', name: 'Canva AI', category: 'Design AI', url: 'https://canva.com', description: 'AI-powered design platform. Magic Studio for instant graphics, presentations, videos.', isPaid: false, tags: ['design', 'presentations', 'graphics'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't41', name: 'Figma AI', category: 'Design AI', url: 'https://figma.com', description: 'AI features in Figma — auto-layout, component generation, design suggestions.', isPaid: false, tags: ['design', 'ui-ux', 'prototype'], isFeatured: false, addedAt: '2026-01-01' },
  { id: 't42', name: 'Framer AI', category: 'Design AI', url: 'https://framer.com', description: 'AI website builder with beautiful animations. From prompt to live website.', isPaid: false, tags: ['website', 'animations', 'no-code'], isFeatured: true, addedAt: '2026-01-01' },
  // Data & Analytics
  { id: 't43', name: 'Julius AI', category: 'Data & Analytics', url: 'https://julius.ai', description: 'Chat with your data. Upload CSV/Excel and get charts, insights, code instantly.', isPaid: false, tags: ['data', 'analytics', 'charts'], isFeatured: true, addedAt: '2026-01-01' },
  { id: 't44', name: 'DataGPT', category: 'Data & Analytics', url: 'https://datagpt.com', description: 'Conversational data analyst. Connect databases and query in plain English.', isPaid: true, tags: ['database', 'analytics', 'sql'], isFeatured: false, addedAt: '2026-01-01' },
];

export const TOOL_CATEGORIES = [...new Set(AI_TOOLS.map(t => t.category))];

export const getFeaturedTools = () => AI_TOOLS.filter(t => t.isFeatured);
export const getToolsByCategory = (cat: string) => AI_TOOLS.filter(t => t.category === cat);
export const getToolOfTheDay = () => {
  const featured = getFeaturedTools();
  const idx = new Date().getDate() % featured.length;
  return featured[idx];
};
