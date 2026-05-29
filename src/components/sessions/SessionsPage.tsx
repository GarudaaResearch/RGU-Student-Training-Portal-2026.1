// ============================================================
// Sessions Page — Microsoft Learn / Fluent Design
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_SESSIONS } from '../../data/mockData';
import type { Session } from '../../types';
import {
  Calendar, Clock, Users, ExternalLink, Video,
  Mic, Code2, Trophy, BookOpen, Search
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

const TYPE_ICONS: Record<string, React.ReactNode> = {
  'Live Lecture':       <Mic size={13} />,
  'Hands-on Lab':       <Code2 size={13} />,
  'Hackathon':          <Trophy size={13} />,
  'Guest Lecture':      <Video size={13} />,
  'Workshop':           <BookOpen size={13} />,
  'Assessment Session': <BookOpen size={13} />,
};

const TYPE_COLOR: Record<string, string> = {
  'Live Lecture':       'badge-indigo',
  'Hands-on Lab':       'badge-cyan',
  'Hackathon':          'badge-amber',
  'Guest Lecture':      'badge-violet',
  'Workshop':           'badge-green',
  'Assessment Session': 'badge-red',
};

export default function SessionsPage() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'upcoming' | 'all'>('upcoming');

  const filtered = MOCK_SESSIONS.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase()) ||
      s.facultyName.toLowerCase().includes(search.toLowerCase());
    if (tab === 'upcoming') return matchSearch && s.status === 'upcoming';
    return matchSearch;
  });

  return (
    <div className="page-content animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>
            Live Sessions
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {MOCK_SESSIONS.filter(s => s.status === 'upcoming').length} upcoming · {MOCK_SESSIONS.length} total
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:ml-auto w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]" />
            <input className="input text-sm w-full sm:w-52" style={{ paddingLeft: 32 }}
              placeholder="Search sessions..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="tab-list w-full sm:w-auto justify-between" style={{ padding: 2 }}>
            {[['upcoming','Upcoming'],['all','All Sessions']].map(([v, l]) => (
              <button key={v} onClick={() => setTab(v as any)} className="tab-trigger"
                data-state={tab === v ? 'active' : 'inactive'} style={{ fontSize: 11, padding: '5px 12px' }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Session cards */}
      <div className="flex flex-col gap-4">
        {filtered.map((ses, i) => (
          <SessionCard key={ses.id} session={ses} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--text-secondary)]">
          <Calendar size={36} className="mb-3 opacity-40 text-[var(--text-muted)]" />
          <div className="text-sm">No sessions found.</div>
        </div>
      )}
    </div>
  );
}

function SessionCard({ session: s, index }: { session: Session; index: number }) {
  const isLive = s.status === 'live';
  const enrollment = s.maxParticipants ? Math.round(((s.enrolledCount || 0) / s.maxParticipants) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="card p-5 flex flex-col md:flex-row gap-4"
      style={isLive ? { borderColor: 'var(--error-border)', boxShadow: '0 0 16px rgba(207,102,121,0.08)' } : {}}
    >
      {/* Date block — aligned with Fluent Theme */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-lg text-center"
        style={{
          background: isLive ? 'var(--error-bg)' : 'var(--bg-selected)',
          border: `1px solid ${isLive ? 'var(--error-border)' : 'var(--brand-border)'}`
        }}>
        <div className="text-xl font-bold" style={{ color: isLive ? 'var(--error)' : 'var(--brand)', lineHeight: 1 }}>
          {format(parseISO(s.scheduledAt), 'dd')}
        </div>
        <div className="text-xs font-semibold" style={{ color: isLive ? 'var(--error)' : 'var(--brand)' }}>
          {format(parseISO(s.scheduledAt), 'MMM')}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          {isLive && (
            <div className="flex items-center gap-1.5">
              <div className="live-pulse" />
              <span className="text-xs font-bold text-[var(--error)]">LIVE NOW</span>
            </div>
          )}
          <span className={`badge ${TYPE_COLOR[s.type] || 'badge-indigo'}`} style={{ fontSize: 9 }}>
            <span className="inline-block mr-1">{TYPE_ICONS[s.type]}</span>{s.type}
          </span>
          {s.yearLevel && (
            <span className="badge badge-indigo" style={{ fontSize: 9 }}>Year {s.yearLevel}</span>
          )}
        </div>

        <h3 className="text-sm font-bold mb-1 leading-snug text-[var(--text-primary)]">
          {s.title}
        </h3>
        {s.description && (
          <p className="text-xs mb-2 leading-relaxed text-[var(--text-secondary)]">{s.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-3 text-[10px] text-[var(--text-secondary)]">
          <span className="flex items-center gap-1"><Calendar size={11} /> {format(parseISO(s.scheduledAt), 'EEEE, dd MMM yyyy')}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {format(parseISO(s.scheduledAt), 'hh:mm a')} · {s.durationMin} min</span>
          <span className="flex items-center gap-1"><Video size={11} /> {s.facultyName}</span>
        </div>

        {/* Enrollment bar */}
        {s.maxParticipants && (
          <div className="mt-3 flex items-center gap-2">
            <Users size={11} className="text-[var(--text-muted)]" />
            <div className="progress-bar flex-1" style={{ height: 4 }}>
              <div className="progress-fill" style={{ width: `${enrollment}%` }} />
            </div>
            <span className="text-xs flex-shrink-0 text-[var(--text-secondary)]">
              {s.enrolledCount}/{s.maxParticipants}
            </span>
          </div>
        )}
      </div>

      {/* Action */}
      <div className="flex flex-col gap-2 justify-center flex-shrink-0">
        {s.meetLink ? (
          <a href={s.meetLink} target="_blank" rel="noreferrer"
            className={`btn ${isLive ? 'btn-danger' : 'btn-primary'} gap-1.5`}
            style={{ minWidth: 120, fontSize: 12, padding: '6px 12px' }}>
            {isLive ? <><div className="live-pulse bg-white" /> Join Live</> : <><ExternalLink size={12} /> Join Session</>}
          </a>
        ) : (
          <button className="btn btn-secondary gap-1.5" style={{ minWidth: 120, fontSize: 12, padding: '6px 12px' }}>
            <Users size={12} /> Register
          </button>
        )}
        <button className="btn btn-ghost btn-sm text-[10px]" style={{ padding: '2px' }}>
          View Details
        </button>
      </div>
    </motion.div>
  );
}
