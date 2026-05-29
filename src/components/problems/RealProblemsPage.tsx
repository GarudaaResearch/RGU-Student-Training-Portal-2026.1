// ============================================================
// RealProblemsPage — RGU Real Problem Statements
// Fluent Design / Microsoft Learn aesthetic
// ============================================================
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronDown, ChevronUp,
  Cpu, Wrench, BookOpen, Layers, X, Building2
} from 'lucide-react';
import problemData from '../../data/problemStatements.json';

interface Problem {
  id: string;
  title: string;
  bucket: string;
  type: string;
  description: string;
  org: string;
}

const ALL_BUCKETS = [
  'Agriculture, FoodTech & Rural Development',
  'Blockchain & Cybersecurity',
  'Clean & Green Technology',
  'Disaster Management',
  'Fitness & Sports',
  'Heritage & Culture',
  'MedTech / BioTech / HealthTech',
  'Miscellaneous',
  'Renewable / Sustainable Energy',
  'Robotics and Drones',
  'Smart Automation',
  'Smart Education',
  'Smart Vehicles',
  'Space Technology',
  'Toys & Games',
  'Transportation & Logistics',
  'Travel & Tourism',
];

const BUCKET_COLORS: Record<string, string> = {
  'Agriculture, FoodTech & Rural Development': '#22c55e',
  'Blockchain & Cybersecurity': '#8b5cf6',
  'Clean & Green Technology': '#10b981',
  'Disaster Management': '#ef4444',
  'Fitness & Sports': '#f59e0b',
  'Heritage & Culture': '#d97706',
  'MedTech / BioTech / HealthTech': '#06b6d4',
  'Miscellaneous': '#6b7280',
  'Renewable / Sustainable Energy': '#84cc16',
  'Robotics and Drones': '#3b82f6',
  'Smart Automation': '#f97316',
  'Smart Education': '#0ea5e9',
  'Smart Vehicles': '#a855f7',
  'Space Technology': '#1d4ed8',
  'Toys & Games': '#ec4899',
  'Transportation & Logistics': '#14b8a6',
  'Travel & Tourism': '#fb923c',
};

