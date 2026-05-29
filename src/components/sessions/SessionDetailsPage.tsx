// ============================================================
// Session Details Page — Microsoft Learn / Fluent Design
// Centre for Innovation and Incubation | Prof. R. Anjit Raja
// ============================================================
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_SESSIONS } from '../../data/mockData';
import {
  ArrowLeft, Calendar, Clock, Users, Video, ExternalLink,
  Mic, Code2, Trophy, BookOpen, FileText, CheckCircle2, Laptop, UserCheck
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

const TYPE_ICONS: Record<string, React.ReactNode> = {
  'Live Lecture':       <Mic size={16} />,
  'Hands-on Lab':       <Code2 size={16} />,
  'Hackathon':          <Trophy size={16} />,
  'Guest Lecture':      <Video size={16} />,
  'Workshop':           <BookOpen size={16} />,
  'Assessment Session': <BookOpen size={16} />,
};

const TYPE_COLOR: Record<string, string> = {
  'Live Lecture':       'badge-indigo',
  'Hands-on Lab':       'badge-cyan',
  'Hackathon':          'badge-amber',
  'Guest Lecture':      'badge-violet',
  'Workshop':           'badge-green',
  'Assessment Session': 'badge-red',
};

export default function SessionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find session by id
  const session = MOCK_SESSIONS.find(s => s.id === id);

  if (!session) {
    return (
      <div className="page-content animate-fadeIn flex flex-col items-center justify-center py-20 text-[var(--text-secondary)]">
        <BookOpen size={48} className="mb-4 opacity-40 text-[var(--text-muted)]" />
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">Session Not Found</h3>
        <p className="text-xs mb-6 text-[var(--text-secondary)]">The session you are looking for does not exist or has been removed.</p>
        <button className="btn btn-primary text-xs" onClick={() => navigate('/sessions')}>
          Back to Live Sessions
        </button>
      </div>
    );
  }

  const isLive = session.status === 'live';
  const enrollment = session.maxParticipants ? Math.round(((session.enrolledCount || 0) / session.maxParticipants) * 100) : 0;

  // Static suggested resources/prerequisites based on type
  const getPrerequisites = (type: string) => {
    switch (type) {
      case 'Hands-on Lab':
      case 'Hackathon':
        return [
          { text: 'Laptop with Google Chrome or Microsoft Edge installed (Mandatory)', icon: <Laptop size={14} /> },
          { text: 'Active Google / GitHub account for developer logins', icon: <CheckCircle2 size={14} /> },
          { text: 'Stable internet connection (WiFi provided at venue)', icon: <CheckCircle2 size={14} /> }
        ];
      case 'Workshop':
      case 'Live Lecture':
      default:
        return [
          { text: 'A notebook and pen for drafting prompting conceptual maps', icon: <FileText size={14} /> },
          { text: 'Pre-read the Module A slides on AI literacy', icon: <CheckCircle2 size={14} /> },
          { text: 'Bring your fully-charged laptop for interactive segments', icon: <Laptop size={14} /> }
        ];
    }
  };

  const getResources = (type: string) => {
    switch (type) {
      case 'Hands-on Lab':
        return [
          { name: 'Developer Cheat Sheet — Cursor / Bolt.new', type: 'PDF Document', size: '1.2 MB' },
          { name: 'Hands-on Exercise Template Notebook', type: 'Colab Notebook', size: 'External Link' }
        ];
      case 'Prompt Engineering Masterclass':
      case 'Live Lecture':
        return [
          { name: 'System Prompt Crafting Cheat Sheet', type: 'PDF Document', size: '840 KB' },
          { name: 'Introductory Slides: LLM Foundation', type: 'Powerpoint', size: '3.4 MB' }
        ];
      default:
        return [
          { name: 'General AI Learning Companion Guide', type: 'PDF Document', size: '2.5 MB' },
          { name: 'Centre for Innovation and Incubation Hub Agenda', type: 'PDF Document', size: '640 KB' }
        ];
    }
  };

  return (
    <div className="page-content animate-fadeIn flex flex-col gap-6 select-none text-[var(--text-primary)]">
      {/* Back navigation */}
      <div>
        <button
          onClick={() => navigate('/sessions')}
          className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors bg-transparent border-none cursor-pointer p-0"
        >
          <ArrowLeft size={14} />
          Back to Sessions
        </button>
      </div>

      {/* Hero header card */}
      <div 
        className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%)', color: '#FFFFFF' }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="flex-1 flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            {isLive && (
              <span className="badge font-bold text-[9px] px-2 py-0.5 rounded border-white/20 bg-red-600 text-white uppercase tracking-wider animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                Live Now
              </span>
            )}
            <span className="badge font-bold text-[9px] px-2 py-0.5 rounded border-white/20 bg-white/15 text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="inline-block">{TYPE_ICONS[session.type]}</span>
              {session.type}
            </span>
            {session.yearLevel && (
              <span className="badge font-bold text-[9px] px-2 py-0.5 rounded border-white/20 bg-white/15 text-white uppercase tracking-wider">
                Year {session.yearLevel} Level
              </span>
            )}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-0 mt-3 max-w-3xl leading-snug" style={{ margin: 0 }}>
            {session.title}
          </h2>
          
          <p className="text-xs md:text-sm text-white/90 font-medium leading-relaxed max-w-2xl mt-2">
            {session.description || 'Join this live interaction hosted by the Centre for Innovation and Incubation to master cutting edge skills.'}
          </p>

          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10 flex-wrap">
            <div className="text-xs text-white/90">
              Host Trainer: <strong className="text-white">{session.facultyName}</strong>
            </div>
            <div className="hidden sm:block text-white/30">|</div>
            <div className="text-xs text-white/90 font-semibold flex items-center gap-1">
              🏢 Centre for Innovation and Incubation
            </div>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left/Middle: Details, Prerequisites, Resources */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Overview & Metadata Card */}
          <div className="card p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-6">
            <h3 className="text-sm font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>Session Details & Schedule</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Date & Day', val: format(parseISO(session.scheduledAt), 'EEEE, dd MMMM yyyy'), icon: <Calendar className="text-[var(--brand)]" size={16} /> },
                { label: 'Scheduled Time', val: `${format(parseISO(session.scheduledAt), 'hh:mm a')} (IST)`, icon: <Clock className="text-[var(--brand)]" size={16} /> },
                { label: 'Duration', val: `${session.durationMin} Minutes`, icon: <Clock className="text-[var(--brand)]" size={16} /> },
                { label: 'Assigned Stream', val: session.degreeIds.includes('all') ? 'All Enrolled Degrees' : 'Specific Tech Batches', icon: <UserCheck className="text-[var(--brand)]" size={16} /> }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[var(--bg-card-2)] border border-[var(--border-muted)] flex items-start gap-3">
                  <div className="p-2 rounded bg-[var(--brand-sub)] text-[var(--brand)] mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold tracking-wider text-[var(--text-muted)]">{item.label}</div>
                    <div className="text-xs font-bold text-[var(--text-primary)] mt-1">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider my-1" />

            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold text-[var(--text-primary)]">About this Session</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                This session has been systematically structured under the supervision of <strong>{session.facultyName}</strong> to deliver high-impact practical understanding. In this session, we will cover key conceptual structures, live demonstrations, interactive peer programming exercises, and resolve domain-specific queries. Deployed feedback checklists will be verified at the end of the lab.
              </p>
            </div>
          </div>

          {/* Prerequisites / Requirements */}
          <div className="card p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>Preparation & Prerequisites</h3>
            <div className="flex flex-col gap-3">
              {getPrerequisites(session.type).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded bg-[var(--bg-card-2)] border border-[var(--border-muted)]">
                  <span className="text-[var(--brand)] mt-0.5">{item.icon}</span>
                  <span className="text-xs text-[var(--text-secondary)] font-medium leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resources & Attachments */}
          <div className="card p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>Reference Resources & Attachments</h3>
            <div className="flex flex-col gap-2.5">
              {getResources(session.type).map((res, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[var(--bg-card-2)] border border-[var(--border-muted)] flex items-center justify-between hover:border-[var(--brand-border)] transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-[var(--brand)]" />
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">{res.name}</div>
                      <div className="text-xs text-[var(--text-muted)] mt-0.5">{res.type} · {res.size}</div>
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm text-xs flex items-center gap-1" style={{ padding: '4px 10px' }}>
                    <ExternalLink size={10} /> Access
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action and Enrollment */}
        <div className="flex flex-col gap-6">
          {/* Action Card */}
          <div className="card p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-5">
            <div className="text-center">
              <span className={`badge ${TYPE_COLOR[session.type] || 'badge-indigo'} uppercase font-bold text-[9px] px-2 py-0.5 rounded`}>
                Session Attendance
              </span>
              <h4 className="text-base font-bold text-[var(--text-primary)] mt-3 leading-snug">Registration Status</h4>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1.5">
                Attendance is sync-monitored directly via your student portal credentials.
              </p>
            </div>

            <div className="divider my-1" />

            {/* Attendance enrollment bar */}
            {session.maxParticipants && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[var(--text-secondary)] flex items-center gap-1.5">
                    <Users size={12} /> Seats Booked
                  </span>
                  <span className="font-bold text-[var(--text-primary)]">
                    {session.enrolledCount}/{session.maxParticipants} ({enrollment}%)
                  </span>
                </div>
                <div className="progress-bar w-full" style={{ height: 6 }}>
                  <div className="progress-fill" style={{ width: `${enrollment}%` }} />
                </div>
                <span className="text-xs text-[var(--text-muted)] text-center mt-1 leading-relaxed">
                  Only registered students are eligible for attending this lab session.
                </span>
              </div>
            )}

            <div className="flex flex-col gap-3 mt-2">
              {session.meetLink ? (
                <a
                  href={session.meetLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`btn ${isLive ? 'btn-danger' : 'btn-primary'} w-full gap-2 py-2.5 justify-center font-bold text-xs`}
                >
                  {isLive ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      Join Live Meeting Room
                    </>
                  ) : (
                    <>
                      <ExternalLink size={14} />
                      Join Google Meet Room
                    </>
                  )}
                </a>
              ) : (
                <button className="btn btn-secondary w-full gap-2 py-2.5 justify-center font-bold text-xs">
                  <Users size={14} />
                  Register Attendance Seat
                </button>
              )}
              
              <div className="flex items-center gap-2 p-3.5 rounded bg-[var(--brand-sub)] border border-[var(--brand-border)] text-[var(--brand)] mt-2">
                <UserCheck size={14} className="flex-shrink-0 mt-0.5" />
                <div className="text-xs font-semibold leading-relaxed">
                  Verified Trainer Attendance Badge will be instantly issued inside <strong>My Certificates</strong> upon completing this lab.
                </div>
              </div>
            </div>
          </div>

          {/* Incubation Details banner */}
          <div className="card p-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl flex flex-col gap-3">
            <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">CII Incubation Network</div>
            <div className="text-xs font-bold text-[var(--text-primary)]">Need Technical Support?</div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              If you experience any issues joining the session, synchronizing your portal token, or launching required AI playgrounds, contact startup support.
            </p>
            <div className="text-xs font-semibold text-[var(--text-brand)] mt-1.5 flex flex-col gap-1">
              <span>📧 rcasinnovationstartupcell@rathinam.in</span>
              <span>📞 +91 7299408979</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
