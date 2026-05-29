// ============================================================
// Ideas Bank Page — Microsoft Learn / Fluent Design
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { IDEAS } from '../../data/ideas';
import type { Idea } from '../../types';
import {
  Lightbulb, Search, Tag, Clock, Bookmark, BookmarkCheck,
  Cpu, Globe, Leaf, HeartPulse, ShoppingCart, GraduationCap,
  ChevronRight, Star
} from 'lucide-react';

const CATEGORIES = ['All', 'AgriTech', 'HealthTech', 'EdTech', 'FinTech', 'GovTech', 'E-Commerce', 'Sustainability', 'Smart City'];

const DIFF_COLOR: Record<string, string> = {
  Beginner:     'badge-green',
  Intermediate: 'badge-amber',
  Advanced:     'badge-red',
};

const CAT_ICONS: Record<string, React.ReactNode> = {
  AgriTech:      <Leaf size={12} />,
  HealthTech:    <HeartPulse size={12} />,
  EdTech:        <GraduationCap size={12} />,
  FinTech:       <Cpu size={12} />,
  GovTech:       <Globe size={12} />,
  'E-Commerce':  <ShoppingCart size={12} />,
  Sustainability:<Leaf size={12} />,
  'Smart City':  <Globe size={12} />,
};

export default function IdeasPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const filtered = IDEAS.filter(idea => {
    const matchSearch = search === '' ||
      idea.title.toLowerCase().includes(search.toLowerCase()) ||
      idea.description.toLowerCase().includes(search.toLowerCase()) ||
      idea.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat  = category === 'All' || idea.category === category;
    const matchDiff = difficulty === 'All' || idea.difficulty === difficulty;
    return matchSearch && matchCat && matchDiff;
  });

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="page-content animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>
              Ideas Bank
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {IDEAS.length} curated project ideas across {CATEGORIES.length - 1} domains
            </p>
          </div>
          <div className="relative md:ml-auto w-full md:w-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]" />
            <input className="input text-sm w-full md:w-60" style={{ paddingLeft: 32 }}
              placeholder="Search ideas, tech stack..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`btn btn-sm gap-1 ${category === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: 12, padding: '5px 10px' }}>
                {CAT_ICONS[cat]} {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)] mr-1">Difficulty:</span>
            <div className="flex gap-1.5">
              {['All','Beginner','Intermediate','Advanced'].map(d => (
                <button key={d} onClick={() => setDifficulty(d)}
                  className={`btn btn-sm ${difficulty === d ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: 11, padding: '4px 8px' }}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-xs text-[var(--text-secondary)]">
          Showing {filtered.length} of {IDEAS.length} ideas
        </div>
      </div>

      {/* Ideas grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((idea, i) => (
          <IdeaCard key={idea.id} idea={idea} index={i}
            bookmarked={bookmarked.has(idea.id)} onBookmark={() => toggleBookmark(idea.id)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--text-secondary)]">
          <Lightbulb size={36} className="mb-3 opacity-40 text-[var(--text-muted)]" />
          <div className="text-sm">No ideas match your filters.</div>
          <button className="btn btn-ghost btn-sm mt-3" onClick={() => { setSearch(''); setCategory('All'); setDifficulty('All'); }}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

function IdeaCard({ idea, index, bookmarked, onBookmark }:
  { idea: Idea; index: number; bookmarked: boolean; onBookmark: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="card flex flex-col group"
    >
      {/* Top */}
      <div className="p-4 pb-3 flex-1 bg-[var(--bg-card)]">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-1.5">
            <span className={`badge ${DIFF_COLOR[idea.difficulty]}`} style={{ fontSize: 10 }}>
              {idea.difficulty}
            </span>
            <span className="badge badge-violet" style={{ fontSize: 10 }}>
              <span className="inline-block mr-0.5">{CAT_ICONS[idea.category]}</span>{idea.category}
            </span>
          </div>
          <button onClick={onBookmark}
            className={`btn btn-ghost btn-icon flex-shrink-0 transition-colors ${bookmarked ? 'text-[var(--amber)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
            style={{ padding: 3 }}>
            {bookmarked ? <BookmarkCheck size={16} className="text-[var(--amber)]" /> : <Bookmark size={16} />}
          </button>
        </div>

        <h3 className="text-sm font-bold leading-snug mb-1.5 text-[var(--text-primary)]">
          {idea.title}
        </h3>
        <p className="text-xs leading-relaxed text-[var(--text-secondary)] line-clamp-3">
          {idea.description}
        </p>

        {idea.mentorRecommendation && (
          <div className="mt-3 flex items-start gap-1.5 p-2 rounded-md bg-[var(--bg-selected)] border border-[var(--brand-border)]">
            <Star size={11} className="text-[var(--brand)] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{idea.mentorRecommendation}</p>
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1 mt-3.5">
          {idea.techStack.slice(0, 4).map(t => (
            <span key={t} className="badge badge-indigo" style={{ fontSize: 10 }}>
              <Tag size={8} /> {t}
            </span>
          ))}
          {idea.techStack.length > 4 && (
            <span className="badge badge-indigo" style={{ fontSize: 10 }}>+{idea.techStack.length - 4}</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-[var(--border-muted)] bg-[var(--bg-card-2)]">
        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
          <span className="flex items-center gap-1"><Clock size={11} /> {idea.durationWeeks}w</span>
          <span className="flex items-center gap-1"><Lightbulb size={11} /> {idea.viewCount} views</span>
        </div>
        <button className="btn btn-primary btn-sm gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ fontSize: 11, padding: '4px 10px' }}>
          Explore <ChevronRight size={12} />
        </button>
      </div>
    </motion.div>
  );
}
