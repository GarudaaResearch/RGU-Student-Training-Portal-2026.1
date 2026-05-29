// ============================================================
// AI Tiruvizha 2026 Invitation Poster Page — Premium UI
// Centre for Innovation and Incubation | Prof. R. Anjit Raja
// ============================================================
import { 
  Sparkles, Download, Calendar, MapPin, ShieldCheck, Laptop, 
  Mail, PhoneCall, Info, Award
} from 'lucide-react';

export default function InvitationPosterPage() {
  const invitationImageUrl = "/ai_tiruvizha_invitation.png";

  const keyDetails = [
    { label: 'Event Date', val: 'June 4 & 5, 2026', icon: <Calendar className="text-[var(--brand)]" size={16} /> },
    { label: 'Venue Lab', val: 'CII Incubation Labs (15 Rooms)', icon: <MapPin className="text-[var(--brand)]" size={16} /> },
    { label: 'Laptop Setup', val: '8GB RAM & Google Chrome', icon: <Laptop className="text-[var(--brand)]" size={16} /> },
    { label: 'Certification', val: 'Trainer Verified Badge Issued', icon: <Award className="text-[var(--brand)]" size={16} /> },
  ];

  return (
    <div className="page-content animate-fadeIn flex flex-col gap-6 select-none text-[var(--text-primary)]">
      
      {/* Premium Hero Banner */}
      <div 
        className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%)', 
          color: '#FFFFFF' 
        }}
      >
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="flex-1 flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="badge font-bold text-[9px] px-2 py-0.5 rounded border-white/20 bg-white/15 text-white uppercase tracking-wider">
              AI Tiruvizha 2026
            </span>
            <span className="badge font-bold text-[9px] px-2 py-0.5 rounded border-white/20 bg-white/15 text-white uppercase tracking-wider">
              Official Invitation
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-0 mt-3" style={{ margin: 0 }}>
            AI Tiruvizha Invitation & Instructions
          </h2>
          <p className="text-xs md:text-sm text-white/90 font-medium leading-relaxed max-w-2xl mt-1">
            Welcome to the signature AI Emerging Program at RGU. Below is the official invitation poster, daily session instructions, and essential prep rules for all participating batches.
          </p>

          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10 flex-wrap">
            <div className="text-xs text-white/90">
              Host Trainer & Organizer: <strong className="text-white">Prof. R. Anjit Raja & The CII Team</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout for Poster Showcase and Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Invitation Poster Showcase Card */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="card p-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col items-center text-center shadow-lg relative overflow-hidden">
            
            <div className="w-full flex items-center justify-between mb-4 border-b border-[var(--border-muted)] pb-3">
              <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Sparkles size={14} className="text-yellow-500" />
                Official Invitation Poster
              </span>
              <a 
                href={invitationImageUrl} 
                download="AI_Tiruvizha_2026_Invitation.png"
                className="btn btn-secondary btn-sm text-xs flex items-center gap-1.5"
                style={{ padding: '4px 10px' }}
              >
                <Download size={11} /> Download Poster
              </a>
            </div>

            {/* Premium Framed Image Container */}
            <div className="w-full relative overflow-hidden rounded-xl border border-[var(--border-muted)] bg-[var(--bg-card-2)] p-2.5 shadow-sm group hover:shadow-md transition-all duration-300">
              <img 
                src={invitationImageUrl} 
                alt="AI Tiruvizha 2026 Invitation Poster" 
                className="w-full h-auto max-h-[520px] object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.015]"
                style={{ filter: 'contrast(1.02) saturate(1.02)' }}
              />
            </div>
            
            <div className="flex items-center gap-2 mt-4 text-xs text-[var(--text-muted)] font-semibold leading-relaxed">
              <Info size={12} className="text-[var(--brand)] flex-shrink-0" />
              Hover or click "Download Poster" to save the high-resolution invitation poster.
            </div>
          </div>
        </div>

        {/* Right Column: Instructions, Guidelines & Help Desk */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Quick Logistics Details */}
          <div className="grid grid-cols-2 gap-4">
            {keyDetails.map((item, idx) => (
              <div 
                key={idx} 
                className="card p-3.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex items-start gap-3 hover:border-[var(--brand-border)] transition-colors duration-200"
              >
                <div className="p-2 rounded bg-[var(--brand-sub)] text-[var(--brand)] mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[9px] uppercase font-bold tracking-wider text-[var(--text-muted)]">{item.label}</div>
                  <div className="text-xs font-bold text-[var(--text-primary)] mt-1">{item.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Event Instructions / Schedule Overview */}
          <div className="card p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>
              AI Tiruvizha Instructions
            </h3>
            
            <div className="flex flex-col gap-3.5">
              {[
                { 
                  title: 'Training Timings', 
                  desc: 'Sessions start sharp at 09:30 AM and wrap up by 04:30 PM. Staggered lunch break is mapped between 1:00 PM – 2:00 PM.' 
                },
                { 
                  title: 'Laptop Preparation Checklist', 
                  desc: 'All Year 1 & Year 2 students are requested to bring their personal laptops (minimum 8GB RAM recommended) with Google Chrome or Microsoft Edge installed.' 
                },
                { 
                  title: 'Account Credentials active', 
                  desc: 'Ensure your Gmail and GitHub accounts are active. Pre-tested student profile credentials have been loaded into the training hub.' 
                },
                { 
                  title: 'Interactive Evaluation Contest', 
                  desc: 'Day 2 features a live mini activity prompt engineering and vibe coding contest. Deployed project URLs must be submitted via the portal.' 
                }
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[var(--bg-card-2)] border border-[var(--border-muted)] flex flex-col gap-1">
                  <div className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse"></span>
                    {item.title}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-3 text-justify">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* General Rules & Attendance Guidelines */}
          <div className="card p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-3">
            <h3 className="text-sm font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>
              Attendance & Discipline Rules
            </h3>
            
            <div className="flex flex-col gap-2.5">
              {[
                "Attendance is systematically registered using portal sync metrics inside the halls.",
                "Verify that your assigned batch hall matches your student profile stream.",
                "Ensure logical academic integrity when submitting prompts and source files.",
                "Valediction Closing Ceremony features premium badge awards on June 5, 04:00 PM."
              ].map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <ShieldCheck size={13} className="text-[var(--brand)] flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-semibold">
                    {rule}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Incubation Cell Support contacts */}
          <div className="card p-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-3">
            <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Centre for Innovation and Incubation Cell
            </div>
            <div className="text-sm font-bold text-[var(--text-primary)]">
              Contact Event Support Cell
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed text-justify">
              For any logistical queries, physical hall mappings, or Wi-Fi login issues during the function, contact startup cell coordinators.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-1.5 text-xs font-semibold text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <Mail size={13} className="text-[var(--brand)]" />
                <a href="mailto:rcasinnovationstartupcell@rathinam.in" className="hover:text-[var(--brand)] underline decoration-dotted">
                  rcasinnovationstartupcell@rathinam.in
                </a>
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="flex items-center gap-1.5">
                <PhoneCall size={13} className="text-[var(--brand)]" />
                <a href="tel:+917299408979" className="hover:text-[var(--brand)] underline decoration-dotted">
                  +91 7299408979
                </a>
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
