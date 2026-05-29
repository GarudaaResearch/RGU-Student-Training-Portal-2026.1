// ============================================================
// Certificates Page (Student) — Microsoft Learn / Fluent Design
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import type { Student } from '../../types';
import {
  Award, Download, Share2, Eye, CheckCircle, Lock,
  Shield, Sparkles, Calendar
} from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuedAt: string;
  credentialId: string;
  type: 'module' | 'program' | 'participation';
  skills: string[];
  color: string;
  icon: string;
  locked?: boolean;
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'cert01',
    title: 'AI Literacy Foundation',
    issuer: 'Centre for Innovation & Incubation, RGU',
    issuedAt: '2026-05-10',
    credentialId: 'CII-2026-AI-LIT-001-S001',
    type: 'module',
    skills: ['AI Fundamentals', 'Prompt Basics', 'AI Ethics', 'Tool Awareness'],
    color: 'var(--brand)',
    icon: '🤖',
  },
  {
    id: 'cert02',
    title: 'Prompt Engineering Mastery',
    issuer: 'Centre for Innovation & Incubation, RGU',
    issuedAt: '2026-05-22',
    credentialId: 'CII-2026-PROMPT-001-S001',
    type: 'module',
    skills: ['Zero-shot Prompting', 'Chain-of-Thought', 'Prompt Chaining', 'LLM APIs'],
    color: 'var(--purple)',
    icon: '✨',
  },
  {
    id: 'cert03',
    title: 'AI Hackathon 2026 — Participant',
    issuer: 'Centre for Innovation & Incubation, RGU',
    issuedAt: '2026-06-01',
    credentialId: 'CII-2026-HACK-001-S001',
    type: 'participation',
    skills: ['Team Collaboration', 'Rapid Prototyping', 'AI Product Thinking'],
    color: 'var(--amber)',
    icon: '🏆',
  },
  {
    id: 'cert04',
    title: 'Vibe Coding with AI',
    issuer: 'Centre for Innovation & Incubation, RGU',
    issuedAt: '',
    credentialId: '',
    type: 'module',
    skills: ['Bolt.new', 'Lovable', 'v0 by Vercel', 'Full-stack AI Apps'],
    color: 'var(--teal)',
    icon: '💻',
    locked: true,
  },
  {
    id: 'cert05',
    title: 'CII AI Training Program 2026',
    issuer: 'Centre for Innovation & Incubation, RGU',
    issuedAt: '',
    credentialId: '',
    type: 'program',
    skills: ['AI Literacy', 'Prompt Engineering', 'Vibe Coding', 'AI Tools', 'Industry Applications'],
    color: 'var(--success)',
    icon: '🎓',
    locked: true,
  },
];

const TYPE_LABEL: Record<string, string> = {
  module: 'Module Certificate',
  program: 'Program Completion',
  participation: 'Participation',
};

const TYPE_BADGE: Record<string, string> = {
  module: 'badge-indigo',
  program: 'badge-green',
  participation: 'badge-amber',
};

