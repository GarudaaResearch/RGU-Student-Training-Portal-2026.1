// ============================================================
// AboutDeveloperPage — Prof. R. Anjit Raja Profile
// Fluent Design / Microsoft Learn aesthetic
// ============================================================
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Lightbulb, BookOpen, Award, Globe, Users,
  Cpu, Wifi, Zap, Star, Heart, Target
} from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' },
  }),
};

const highlights = [
  { icon: <Lightbulb size={18} />, label: 'Innovation Leader', color: 'var(--amber)' },
  { icon: <BookOpen size={18} />, label: 'Academician', color: 'var(--brand)' },
  { icon: <Cpu size={18} />,      label: 'AI Evangelist',    color: 'var(--purple)' },
  { icon: <Wifi size={18} />,     label: 'IoT Expert',       color: 'var(--teal)' },
  { icon: <Users size={18} />,    label: 'Mentor',           color: 'var(--green)' },
  { icon: <Globe size={18} />,    label: 'Digital Innovator', color: 'var(--pink)' },
];

const achievements = [
  { icon: <Zap size={16} />,    text: 'Driving force behind The Centre for Innovation and Incubation' },
  { icon: <Award size={16} />,  text: 'Designed and executed large-scale technology-driven learning initiatives' },
  { icon: <Target size={16} />, text: 'Bridging the gap between academic learning and real-world application' },
  { icon: <Star size={16} />,   text: 'Recognized for inspiring students to think beyond conventional boundaries' },
  { icon: <Heart size={16} />,  text: 'Champions hands-on training, innovation challenges & student-centric platforms' },
  { icon: <Globe size={16} />,  text: 'Extensive expertise in AI, IoT and digital innovation ecosystems' },
];

