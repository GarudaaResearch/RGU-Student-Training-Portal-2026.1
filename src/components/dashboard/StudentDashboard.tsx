// ============================================================
// Student Dashboard Page — Microsoft Learn / Fluent Design
// ============================================================
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import {
  MOCK_PROGRESS, MOCK_MODULES, MOCK_SESSIONS, MOCK_ANNOUNCEMENTS, LEADERBOARD
} from '../../data/mockData';
import type { Student } from '../../types';
import {
  Flame, Trophy, Zap, BookOpen, Clock, Calendar,
  TrendingUp, Bell, ChevronRight, Play, ExternalLink,
  Award
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const activityData = [
  { day: 'Mon', mins: 45 }, { day: 'Tue', mins: 90 }, { day: 'Wed', mins: 30 },
  { day: 'Thu', mins: 120 }, { day: 'Fri', mins: 60 }, { day: 'Sat', mins: 150 }, { day: 'Sun', mins: 80 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35 } }),
};

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const student = user as Student;
  const prog = MOCK_PROGRESS;
  const upcomingSessions = MOCK_SESSIONS.filter(s => s.status === 'upcoming').slice(0, 3);
  const recentModules = MOCK_MODULES.slice(0, 3);

  return (
    <div className="page-content animate-fadeIn">
      {/* Welcome banner — Clean Microsoft Learn Pattern */}
      <motion.div
        custom={0} variants={fadeUp} initial="hidden" animate="show"
        className="relative rounded-lg overflow-hidden mb-6 p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(71, 158, 245, 0.12) 0%, rgba(71, 158, 245, 0.04) 100%)',
          border: '1px solid var(--border-brand)'
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-indigo text-xs">
                <Flame size={11} /> {student?.streak || 0} Day Streak
              </span>
              <span className="badge badge-amber text-xs">
                <Trophy size={11} /> Rank #{student?.rank || '—'}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-1 tracking-tight text-[var(--text-primary)]">
              Welcome back, {student?.name?.split(' ')[0] || 'Student'}! 👋
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {student?.degreeName} · {student?.batch} · Year {student?.year} · Section {student?.section}
            </p>
          </div>
          <div className="flex gap-4 flex-shrink-0 items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--brand)]">{prog.completedLessons}</div>
              <div className="text-xs text-[var(--text-secondary)]">Lessons Done</div>
            </div>
            <div className="w-px h-8 bg-[var(--border)]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--amber)]">{student?.points?.toLocaleString()}</div>
              <div className="text-xs text-[var(--text-secondary)]">Points</div>
            </div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs mb-2 text-[var(--text-secondary)]">
            <span>Overall Course Progress</span>
            <span className="font-semibold text-[var(--brand)]">{prog.percentComplete}%</span>
          </div>
          <div className="progress-bar" style={{ height: 6 }}>
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${prog.percentComplete}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          <div className="flex justify-between text-xs mt-2 text-[var(--text-secondary)]">
            <span>{prog.completedModules} of {prog.totalModules} modules completed</span>
            <span>{prog.totalLessons - prog.completedLessons} lessons remaining</span>
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Points Earned', value: student?.points?.toLocaleString(), icon: <Zap size={16} />, color: 'var(--amber)', sub: 'This semester' },
          { label: 'Modules Done',  value: `${prog.completedModules}/${prog.totalModules}`, icon: <BookOpen size={16} />, color: 'var(--brand)', sub: `${prog.totalLessons - prog.completedLessons} lessons left` },
          { label: 'Time Spent',    value: `${Math.round(prog.totalTimeSpentSec/3600)}h`, icon: <Clock size={16} />, color: 'var(--teal)', sub: 'Learning hours' },
          { label: 'Current Streak',value: `${prog.currentStreak} days`, icon: <Flame size={16} />, color: 'var(--error)', sub: `Best: ${prog.longestStreak} days` },
        ].map((stat, i) => (
          <motion.div key={stat.label} custom={i + 1} variants={fadeUp} initial="hidden" animate="show"
            className="card p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-md flex items-center justify-center"
                style={{ background: `rgba(71, 158, 245, 0.08)`, color: stat.color }}>
                {stat.icon}
              </div>
            </div>
            <div className="text-xl font-bold mb-0.5 text-[var(--text-primary)]">
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-[var(--text-secondary)]">{stat.label}</div>
            <div className="text-xs text-[var(--text-secondary)] mt-1 opacity-80">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column — modules + activity */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Activity chart */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-[var(--text-primary)]">
                <TrendingUp size={15} className="text-[var(--brand)]" /> Weekly Activity
              </h3>
              <span className="text-xs text-[var(--text-secondary)]">Last 7 days</span>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={activityData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--brand)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-sm)', fontSize: 11 }}
                  labelStyle={{ color: 'var(--text-secondary)' }}
                  itemStyle={{ color: 'var(--brand)' }}
                  formatter={(v: any) => [`${v} min`, 'Study time']}
                />
                <Area type="monotone" dataKey="mins" stroke="var(--brand)" fill="url(#actGrad)" strokeWidth={1.5} dot={{ fill: 'var(--brand)', r: 3 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Continue learning */}
          <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-[var(--text-primary)]">
                <Play size={15} className="text-[var(--success)]" /> Continue Learning
              </h3>
              <a href="/modules" className="text-xs text-[var(--brand)] font-medium hover:underline flex items-center">
                View all <ChevronRight size={12} className="inline ml-0.5" />
              </a>
            </div>
            <div className="flex flex-col gap-3">
              {recentModules.map(mod => (
                <div key={mod.id} className="flex items-center gap-3 p-3 rounded-lg card-interactive border border-[var(--border-muted)] bg-[var(--bg-card-2)]">
                  <div className="w-10 h-10 rounded-md flex items-center justify-center text-lg flex-shrink-0 bg-[var(--bg-selected)]">
                    {['🤖','✨','💻','🐍','🔧','🌐','📊','🔬'][mod.orderNo - 1] || '📚'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate text-[var(--text-primary)]">{mod.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="progress-bar flex-1" style={{ height: 4 }}>
                        <div className="progress-fill" style={{ width: `${mod.completionRate || 0}%` }} />
                      </div>
                      <span className="text-xs flex-shrink-0 text-[var(--text-secondary)]">{mod.completionRate || 0}%</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[var(--text-muted)]" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Announcements */}
          <motion.div custom={7} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
              <Bell size={15} className="text-[var(--amber)]" /> Announcements
            </h3>
            <div className="flex flex-col gap-3">
              {MOCK_ANNOUNCEMENTS.slice(0, 3).map(a => (
                <div key={a.id} className="p-3 rounded-lg border border-[var(--border-muted)] bg-[var(--bg-card-2)]">
                  <div className="flex items-start gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.priority === 'high' ? 'bg-[var(--error)]' : a.priority === 'medium' ? 'bg-[var(--amber)]' : 'bg-[var(--text-muted)]'}`} />
                    <div>
                      <div className="text-xs font-semibold leading-snug text-[var(--text-primary)]">{a.title}</div>
                      <div className="text-xs mt-1 leading-relaxed text-[var(--text-secondary)]">{a.content.substring(0, 80)}…</div>
                      <div className="text-xs mt-1 text-[var(--text-muted)]">
                        {format(parseISO(a.createdAt), 'dd MMM, hh:mm a')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming sessions */}
          <motion.div custom={8} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
              <Calendar size={15} className="text-[var(--teal)]" /> Upcoming Sessions
            </h3>
            <div className="flex flex-col gap-3">
              {upcomingSessions.map(ses => (
                <div key={ses.id} className="p-3 rounded-lg border border-[var(--border-muted)] bg-[var(--bg-card-2)]">
                  <div className="text-xs font-semibold leading-snug mb-1 text-[var(--text-primary)]">{ses.title}</div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <span>{format(parseISO(ses.scheduledAt), 'dd MMM, hh:mm a')}</span>
                    <span>·</span>
                    <span>{ses.durationMin} min</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="badge badge-cyan" style={{ fontSize: 9 }}>{ses.type}</span>
                    {ses.meetLink && (
                      <a href={ses.meetLink} target="_blank" rel="noreferrer"
                        className="btn btn-primary btn-sm" style={{ padding: '3px 8px', fontSize: 10 }}>
                        Join <ExternalLink size={9} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div custom={9} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
              <Award size={15} className="text-[var(--purple)]" /> My Badges
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {student?.badges?.map(b => (
                <div key={b.id} className="flex flex-col items-center gap-1 p-3 rounded-lg text-center border border-[var(--border-muted)] bg-[var(--bg-card-2)]">
                  <span className="text-2xl">{b.icon}</span>
                  <span className="text-xs font-semibold text-[var(--text-primary)]">{b.name}</span>
                  <span className="text-xs text-[var(--text-secondary)] opacity-80">{b.earnedAt}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Leaderboard snapshot */}
          <motion.div custom={10} variants={fadeUp} initial="hidden" animate="show" className="card p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
              <Trophy size={15} className="text-[var(--amber)]" /> Leaderboard
            </h3>
            <div className="flex flex-col gap-2">
              {LEADERBOARD.slice(0, 5).map(entry => (
                <div key={entry.rank}
                  className={`flex items-center gap-3 p-2 rounded-lg ${entry.isCurrentUser ? 'border border-[var(--brand-border)]' : ''}`}
                  style={entry.isCurrentUser ? { background: 'var(--bg-selected)' } : {}}>
                  <span className="text-xs font-bold w-5 text-center flex-shrink-0" style={{ color: entry.rank <= 3 ? 'var(--amber)' : 'var(--text-muted)' }}>
                    {entry.rank <= 3 ? entry.badge : `#${entry.rank}`}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate text-[var(--text-primary)]">
                      {entry.name} {entry.isCurrentUser && '(You)'}
                    </div>
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
