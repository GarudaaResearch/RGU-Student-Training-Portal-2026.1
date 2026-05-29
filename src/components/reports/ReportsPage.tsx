// ============================================================
// Reports Page (Faculty / Admin) — Microsoft Learn / Fluent
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { MOCK_MODULES, MOCK_SESSIONS, LEADERBOARD } from '../../data/mockData';
import {
  Users, BookOpen, Calendar, Download, TrendingUp,
  Activity, Target, Flame, Clock, Zap
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid
} from 'recharts';

// ── Mock analytics data ─────────────────────────────────────
const enrollmentTrend = [
  { week: 'Wk 1', students: 210, sessions: 2 },
  { week: 'Wk 2', students: 380, sessions: 3 },
  { week: 'Wk 3', students: 520, sessions: 4 },
  { week: 'Wk 4', students: 674, sessions: 5 },
];

const moduleCompletion = MOCK_MODULES.map(m => ({
  name: m.title.replace('Module ', '').split(':')[0],
  completion: m.completionRate || 0,
  lessons: m.totalLessons,
}));

const degreeDistribution = [
  { name: 'BSC CSAI', value: 142, color: 'var(--brand)' },
  { name: 'BSC AIDS PRO', value: 98, color: 'var(--purple)' },
  { name: 'BCA DevOps', value: 87, color: 'var(--teal)' },
  { name: 'MSC DSBA', value: 76, color: 'var(--amber)' },
  { name: 'Others', value: 271, color: 'var(--text-muted)' },
];

const activityByDay = [
  { day: 'Mon', active: 312, sessions: 45 },
  { day: 'Tue', active: 428, sessions: 67 },
  { day: 'Wed', active: 389, sessions: 52 },
  { day: 'Thu', active: 510, sessions: 89 },
  { day: 'Fri', active: 445, sessions: 71 },
  { day: 'Sat', active: 290, sessions: 38 },
  { day: 'Sun', active: 167, sessions: 22 },
];

const TOOLTIP_STYLE = {
  contentStyle: { background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-sm)', fontSize: 11 },
  labelStyle: { color: 'var(--text-secondary)' },
  itemStyle: { color: 'var(--brand)' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.35 } }),
};

