// ============================================================
// Sidebar — Microsoft Learn / Fluent Design
// ============================================================
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import {
  LayoutDashboard, BookOpen, Calendar, Lightbulb, Wrench,
  BarChart3, FileText, LogOut, Sparkles, ChevronLeft,
  ChevronRight, GraduationCap, Shield, X, Trophy, Compass, BookMarked,
  MessageCircle, MailOpen
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',    path: '/dashboard',    icon: <LayoutDashboard size={17} />, roles: ['student','faculty','admin'] },
  { label: 'Program Agenda', path: '/agenda',     icon: <Compass size={17} />,         roles: ['student','faculty','admin'] },
  { label: 'Event Invitation', path: '/invitation', icon: <MailOpen size={17} />,      roles: ['student','faculty','admin'] },
  { label: 'Tutorial - AI', path: '/tutorial-ai', icon: <BookMarked size={17} />,      roles: ['student','faculty','admin'] },
  { label: 'Modules',      path: '/modules',      icon: <BookOpen size={17} />,        roles: ['student','faculty','admin'] },
  { label: 'Sessions',     path: '/sessions',     icon: <Calendar size={17} />,        roles: ['student','faculty','admin'] },
  { label: 'Ideas Bank',   path: '/ideas',        icon: <Lightbulb size={17} />,       roles: ['student','faculty','admin'] },
  { label: 'AI Tools',     path: '/tools',        icon: <Wrench size={17} />,          roles: ['student','faculty','admin'] },
  { label: 'Leaderboard',  path: '/leaderboard',  icon: <Trophy size={17} />,          roles: ['student'] },
  { label: 'Reports',      path: '/reports',      icon: <BarChart3 size={17} />,       roles: ['faculty','admin'] },
  { label: 'Certificates', path: '/certificates', icon: <FileText size={17} />,        roles: ['student'] },
  { label: 'WhatsApp Help - Join', path: '/whatsapp-help', icon: <MessageCircle size={17} />, roles: ['student','faculty','admin'] },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const { user, role, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const visibleNav = NAV_ITEMS.filter(item => role && item.roles.includes(role));
  const sidebarWidth = collapsed ? 52 : 240;

  const getName = () => {
    if (!user) return 'User';
    return 'name' in user ? (user as any).name : (user as any).username;
  };

  const getInitials = () => {
    const name = getName();
    return name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const getRoleMeta = () => {
    if (role === 'student') return { label: 'Student', icon: <GraduationCap size={11} />, color: 'var(--brand)' };
    if (role === 'faculty') return { label: 'Faculty', icon: <Sparkles size={11} />, color: 'var(--purple)' };
    return { label: 'Admin', icon: <Shield size={11} />, color: 'var(--teal)' };
  };

  const meta = getRoleMeta();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(0,0,0,0.55)' }}
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className={`portal-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
        style={{ width: sidebarWidth }}
      >
        {/* Logo / brand */}
        <div
          style={{
            height: 52,
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            borderBottom: '1px solid var(--border)',
            gap: 10,
            flexShrink: 0,
          }}
        >
          {/* Icon */}
          <img
            src="/rgu-logo.png"
            alt="RGU Logo"
            style={{
              width: 30,
              height: 30,
              objectFit: 'contain',
              flexShrink: 0,
            }}
          />

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                style={{ overflow: 'hidden', whiteSpace: 'nowrap', flex: 1 }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  CII AI Hub
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 0 }}>
                  RGU · 2026
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapse toggle — desktop */}
          <button
            onClick={() => setCollapsed(v => !v)}
            className="btn btn-ghost btn-icon hidden md:flex"
            style={{ padding: 5, marginLeft: 'auto', flexShrink: 0 }}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed
              ? <ChevronRight size={14} color="var(--text-muted)" />
              : <ChevronLeft  size={14} color="var(--text-muted)" />
            }
          </button>

          {/* Mobile close */}
          <button
            onClick={onMobileClose}
            className="btn btn-ghost btn-icon flex md:hidden"
            style={{ padding: 5, marginLeft: 'auto' }}
          >
            <X size={15} color="var(--text-muted)" />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '8px 6px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
          {visibleNav.map(item => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onMobileClose}
                title={collapsed ? item.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: collapsed ? '8px' : '7px 10px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  transition: 'all 140ms ease',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--brand)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--bg-selected)' : 'transparent',
                  borderLeft: isActive ? '2px solid var(--brand)' : '2px solid transparent',
                  position: 'relative',
                }}
                className="nav-item"
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <span style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7 }}>
                  {item.icon}
                </span>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.16 }}
                      style={{ overflow: 'hidden', whiteSpace: 'nowrap', flex: 1 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!collapsed && item.badge && (
                  <span
                    style={{
                      fontSize: 10, fontWeight: 600,
                      background: 'var(--brand)',
                      color: '#fff',
                      borderRadius: 10,
                      padding: '1px 6px',
                      flexShrink: 0,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User section */}
        <div style={{ padding: '8px 6px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
          {/* User card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: collapsed ? '8px' : '8px 10px',
              borderRadius: 6,
              background: 'var(--bg-card-2)',
              justifyContent: collapsed ? 'center' : 'flex-start',
              marginBottom: 4,
            }}
          >
            <div
              className="avatar"
              style={{
                width: 30, height: 30,
                background: 'var(--brand)',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {getInitials()}
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.16 }}
                  style={{ overflow: 'hidden', flex: 1 }}
                >
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {getName()}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 1 }}>
                    <span style={{ color: meta.color }}>{meta.icon}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{meta.label}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sign out */}
          <button
            onClick={logout}
            title={collapsed ? 'Sign Out' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              width: '100%',
              padding: collapsed ? '7px' : '7px 10px',
              borderRadius: 6,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 400,
              color: 'var(--text-muted)',
              transition: 'all 140ms ease',
              justifyContent: collapsed ? 'center' : 'flex-start',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--error-bg)';
              (e.currentTarget as HTMLElement).style.color = 'var(--error)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
            }}
          >
            <LogOut size={14} style={{ flexShrink: 0 }} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.16 }}
                  style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
    </>
  );
}
