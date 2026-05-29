// ============================================================
// Learning Modules Page — Microsoft Learn / Fluent Design
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_MODULES } from '../../data/mockData';
import { BookOpen, Clock, Tag, ChevronRight, Search, Play, CheckCircle, Lock } from 'lucide-react';

const TAG_COLORS: Record<string,string> = {
  foundation: 'badge-indigo', AI: 'badge-violet', beginner: 'badge-green',
  prompt: 'badge-cyan', LLM: 'badge-indigo', intermediate: 'badge-amber',
  'vibe-coding': 'badge-violet', fullstack: 'badge-indigo', advanced: 'badge-red',
  programming: 'badge-green', python: 'badge-cyan', web: 'badge-amber',
  domain: 'badge-indigo', tools: 'badge-cyan', applied: 'badge-green',
  projects: 'badge-violet', app: 'badge-indigo', casestudy: 'badge-amber',
  industry: 'badge-cyan', 'real-world': 'badge-green', research: 'badge-violet',
  PG: 'badge-red', innovation: 'badge-indigo',
};

const MODULE_EMOJIS = ['🤖','✨','💻','🐍','🔧','🌐','📊','🔬'];

export default function ModulesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'inprogress' | 'completed'>('all');

  const filtered = MOCK_MODULES.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    if (filter === 'inprogress') return matchSearch && (m.completionRate||0) > 0 && (m.completionRate||0) < 100;
    if (filter === 'completed')  return matchSearch && (m.completionRate||0) === 100;
    return matchSearch;
  });

  const formatDuration = (sec: number) => {
    const h = Math.floor(sec / 3600);
    return `${h}h ${Math.floor((sec % 3600) / 60)}m`;
  };

  return (
    <div className="page-content animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>
            Learning Modules
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {MOCK_MODULES.length} modules · {MOCK_MODULES.reduce((a,m)=>a+m.totalLessons,0)} total lessons
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:ml-auto w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]" />
            <input className="input text-sm w-full sm:w-56" style={{ paddingLeft: 32 }}
              placeholder="Search modules..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {/* Filter */}
          <div className="tab-list w-full sm:w-auto justify-between" style={{ padding: 2 }}>
            {[['all','All'],['inprogress','In Progress'],['completed','Completed']].map(([v,l]) => (
              <button key={v} onClick={() => setFilter(v as any)}
                className="tab-trigger" data-state={filter === v ? 'active' : 'inactive'}
                style={{ fontSize: 11, padding: '5px 10px' }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modules grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((mod, i) => {
          const completion = mod.completionRate || 0;
          const isLocked = mod.yearLevel > 1 && completion === 0 && mod.orderNo > 3;
          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="module-card group"
            >
              {/* Card top — Subtle Fluent Blue Header */}
              <div className="relative p-5 pb-4"
                style={{ background: 'linear-gradient(135deg, rgba(71, 158, 245, 0.12) 0%, rgba(71, 158, 245, 0.04) 100%)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{MODULE_EMOJIS[mod.orderNo - 1] || '📚'}</div>
                  <div className="flex items-center gap-1.5">
                    {completion === 100 && <span className="badge badge-green" style={{ fontSize: 9 }}><CheckCircle size={9}/> Done</span>}
                    {completion > 0 && completion < 100 && <span className="badge badge-amber" style={{ fontSize: 9 }}><Play size={9}/> In Progress</span>}
                    {isLocked && <span className="badge badge-red" style={{ fontSize: 9 }}><Lock size={9}/> Locked</span>}
                    <span className="badge badge-indigo" style={{ fontSize: 9 }}>Year {mod.yearLevel}</span>
                  </div>
                </div>
                <h3 className="text-sm font-bold leading-snug mb-1 text-[var(--text-primary)]">
                  {mod.title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)] line-clamp-2 mt-1">{mod.description}</p>
              </div>

              {/* Progress */}
              <div className="px-5 py-3 border-t border-b border-[var(--border-muted)] bg-[var(--bg-card-2)]">
                <div className="flex justify-between text-xs mb-1.5 text-[var(--text-secondary)]">
                  <span>Progress</span>
                  <span className="font-semibold text-[var(--brand)]">{completion}%</span>
                </div>
                <div className="progress-bar">
                  <motion.div className="progress-fill"
                    initial={{ width: 0 }} animate={{ width: `${completion}%` }}
                    transition={{ duration: 0.6, delay: i * 0.04 + 0.1 }} />
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1"><BookOpen size={11}/> {mod.totalLessons} lessons</span>
                  <span className="flex items-center gap-1"><Clock size={11}/> {formatDuration(mod.totalDuration)}</span>
                </div>
                <button className="btn btn-primary btn-sm gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ fontSize: 11, padding: '4px 10px' }}>
                  {completion > 0 ? 'Continue' : 'Start'} <ChevronRight size={12} />
                </button>
              </div>

              {/* Tags */}
              <div className="px-5 pb-4 flex flex-wrap gap-1.5">
                {mod.tags.map(tag => (
                  <span key={tag} className={`badge ${TAG_COLORS[tag] || 'badge-indigo'}`} style={{ fontSize: 9 }}>
                    <Tag size={8}/> {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--text-secondary)]">
          <BookOpen size={36} className="mb-3 opacity-40 text-[var(--text-muted)]" />
          <div className="text-sm">No modules match your search.</div>
        </div>
      )}
    </div>
  );
}