function ProblemCard({ p, index }: { p: Problem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const color = BUCKET_COLORS[p.bucket] || '#6b7280';
  const isSoftware = p.type === 'Software';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.4), duration: 0.3, ease: 'easeOut' }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${color}`,
        borderRadius: 'var(--r-lg)',
        padding: '16px 18px',
        transition: 'box-shadow 140ms ease',
        cursor: 'pointer',
      }}
      whileHover={{ boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
      onClick={() => setExpanded(v => !v)}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* ID badge */}
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
          padding: '3px 8px', borderRadius: 20,
          background: color + '20', color,
          flexShrink: 0, marginTop: 2, whiteSpace: 'nowrap',
        }}>
          {p.id}
        </span>

        {/* Title */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 13.5, fontWeight: 600,
            color: 'var(--text-primary)', lineHeight: 1.4,
          }}>
            {p.title}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 7 }}>
            {/* Bucket */}
            <span style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 12,
              background: color + '15', color,
              fontWeight: 500,
            }}>
              {p.bucket}
            </span>
            {/* Type */}
            <span style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 10, padding: '2px 8px', borderRadius: 12,
              background: isSoftware ? 'var(--brand-sub)' : 'rgba(245,158,11,0.12)',
              color: isSoftware ? 'var(--brand)' : '#d97706',
              fontWeight: 500,
            }}>
              {isSoftware ? <Cpu size={9} /> : <Wrench size={9} />}
              {p.type}
            </span>
          </div>
        </div>

        {/* Expand toggle */}
        <span style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 2 }}>
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </span>
      </div>

      {/* Expanded description */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: 14,
              paddingTop: 14,
              borderTop: '1px solid var(--border-muted)',
            }}>
              <p style={{
                margin: '0 0 12px',
                fontSize: 12.5,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                textAlign: 'justify',
              }}>
                {p.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Building2 size={11} color="var(--text-muted)" />
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  {p.org}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RealProblemsPage() {
  const problems = problemData as Problem[];

  const [query, setQuery]           = useState('');
  const [activeBucket, setActiveBucket] = useState('All');
  const [activeType, setActiveType]     = useState('All');
  const [showFilters, setShowFilters]   = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    setVisibleCount(20);
  }, [query, activeBucket, activeType]);

  const bucketCounts = useMemo(() => {
    const map: Record<string, number> = { All: problems.length };
    problems.forEach(p => { map[p.bucket] = (map[p.bucket] || 0) + 1; });
    return map;
  }, [problems]);

  const filtered = useMemo(() => {
    return problems.filter(p => {
      const q = query.toLowerCase();
      const matchQ = !q || p.title.toLowerCase().includes(q)
        || p.id.toLowerCase().includes(q)
        || p.org.toLowerCase().includes(q)
        || p.description.toLowerCase().includes(q);
      const matchBucket = activeBucket === 'All' || p.bucket === activeBucket;
      const matchType   = activeType === 'All' || p.type === activeType;
      return matchQ && matchBucket && matchType;
    });
  }, [problems, query, activeBucket, activeType]);

  const visibleProblems = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  return (
    <div className="page-content" style={{ maxWidth: 900, margin: '0 auto' }}>

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          borderRadius: 'var(--r-xl)',
          padding: '24px 28px',
          background: 'linear-gradient(135deg, var(--brand) 0%, var(--purple) 100%)',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Layers size={20} color="rgba(255,255,255,0.9)" />
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#fff' }}>
              RGU – Real Problem Statements
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, maxWidth: 540 }}>
            {problems.length} real-world challenges across {ALL_BUCKETS.length} technology domains, submitted by Government Ministries & Organizations. Pick a problem, build a solution!
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
            {[
              { label: 'Total Problems', value: problems.length },
              { label: 'Tech Domains', value: ALL_BUCKETS.length },
              { label: 'Software', value: problems.filter(p => p.type === 'Software').length },
              { label: 'Hardware', value: problems.filter(p => p.type === 'Hardware').length },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 10, padding: '6px 14px',
                backdropFilter: 'blur(6px)',
              }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{s.value}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Search + Filter bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35, ease: 'easeOut' }}
        style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}
      >
        {/* Search */}
        <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
          <Search size={13} color="var(--text-muted)" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            className="input"
            style={{ paddingLeft: 32, width: '100%', fontSize: 13 }}
            placeholder="Search by ID, title, organization..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={13} />
            </button>
          )}
        </div>

        {/* Type filter */}
        <select
          className="input"
          style={{ width: 130, fontSize: 12 }}
          value={activeType}
          onChange={e => setActiveType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Software">💻 Software</option>
          <option value="Hardware">🔧 Hardware</option>
        </select>

        {/* Filter toggle */}
        <button
          className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}
          onClick={() => setShowFilters(v => !v)}
        >
          <Filter size={13} />
          Domain Filter
          {activeBucket !== 'All' && (
            <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 10, padding: '1px 6px', fontSize: 10 }}>1</span>
          )}
        </button>
      </motion.div>

      {/* ── Domain filter panel ── */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{ overflow: 'hidden', marginBottom: 16 }}
          >
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              padding: '14px 16px',
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Technology Domain
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                <button
                  onClick={() => setActiveBucket('All')}
                  style={{
                    padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 500, cursor: 'pointer', border: '1px solid',
                    borderColor: activeBucket === 'All' ? 'var(--brand)' : 'var(--border)',
                    background: activeBucket === 'All' ? 'var(--brand-sub)' : 'transparent',
                    color: activeBucket === 'All' ? 'var(--brand)' : 'var(--text-secondary)',
                  }}
                >
                  All ({bucketCounts['All']})
                </button>
                {ALL_BUCKETS.map(b => {
                  const color = BUCKET_COLORS[b] || '#6b7280';
                  const active = activeBucket === b;
                  return (
                    <button
                      key={b}
                      onClick={() => setActiveBucket(active ? 'All' : b)}
                      style={{
                        padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 500, cursor: 'pointer', border: '1px solid',
                        borderColor: active ? color : 'var(--border)',
                        background: active ? color + '20' : 'transparent',
                        color: active ? color : 'var(--text-secondary)',
                      }}
                    >
                      {b} ({bucketCounts[b] || 0})
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Results count ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> of {problems.length} problems
          {activeBucket !== 'All' && (
            <span style={{ marginLeft: 6 }}>
              in <strong style={{ color: BUCKET_COLORS[activeBucket] }}>{activeBucket}</strong>
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-muted)' }}>
          <BookOpen size={12} />
          Click any card to read full description
        </div>
      </div>

      {/* ── Problem cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '48px 24px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-lg)',
            color: 'var(--text-muted)',
            fontSize: 13,
          }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
            No problems match your search. Try different keywords or clear filters.
          </div>
        ) : (
          visibleProblems.map((p, i) => <ProblemCard key={p.id} p={p} index={i} />)
        )}
      </div>

      {filtered.length > visibleCount && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 22, marginBottom: 12 }}>
          <button
            className="btn btn-secondary"
            style={{ fontSize: 12, padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={() => setVisibleCount(prev => prev + 20)}
          >
            Load More Problems ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

    </div>
  );
}
