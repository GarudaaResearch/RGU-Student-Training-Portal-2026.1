// ============================================================
// AI Tools Directory Page — Microsoft Learn / Fluent Design
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AI_TOOLS, TOOL_CATEGORIES, getToolOfTheDay } from '../../data/aiTools';
import type { AITool } from '../../types';
import {
  Wrench, Search, ExternalLink, Star, Zap, MessageSquare,
  Code2, Image, Video, Music, Briefcase, FlaskConical,
  PenTool, BarChart3, Sparkles, Globe, Lock
} from 'lucide-react';

const CAT_ICONS: Record<string, React.ReactNode> = {
  'LLM Chatbots':              <MessageSquare size={13} />,
  'AI Coding — IDE':           <Code2 size={13} />,
  'AI Coding — App Builders':  <Sparkles size={13} />,
  'Image AI':                  <Image size={13} />,
  'Video AI':                  <Video size={13} />,
  'Audio AI':                  <Music size={13} />,
  'Productivity AI':           <Briefcase size={13} />,
  'Research AI':               <FlaskConical size={13} />,
  'Design AI':                 <PenTool size={13} />,
  'Data & Analytics':          <BarChart3 size={13} />,
};

const CAT_COLORS: Record<string, string> = {
  'LLM Chatbots':              'var(--brand)',
  'AI Coding — IDE':           'var(--teal)',
  'AI Coding — App Builders':  'var(--purple)',
  'Image AI':                  'var(--error)',
  'Video AI':                  'var(--amber)',
  'Audio AI':                  'var(--success)',
  'Productivity AI':           'var(--brand)',
  'Research AI':               'var(--teal)',
  'Design AI':                 'var(--purple)',
  'Data & Analytics':          'var(--success)',
};

export default function AIToolsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const toolOfDay = getToolOfTheDay();

  const filtered = AI_TOOLS.filter(tool => {
    const matchSearch = search === '' ||
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = activeCategory === 'All' || tool.category === activeCategory;
    const matchFeatured = !showFeaturedOnly || tool.isFeatured;
    return matchSearch && matchCat && matchFeatured;
  });

  const groupedByCategory = TOOL_CATEGORIES.map(cat => ({
    name: cat,
    tools: filtered.filter(t => t.category === cat),
  })).filter(g => g.tools.length > 0);

  const showGrouped = activeCategory === 'All' && search === '' && !showFeaturedOnly;

  return (
    <div className="page-content animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ margin: 0 }}>
            AI Tools Directory
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {AI_TOOLS.length} curated tools across {TOOL_CATEGORIES.length} categories
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:ml-auto w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]" />
            <input
              className="input text-sm w-full sm:w-52"
              style={{ paddingLeft: 32 }}
              placeholder="Search tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFeaturedOnly(v => !v)}
            className={`btn btn-sm gap-1.5 w-full sm:w-auto justify-center ${showFeaturedOnly ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: 11, padding: '6px 12px' }}
          >
            <Star size={12} /> Featured
          </button>
        </div>
      </div>

      {/* Tool of the Day — Fluent Redesign */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-6 rounded-lg overflow-hidden p-5"
        style={{
          background: 'linear-gradient(135deg, rgba(71, 158, 245, 0.12) 0%, rgba(71, 158, 245, 0.04) 100%)',
          border: '1px solid var(--border-brand)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl"
              style={{ background: 'rgba(71, 158, 245, 0.12)', border: '1px solid var(--brand-border)' }}>
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="badge badge-amber" style={{ fontSize: 10 }}><Zap size={9} /> Tool of the Day</span>
                <span className="badge badge-green" style={{ fontSize: 10 }}>Free</span>
              </div>
              <div className="text-base font-bold text-[var(--text-primary)]">
                {toolOfDay.name}
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">{toolOfDay.description}</div>
            </div>
          </div>
          <a
            href={toolOfDay.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary gap-2 flex-shrink-0 w-full md:w-auto justify-center"
            style={{ minWidth: 120, fontSize: 12, padding: '7px 14px' }}
          >
            <ExternalLink size={12} /> Try Now
          </a>
        </div>
      </motion.div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {['All', ...TOOL_CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`btn btn-sm gap-1.5 ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: 11, padding: '5px 11px' }}
          >
            {cat !== 'All' && <span style={{ color: activeCategory === cat ? 'white' : CAT_COLORS[cat] }}>{CAT_ICONS[cat]}</span>}
            {cat === 'All' ? 'All Tools' : cat}
          </button>
        ))}
      </div>

      {/* Tool count */}
      <div className="text-xs text-[var(--text-secondary)] mb-4">
        Showing {filtered.length} of {AI_TOOLS.length} tools
      </div>

      {/* Tools — grouped by category (default) or flat list */}
      {showGrouped ? (
        <div className="flex flex-col gap-8">
          {groupedByCategory.map((group, gi) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.04, duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span style={{ color: CAT_COLORS[group.name] || 'var(--brand)' }}>
                  {CAT_ICONS[group.name] || <Wrench size={14} />}
                </span>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  {group.name}
                </h3>
                <span className="badge badge-indigo" style={{ fontSize: 10 }}>{group.tools.length}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {group.tools.map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} index={i} color={CAT_COLORS[tool.category] || 'var(--brand)'} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} color={CAT_COLORS[tool.category] || 'var(--brand)'} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--text-secondary)]">
          <Wrench size={36} className="mb-3 opacity-40 text-[var(--text-muted)]" />
          <div className="text-sm">No tools match your search.</div>
          <button className="btn btn-ghost btn-sm mt-3" onClick={() => { setSearch(''); setActiveCategory('All'); setShowFeaturedOnly(false); }}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

function ToolCard({ tool, index, color }: { tool: AITool; index: number; color: string }) {
  return (
    <motion.a
      href={tool.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="card flex flex-col group bg-[var(--bg-card)] hover:bg-[var(--bg-card-2)]"
      style={{ textDecoration: 'none', cursor: 'pointer' }}
    >
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `rgba(71, 158, 245, 0.08)`, border: `1px solid var(--brand-border)` }}>
            <span style={{ color }}>{CAT_ICONS[tool.category] || <Globe size={14} />}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {tool.isFeatured && (
              <span className="badge badge-amber" style={{ fontSize: 10, padding: '2px 6px' }}>
                <Star size={8} /> Featured
              </span>
            )}
            {tool.isPaid ? (
              <span className="badge badge-violet" style={{ fontSize: 10, padding: '2px 6px' }}>
                <Lock size={8} /> Paid
              </span>
            ) : (
              <span className="badge badge-green" style={{ fontSize: 10, padding: '2px 6px' }}>Free</span>
            )}
          </div>
        </div>

        <div className="text-sm font-bold mb-1 text-[var(--text-primary)]">
          {tool.name}
        </div>
        <p className="text-xs leading-relaxed text-[var(--text-secondary)] line-clamp-2">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-1 mt-3">
          {tool.tags.slice(0, 3).map(tag => (
            <span key={tag} className="badge badge-indigo" style={{ fontSize: 10, padding: '2px 6px' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between border-t border-[var(--border-muted)] bg-[var(--bg-card-2)]">
        <span className="text-xs text-[var(--text-secondary)] uppercase font-semibold">{tool.category}</span>
        <span className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color }}>
          Open <ExternalLink size={11} />
        </span>
      </div>
    </motion.a>
  );
}