export default function ReportsPage() {
  const { role } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'modules' | 'sessions'>('overview');
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('month');

  const stats = [
    { label: 'Total Students', value: '674', sub: 'Enrolled across 46 programs', icon: <Users size={16} />, color: 'var(--brand)' },
    { label: 'Modules Published', value: MOCK_MODULES.length.toString(), sub: `${MOCK_MODULES.reduce((a,m) => a+m.totalLessons,0)} lessons total`, icon: <BookOpen size={16} />, color: 'var(--purple)' },
    { label: 'Sessions Conducted', value: MOCK_SESSIONS.length.toString(), sub: '5 upcoming this week', icon: <Calendar size={16} />, color: 'var(--teal)' },
    { label: 'Avg Completion', value: `${Math.round(MOCK_MODULES.reduce((a,m) => a+(m.completionRate||0),0)/MOCK_MODULES.length)}%`, sub: 'Across all modules', icon: <Target size={16} />, color: 'var(--success)' },
    { label: 'Avg Streak', value: '9.4 days', sub: 'Active learners', icon: <Flame size={16} />, color: 'var(--error)' },
    { label: 'Study Hours', value: '2,840h', sub: 'Collective this month', icon: <Clock size={16} />, color: 'var(--amber)' },
  ];

  return (
    <div className="page-content animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>
            Analytics & Reports
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {role === 'admin' ? 'Platform-wide analytics' : 'Your assigned cohorts'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:ml-auto w-full md:w-auto">
          {/* Period selector */}
          <div className="tab-list w-full sm:w-auto justify-between" style={{ padding: 2 }}>
            {[['week','This Week'],['month','This Month'],['all','All Time']].map(([v,l]) => (
              <button key={v} onClick={() => setPeriod(v as any)} className="tab-trigger"
                data-state={period === v ? 'active' : 'inactive'}
                style={{ fontSize: 11, padding: '5px 12px' }}>{l}</button>
            ))}
          </div>
          <button className="btn btn-secondary gap-1.5 w-full sm:w-auto justify-center" style={{ fontSize: 12, padding: '6px 14px' }}>
            <Download size={13} /> Export
          </button>
        </div>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} custom={i} variants={fadeUp} initial="hidden" animate="show"
            className="card p-4">
            <div className="w-8 h-8 rounded-md flex items-center justify-center mb-3"
              style={{ background: `rgba(71, 158, 245, 0.08)`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="text-xl font-bold mb-0.5 text-[var(--text-primary)]">
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-[var(--text-secondary)]">{stat.label}</div>
            <div className="text-xs text-[var(--text-secondary)] mt-1 opacity-80">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Tab navigation */}
      <div className="tab-list mb-6" style={{ padding: 3 }}>
        {[
          ['overview', 'Overview', <Activity size={13} />],
          ['students', 'Students', <Users size={13} />],
          ['modules', 'Modules', <BookOpen size={13} />],
          ['sessions', 'Sessions', <Calendar size={13} />],
        ].map(([v, l, icon]) => (
          <button key={v as string} onClick={() => setActiveTab(v as any)} className="tab-trigger flex items-center gap-1.5"
            data-state={activeTab === v ? 'active' : 'inactive'} style={{ fontSize: 12, padding: '6px 14px' }}>
            {icon as React.ReactNode} {l as string}
          </button>
        ))}
      </div>

      {/* ── Overview Tab ─────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enrollment trend */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-[var(--text-primary)]">
                  <TrendingUp size={15} className="text-[var(--brand)]" /> Enrollment Trend
                </h3>
                <span className="text-xs text-[var(--text-secondary)]">Last 4 weeks</span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={enrollmentTrend} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="enrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="var(--brand)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="week" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip {...TOOLTIP_STYLE} formatter={(v: any) => [v, 'Students']} />
                  <Area type="monotone" dataKey="students" stroke="var(--brand)" fill="url(#enrGrad)" strokeWidth={1.5} dot={{ fill: 'var(--brand)', r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Daily activity */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-[var(--text-primary)]">
                  <Activity size={15} className="text-[var(--teal)]" /> Daily Active Users
                </h3>
                <span className="text-xs text-[var(--text-secondary)]">This week</span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={activityByDay} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="day" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip {...TOOLTIP_STYLE} formatter={(v: any) => [v, 'Active Students']} />
                  <Bar dataKey="active" fill="var(--teal)" radius={[3,3,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Degree distribution pie */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
                <Users size={15} className="text-[var(--purple)]" /> Students by Degree
              </h3>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="50%" height={160}>
                  <PieChart>
                    <Pie data={degreeDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                      paddingAngle={3} dataKey="value">
                      {degreeDistribution.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip {...TOOLTIP_STYLE} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 flex flex-col gap-2">
                  {degreeDistribution.map(d => (
                    <div key={d.name} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                      <span className="text-xs flex-1 text-[var(--text-secondary)]">{d.name}</span>
                      <span className="text-xs font-semibold text-[var(--text-primary)]">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Module completion bar */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
                <BookOpen size={15} className="text-[var(--success)]" /> Module Completion Rates
              </h3>
              <div className="flex flex-col gap-3">
                {moduleCompletion.map(m => (
                  <div key={m.name}>
                    <div className="flex justify-between text-xs mb-1.5 text-[var(--text-secondary)]">
                      <span>{m.name}</span>
                      <span className="font-semibold text-[var(--brand)]">{m.completion}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div className="progress-fill" initial={{ width: 0 }}
                        animate={{ width: `${m.completion}%` }} transition={{ duration: 0.6 }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* ── Students Tab ─────────────────────────────── */}
      {activeTab === 'students' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-[var(--border-muted)] bg-[var(--bg-card-2)]">
            <span className="text-sm font-semibold text-[var(--text-primary)]">Top Performers — Leaderboard</span>
            <span className="text-xs text-[var(--text-secondary)]">Showing top 10</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student</th>
                <th>Degree</th>
                <th>Points</th>
                <th>Streak</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD.map(entry => (
                <tr key={entry.rank}>
                  <td>
                    <span className="font-bold" style={{ color: entry.rank <= 3 ? 'var(--amber)' : 'var(--text-muted)' }}>
                      {entry.rank <= 3 ? entry.badge : `#${entry.rank}`}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar w-7 h-7 text-xs bg-[var(--bg-selected)] text-[var(--brand)] font-bold">
                        {entry.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                      </div>
                      <span className="font-semibold text-xs" style={{ color: entry.isCurrentUser ? 'var(--brand)' : 'var(--text-primary)' }}>
                        {entry.name} {entry.isCurrentUser && <span className="text-[var(--text-muted)] font-normal ml-1">(You)</span>}
                      </span>
                    </div>
                  </td>
                  <td className="text-[var(--text-secondary)]">{entry.degree}</td>
                  <td>
                    <span className="font-bold text-[var(--amber)]">
                      <Zap size={11} className="inline mr-1" />{entry.points.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className="text-[var(--error)]">🔥 {entry.streak}d</span>
                  </td>
                  <td>
                    <span className="badge badge-green" style={{ fontSize: 9 }}>Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* ── Modules Tab ──────────────────────────────── */}
      {activeTab === 'modules' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden">
          <div className="p-4 border-b border-[var(--border-muted)] bg-[var(--bg-card-2)]">
            <span className="text-sm font-semibold text-[var(--text-primary)]">Module Analytics</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Module</th>
                <th>Lessons</th>
                <th>Duration</th>
                <th>Completion</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_MODULES.map(m => (
                <tr key={m.id}>
                  <td>
                    <div className="font-semibold text-xs text-[var(--text-primary)]">{m.title}</div>
                    <div className="text-xs mt-0.5 text-[var(--text-secondary)]">Year {m.yearLevel}</div>
                  </td>
                  <td className="text-[var(--text-secondary)]">{m.totalLessons}</td>
                  <td className="text-[var(--text-secondary)]">{Math.round(m.totalDuration / 3600)}h</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar flex-1" style={{ width: 80 }}>
                        <div className="progress-fill" style={{ width: `${m.completionRate || 0}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-[var(--brand)]">{m.completionRate || 0}%</span>
                    </div>
                  </td>
                  <td>
                    {m.isPublished
                      ? <span className="badge badge-green" style={{ fontSize: 9 }}>Published</span>
                      : <span className="badge badge-amber" style={{ fontSize: 9 }}>Draft</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* ── Sessions Tab ─────────────────────────────── */}
      {activeTab === 'sessions' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden">
          <div className="p-4 border-b border-[var(--border-muted)] bg-[var(--bg-card-2)]">
            <span className="text-sm font-semibold text-[var(--text-primary)]">Session Attendance</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Session</th>
                <th>Type</th>
                <th>Faculty</th>
                <th>Date</th>
                <th>Enrolled</th>
                <th>Fill Rate</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SESSIONS.map(s => {
                const fillPct = s.maxParticipants ? Math.round(((s.enrolledCount || 0) / s.maxParticipants) * 100) : 0;
                return (
                  <tr key={s.id}>
                    <td>
                      <div className="font-semibold text-xs text-[var(--text-primary)]" style={{ maxWidth: 240 }}>{s.title}</div>
                    </td>
                    <td>
                      <span className="badge badge-indigo" style={{ fontSize: 9 }}>{s.type}</span>
                    </td>
                    <td className="text-[var(--text-secondary)]">{s.facultyName}</td>
                    <td className="text-[var(--text-secondary)]">
                      {new Date(s.scheduledAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="text-[var(--text-primary)]">
                      {s.enrolledCount}/{s.maxParticipants || '∞'}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar" style={{ width: 60 }}>
                          <div className="progress-fill" style={{ width: `${fillPct}%` }} />
                        </div>
                        <span className="text-xs text-[var(--brand)]">{fillPct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