export default function AboutDeveloperPage() {
  return (
    <div className="page-content" style={{ maxWidth: 860, margin: '0 auto' }}>

      {/* ── Hero Banner ── */}
      <motion.div
        custom={0} variants={fadeUp} initial="hidden" animate="visible"
        style={{
          borderRadius: 'var(--r-xl)',
          overflow: 'hidden',
          marginBottom: 24,
          position: 'relative',
          background: 'linear-gradient(135deg, var(--brand) 0%, var(--purple) 50%, var(--teal) 100%)',
          minHeight: 220,
          display: 'flex',
          alignItems: 'flex-end',
          padding: 32,
        }}
      >
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 220, height: 220, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: 120,
          width: 180, height: 180, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)',
            border: '3px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 800, color: '#fff',
            flexShrink: 0,
            backdropFilter: 'blur(8px)',
          }}>
            AR
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
              About the Developer
            </div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
              Prof. R. Anjit Raja
            </h1>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 6, fontWeight: 500 }}>
              Innovation Leader · Academician · AI Evangelist
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Highlights chips ── */}
      <motion.div
        custom={1} variants={fadeUp} initial="hidden" animate="visible"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}
      >
        {highlights.map((h, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '6px 14px',
            borderRadius: 20,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            fontSize: 12, fontWeight: 500,
            color: 'var(--text-secondary)',
          }}>
            <span style={{ color: h.color }}>{h.icon}</span>
            {h.label}
          </div>
        ))}
      </motion.div>

      {/* ── Main bio + Key Highlights grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>

        {/* Bio card */}
        <motion.div
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="card"
          style={{ gridColumn: '1 / -1', padding: 28 }}
        >
          <h2 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
            Biography
          </h2>
          <p style={{ margin: '0 0 14px', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.75, textAlign: 'justify' }}>
            Prof. R. Anjit Raja is a dynamic academician and innovation leader, serving as the driving force
            behind <strong style={{ color: 'var(--text-primary)' }}>The Centre for Innovation and Incubation</strong>.
            With a strong vision to empower young minds and foster a culture of creativity, he has been
            instrumental in designing and executing large-scale technology-driven learning initiatives.
          </p>
          <p style={{ margin: '0 0 14px', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.75, textAlign: 'justify' }}>
            With extensive experience in emerging technologies such as{' '}
            <strong style={{ color: 'var(--brand)' }}>Artificial Intelligence</strong>,{' '}
            <strong style={{ color: 'var(--teal)' }}>Internet of Things (IoT)</strong>, and{' '}
            <strong style={{ color: 'var(--purple)' }}>digital innovation</strong>, Prof. Anjit Raja has
            consistently contributed to bridging the gap between academic learning and real-world application.
            His leadership has enabled the successful execution of impactful programs, including hands-on
            training sessions, innovation challenges, and student-centric development platforms.
          </p>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.75, textAlign: 'justify' }}>
            He is widely recognized for his ability to inspire students to think beyond conventional
            boundaries, encouraging them to build practical solutions that address contemporary challenges.
            Through his innovative pedagogy and mentoring style, he continues to shape the next generation of
            technologists and problem-solvers.
          </p>
        </motion.div>

        {/* Key highlights */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="card"
          style={{ gridColumn: '1 / -1', padding: 28 }}
        >
          <h2 style={{ margin: '0 0 18px', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
            Key Highlights
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {achievements.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '12px 14px',
                borderRadius: 'var(--r-md)',
                background: 'var(--bg-card-2)',
                border: '1px solid var(--border-muted)',
              }}>
                <span style={{ color: 'var(--brand)', flexShrink: 0, marginTop: 1 }}>{a.icon}</span>
                <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{a.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Vision & Quote ── */}
      <motion.div
        custom={4} variants={fadeUp} initial="hidden" animate="visible"
        style={{
          borderRadius: 'var(--r-xl)',
          padding: '28px 32px',
          background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--brand-sub) 100%)',
          border: '1px solid var(--border)',
          textAlign: 'center',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: -20, left: -20,
          width: 120, height: 120, borderRadius: '50%',
          background: 'var(--brand)', opacity: 0.05,
          pointerEvents: 'none',
        }} />
        <div style={{ fontSize: 48, lineHeight: 1, color: 'var(--brand)', opacity: 0.3, fontFamily: 'Georgia, serif', marginBottom: 8 }}>"</div>
        <blockquote style={{
          margin: '0 auto',
          maxWidth: 600,
          fontSize: 16,
          fontStyle: 'italic',
          fontWeight: 500,
          color: 'var(--text-primary)',
          lineHeight: 1.7,
        }}>
          Innovation is not just about technology — it's about the courage to reimagine the possible and
          the commitment to turn ideas into impact.
        </blockquote>
        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
          — Prof. R. Anjit Raja
        </div>
      </motion.div>

      {/* ── Role & Initiative ── */}
      <motion.div
        custom={5} variants={fadeUp} initial="hidden" animate="visible"
        className="card"
        style={{ padding: 28, marginBottom: 24 }}
      >
        <h2 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
          This Initiative
        </h2>
        <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.75, textAlign: 'justify' }}>
          The <strong style={{ color: 'var(--text-primary)' }}>CII AI Training Hub</strong> — this very portal —
          is a direct product of Prof. Anjit Raja's vision to democratize AI education within RGU. Built to
          equip students with hands-on experience in Artificial Intelligence and emerging technologies, it
          provides live sessions, curated learning modules, idea-sharing spaces, and a vibrant collaborative
          community. This platform stands as a testament to his relentless drive to bridge the gap between
          classroom learning and industry readiness.
        </p>
      </motion.div>

      {/* ── Footer stamp ── */}
      <motion.div
        custom={6} variants={fadeUp} initial="hidden" animate="visible"
        style={{ textAlign: 'center', padding: '12px 0 4px', color: 'var(--text-muted)', fontSize: 11 }}
      >
        Centre for Innovation and Incubation · RGU · 2026
      </motion.div>

    </div>
  );
}
