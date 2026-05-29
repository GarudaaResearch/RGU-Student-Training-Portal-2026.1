// ============================================================
// Topbar — Microsoft Learn / Fluent Design
// ============================================================
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { Menu, Bell, Search, ChevronDown, Settings, User, LogOut } from 'lucide-react';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard':    'Dashboard',
  '/modules':      'Learning Modules',
  '/sessions':     'Live Sessions',
  '/ideas':        'Ideas Bank',
  '/tools':        'AI Tools Directory',
  '/reports':      'Analytics & Reports',
  '/certificates': 'My Certificates',
  '/profile':      'My Profile',
  '/leaderboard':  'Leaderboard',
  '/whatsapp-help':     'WhatsApp Support Group',
  '/invitation':        'Event Invitation',
  '/about-developer':   'About the Developer',
  '/real-problems':     'RGU – Real Problem Statements',
};

interface TopbarProps { onMenuClick: () => void; }

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { user, role, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen]     = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef   = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  let pageTitle = PAGE_TITLES[location.pathname] || 'CII AI Hub';
  if (location.pathname.startsWith('/sessions/') && location.pathname !== '/sessions') {
    pageTitle = 'Session Details';
  }

  const getName = () => {
    if (!user) return '';
    return 'name' in user ? (user as any).name : (user as any).username;
  };
  const getInitials = () =>
    getName().split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const notifications = [
    { id: 1, msg: 'AI Basics session tomorrow at 9 AM', time: '2h ago', unread: true, icon: '📅' },
    { id: 2, msg: 'Hackathon registration closes May 30', time: '5h ago', unread: true, icon: '🏆' },
    { id: 3, msg: 'Module A: AI Literacy completed!', time: '1d ago', unread: false, icon: '✅' },
  ];
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="topbar">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="btn btn-ghost btn-icon flex md:hidden"
        aria-label="Open navigation"
        style={{ padding: 6 }}
      >
        <Menu size={18} color="var(--text-secondary)" />
      </button>

      {/* Page title */}
      <motion.div
        key={pageTitle}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <span
          className="hidden md:block"
          style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
        >
          {pageTitle}
        </span>
      </motion.div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Search bar */}
      <div className="relative hidden md:flex items-center" style={{ width: 220 }}>
        <Search
          size={13}
          color="var(--text-muted)"
          style={{ position: 'absolute', left: 10, pointerEvents: 'none' }}
        />
        <input
          className="input"
          style={{
            paddingLeft: 32,
            paddingTop: 6,
            paddingBottom: 6,
            fontSize: 12,
            background: 'var(--bg-card)',
          }}
          placeholder="Search modules, sessions..."
        />
      </div>

      {/* Notification bell */}
      <div ref={notifRef} style={{ position: 'relative' }}>
        <button
          className="btn btn-ghost btn-icon"
          onClick={() => { setNotifOpen(v => !v); setProfileOpen(false); }}
          style={{ position: 'relative', padding: 7 }}
          aria-label="Notifications"
        >
          <Bell size={17} color="var(--text-secondary)" />
          {unreadCount > 0 && <span className="notif-dot" />}
        </button>

        <AnimatePresence>
          {notifOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.14 }}
              style={{
                position: 'absolute',
                right: 0, top: 44,
                width: 300,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--r-lg)',
                boxShadow: 'var(--shadow-xl)',
                zIndex: 60,
                overflow: 'hidden',
              }}
            >
              <div style={{
                padding: '10px 14px',
                borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>Notifications</span>
                {unreadCount > 0 && (
                  <span className="badge badge-blue" style={{ fontSize: 10 }}>{unreadCount} new</span>
                )}
              </div>

              {notifications.map(n => (
                <div
                  key={n.id}
                  style={{
                    padding: '10px 14px',
                    borderBottom: '1px solid var(--border-muted)',
                    background: n.unread ? 'var(--brand-sub)' : 'transparent',
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                    cursor: 'pointer',
                    transition: 'background 140ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.background = n.unread ? 'var(--brand-sub)' : 'transparent')}
                >
                  <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.4 }}>{n.msg}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{n.time}</div>
                  </div>
                  {n.unread && (
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand)', flexShrink: 0, marginTop: 4 }} />
                  )}
                </div>
              ))}

              <div style={{ padding: '8px 14px', textAlign: 'center' }}>
                <button style={{ fontSize: 11, color: 'var(--text-brand)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Mark all as read
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Profile dropdown */}
      <div ref={profileRef} style={{ position: 'relative' }}>
        <button
          onClick={() => { setProfileOpen(v => !v); setNotifOpen(false); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '5px 8px 5px 6px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            borderRadius: 'var(--r-sm)',
            transition: 'background 140ms ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <div
            className="avatar"
            style={{
              width: 28, height: 28,
              background: 'var(--brand)',
              color: '#fff', fontSize: 11, fontWeight: 700,
              outline: profileOpen ? '2px solid var(--brand)' : 'none',
              outlineOffset: 2,
            }}
          >
            {getInitials()}
          </div>
          <div className="hidden sm:block text-left" style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>
              {getName().split(' ')[0]}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, textTransform: 'capitalize' }}>
              {role}
            </div>
          </div>
          <ChevronDown size={12} color="var(--text-muted)" className="hidden sm:block" />
        </button>

        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.14 }}
              style={{
                position: 'absolute',
                right: 0, top: 44,
                width: 200,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--r-lg)',
                boxShadow: 'var(--shadow-xl)',
                zIndex: 60,
                overflow: 'hidden',
              }}
            >
              {/* User info header */}
              <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{getName()}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{(user as any)?.email}</div>
              </div>

              {/* Menu items */}
              <div style={{ padding: '4px' }}>
                {[
                  { icon: <User size={13} />, label: 'My Profile', action: () => { navigate('/profile'); setProfileOpen(false); } },
                  { icon: <Settings size={13} />, label: 'Settings', action: () => setProfileOpen(false) },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 9,
                      width: '100%', padding: '8px 10px',
                      borderRadius: 'var(--r-sm)',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      fontSize: 12, color: 'var(--text-secondary)',
                      transition: 'background 140ms ease',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => { (e.currentTarget.style.background = 'var(--bg-hover)'); (e.currentTarget.style.color = 'var(--text-primary)'); }}
                    onMouseLeave={e => { (e.currentTarget.style.background = 'transparent'); (e.currentTarget.style.color = 'var(--text-secondary)'); }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Sign out */}
              <div style={{ padding: '4px', borderTop: '1px solid var(--border)' }}>
                <button
                  onClick={() => { logout(); setProfileOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    width: '100%', padding: '8px 10px',
                    borderRadius: 'var(--r-sm)',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    fontSize: 12, color: 'var(--error)',
                    transition: 'background 140ms ease',
                    textAlign: 'left',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--error-bg)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <LogOut size={13} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
