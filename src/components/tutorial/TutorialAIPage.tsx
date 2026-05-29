// ============================================================
// Tutorial-AI Page — Prompt Engineering From Zero to Advanced
// AI Tiruvizha 2026 | RGU Innovation & Incubation
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ChevronDown, FileText,
  Cpu, Users, Search, Copy, CheckCheck, Zap, Shield,
  BarChart3, Globe, GraduationCap
} from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: 's1', icon: <BookOpen size={16} />, color: 'var(--brand)',
    label: 'Section 1', title: 'Introduction to AI & Prompt Engineering',
  },
  {
    id: 's2', icon: <GraduationCap size={16} />, color: 'var(--success)',
    label: 'Section 2', title: 'Beginner Level — Getting Comfortable with AI',
  },
  {
    id: 's3', icon: <FileText size={16} />, color: 'var(--purple)',
    label: 'Section 3', title: 'Intermediate — Prompts for Real Academic Work',
  },
  {
    id: 's4', icon: <Globe size={16} />, color: 'var(--teal)',
    label: 'Section 4', title: 'Building Digital Products with AI Prompts',
  },
  {
    id: 's5', icon: <Zap size={16} />, color: 'var(--amber)',
    label: 'Section 5', title: 'Advanced Prompt Engineering Techniques',
  },
  {
    id: 's6', icon: <Cpu size={16} />, color: 'var(--brand)',
    label: 'Section 6', title: 'Domain-Specific AI Prompts for Students',
  },
  {
    id: 's7', icon: <Shield size={16} />, color: 'var(--error)',
    label: 'Section 7', title: 'Responsible AI Use & Academic Integrity',
  },
  {
    id: 's8', icon: <Zap size={16} />, color: 'var(--purple)',
    label: 'Section 8', title: '30 Power Prompts — Quick Reference',
  },
  {
    id: 's9', icon: <Users size={16} />, color: 'var(--teal)',
    label: 'Section 9', title: 'Hands-On Workshop Activities',
  },
  {
    id: 's10', icon: <BarChart3 size={16} />, color: 'var(--success)',
    label: 'Section 10', title: 'Resources, Tools & Next Steps',
  },
];

// ── Reusable Components ───────────────────────────────────────
function PromptBox({ children, label = 'Prompt' }: { children: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-lg border border-[var(--border)] overflow-hidden my-3">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--bg-card-2)] border-b border-[var(--border)]">
        <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{label}</span>
        <button onClick={copy} className="flex items-center gap-1 text-[9px] font-semibold text-[var(--brand)] hover:text-[var(--brand-hover)] transition-colors cursor-pointer">
          {copied ? <><CheckCheck size={10} /> Copied!</> : <><Copy size={10} /> Copy</>}
        </button>
      </div>
      <pre className="p-4 text-xs text-[var(--text-secondary)] font-mono leading-relaxed whitespace-pre-wrap bg-[var(--bg-app)] select-text overflow-x-auto">
        {children}
      </pre>
    </div>
  );
}

function InfoBox({ type = 'tip', children }: { type?: 'tip' | 'warning' | 'note'; children: React.ReactNode }) {
  const styles = {
    tip: { bg: 'var(--success-bg)', border: 'var(--success-border)', color: 'var(--success)', icon: '💡', label: 'Key Insight' },
    warning: { bg: 'var(--warning-bg)', border: 'var(--warning-border)', color: 'var(--warning)', icon: '⚠️', label: 'Important Warning' },
    note: { bg: 'var(--brand-sub)', border: 'var(--brand-border)', color: 'var(--brand)', icon: '📌', label: 'Pro Tip' },
  }[type];
  return (
    <div className="rounded-lg p-4 my-3 border" style={{ background: styles.bg, borderColor: styles.border }}>
      <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: styles.color }}>
        {styles.icon} {styles.label}
      </div>
      <div className="text-xs text-[var(--text-primary)] leading-relaxed">{children}</div>
    </div>
  );
}

