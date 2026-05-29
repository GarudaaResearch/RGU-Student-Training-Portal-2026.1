// ============================================================
// AI Tiruvizha 2026 — Program Agenda Page
// Centre for Innovation and Incubation | Prof. R. Anjit Raja
// ============================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, Users, UserCheck, ShieldAlert, Award, 
  MapPin, CheckCircle2, Laptop, Wifi, BookOpen, Coffee, 
  GraduationCap, Lightbulb, Send, Compass, Sparkles, Link as LinkIcon
} from 'lucide-react';

interface AgendaItem {
  time: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  details?: string;
}

export default function AgendaPage() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [activeInfoTab, setActiveInfoTab] = useState<'infra' | 'exec'>('infra');

  const day1Agenda: AgendaItem[] = [
    { time: '09:30 AM – 10:00 AM', title: 'Inauguration & Orientation', subtitle: 'Welcome & portal kickoff by Prof. R. Anjit Raja', icon: <GraduationCap size={16} />, details: 'Student orientation, portal login sync, and overview of the AI Emerging Program goals.' },
    { time: '10:00 AM – 11:00 AM', title: 'AI Fundamentals Lecture', subtitle: 'Generative AI concepts & industry landscape', icon: <BookOpen size={16} />, details: 'Introduction to neural networks, Large Language Models (LLMs), tokenization, and academic integrity guidelines.' },
    { time: '11:00 AM – 11:15 AM', title: 'Tea Break', subtitle: 'Staggered refreshment interval', icon: <Coffee size={16} /> },
    { time: '11:15 AM – 01:00 PM', title: 'Prompt Engineering (Hands-on)', subtitle: 'Writing effective contextual prompt sequences', icon: <Sparkles size={16} />, details: 'Practicing role-based prompting, zero-shot vs few-shot learning, XML structuring, and logical chain-of-thought methods.' },
    { time: '01:00 PM – 02:00 PM', title: 'Lunch Break', subtitle: 'Cafeteria catering service slot', icon: <Clock size={16} /> },
    { time: '02:00 PM – 03:30 PM', title: 'AI Tools Exploration Lab', subtitle: 'Curated discipline-specific tools and playgrounds', icon: <Compass size={16} />, details: 'Hands-on practice with advanced AI research tools, content synthesis, data parsing, and graphics platforms.' },
    { time: '03:30 PM – 04:30 PM', title: 'Mini Activity Challenge', subtitle: 'Prompting and generative concept race', icon: <Award size={16} />, details: 'Fast-paced prompt building contest. Students submit outputs via the portal for live tracking.' }
  ];

  const day2Agenda: AgendaItem[] = [
    { time: '09:30 AM – 10:00 AM', title: 'Recap & Kickoff', subtitle: 'Staging Day 2 deliverables & milestones', icon: <Compass size={16} />, details: 'Recap of prompt methods, team formation confirmation, and brief overview of vibe coding tools.' },
    { time: '10:00 AM – 11:30 AM', title: 'Vibe Coding (AI Development)', subtitle: 'Building software architecture using natural language', icon: <BookOpen size={16} />, details: 'Getting started with Cursor, Bolt.new, v0, and Lovable. Understanding how to prompt AI editor agents.' },
    { time: '11:30 AM – 11:45 AM', title: 'Tea Break', subtitle: 'Staggered refreshment interval', icon: <Coffee size={16} /> },
    { time: '11:45 AM – 01:00 PM', title: 'Website / App Building Lab', subtitle: 'Deploying full-stack student projects', icon: <Laptop size={16} />, details: 'Building, testing, and deploying responsive web pages and single-page apps based on departmental use cases.' },
    { time: '01:00 PM – 02:00 PM', title: 'Lunch Break', subtitle: 'Cafeteria catering service slot', icon: <Clock size={16} /> },
    { time: '02:00 PM – 03:15 PM', title: 'Idea Bank & Innovation', subtitle: 'Brainstorming solutions & departmental impact', icon: <Lightbulb size={16} />, details: 'Refining project ideas, matching stack items, and preparing the final slide pitches.' },
    { time: '03:15 PM – 04:00 PM', title: 'Project Pitch & Review', subtitle: 'Live presentations to faculty trainers', icon: <Send size={16} />, details: 'Batches showcase their deployed links. Mentors evaluate the user interface, utility, and originality.' },
    { time: '04:00 PM – 04:30 PM', title: 'Valediction & Closing Ceremony', subtitle: 'Badge awards & program wrap-up', icon: <Award size={16} />, details: 'Awarding certificate batches, top-pitch honors, and closing remarks by Prof. R. Anjit Raja.' }
  ];

  const activeAgenda = activeDay === 1 ? day1Agenda : day2Agenda;

  return (
    <div className="page-content animate-fadeIn flex flex-col gap-6 select-none text-[var(--text-primary)]">
      
      {/* Premium Hero Banner */}
      <div 
        className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%)', color: '#FFFFFF' }}
      >
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="flex-1 flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="badge font-bold text-xs px-2 py-0.5 rounded border-white/20 bg-white/15 text-white uppercase tracking-wider">
              AI Tiruvizha 2026
            </span>
            <span className="badge font-bold text-xs px-2 py-0.5 rounded border-white/20 bg-white/15 text-white uppercase tracking-wider">
              AI Emerging Program
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-0 mt-2" style={{ margin: 0 }}>
            AI Tiruvizha 2026 Agenda
          </h2>
          <p className="text-xs md:text-sm text-white/90 font-medium leading-relaxed max-w-2xl mt-1">
            A comprehensive 2-Day Hands-on Training program designed to empower students to build real-world AI projects. 
            <span className="block mt-1 font-semibold italic text-yellow-300">"Learn AI. Build Future. Create Impact."</span>
          </p>
          
          <div className="flex items-center gap-4 mt-3 pt-2 border-t border-white/10 flex-wrap">
            <div className="text-xs text-white/90">
              Organized by: <strong className="text-white">The Centre for Innovation and Incubation</strong>
            </div>
            <div className="hidden sm:block text-white/30">|</div>
            <a 
              href="https://linkedin.com/in/profanjitraja" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-yellow-300 hover:text-white transition-all underline decoration-dotted"
            >
              <LinkIcon size={12}/> Led by Prof. R. Anjit Raja
            </a>
          </div>
        </div>
      </div>

      {/* Program Summary Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Dates & Duration', val: 'June 4 & 5, 2026', desc: '2 Full Days', icon: <Calendar size={16} />, color: 'var(--brand)' },
          { label: 'Daily Timeline', val: '9:30 AM – 4:30 PM', desc: 'Lunch: 1 PM - 2 PM', icon: <Clock size={16} />, color: 'var(--purple)' },
          { label: 'Target Audience', val: '~700 Students', desc: 'Tech & Adjacent Streams', icon: <Users size={16} />, color: 'var(--teal)' },
          { label: 'Mentors & Faculty', val: '15 Trainers', desc: 'Dedicated Batches', icon: <UserCheck size={16} />, color: 'var(--brand)' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card p-4 flex items-start gap-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl"
          >
            <div 
              className="p-2.5 rounded-lg text-white flex-shrink-0"
              style={{ background: stat.color }}
            >
              {stat.icon}
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase font-bold tracking-wider text-[var(--text-muted)]">{stat.label}</div>
              <div className="text-xs font-bold text-[var(--text-primary)] mt-1.5 truncate">{stat.val}</div>
              <div className="text-xs text-[var(--text-secondary)] mt-0.5">{stat.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main timeline schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left/Middle: Timelines */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="card p-5 md:p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-6">
            
            {/* Timeline Header & Day Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>Detailed Session Schedule</h3>
                <p className="text-[11px] text-[var(--text-secondary)] mt-1">Select a day to view detailed tracks.</p>
              </div>

              {/* Day Switch tabs */}
              <div className="tab-list p-0.5 justify-between">
                {[
                  { num: 1, label: 'DAY 1 – June 4', sub: 'Foundations' },
                  { num: 2, label: 'DAY 2 – June 5', sub: 'App Building' }
                ].map(d => (
                  <button
                    key={d.num}
                    onClick={() => setActiveDay(d.num as any)}
                    className="tab-trigger flex flex-col items-center gap-0.5 px-4 py-2 text-center"
                    data-state={activeDay === d.num ? 'active' : 'inactive'}
                  >
                    <span className="text-[11px] font-bold">{d.label}</span>
                    <span className="text-[9px] opacity-75">{d.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline Track */}
            <div className="flex flex-col gap-6 relative pl-3.5 before:absolute before:top-2 before:bottom-2 before:left-[10px] before:w-[2px] before:bg-[var(--border)]">
              <AnimatePresence mode="wait">
                {activeAgenda.map((item, idx) => (
                  <motion.div
                    key={item.time}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 relative group"
                  >
                    {/* Timeline node */}
                    <div className="absolute top-1 left-[-19.5px] w-[14px] h-[14px] rounded-full border-[3px] border-[var(--bg-card)] bg-[var(--brand)] transition-all group-hover:scale-125 z-10" />

                    {/* Time Slot badge */}
                    <div className="w-full sm:w-44 flex-shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--brand)] bg-[var(--brand-sub)] px-2.5 py-1 rounded border border-[var(--brand-border)]">
                        <Clock size={10} /> {item.time}
                      </span>
                    </div>

                    {/* Detail block */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[var(--text-muted)] flex items-center">{item.icon}</span>
                      </div>
                      <div className="text-[11px] text-[var(--text-secondary)] mt-1 font-semibold leading-relaxed">
                        {item.subtitle}
                      </div>
                      {item.details && (
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-1.5 p-2.5 rounded bg-[var(--bg-card-2)] border border-[var(--border-muted)] text-justify">
                          {item.details}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Right Side: Learn Gains & Execution tabs */}
        <div className="flex flex-col gap-6">
          
          {/* Gains Section */}
          <div className="card p-5 md:p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-4">
            <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">What Students Will Gain</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'AI Foundations', icon: '🧠', desc: 'Understand core LLMs & ecosystem structures' },
                { title: 'Effective Prompts', icon: '✍️', desc: 'Write precise contextual prompt scripts' },
                { title: 'Discipline Tools', icon: '🛠️', desc: 'Leverage specialized professional workflows' },
                { title: 'App Building', icon: '🌐', desc: 'Deploy websites & apps from prompt files' },
                { title: 'Idea Bank', icon: '💡', desc: 'Document, validate & brainstorm innovations' },
                { title: 'Active Practice', icon: '🤝', desc: 'Hands-on experiential labs' }
              ].map((gain, i) => (
                <div key={i} className="p-3 rounded-lg bg-[var(--bg-card-2)] border border-[var(--border-muted)] flex flex-col gap-2 hover:border-[var(--brand-border)] transition-colors">
                  <div className="text-lg leading-none">{gain.icon}</div>
                  <div>
                    <div className="text-xs font-bold text-[var(--text-primary)] leading-tight">{gain.title}</div>
                    <p className="text-[9px] text-[var(--text-secondary)] mt-1 leading-snug">{gain.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy & Infra Section */}
          <div className="card p-5 md:p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-4">
            
            {/* Tabs selector */}
            <div className="tab-list p-0.5 w-full justify-between" style={{ padding: 2 }}>
              <button 
                onClick={() => setActiveInfoTab('infra')}
                className="tab-trigger text-xs flex-1 text-center py-1.5"
                data-state={activeInfoTab === 'infra' ? 'active' : 'inactive'}
              >
                Logistics & Setup
              </button>
              <button 
                onClick={() => setActiveInfoTab('exec')}
                className="tab-trigger text-xs flex-1 text-center py-1.5"
                data-state={activeInfoTab === 'exec' ? 'active' : 'inactive'}
              >
                Strategy
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeInfoTab === 'infra' ? (
                <motion.div
                  key="infra"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-col gap-3.5"
                >
                  <div className="flex items-start gap-2.5">
                    <Laptop size={14} className="text-[var(--brand)] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">Student Requirements</div>
                      <p className="text-[9px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        Laptop with 8GB RAM, Chrome/Edge browser installed. Gmail account login required.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Wifi size={14} className="text-[var(--brand)] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">Internet Backbone</div>
                      <p className="text-[9px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        High-speed WiFi (1-2 Mbps dedicated per student). 1 Gbps fiber trunk is active.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin size={14} className="text-[var(--brand)] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">Laboratory Layout</div>
                      <p className="text-[9px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        15 dedicated training halls fully set up, each equipped with presentation systems and power backup.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="exec"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-col gap-3.5"
                >
                  <div className="flex items-start gap-2.5">
                    <Users size={14} className="text-[var(--purple)] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">15 Active Batches</div>
                      <p className="text-[9px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        Staging ~700 students. Staggered into 15 batches (45-50 students per batch) for focus.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <UserCheck size={14} className="text-[var(--purple)] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">Dedicated Mentors</div>
                      <p className="text-[9px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        1 faculty trainer assigned per batch, ensuring complete individual guidance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-[var(--purple)] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">Credential Sync</div>
                      <p className="text-[9px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        Pre-created student profiles loaded into the portal for instant, lag-free authentication.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="divider my-1" />

            {/* Risk management status panel */}
            <div className="p-3.5 rounded bg-[var(--bg-card-2)] border border-[var(--border-muted)] flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)] uppercase">
                <ShieldAlert size={12} className="text-yellow-500" /> Risk Management
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  'Pre-tested login credentials verified',
                  'Dual redundant backup internet active',
                  'Staggered batch access scheduling'
                ].map((risk, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[9px] text-[var(--text-secondary)] leading-none font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse"></span>
                    {risk}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Footer Support Banner */}
      <div className="card p-5 md:p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
        <div className="text-center sm:text-left">
          <div className="text-xs font-bold text-[var(--text-primary)]">Centre for Innovation and Incubation Support</div>
          <p className="text-[9px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">Empowering Young Minds | Innovating Tomorrow</p>
        </div>

        <div className="flex items-center gap-3.5 flex-wrap justify-center text-xs">
          <span className="text-[var(--text-secondary)] font-semibold">
            📧 <a href="mailto:rcasinnovationstartupcell@rathinam.in" className="hover:text-[var(--brand)] underline decoration-dotted">rcasinnovationstartupcell@rathinam.in</a>
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="text-[var(--text-secondary)] font-semibold">
            📞 <a href="tel:+917299408979" className="hover:text-[var(--brand)] underline decoration-dotted">+91 7299408979</a>
          </span>
        </div>
      </div>

    </div>
  );
}