export default function CertificatesPage() {
  const { user } = useAuthStore();
  const student = user as Student;
  const [selected, setSelected] = useState<Certificate | null>(null);

  const earned = CERTIFICATES.filter(c => !c.locked);
  const locked = CERTIFICATES.filter(c => c.locked);

  return (
    <div className="page-content animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>
            My Certificates
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {earned.length} earned · {locked.length} locked
          </p>
        </div>
        <div className="md:ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-selected)] border border-[var(--brand-border)]">
            <Shield size={13} className="text-[var(--brand)]" />
            <span className="text-xs font-semibold text-[var(--brand)]">Blockchain Verified</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Earned', value: earned.length, icon: <Award size={16} />, color: 'var(--success)' },
          { label: 'Locked', value: locked.length, icon: <Lock size={16} />, color: 'var(--text-muted)' },
          { label: 'Skills Gained', value: earned.reduce((a, c) => a + c.skills.length, 0), icon: <Sparkles size={16} />, color: 'var(--brand)' },
        ].map(stat => (
          <div key={stat.label} className="card p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: `rgba(71, 158, 245, 0.08)`, color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <div className="text-lg font-bold text-[var(--text-primary)]">
                {stat.value}
              </div>
              <div className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Earned certificates */}
      <div className="mb-8">
        <h3 className="text-sm font-bold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
          <CheckCircle size={15} className="text-[var(--success)]" /> Earned Certificates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {earned.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} onView={() => setSelected(cert)} />
          ))}
        </div>
      </div>

      {/* Locked certificates */}
      <div>
        <h3 className="text-sm font-bold flex items-center gap-2 mb-4 text-[var(--text-secondary)]">
          <Lock size={15} className="text-[var(--text-muted)]" /> Upcoming Certificates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {locked.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} onView={() => {}} locked />
          ))}
        </div>
      </div>

      {/* Certificate modal */}
      {selected && (
        <CertificateModal cert={selected} student={student} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function CertCard({ cert, index, onView, locked = false }: {
  cert: Certificate; index: number; onView: () => void; locked?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="card group overflow-hidden"
      style={{ opacity: locked ? 0.55 : 1 }}
    >
      {/* Certificate header */}
      <div
        className="relative p-5 pb-4"
        style={{
          background: locked
            ? 'var(--bg-card-2)'
            : 'linear-gradient(135deg, rgba(71, 158, 245, 0.12) 0%, rgba(71, 158, 245, 0.04) 100%)',
          borderBottom: '1px solid var(--border-muted)',
        }}
      >
        {/* RGU watermark text */}
        <div className="absolute top-2.5 right-3 text-[9px] font-bold opacity-10 uppercase tracking-widest"
          style={{ color: 'var(--brand)' }}>RGU · CII</div>

        <div className="flex items-start justify-between mb-3">
          <div className="text-3xl">{cert.icon}</div>
          <div className="flex flex-col items-end gap-1">
            <span className={`badge ${TYPE_BADGE[cert.type]}`} style={{ fontSize: 9 }}>
              {TYPE_LABEL[cert.type]}
            </span>
            {locked
              ? <span className="badge badge-red" style={{ fontSize: 9 }}><Lock size={8} /> Locked</span>
              : <span className="badge badge-green" style={{ fontSize: 9 }}><CheckCircle size={8} /> Earned</span>
            }
          </div>
        </div>

        <div className="text-sm font-bold leading-snug mb-1 text-[var(--text-primary)]">
          {cert.title}
        </div>
        <div className="text-xs text-[var(--text-secondary)]">{cert.issuer}</div>

        {!locked && cert.issuedAt && (
          <div className="flex items-center gap-1 mt-2 text-[10px] text-[var(--text-secondary)]">
            <Calendar size={10} />
            Issued {new Date(cert.issuedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="px-5 py-3 bg-[var(--bg-card)]">
        <div className="text-[10px] font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wide">Skills Validated</div>
        <div className="flex flex-wrap gap-1">
          {cert.skills.map(skill => (
            <span key={skill} className="badge badge-indigo" style={{ fontSize: 9 }}>{skill}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 py-3 flex items-center gap-2 border-t border-[var(--border-muted)] bg-[var(--bg-card-2)]">
        {locked ? (
          <span className="text-[10px] text-[var(--text-muted)] font-medium">Complete module to unlock</span>
        ) : (
          <>
            <button
              onClick={onView}
              className="btn btn-primary btn-sm gap-1.5 flex-1"
              style={{ fontSize: 11, padding: '5px' }}
            >
              <Eye size={12} /> View
            </button>
            <button className="btn btn-secondary btn-sm" style={{ padding: '6px', fontSize: 11 }}>
              <Download size={12} />
            </button>
            <button className="btn btn-secondary btn-sm" style={{ padding: '6px', fontSize: 11 }}>
              <Share2 size={12} />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function CertificateModal({ cert, student, onClose }: {
  cert: Certificate; student: Student; onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--bg-overlay)] backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-2xl rounded-lg overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Certificate design */}
        <div className="p-8 text-center relative"
          style={{ background: `linear-gradient(135deg, rgba(71, 158, 245, 0.08), rgba(20,22,36,0.1))` }}>
          {/* Decorative border */}
          <div className="absolute inset-3 rounded-lg pointer-events-none border border-[var(--border-brand)]" />

          <div className="text-4xl mb-3">{cert.icon}</div>
          <div className="text-[10px] font-bold mb-1 tracking-widest text-[var(--brand)]">
            CERTIFICATE OF COMPLETION
          </div>
          <div className="text-[10px] mb-4 text-[var(--text-secondary)] uppercase tracking-wide">
            Centre for Innovation and Incubation · Rajiv Gandhi University
          </div>

          <div className="text-xs mb-1 text-[var(--text-secondary)]">This certifies that</div>
          <div className="text-xl font-bold mb-1 text-[var(--text-primary)]">
            {student?.name || 'Student'}
          </div>
          <div className="text-[10px] mb-4 text-[var(--text-secondary)] opacity-80">
            {student?.rollNo} · {student?.degreeName} · {student?.batch}
          </div>

          <div className="text-xs mb-1 text-[var(--text-secondary)]">has successfully completed</div>
          <div className="text-lg font-bold mb-4 text-[var(--brand)]">
            {cert.title}
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 mb-6">
            {cert.skills.map(skill => (
              <span key={skill} className="badge badge-indigo" style={{ fontSize: 9 }}>{skill}</span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 text-[10px] text-[var(--text-secondary)]">
            <div className="text-center">
              <div className="font-semibold text-[var(--text-primary)]">
                {new Date(cert.issuedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
              <div className="mt-0.5 opacity-80">Date of Issue</div>
            </div>
            <div className="w-px h-8 bg-[var(--border)]" />
            <div className="text-center">
              <div className="font-semibold text-[var(--text-primary)]">{cert.credentialId}</div>
              <div className="mt-0.5 opacity-80">Credential ID</div>
            </div>
          </div>

          {/* Director signature */}
          <div className="mt-6 pt-4 flex justify-center gap-12 border-t border-[var(--border-muted)]">
            <div className="text-center">
              <div className="text-xs font-bold text-[var(--text-primary)]">Prof. R. Anjit Raja</div>
              <div className="text-[10px] text-[var(--text-secondary)] opacity-80">Director, CII · RGU</div>
            </div>
          </div>
        </div>

        {/* Modal actions */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-[var(--border-muted)] bg-[var(--bg-card-2)]">
          <button className="btn btn-primary gap-2 flex-1 text-xs" style={{ padding: '8px' }}><Download size={13} /> Download PDF</button>
          <button className="btn btn-secondary gap-2 text-xs" style={{ padding: '8px' }}><Share2 size={13} /> Share</button>
          <button className="btn btn-ghost text-xs" onClick={onClose}>Close</button>
        </div>
      </motion.div>
    </div>
  );
}