function SectionCard({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden mb-4">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
      >
        <span className="text-sm font-bold text-[var(--text-primary)]">{title}</span>
        <span className="text-[var(--text-muted)] transition-transform" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <ChevronDown size={15} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 flex flex-col gap-3 border-t border-[var(--border-muted)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)] my-3">
      <table className="data-table w-full text-xs">
        <thead>
          <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function TutorialAIPage() {
  const [activeSection, setActiveSection] = useState('s1');
  const [sidebarSearch, setSidebarSearch] = useState('');

  const filteredSections = SECTIONS.filter(s =>
    s.title.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    s.label.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  return (
    <div className="page-content animate-fadeIn">

      {/* Hero Banner */}
      <div
        className="rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%)' }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="badge text-[10px] px-2 py-0.5 border-white/20 bg-white/15 text-white font-bold">AI Tiruvizha 2026</span>
            <span className="badge text-[10px] px-2 py-0.5 border-white/20 bg-white/15 text-white font-bold">Tutorial Guide</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight" style={{ margin: 0 }}>
            Prompt Engineering — Zero to Advanced
          </h2>
          <p className="text-sm text-white/90 max-w-2xl mt-1 leading-relaxed">
            A comprehensive hands-on tutorial designed for RGU students to become confident AI practitioners.
            Covering AI fundamentals, real academic workflows, product building, and advanced techniques.
          </p>
          <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/10 text-xs text-white/80 flex-wrap">
            <span>Prepared by: <strong className="text-white">Prof. Anjit Raja R</strong></span>
            <span className="text-white/30">|</span>
            <span>RGU Innovation & Incubation | May 2026</span>
            <span className="text-white/30">|</span>
            <span>10 Sections · 30+ Power Prompts</span>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* Left sidebar: section navigator */}
        <div className="w-full lg:w-64 flex-shrink-0 sticky top-16 flex flex-col gap-3">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
            <input
              className="input text-xs w-full"
              style={{ paddingLeft: 30 }}
              placeholder="Search sections..."
              value={sidebarSearch}
              onChange={e => setSidebarSearch(e.target.value)}
            />
          </div>
          <nav className="flex flex-col gap-1">
            {filteredSections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                  activeSection === sec.id
                    ? 'bg-[var(--brand-sub)] border-[var(--brand-border)]'
                    : 'bg-[var(--bg-card)] border-[var(--border)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <span className="mt-0.5 flex-shrink-0" style={{ color: activeSection === sec.id ? 'var(--brand)' : 'var(--text-muted)' }}>
                  {sec.icon}
                </span>
                <div className="min-w-0">
                  <div className={`text-[9px] font-bold uppercase tracking-wider ${activeSection === sec.id ? 'text-[var(--brand)]' : 'text-[var(--text-muted)]'}`}>
                    {sec.label}
                  </div>
                  <div className={`text-[10px] font-semibold leading-tight mt-0.5 ${activeSection === sec.id ? 'text-[var(--brand)]' : 'text-[var(--text-secondary)]'}`}>
                    {sec.title}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Right content pane */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

              {/* ── SECTION 1 ─────────────────────── */}
              {activeSection === 's1' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                    <div className="p-2 rounded-lg text-white" style={{ background: 'var(--brand)' }}><BookOpen size={16} /></div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Section 1</div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>Introduction to AI & Prompt Engineering</h3>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Welcome to AI Tiruvizha 2026 — a hands-on training experience at RGU designed to take you from a complete beginner to a confident AI practitioner. This guide covers what AI is, how to communicate with it effectively, and how to use it to produce real-world outputs.
                  </p>

                  <SectionCard title="1.1 What is Artificial Intelligence?" defaultOpen={true}>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Artificial Intelligence (AI) is the ability of a computer system to perform tasks that normally require human intelligence — like understanding language, recognizing images, solving problems, and making decisions.</p>
                    <div className="text-xs font-bold text-[var(--text-primary)] mt-2">Key AI Concepts You Will Encounter:</div>
                    <ul className="flex flex-col gap-1 mt-1">
                      {[
                        ['LLMs', 'AI trained on vast amounts of text (e.g., Claude, ChatGPT, Gemini)'],
                        ['Generative AI', 'AI that creates new content: text, images, code, audio'],
                        ['NLP', 'AI that understands and generates human language'],
                        ['Machine Learning', 'AI that learns from data patterns'],
                      ].map(([term, def]) => (
                        <li key={term} className="text-xs flex items-start gap-2">
                          <span className="badge badge-indigo text-[9px] mt-0.5 flex-shrink-0">{term}</span>
                          <span className="text-[var(--text-secondary)] leading-relaxed">{def}</span>
                        </li>
                      ))}
                    </ul>
                    <ComparisonTable
                      headers={['AI Type', 'What it Does', 'Example Tool', 'Use Case']}
                      rows={[
                        ['LLM', 'Generates & understands text', 'Claude, GPT-4', 'Writing, coding, Q&A'],
                        ['Image Gen', 'Creates images from text', 'DALL-E, Midjourney', 'Design, illustration'],
                        ['Code AI', 'Writes & reviews code', 'GitHub Copilot', 'Software development'],
                        ['Voice AI', 'Converts speech to text', 'Whisper, Google STT', 'Transcription, assistants'],
                      ]}
                    />
                  </SectionCard>

                  <SectionCard title="1.2 What is a Prompt?">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">A prompt is the instruction or question you type to an AI system. The quality of your prompt directly determines the quality of the AI's response. <strong>Prompt Engineering</strong> is the skill of crafting these instructions precisely to get optimal outputs.</p>
                    <InfoBox type="tip">Think of prompting like giving directions to a very smart assistant who is extremely literal. The more precise, contextual, and structured your instructions, the better the result.</InfoBox>
                  </SectionCard>

                  <SectionCard title="1.3 The Anatomy of a Perfect Prompt">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Every powerful prompt has these six building blocks:</p>
                    <ComparisonTable
                      headers={['Element', 'What it Means', 'Example']}
                      rows={[
                        ['Role', 'Who should the AI be?', '"Act as a senior data scientist..."'],
                        ['Context', 'What is the background?', '"I am a final-year student studying ML..."'],
                        ['Task', 'What do you want done?', '"Write a literature review on CNNs..."'],
                        ['Format', 'How should output look?', '"Respond in bullet points with subheadings"'],
                        ['Constraints', 'Any limits or rules?', '"Keep it under 500 words, no jargon"'],
                        ['Examples', 'Show what you want', '"Here is a sample paragraph: [...]"'],
                      ]}
                    />
                  </SectionCard>
                </div>
              )}

              {/* ── SECTION 2 ─────────────────────── */}
              {activeSection === 's2' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                    <div className="p-2 rounded-lg text-white" style={{ background: 'var(--success)' }}><GraduationCap size={16} /></div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Section 2</div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>Beginner Level — Getting Comfortable with AI</h3>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">This section is for those who have never used AI tools before. We will go step by step with real, copy-paste-ready prompts and explain exactly what each part does.</p>

                  <SectionCard title="2.1 Your First AI Conversation" defaultOpen>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Start simple. Open Claude (claude.ai) or ChatGPT and try this prompt:</p>
                    <PromptBox label="Beginner Prompt #1 — Try This Now">{`Hello! I am a student at RGU. I want to learn about Artificial Intelligence.
Can you explain what AI is in simple terms, as if I am 15 years old?
Use an analogy involving cricket to help me understand.`}</PromptBox>
                    <InfoBox type="tip">You told the AI: your identity, your goal, how complex to be, and the type of analogy to use. The AI has everything it needs to give you a perfect beginner answer.</InfoBox>
                  </SectionCard>

                  <SectionCard title="2.2 The Role + Task + Format Formula">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">The quickest improvement for any beginner: always tell the AI who to <strong>BE</strong>, what to <strong>DO</strong>, and how to <strong>FORMAT</strong> the answer.</p>
                    <PromptBox label="Example 1 — Explain a Concept">{`Role: You are a friendly professor teaching AI to first-year engineering students.

Task: Explain the difference between Machine Learning and Deep Learning.

Format:
- Start with a one-line simple definition for each
- Use a real-world example (food delivery app or social media)
- End with a 2-row comparison table`}</PromptBox>
                    <PromptBox label="Example 2 — Study Helper">{`Act as my personal AI tutor.

I have an exam on Neural Networks tomorrow. I have 2 hours to study.

Create a study plan that:
1. Covers: Perceptron, Activation Functions, Backpropagation, CNN, RNN
2. Allocates time per topic based on difficulty
3. Ends with 5 likely exam questions and model answers`}</PromptBox>
                    <PromptBox label="Example 3 — Summarize a Research Paper">{`I am going to paste an abstract from a research paper below.
Summarize it in 5 bullet points suitable for a student who is new to the topic.
Highlight any technical terms and explain them in brackets.

[PASTE YOUR ABSTRACT HERE]`}</PromptBox>
                  </SectionCard>

                  <SectionCard title="2.3 Common Beginner Mistakes">
                    <ComparisonTable
                      headers={['Mistake', 'Bad Prompt Example', 'Fixed Prompt']}
                      rows={[
                        ['Too vague', '"Tell me about AI"', '"Explain supervised learning with 2 Tamil Nadu industry examples"'],
                        ['No format request', '"Summarize this"', '"Summarize in 3 bullets, max 20 words each"'],
                        ['No context given', '"Fix my code"', '"Fix this Python code for a KNN classifier. Error: [paste error]"'],
                        ['Accepting first answer', 'Stop after one reply', 'Follow up: "Make it simpler" or "Add more examples"'],
                      ]}
                    />
                  </SectionCard>
                </div>
              )}

              {/* ── SECTION 3 ─────────────────────── */}
              {activeSection === 's3' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                    <div className="p-2 rounded-lg text-white" style={{ background: 'var(--purple)' }}><FileText size={16} /></div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Section 3</div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>Intermediate — Prompts for Real Academic Work</h3>
                    </div>
                  </div>

                  <SectionCard title="3.1 IEEE Research Paper Writing — Full Workflow" defaultOpen>
                    {[
                      { label: 'Step 1 — Generate a Research Topic', prompt: `Act as a senior IEEE researcher specializing in Computer Science and AI.

I am a final-year B.Tech student at RGU (Anna University affiliated).
My area of interest: [Deep Learning / IoT / NLP / Computer Vision - pick one]

Suggest 5 novel, publishable IEEE paper topics that:
- Are relevant to 2025-2026 trends
- Can be completed with limited hardware (laptop + Google Colab)
- Have real-world applicability in India (healthcare, agriculture, smart cities)

For each topic give: Title, Problem Statement, Proposed Method, Dataset to use` },
                      { label: 'Step 2 — Write the Abstract', prompt: `Act as an IEEE paper author with 15 years of publishing experience.

Write a formal IEEE-style abstract for the following paper:
Title: [Your Paper Title]
Topic: [Your Topic in 2 sentences]

The abstract must follow IEEE format:
- Background (1 sentence)
- Problem/Gap (1 sentence)
- Proposed Method (2 sentences)
- Key Results/Expected Results (1 sentence)
- Conclusion/Significance (1 sentence)

Total: Exactly 150-250 words. Use formal academic English.` },
                      { label: 'Step 3 — Write the Literature Review', prompt: `Act as an academic researcher writing Section II (Literature Review) of an IEEE paper.

Paper Topic: [Your Topic]

Write a 400-word literature review that:
1. Reviews 6-8 related works (you may use plausible references)
2. Groups them by approach: Traditional Methods, ML-based, DL-based
3. Identifies the research gap that our paper fills
4. Uses IEEE citation format [1], [2], etc.
5. Ends with 1 paragraph on our paper's contribution` },
                      { label: 'Step 4 — Write the Methodology Section', prompt: `You are writing Section III (Proposed Methodology) of an IEEE conference paper.

My system works as follows: [describe your project in 3-4 sentences]

Write this section with:
1. System Architecture overview
2. Dataset description (source, size, preprocessing steps)
3. Model/Algorithm description with equations where needed
4. Training parameters (epochs, learning rate, batch size)
5. Evaluation metrics used (accuracy, F1-score, etc.)

Use IEEE formal language. No first-person pronouns.` },
                      { label: 'Step 5 — Generate the Conclusion', prompt: `Write the Conclusion section (Section V) for my IEEE paper.
Paper Topic: [Topic]
Key Results: [Your results - e.g., 94.5% accuracy on test set]

Structure:
- Paragraph 1: Restate what was done and achieved
- Paragraph 2: Real-world implications and contribution
- Paragraph 3: Limitations and future work directions

Keep it under 200 words. Formal IEEE tone.` },
                    ].map(s => <PromptBox key={s.label} label={s.label}>{s.prompt}</PromptBox>)}
                    <InfoBox type="note">Always run your AI-generated IEEE content through Grammarly and a plagiarism checker. Use the AI draft as a starting point, then add your own experimental data, actual references from Google Scholar, and your real results.</InfoBox>
                  </SectionCard>

                  <SectionCard title="3.2 PowerPoint Presentation Creation Prompts">
                    <PromptBox label="Complete PPT Outline Prompt">{`Act as a professional presentation designer and subject matter expert.

Create a complete PowerPoint presentation outline on:
Topic: [Your Topic - e.g., 'Applications of AI in Tamil Nadu Agriculture']
Audience: [e.g., 'RGU faculty and industry judges at a tech fest']
Duration: [e.g., '10 minutes / 15 slides']
Purpose: [e.g., 'Convince judges to fund our project']

For each slide provide:
- Slide Number & Title
- Bullet points (max 4 per slide, max 8 words each)
- Speaker notes (what the presenter should say, 3-4 sentences)
- Visual suggestion (what image/chart/diagram to use)

Slides to include: Title, Agenda, Problem, Solution Overview,
Architecture/Demo, Results, Comparison Table, Real-world Use Case,
Team, Timeline, Conclusion, Q&A`}</PromptBox>
                    <PromptBox label="Make It Visual — Design Prompt">{`I have this text for a slide. Make it visual and engaging:

[PASTE YOUR DRY SLIDE TEXT]

Rewrite it as:
1. A catchy headline (max 6 words)
2. 3 visual 'cards' or icons with short labels
3. One data point shown as a big number (e.g., '94% Accuracy')
4. A call-to-action or memorable tagline at the bottom`}</PromptBox>
                  </SectionCard>
                </div>
              )}

              {/* ── SECTION 4 ─────────────────────── */}
              {activeSection === 's4' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                    <div className="p-2 rounded-lg text-white" style={{ background: 'var(--teal)' }}><Globe size={16} /></div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Section 4</div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>Building Digital Products with AI Prompts</h3>
                    </div>
                  </div>

                  <SectionCard title="4.1 Simple Website Creation Prompts" defaultOpen>
                    <PromptBox label="Prompt 1 — Personal Portfolio Website (HTML/CSS/JS)">{`Act as a senior frontend web developer.

Create a complete, single-page personal portfolio website for:
Name: [Your Name]
Role: Final Year CSE Student at RGU
Skills: Python, Machine Learning, React, SQL
Projects: [List 2-3 of your projects]

Requirements:
- Single HTML file with embedded CSS and JavaScript
- Sections: Hero, About, Skills, Projects, Contact
- Mobile-responsive design
- Dark/light mode toggle
- Color scheme: modern tech (navy blue and orange)
- Smooth scroll animations
- Contact form (no backend needed, use mailto:)

Provide complete, working code I can save as index.html and open directly.`}</PromptBox>
                    <PromptBox label="Prompt 2 — College Event Website">{`Build a landing page for a college tech fest called 'AI Tiruvizha 2026'.
Organized by: RGU Innovation & Incubation Cell
Date: May 15, 2026 | Venue: RGU Auditorium

Page must include:
- Animated hero section with event name and countdown timer
- Events list: Paper Presentation, Hackathon, AI Demo, Quiz
- Speaker cards section (3 placeholder speakers)
- Registration button (link to Google Form)
- Schedule table for the day
- Footer with social links

Tech: Plain HTML, CSS, JavaScript. No frameworks. Must work offline.
Style: Futuristic, dark theme with glowing blue accents.`}</PromptBox>
                    <InfoBox type="note">After getting the code from AI: (1) Copy to VS Code, (2) Open in browser to check, (3) If something breaks, paste the error back: 'I got this error: [error text]. Fix it.' Iterate 2–3 times until it works perfectly.</InfoBox>
                  </SectionCard>

                  <SectionCard title="4.2 Simple Mobile App Creation Prompts">
                    <PromptBox label="Prompt 1 — React Native Quiz App">{`Act as a senior React Native developer.

Create a simple mobile app called 'AI Quiz App' for students.

App features:
- Home screen with subject selection (Maths, Science, CS, General Knowledge)
- Quiz screen: Shows 10 questions one at a time with 4 options
- Timer: 30 seconds per question
- Score screen: Shows result with correct answers
- Simple, clean UI suitable for Android

Tech stack: React Native (Expo), functional components, hooks

Provide:
1. Complete App.js file
2. Component structure
3. Step-by-step setup instructions for a beginner`}</PromptBox>
                    <PromptBox label="Prompt 2 — Flutter Attendance App">{`Build a simple student attendance tracker mobile app using Flutter.

Features:
- Add subjects (up to 8)
- Mark attendance as Present/Absent for each class
- Show attendance percentage per subject
- Color coding: Green (>75%), Yellow (60-75%), Red (<60%)
- Local storage using shared_preferences package
- Daily reminder notification

Provide complete main.dart with all screens:
HomeScreen, SubjectDetailScreen, MarkAttendanceScreen

Include pubspec.yaml with dependencies.`}</PromptBox>
                  </SectionCard>
                </div>
              )}

              {/* ── SECTION 5 ─────────────────────── */}
              {activeSection === 's5' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                    <div className="p-2 rounded-lg text-white" style={{ background: 'var(--amber)' }}><Zap size={16} /></div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Section 5</div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>Advanced Prompt Engineering Techniques</h3>
                    </div>
                  </div>

                  <SectionCard title="5.1 Chain-of-Thought (CoT) Prompting" defaultOpen>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Force the AI to think step-by-step instead of jumping to an answer. This dramatically improves accuracy for complex problems.</p>
                    <PromptBox label="CoT Prompt — Debugging Code">{`The following Python code has a bug. Think through it carefully:

[PASTE YOUR CODE]

Error message: [PASTE ERROR]

Debug process:
1. Read the code and identify what each section is supposed to do
2. Trace the execution line by line mentally
3. Identify the exact line where the error occurs and why
4. Provide the corrected code
5. Explain what was wrong in plain English`}</PromptBox>
                  </SectionCard>

                  <SectionCard title="5.2 Few-Shot Prompting">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Give the AI 2–3 examples of what you want before asking for the real output. This is one of the most powerful techniques for consistent, formatted results.</p>
                    <PromptBox label="Few-Shot — Generate MCQ Questions">{`Generate MCQ questions in EXACTLY this format. Here are 2 examples:

EXAMPLE 1:
Q: What activation function introduces non-linearity in hidden layers?
A) Softmax  B) ReLU  C) Linear  D) None of the above
Answer: B | Explanation: ReLU is the most common activation function used in hidden layers.

EXAMPLE 2:
Q: Which algorithm is used for classification in supervised learning?
A) K-Means  B) DBSCAN  C) SVM  D) PCA
Answer: C | Explanation: Support Vector Machine (SVM) is a supervised learning algorithm.

NOW generate 5 MCQs on the topic: [Convolutional Neural Networks]
Same exact format. Difficulty: Medium. Suitable for final-year engineering exams.`}</PromptBox>
                  </SectionCard>

                  <SectionCard title="5.3 Role + Persona Prompting">
                    <PromptBox label="Expert Persona — Paper Review">{`You are Dr. Priya Rajan, a professor at IIT Madras with 20 years of experience
in Deep Learning. You have published 50+ IEEE papers and regularly review
manuscripts for top journals. You are known for being honest, precise,
and giving actionable feedback.

A final-year student at RGU has submitted this paper draft for your review:
[PASTE YOUR PAPER SECTION]

Review it as Dr. Priya would, covering:
1. Technical accuracy (any wrong statements?)
2. Writing quality (formal enough for IEEE?)
3. Structure issues
4. Missing content that reviewers would expect
5. Specific line-by-line suggestions (quote and rewrite 3 sentences)
6. Overall verdict: Accept / Minor Revision / Major Revision`}</PromptBox>
                  </SectionCard>

                  <SectionCard title="5.4 Prompt Chaining">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Break complex tasks into a series of connected prompts where each output feeds the next. This is how AI agents work.</p>
                    <ComparisonTable
                      headers={['Step', 'Goal', 'Prompt Summary']}
                      rows={[
                        ['1', 'Generate project idea', '"Give me 5 final-year AI project ideas for a 3-person team with 3 months and Google Colab hardware"'],
                        ['2', 'Build project proposal', '"Take idea #3 from above. Write a full 2-page project proposal with objectives, scope, and methodology"'],
                        ['3', 'Create timeline', '"Create a 12-week Gantt chart in table format for building the project in the proposal above"'],
                        ['4', 'Write code scaffold', '"Generate the Python project structure and starter code for the project described above"'],
                        ['5', 'Prepare presentation', '"Using the proposal and timeline above, create a 10-slide PPT outline for our project review"'],
                      ]}
                    />
                  </SectionCard>

                  <SectionCard title="5.5 System Prompt / Custom Instructions">
                    <PromptBox label="System Prompt — RGU AI Assistant">{`SYSTEM PROMPT (set once, persists across all conversations):

You are RGU-AI, the official AI assistant for RGU students.
Your role: Help students with academics, research, and career guidance.

Rules you MUST follow:
1. Always respond in English unless the student writes in Tamil
2. Always suggest IEEE standards for any research-related query
3. Cite Anna University curriculum guidelines when relevant
4. For code questions: use Python unless another language is specified
5. End every response with: 'Need more help? Visit the RGU Innovation Cell.'
6. Never answer questions unrelated to education, technology, or career`}</PromptBox>
                  </SectionCard>
                </div>
              )}

              {/* ── SECTION 6 ─────────────────────── */}
              {activeSection === 's6' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                    <div className="p-2 rounded-lg text-white" style={{ background: 'var(--brand)' }}><Cpu size={16} /></div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Section 6</div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>Domain-Specific AI Prompts for Students</h3>
                    </div>
                  </div>

                  <SectionCard title="6.1 AI for Data Science & ML Projects" defaultOpen>
                    <PromptBox label="Dataset Exploration Prompt">{`I have a dataset with the following columns:
[List your column names and types - e.g., Age (int), Income (float), Churned (bool)]

Total rows: [number] | Task type: [Classification/Regression/Clustering]

As a senior data scientist, provide:
1. Exploratory Data Analysis (EDA) checklist
2. Python code to check: null values, outliers, class imbalance
3. Feature engineering suggestions specific to this dataset
4. Top 3 recommended ML algorithms with justification
5. Evaluation metrics to use and why`}</PromptBox>
                    <PromptBox label="Model Evaluation Prompt">{`My ML model produced these results:
Accuracy: 87% | Precision: 0.83 | Recall: 0.79 | F1: 0.81
Confusion Matrix: [[450, 50], [80, 420]]

Analyze as a senior ML engineer:
1. Is this result good? Compare to industry benchmarks for [your domain]
2. What do the confusion matrix numbers tell us?
3. Is this model biased? Explain
4. 3 specific ways to improve this model
5. Write the Results section for my IEEE paper based on these numbers`}</PromptBox>
                  </SectionCard>

                  <SectionCard title="6.2 AI for IoT & Embedded Systems Projects">
                    <PromptBox label="IoT Project Builder Prompt">{`Act as an embedded systems engineer specializing in IoT.

I am building: [Describe your IoT project]

Provide:
1. Complete component list with specifications
2. Circuit connection diagram (describe it in text, pin by pin)
3. Arduino/MicroPython code with comments
4. MQTT protocol setup for cloud connectivity
5. Power optimization tips for battery operation
6. 3 common errors students face and how to fix them`}</PromptBox>
                  </SectionCard>

                  <SectionCard title="6.3 AI for Career Development">
                    <PromptBox label="Resume Builder Prompt">{`Act as a senior HR manager at a top IT company (TCS/Infosys/Wipro).

Here is my current resume:
[PASTE YOUR RESUME TEXT]

Rewrite it to:
1. Make each bullet point start with a strong action verb
2. Quantify every achievement (add numbers/percentages where possible)
3. Add ATS keywords for [your target role]
4. Rewrite the Summary section to be 3 punchy sentences
5. Flag anything a recruiter would find weak and suggest improvements`}</PromptBox>
                    <PromptBox label="Mock Interview Prompt">{`Act as a technical interviewer at [Company Name] for the role of [Role].

My background: Final-year CSE student, skills in [list skills],
projects in [describe briefly].

Conduct a mock interview:
Round 1: Ask 5 technical questions (ML/Python/DSA based on my skills)
Round 2: 1 HR behavioral question using STAR format
Round 3: 1 case study / system design question

After I answer each question, give me:
- Score out of 10
- What I said well
- What I missed
- Model answer`}</PromptBox>
                  </SectionCard>
                </div>
              )}

              {/* ── SECTION 7 ─────────────────────── */}
              {activeSection === 's7' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                    <div className="p-2 rounded-lg text-white" style={{ background: 'var(--error)' }}><Shield size={16} /></div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Section 7</div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>Responsible AI Use & Academic Integrity</h3>
                    </div>
                  </div>

                  <SectionCard title="7.1 What AI Can and Cannot Do" defaultOpen>
                    <ComparisonTable
                      headers={['AI CAN Help With', 'AI CANNOT Replace']}
                      rows={[
                        ['Drafting & structuring content', 'Your original experimental data'],
                        ['Explaining complex concepts', 'Genuine critical thinking & analysis'],
                        ['Generating code templates', 'Real debugging experience & intuition'],
                        ['Literature summaries', 'Direct reading of primary sources'],
                        ['Interview practice', 'Actual industry experience'],
                        ['Idea generation & brainstorming', 'Your unique perspective & voice'],
                      ]}
                    />
                  </SectionCard>

                  <SectionCard title="7.2 Academic Integrity Guidelines at RGU">
                    <ul className="flex flex-col gap-2">
                      {[
                        'Always disclose when AI was used in your assignment or paper',
                        'AI-generated content must be verified — do not submit without review',
                        'Your experimental results, data collection, and analysis must be original',
                        'Use AI as a draft tool, then rewrite in your own words',
                        'For IEEE papers: All cited references must be real and verifiable',
                        'AI hallucinations are common — never cite AI-provided facts without verification',
                      ].map((rule, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                          <span className="text-[var(--success)] mt-0.5 flex-shrink-0">✅</span> {rule}
                        </li>
                      ))}
                    </ul>
                    <InfoBox type="warning">AI models can 'hallucinate' — they confidently state things that are completely false. Always verify any statistic, citation, or technical claim that AI generates before using it in your work. Use Google Scholar, IEEE Xplore, or ResearchGate to confirm references.</InfoBox>
                  </SectionCard>

                  <SectionCard title="7.3 Prompt for Fact-Checking AI Output">
                    <PromptBox label="Fact-Check Verification Prompt">{`You just told me: [PASTE THE AI STATEMENT YOU WANT TO VERIFY]

Before I use this:
1. How confident are you this is accurate?
2. What is your source or reasoning?
3. Are there any nuances or exceptions I should know?
4. What search terms should I use to verify this on Google Scholar?`}</PromptBox>
                  </SectionCard>
                </div>
              )}

              {/* ── SECTION 8 ─────────────────────── */}
              {activeSection === 's8' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                    <div className="p-2 rounded-lg text-white" style={{ background: 'var(--purple)' }}><Zap size={16} /></div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Section 8</div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>30 Power Prompts — Quick Reference</h3>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Copy, paste, and customize these prompts for immediate use. Replace text in [ ] with your own details.</p>

                  {[
                    {
                      cat: '8.1 Academic Writing', color: 'var(--brand)', prompts: [
                        '"Write a formal email to my professor requesting a 3-day deadline extension for [assignment], citing [reason]. Be polite and professional."',
                        '"Review this paragraph from my report and improve it: grammar, flow, and academic tone. [PASTE PARAGRAPH]"',
                        '"Generate 10 potential research questions on [topic] suitable for a B.Tech project at an Anna University-affiliated college."',
                        '"Convert this informal writing into IEEE formal style: [PASTE TEXT]"',
                        '"Write acknowledgement section for my project report thanking: my guide Dr. [Name], lab staff, family."',
                      ]
                    },
                    {
                      cat: '8.2 Programming & Technical', color: 'var(--teal)', prompts: [
                        '"Write Python code to [task]. Include comments on every line. Use only standard libraries."',
                        '"Explain this code in plain English for a beginner: [PASTE CODE]"',
                        '"Convert this Python code to [JavaScript/Java/C++]: [PASTE CODE]"',
                        '"Write 10 unit tests for this function: [PASTE FUNCTION]"',
                        '"I want to build [app/system]. What is the best tech stack for a student with limited resources? Compare 3 options."',
                      ]
                    },
                    {
                      cat: '8.3 Learning & Studying', color: 'var(--success)', prompts: [
                        '"Create a mind map outline for [topic]. Show main branches and sub-branches in indented text format."',
                        '"Teach me [concept] using the Feynman Technique — explain as if I am 10 years old, then gradually add complexity."',
                        '"I am confused about the difference between [A] and [B]. Give me 3 analogies and a comparison table."',
                        '"Create a spaced repetition schedule for learning [topic] over 4 weeks, 1 hour per day."',
                        '"Give me the top 10 must-know formulas/concepts for [subject] exam. Format as a cheat sheet."',
                      ]
                    },
                    {
                      cat: '8.4 Creativity & Design', color: 'var(--purple)', prompts: [
                        '"Write a 60-second elevator pitch for my project: [describe project]. Make it exciting and memorable."',
                        '"Generate 5 creative names for my startup/app that does [describe function]. Include tag lines."',
                        '"Write the script for a 3-minute YouTube video explaining [topic] to college students."',
                        '"Design a logo concept description for [company/app]. Colors, symbols, typography, and meaning."',
                        '"Create a social media post (Twitter, LinkedIn, Instagram) for [event/achievement]. Each platform\'s style."',
                      ]
                    },
                    {
                      cat: '8.5 Analysis & Problem Solving', color: 'var(--amber)', prompts: [
                        '"Analyze the pros and cons of [technology/approach] for [specific use case in Indian context]."',
                        '"Give me a SWOT analysis for [project/product/business idea] targeting college students in Tamil Nadu."',
                        '"Compare [Option A] vs [Option B] vs [Option C] for [my requirement]. Create a decision matrix."',
                        '"I need to solve this problem: [describe problem]. Walk me through root cause analysis."',
                        '"Predict 5 challenges I will face when [building/implementing project] and how to preemptively solve them."',
                      ]
                    },
                  ].map(group => (
                    <SectionCard key={group.cat} title={group.cat}>
                      <div className="flex flex-col gap-2">
                        {group.prompts.map((p, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5" style={{ background: group.color }}>{i + 1}</span>
                            <span className="text-xs text-[var(--text-secondary)] leading-relaxed font-mono">{p}</span>
                          </div>
                        ))}
                      </div>
                    </SectionCard>
                  ))}
                </div>
              )}

              {/* ── SECTION 9 ─────────────────────── */}
              {activeSection === 's9' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                    <div className="p-2 rounded-lg text-white" style={{ background: 'var(--teal)' }}><Users size={16} /></div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Section 9</div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>Hands-On Workshop Activities</h3>
                    </div>
                  </div>

                  <SectionCard title="Activity 1: Prompt Comparison Challenge (15 minutes)" defaultOpen>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2"><strong>Objective:</strong> Understand how small changes in prompts create dramatically different outputs.</p>
                    {['Step 1: Type a bad prompt: "Tell me about AI"', 'Step 2: Type an improved prompt using Role + Task + Format', 'Step 3: Add Few-Shot examples', 'Step 4: Compare all 3 outputs side by side', 'Step 5: Score each output: Quality (1–10), Length (appropriate?), Accuracy'].map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <span className="badge badge-cyan text-[9px] flex-shrink-0 mt-0.5">Step {i + 1}</span> {s.replace(`Step ${i + 1}: `, '')}
                      </div>
                    ))}
                    <InfoBox type="tip">Share your best prompt and output with the group. Vote on which team's output is most useful. Discuss WHY some prompts work better.</InfoBox>
                  </SectionCard>

                  <SectionCard title="Activity 2: Build a Mini Project in 30 Minutes">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">Using only AI prompts, teams of 3 will build ONE of the following:</p>
                    {['Team Track A: A working HTML page for their department\'s student club', 'Team Track B: A complete IEEE abstract for a chosen AI topic', 'Team Track C: A 10-slide PPT outline for a national-level hackathon idea', 'Team Track D: A Python ML script that classifies flowers using Iris dataset'].map((t, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-2.5 rounded bg-[var(--bg-card-2)] border border-[var(--border-muted)] text-xs text-[var(--text-secondary)]">
                        <span className="badge badge-violet text-[9px] flex-shrink-0">Track {String.fromCharCode(65 + i)}</span>
                        {t.replace(/^Team Track [A-D]: /, '')}
                      </div>
                    ))}
                  </SectionCard>

                  <SectionCard title="Activity 3: Prompt Debugging Game">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">Facilitators provide broken prompts. Teams fix them and explain what was wrong.</p>
                    <ComparisonTable
                      headers={['Broken Prompt', 'Your Fixed Version']}
                      rows={[
                        ['"Code for AI"', 'Write your improved version here'],
                        ['"Make my resume good"', 'Write your improved version here'],
                        ['"IEEE paper"', 'Write your improved version here'],
                        ['"Help with project"', 'Write your improved version here'],
                        ['"Explain ML deeply technically advanced"', 'Write your improved version here'],
                      ]}
                    />
                  </SectionCard>
                </div>
              )}

              {/* ── SECTION 10 ─────────────────────── */}
              {activeSection === 's10' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                    <div className="p-2 rounded-lg text-white" style={{ background: 'var(--success)' }}><BarChart3 size={16} /></div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Section 10</div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>Resources, Tools & Next Steps</h3>
                    </div>
                  </div>

                  <SectionCard title="10.1 Essential AI Tools for RGU Students" defaultOpen>
                    <ComparisonTable
                      headers={['Tool', 'Best For', 'Free Tier?', 'Link']}
                      rows={[
                        ['Claude (Anthropic)', 'Writing, coding, analysis', 'Yes', 'claude.ai'],
                        ['ChatGPT (OpenAI)', 'General purpose AI', 'Yes (GPT-3.5)', 'chat.openai.com'],
                        ['Google Gemini', 'Research, Google Workspace', 'Yes', 'gemini.google.com'],
                        ['GitHub Copilot', 'Code completion', 'Free for students', 'copilot.github.com'],
                        ['Perplexity AI', 'AI-powered search', 'Yes', 'perplexity.ai'],
                        ['Gamma.app', 'AI PPT creation', 'Limited free', 'gamma.app'],
                        ['Canva AI', 'Design with AI', 'Yes', 'canva.com'],
                        ['Google Colab', 'ML/Python coding', 'Yes (GPU!)', 'colab.research.google.com'],
                      ]}
                    />
                  </SectionCard>

                  <SectionCard title="10.2 Your 30-Day AI Learning Path">
                    <ComparisonTable
                      headers={['Week', 'Focus', 'Daily Task (30 min)', 'Goal']}
                      rows={[
                        ['Week 1', 'Basics & Communication', 'Practice 3 prompts from Section 2 daily', 'Write 10 quality prompts confidently'],
                        ['Week 2', 'Academic Productivity', 'Use AI for one real assignment or paper section', 'Draft one IEEE abstract'],
                        ['Week 3', 'Technical Building', 'Build one small web page or script daily', 'Deploy one working project'],
                        ['Week 4', 'Advanced Techniques', 'Try CoT, few-shot, and chaining prompts', 'Create your own prompt library'],
                      ]}
                    />
                  </SectionCard>

                  <SectionCard title="10.3 Building Your Personal Prompt Library">
                    <ul className="flex flex-col gap-2">
                      {[
                        'Create a Notion page or Google Doc called "My Prompt Library"',
                        'Every time a prompt gives you an excellent result, save it',
                        'Organize by category: Academic, Coding, Research, Career',
                        'Refine prompts over time as you learn what works',
                        'Share your best prompts with classmates and on LinkedIn',
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                          <span className="w-5 h-5 rounded-full bg-[var(--success-bg)] border border-[var(--success-border)] text-[var(--success)] text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </SectionCard>

                  {/* Final motivational message */}
                  <div
                    className="rounded-xl p-6 flex flex-col gap-2 text-center"
                    style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--purple) 100%)' }}
                  >
                    <div className="text-2xl">🚀</div>
                    <h4 className="text-sm font-bold text-white">Final Message from the Curriculum Team</h4>
                    <p className="text-xs text-white/90 leading-relaxed max-w-xl mx-auto">
                      AI is not replacing engineers — it is multiplying the capabilities of engineers who know how to use it. Every prompt you master is a new superpower. Start today, iterate daily, and in 90 days you will be among the top AI-fluent engineers in your batch.
                    </p>
                    <p className="text-xs font-bold italic text-yellow-300 mt-1">
                      "The prompt is the new programming language." — RGU AI Tiruvizha 2026 Team
                    </p>
                    <div className="mt-3 text-[10px] text-white/70">
                      AI Tiruvizha 2026 | RGU Innovation & Incubation | Student Training Portal
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Bottom navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border)]">
            <button
              onClick={() => {
                const idx = SECTIONS.findIndex(s => s.id === activeSection);
                if (idx > 0) setActiveSection(SECTIONS[idx - 1].id);
              }}
              disabled={activeSection === 's1'}
              className="btn btn-secondary btn-sm gap-1 cursor-pointer"
            >
              ← Previous
            </button>
            <span className="text-[10px] text-[var(--text-muted)]">
              Section {SECTIONS.findIndex(s => s.id === activeSection) + 1} of {SECTIONS.length}
            </span>
            <button
              onClick={() => {
                const idx = SECTIONS.findIndex(s => s.id === activeSection);
                if (idx < SECTIONS.length - 1) setActiveSection(SECTIONS[idx + 1].id);
              }}
              disabled={activeSection === 's10'}
              className="btn btn-primary btn-sm gap-1 cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
