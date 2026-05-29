// ============================================================
// Faculty Dashboard Page — Microsoft Learn / Fluent Design
// ============================================================
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { MOCK_MODULES, MOCK_SESSIONS, LEADERBOARD } from '../../data/mockData';
import type { Faculty } from '../../types';
import {
  Users, BookOpen, Calendar, BarChart3,
  ExternalLink, Plus, Activity, Target, CheckCircle, Clock
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts';

const completionData = MOCK_MODULES.map(m => ({
  name: `Mod ${m.orderNo}`,
  completion: m.completionRate || 0,
  lessons: m.totalLessons,
}));

const engagementData = [
  { week: 'W1', students: 42 }, { week: 'W2', students: 67 },
  { week: 'W3', students: 58 }, { week: 'W4', students: 89 },
  { week: 'W5', students: 104 }, { week: 'W6', students: 95 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35 } }),
};

export default function FacultyDashboard() {
  const { user } = useAuthStore();
  const faculty = user as Faculty;
  const upcomingSessions = MOCK_SESSIONS.filter(s => s.status === 'upcoming');

  return (
    <div className="page-content animate-fadeIn">
      {/* Welcome banner — Clean Microsoft Learn Pattern */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
        className="relative rounded-lg overflow-hidden mb-6 p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(71, 158, 245, 0.12) 0%, rgba(71, 158, 245, 0.04) 100%)',
          border: '1px solid var(--border-brand)'
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="text-xs font-semibold mb-2 badge badge-blue w-fit">Faculty Portal</div>
            <h2 className="text-2xl font-bold mb-1 tracking-tight text-[var(--text-primary)]">
              Welcome, {faculty?.name?.split(' ').slice(0, 2).join(' ')} 🎓
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {faculty?.designation} · {faculty?.department}
            </p>
          </div>
          <div className="flex gap-6 flex-shrink-0 items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--brand)]">8</div>
              <div className="text-xs text-[var(--text-secondary)]">Modules</div>
            </div>
            <div className="w-px h-8 bg-[var(--border)]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--teal)]">356</div>
              <div className="text-xs text-[var(--text-secondary)]">Students</div>
            </div>
            <div className="w-px h-8 bg-[var(--border)]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--success)]">{upcomingSessions.length}</div>
              <div className="text-xs text-[var(--text-secondary)]">Sessions</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Students',     value: '356', icon: <Users size={16} />,      color: 'var(--brand)', sub: 'Across 5 degrees' },
          { label: 'Published Modules',  value: '8',   icon: <BookOpen size={16} />,   color: 'var(--purple)', sub: '0 drafts pending' },
          { label: 'Sessions Scheduled', value: `${upcomingSessions.length}`, icon: <Calendar size={16} />, color: 'var(--teal)', sub: 'Next 2 weeks' },
          { label: 'Avg Completion',     value: `${Math.round(MOCK_MODULES.reduce((a,m)=>a+(m.completionRate||0),0)/MOCK_MODULES.length)}%`, icon: <Target size={16} />, color: 'var(--success)', sub: 'All modules avg' },
        ].map((stat, i) => (
          <motion.div key={stat.label} custom={i+1} variants={fadeUp} initial="hidden" animate="show"
            className="card p-4">
            <div className="w-8 h-8 rounded-md flex items-center justify-center mb-3"
              style={{ background: `rgba(71, 158, 245, 0.08)`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="text-xl font-bold mb-0.5 text-[var(--text-primary)]">{stat.value}</div>
            <div className="text-xs font-semibold text-[var(--text-secondary)]">{stat.label}</div>
            <div className="text-xs text-[var(--text-secondary)] mt-1 opacity-80">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts + content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Module completion chart */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-[var(--text-primary)]">
                <BarChart3 size={15} className="text-[var(--brand)]" /> Module Completion Rates
              </h3>
              <span className="text-xs text-[var(--text-secondary)]">All students</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={completionData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0,100]} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-sm)', fontSize: 11 }}
                  labelStyle={{ color: 'var(--text-secondary)' }}
                  formatter={(v: any) => [`${v}%`, 'Completion']}
                />
                <Bar dataKey="completion" fill="var(--brand)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Engagement trend */}
          <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-[var(--text-primary)]">
                <Activity size={15} className="text-[var(--teal)]" /> Student Engagement Trend
              </h3>
              <span className="text-xs text-[var(--text-secondary)]">Weekly active learners</span>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={engagementData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="week" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-sm)', fontSize: 11 }}
                  labelStyle={{ color: 'var(--text-secondary)' }}
                  formatter={(v: any) => [v, 'Active students']}
                />
                <Line type="monotone" dataKey="students" stroke="var(--teal)" strokeWidth={2} dot={{ fill: 'var(--teal)', r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Module management */}
          <motion.div custom={7} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-[var(--text-primary)]">
                <BookOpen size={15} className="text-[var(--brand)]" /> Modules Overview
              </h3>
              <button className="btn btn-primary btn-sm gap-1">
                <Plus size={12} /> New Module
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>Lessons</th>
                    <th>Completion</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_MODULES.map(mod => (
                    <tr key={mod.id}>
                      <td>
                        <div className="font-semibold text-[var(--text-primary)] text-xs">{mod.title.split(':')[0]}</div>
                        <div className="text-xs text-[var(--text-secondary)] mt-0.5">{mod.tags.slice(0,2).join(' · ')}</div>
                      </td>
                      <td className="text-[var(--text-secondary)]">{mod.totalLessons}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="progress-bar flex-1" style={{ minWidth: 60, height: 4 }}>
                            <div className="progress-fill" style={{ width: `${mod.completionRate||0}%` }} />
                          </div>
                          <span className="text-xs text-[var(--text-secondary)]">{mod.completionRate||0}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${mod.isPublished ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: 9 }}>
                          {mod.isPublished ? <><CheckCircle size={9}/> Live</> : <><Clock size={9}/> Draft</>}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Upcoming sessions */}
          <motion.div custom={8} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-[var(--text-primary)]">
                <Calendar size={15} className="text-[var(--teal)]" /> Your Sessions
              </h3>
              <button className="btn btn-secondary btn-sm gap-1"><Plus size={12} /> Schedule</button>
            </div>
            <div className="flex flex-col gap-3">
              {upcomingSessions.map(ses => (
                <div key={ses.id} className="p-3 rounded-lg border border-[var(--border-muted)] bg-[var(--bg-card-2)]">
                  <div className="text-xs font-semibold mb-1 text-[var(--text-primary)]">{ses.title}</div>
                  <div className="text-xs mb-2 text-[var(--text-secondary)]">
                    {format(parseISO(ses.scheduledAt), 'dd MMM · hh:mm a')} · {ses.durationMin}m
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="badge badge-cyan" style={{ fontSize: 9 }}>{ses.type}</span>
                    <span className="text-xs text-[var(--text-secondary)]">
                      {ses.enrolledCount}/{ses.maxParticipants || '∞'} enrolled
                    </span>
                  </div>
                  {ses.meetLink && (
                    <a href={ses.meetLink} target="_blank" rel="noreferrer"
                      className="btn btn-primary btn-sm w-full mt-2 text-xs" style={{ padding: '4px' }}>
                      <ExternalLink size={10} /> Start Session
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top performers */}
          <motion.div custom={9} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
              <Activity size={15} className="text-[var(--amber)]" /> Top Performers
            </h3>
            <div className="flex flex-col gap-2">
              {LEADERBOARD.slice(0, 5).map(entry => (
                <div key={entry.rank} className="flex items-center gap-3 p-2 rounded-lg border border-[var(--border-muted)] bg-[var(--bg-card-2)]">
                  <span className="text-xs font-bold w-6 text-center flex-shrink-0"
                    style={{ color: entry.rank <= 3 ? 'var(--amber)' : 'var(--text-muted)' }}>
                    {entry.rank <= 3 ? entry.badge : `#${entry.rank}`}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate text-[var(--text-primary)]">{entry.name}</div>
                    <div className="text-xs text-[var(--text-secondary)] opacity-80">{entry.degree}</div>
                  </div>
                  <div className="text-xs font-bold flex-shrink-0 text-[var(--amber)]">
                    {entry.points.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
