// ============================================================
// Admin Dashboard Page — Microsoft Learn / Fluent Design
// ============================================================
import { motion } from 'framer-motion';
import { MOCK_MODULES, LEADERBOARD } from '../../data/mockData';
import { DEGREES } from '../../data/degrees';
import {
  Users, BookOpen, Calendar, GraduationCap,
  Activity, TrendingUp, Shield, BarChart3,
  AlertCircle, CheckCircle
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const dailyActive = [
  {d:'May 20',n:120},{d:'May 21',n:145},{d:'May 22',n:132},
  {d:'May 23',n:98}, {d:'May 24',n:60}, {d:'May 25',n:55},
  {d:'May 26',n:178},{d:'May 27',n:210},
];

const streamPie = [
  { name: 'Tech-Core',     value: 180, color: 'var(--brand)' },
  { name: 'Tech-Adjacent', value: 94,  color: 'var(--purple)' },
  { name: 'Science',       value: 52,  color: 'var(--teal)' },
  { name: 'Commerce',      value: 30,  color: 'var(--amber)' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35 } }),
};

export default function AdminDashboard() {
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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--bg-selected)] border border-[var(--brand-border)]">
            <Shield size={20} className="text-[var(--brand)]" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]" style={{ margin: 0 }}>
              System Administration
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">CII AI Training Hub · Full access dashboard</p>
          </div>
        </div>
      </motion.div>

      {/* System stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Students',  value: '356',  icon: <GraduationCap size={16} />, color: 'var(--brand)', sub: '46 programs' },
          { label: 'Active Today',    value: '210',  icon: <Activity size={16} />,       color: 'var(--success)',  sub: 'Daily active users' },
          { label: 'Degrees Listed',  value: `${DEGREES.length}`, icon: <BookOpen size={16} />, color: 'var(--purple)', sub: '5 streams' },
          { label: 'Sessions Done',   value: '12',   icon: <Calendar size={16} />,       color: 'var(--amber)',  sub: 'This month' },
        ].map((stat, i) => (
          <motion.div key={stat.label} custom={i+1} variants={fadeUp} initial="hidden" animate="show"
            className="card p-4">
            <div className="w-8 h-8 rounded-md flex items-center justify-center mb-3"
              style={{ background: `rgba(71, 158, 245, 0.08)`, color: stat.color }}>{stat.icon}</div>
            <div className="text-xl font-bold mb-0.5 text-[var(--text-primary)]">{stat.value}</div>
            <div className="text-xs font-semibold text-[var(--text-secondary)]">{stat.label}</div>
            <div className="text-xs text-[var(--text-secondary)] mt-1 opacity-80">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* DAU chart */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-[var(--text-primary)]">
                <TrendingUp size={15} className="text-[var(--teal)]" /> Daily Active Users
              </h3>
              <span className="badge badge-green text-xs"><CheckCircle size={9}/> System Healthy</span>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={dailyActive} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="dauGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--teal)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--teal)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-sm)', fontSize: 11 }}
                  labelStyle={{ color: 'var(--text-secondary)' }} formatter={(v: any) => [v, 'Active users']} />
                <Area type="monotone" dataKey="n" stroke="var(--teal)" fill="url(#dauGrad)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* All modules */}
          <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
              <BarChart3 size={15} className="text-[var(--brand)]" /> All Modules Status
            </h3>
            <table className="data-table">
              <thead><tr><th>Module</th><th>Lessons</th><th>Completion</th><th>Year</th><th>Status</th></tr></thead>
              <tbody>
                {MOCK_MODULES.map(mod => (
                  <tr key={mod.id}>
                    <td><div className="text-xs font-semibold text-[var(--text-primary)]" style={{ maxWidth: 200 }}>{mod.title}</div></td>
                    <td className="text-[var(--text-secondary)]">{mod.totalLessons}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar" style={{ width: 60, height: 4 }}>
                          <div className="progress-fill" style={{ width: `${mod.completionRate||0}%` }} />
                        </div>
                        <span className="text-xs text-[var(--text-secondary)]">{mod.completionRate||0}%</span>
                      </div>
                    </td>
                    <td><span className="badge badge-indigo" style={{ fontSize: 9 }}>Y{mod.yearLevel}</span></td>
                    <td>
                      <span className={`badge ${mod.isPublished ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: 9 }}>
                        {mod.isPublished ? 'Live' : 'Draft'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Stream distribution */}
          <motion.div custom={7} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
              <Users size={15} className="text-[var(--purple)]" /> Students by Stream
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={streamPie} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                  paddingAngle={3} dataKey="value">
                  {streamPie.map(entry => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                 <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-sm)', fontSize: 11 }}
                  formatter={(v: any, n: any) => [v, n]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 mt-2">
              {streamPie.map(s => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-xs flex-1 text-[var(--text-secondary)]">{s.name}</span>
                  <span className="text-xs font-semibold text-[var(--text-primary)]">{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* System alerts */}
          <motion.div custom={8} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
              <AlertCircle size={15} className="text-[var(--error)]" /> System Alerts
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { msg: 'Hackathon registration: 18 slots left', type: 'amber' },
                { msg: '3 students flagged for low activity', type: 'red' },
                { msg: 'Module F deadline in 5 days', type: 'amber' },
                { msg: 'All systems operational', type: 'green' },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg border border-[var(--border-muted)] bg-[var(--bg-card-2)]">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    alert.type === 'red' ? 'bg-[var(--error)]' : alert.type === 'amber' ? 'bg-[var(--amber)]' : 'bg-[var(--success)]'
                  }`} />
                  <span className="text-xs text-[var(--text-secondary)]">{alert.msg}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top performers */}
          <motion.div custom={9} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
              <TrendingUp size={15} className="text-[var(--amber)]" /> Top Performers
            </h3>
            <div className="flex flex-col gap-2">
              {LEADERBOARD.slice(0,5).map(entry => (
                <div key={entry.rank} className="flex items-center gap-3 p-2 rounded-lg border border-[var(--border-muted)] bg-[var(--bg-card-2)]">
                  <span className="text-xs font-bold w-5 flex-shrink-0" style={{ color: entry.rank<=3?'var(--amber)':'var(--text-muted)' }}>
                    {entry.rank<=3?entry.badge:`#${entry.rank}`}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate text-[var(--text-primary)]">{entry.name}</div>
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
