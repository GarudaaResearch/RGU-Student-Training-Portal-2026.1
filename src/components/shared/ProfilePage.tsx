// ============================================================
// Profile Page (Student / Faculty / Admin) — Microsoft Learn
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import type { Student, Faculty } from '../../types';
import {
  User, Mail, Phone, BookOpen, GraduationCap, Building2,
  Flame, Trophy, Zap, Shield, CheckCircle, Edit3, Save, X,
  Award, Calendar, Star, BadgeCheck
} from 'lucide-react';
import { MOCK_BADGES } from '../../data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.35 } }),
};

export default function ProfilePage() {
  const { user, role } = useAuthStore();
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState('Passionate about AI and building the future of technology. Currently learning Prompt Engineering and Vibe Coding. 🚀');

  const getName = () => {
    if (!user) return 'User';
    return 'name' in user ? (user as Student | Faculty).name : (user as any).username;
  };

  const getInitials = () => {
    const name = getName();
    return name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const student = role === 'student' ? user as Student : null;
  const faculty = role === 'faculty' ? user as Faculty : null;

  return (
    <div className="page-content animate-fadeIn" style={{ maxWidth: 900 }}>
      <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)]" style={{ margin: 0 }}>
        My Profile
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Left — avatar card */}
        <div className="flex flex-col gap-5">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
            className="card p-6 flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-4">
              <div
                className="avatar w-20 h-20 text-3xl font-bold rounded-lg border border-[var(--brand-border)] bg-[var(--bg-selected)] text-[var(--brand)] flex items-center justify-center"
              >
                {getInitials()}
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[var(--bg-card)] bg-[var(--success)]" />
            </div>

            <div className="text-base font-bold mb-0.5 text-[var(--text-primary)]">
              {getName()}
            </div>
            <div className="text-xs text-[var(--text-secondary)] mb-3">
              {role === 'student' ? student?.rollNo : role === 'faculty' ? faculty?.empId : 'Administrator'}
            </div>

            {/* Role badge */}
            <div className="flex items-center gap-1.5 mb-4">
              {role === 'student' && <span className="badge badge-indigo"><GraduationCap size={11} /> Student</span>}
              {role === 'faculty' && <span className="badge badge-violet"><Star size={11} /> Faculty</span>}
              {role === 'admin' && <span className="badge badge-cyan"><Shield size={11} /> Admin</span>}
              <span className="badge badge-green"><BadgeCheck size={11} /> Verified</span>
            </div>

            {/* Bio */}
            {!editMode ? (
              <p className="text-xs leading-relaxed mb-4 text-[var(--text-secondary)]">{bio}</p>
            ) : (
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="input text-xs mb-4 resize-none text-center"
                style={{ minHeight: 80 }}
              />
            )}

            <div className="flex gap-2 w-full">
              {!editMode ? (
                <button onClick={() => setEditMode(true)} className="btn btn-secondary btn-sm gap-1.5 flex-1" style={{ fontSize: 11 }}>
                  <Edit3 size={12} /> Edit Profile
                </button>
              ) : (
                <>
                  <button onClick={() => setEditMode(false)} className="btn btn-primary btn-sm gap-1.5 flex-1" style={{ fontSize: 11 }}>
                    <Save size={12} /> Save
                  </button>
                  <button onClick={() => setEditMode(false)} className="btn btn-ghost btn-sm" style={{ fontSize: 11, padding: '5px' }}>
                    <X size={12} />
                  </button>
                </>
              )}
            </div>
          </motion.div>

          {/* Student stats */}
          {student && (
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-[var(--text-primary)]">
                <Trophy size={14} className="text-[var(--amber)]" /> My Stats
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Points', value: student.points?.toLocaleString() || '0', icon: <Zap size={13} />, color: 'var(--amber)' },
                  { label: 'Rank', value: `#${student.rank}`, icon: <Trophy size={13} />, color: 'var(--brand)' },
                  { label: 'Streak', value: `${student.streak} days`, icon: <Flame size={13} />, color: 'var(--error)' },
                  { label: 'Badges', value: `${student.badges?.length || 0}`, icon: <Award size={13} />, color: 'var(--success)' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                      <span style={{ color: s.color }}>{s.icon}</span>
                      {s.label}
                    </div>
                    <span className="text-xs font-bold text-[var(--text-primary)]">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right — details */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Personal info */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-[var(--text-primary)]">
              <User size={14} className="text-[var(--brand)]" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', value: getName(), icon: <User size={13} /> },
                { label: 'Email', value: (user as any)?.email || '—', icon: <Mail size={13} /> },
                { label: 'Mobile', value: (user as any)?.mobile || '—', icon: <Phone size={13} /> },
                { label: 'Role', value: role?.charAt(0).toUpperCase()! + role!.slice(1), icon: <Shield size={13} /> },
                ...(student ? [
                  { label: 'Roll Number', value: student.rollNo, icon: <BookOpen size={13} /> },
                  { label: 'Degree', value: student.degreeName, icon: <GraduationCap size={13} /> },
                  { label: 'Batch', value: student.batch, icon: <Calendar size={13} /> },
                  { label: 'Year / Section', value: `Year ${student.year} · Section ${student.section}`, icon: <BookOpen size={13} /> },
                ] : []),
                ...(faculty ? [
                  { label: 'Employee ID', value: faculty.empId, icon: <BookOpen size={13} /> },
                  { label: 'Department', value: faculty.department, icon: <Building2 size={13} /> },
                  { label: 'Designation', value: faculty.designation, icon: <Star size={13} /> },
                ] : []),
              ].map(field => (
                <div key={field.label} className="flex flex-col gap-1">
                  <div className="text-xs font-semibold flex items-center gap-1.5 text-[var(--text-secondary)]">
                    <span className="text-[var(--text-muted)]">{field.icon}</span>
                    {field.label}
                  </div>
                  {editMode && ['Mobile'].includes(field.label) ? (
                    <input className="input text-sm" defaultValue={field.value} style={{ padding: '6px 12px' }} />
                  ) : (
                    <div className="text-xs font-semibold text-[var(--text-primary)] px-3 py-1.5 rounded-md border border-[var(--border-muted)] bg-[var(--bg-card-2)]">
                      {field.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Badges earned */}
          {student && (
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-[var(--text-primary)]">
                <Award size={14} className="text-[var(--purple)]" /> Badges Earned
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {MOCK_BADGES.map(badge => (
                  <div key={badge.id}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg text-center border border-[var(--border-muted)] bg-[var(--bg-card-2)]">
                    <span className="text-3xl">{badge.icon}</span>
                    <div className="text-xs font-bold text-[var(--text-primary)]">{badge.name}</div>
                    <div className="text-xs text-[var(--text-secondary)] opacity-85">{badge.earnedAt}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Account security */}
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-[var(--text-primary)]">
              <Shield size={14} className="text-[var(--teal)]" /> Account & Security
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Email Verified', ok: true },
                { label: 'Two-Factor Authentication', ok: false },
                { label: 'Profile Complete', ok: true },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-muted)] bg-[var(--bg-card-2)]">
                  <span className="text-xs font-semibold text-[var(--text-primary)]">{item.label}</span>
                  {item.ok
                    ? <span className="badge badge-green" style={{ fontSize: 9 }}><CheckCircle size={9} /> Enabled</span>
                    : <button className="btn btn-secondary btn-sm" style={{ fontSize: 10, padding: '4px 8px' }}>Enable</button>
                  }
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
