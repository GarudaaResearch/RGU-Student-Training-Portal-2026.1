// ============================================================
// WhatsApp Support & Help Page — Fluent Design / Premium UI
// Centre for Innovation and Incubation | Prof. R. Anjit Raja
// ============================================================
import { 
  MessageCircle, QrCode, Sparkles, ExternalLink, ShieldCheck, 
  Clock, CheckCircle, HelpCircle, PhoneCall, Mail
} from 'lucide-react';

export default function WhatsappHelpPage() {
  const supportGroupUrl = "https://chat.whatsapp.com/Bm64LlSAvFgE3SVJjDgZls";

  const benefits = [
    { 
      title: 'Portal Tech Troubleshooting', 
      desc: 'Encountered a bug, profile synchronization issue, or lesson marking error? Get immediate technical resolution.', 
      icon: <HelpCircle size={18} /> 
    },
    { 
      title: 'Live Session Alerts', 
      desc: 'Receive instant notifications 15 minutes before any Live Lecture, Hands-on Lab, or Guest Presentation starts.', 
      icon: <Clock size={18} /> 
    },
    { 
      title: 'Study Materials & Files', 
      desc: 'Access direct attachments, cheat sheets, slide desks, and links to recommended AI tools instantly.', 
      icon: <Sparkles size={18} /> 
    },
    { 
      title: 'CII Incubation & Projects', 
      desc: 'Form teams for the upcoming Hackathons, submit ideas to the Ideas Bank, and get direct mentor guidance.', 
      icon: <ShieldCheck size={18} /> 
    }
  ];

  return (
    <div className="page-content animate-fadeIn flex flex-col gap-6 select-none text-[var(--text-primary)]">
      
      {/* Premium Hero Banner */}
      <div 
        className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #128C7E 0%, #075E54 100%)', 
          color: '#FFFFFF' 
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="flex-1 flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="badge font-bold text-[9px] px-2 py-0.5 rounded border-white/20 bg-white/15 text-white uppercase tracking-wider">
              Official Support
            </span>
            <span className="badge font-bold text-[9px] px-2 py-0.5 rounded border-white/20 bg-white/15 text-white uppercase tracking-wider">
              CII Hub Network
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-0 mt-2" style={{ margin: 0 }}>
            WhatsApp Technical Support Group
          </h2>
          <p className="text-xs md:text-sm text-white/90 font-medium leading-relaxed max-w-2xl mt-1">
            Join the official student help group managed by the Centre for Innovation and Incubation. Scan the QR code or click the direct join link to start interacting.
          </p>

          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10 flex-wrap">
            <div className="text-xs text-white/90">
              Moderator Train: <strong className="text-white">Prof. R. Anjit Raja & CII Team</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout for QR Code and Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: QR Code Display Card (Fluent styling) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="card p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col items-center text-center shadow-lg relative overflow-hidden">
            {/* Soft decorative green background glow */}
            <div className="absolute top-[-30px] right-[-30px] w-24 h-24 rounded-full bg-[#25D366]/5 blur-2xl pointer-events-none" />
            
            <div className="p-2.5 rounded-full bg-[#128C7E]/10 text-[#128C7E] mb-3.5">
              <QrCode size={24} />
            </div>

            <h3 className="text-sm font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>
              Scan QR to Join
            </h3>
            <p className="text-[11px] text-[var(--text-secondary)] mt-1.5 leading-relaxed max-w-xs">
              Open WhatsApp on your mobile phone, navigate to Camera or Link Devices, and scan this QR code.
            </p>

            {/* QR Code framing container */}
            <div className="my-6 p-4 rounded-2xl bg-white border border-[var(--border-muted)] shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center">
              <img 
                src="/shared_qr_code.png" 
                alt="WhatsApp Support Group QR Code" 
                className="w-48 h-48 object-contain rounded-lg"
                style={{ filter: 'contrast(1.05) saturate(1.02)' }}
              />
            </div>

            <div className="w-full flex flex-col gap-3">
              <a 
                href={supportGroupUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn w-full gap-2 py-2.5 justify-center font-bold text-xs shadow-md transition-all duration-200"
                style={{ 
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', 
                  border: 'none', 
                  color: '#FFFFFF' 
                }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
              >
                <MessageCircle size={14} />
                Join Group via Direct Link
                <ExternalLink size={11} />
              </a>
              <span className="text-[9px] text-[var(--text-muted)] leading-relaxed">
                Requires WhatsApp Web or WhatsApp mobile application installed.
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Benefits / Guidelines & Help Office Contacts */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Why Join? */}
          <div className="card p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>
              Group Benefits & Direct Resources
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border-muted)] flex flex-col gap-2.5 hover:border-[var(--brand-border)] transition-colors duration-200"
                >
                  <div className="p-2 rounded bg-[var(--brand-sub)] text-[var(--brand)] w-fit">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[var(--text-primary)] leading-tight">
                      {item.title}
                    </div>
                    <p className="text-[10px] text-[var(--text-secondary)] mt-1 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group Guidelines Card */}
          <div className="card p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-3.5">
            <h3 className="text-sm font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>
              Community Code of Conduct
            </h3>
            <div className="flex flex-col gap-2.5">
              {[
                "Strictly restrict discussion to training modules, assignments, and AI topics.",
                "Adhere to university communications decorum; show respect to trainers and peers.",
                "Avoid sending spam links, forward-chain messages, or promotional text.",
                "Strictly respect academic integrity guidelines when completing training tasks."
              ].map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle size={13} className="text-[#25D366] flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium">
                    {rule}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Incubation Cell Support Office Contacts */}
          <div className="card p-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-3">
            <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Incubation Cell Administrative Helpdesk
            </div>
            <div className="text-xs font-bold text-[var(--text-primary)]">
              Still Facing Connectivity Issues?
            </div>
            <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
              If the QR code does not load or you cannot launch the WhatsApp application link, contact our physical helpdesk in the Centre for Innovation and Incubation laboratory.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-1.5 text-[10px] font-semibold text-[var(--text-secondary)]">
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
