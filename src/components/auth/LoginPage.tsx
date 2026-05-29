// ============================================================
// CII AI Training Hub — Login Page (Microsoft Fluent Redesign)
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login, isLoading } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please enter credentials');
      return;
    }
    const result = await login(username, password);
    if (!result.success) {
      toast.error(result.error || 'Login failed');
    } else {
      toast.success('Welcome to CII AI Hub!');
    }
  };

  const quickLogin = async (u: string, p: string) => {
    const result = await login(u, p);
    if (!result.success) toast.error(result.error || 'Login failed');
    else toast.success('Welcome to CII AI Hub!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--bg-app)]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md px-4"
      >
        {/* Logo — Fluent / Microsoft Inspired */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 bg-[var(--bg-selected)] border border-[var(--brand-border)]">
            <Sparkles size={22} className="text-[var(--brand)]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]" style={{ margin: 0 }}>
            CII AI Training Hub
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Centre for Innovation & Incubation · RGU 2026
          </p>
        </div>

        {/* Login card */}
        <div className="card rounded-lg p-8 bg-[var(--bg-card)] border border-[var(--border-strong)]">
          <h2 className="text-base font-semibold mb-6 text-[var(--text-primary)]">
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-bold mb-1.5 text-[var(--text-secondary)] uppercase tracking-wider">
                USERNAME / ROLL NUMBER
              </label>
              <input
                className="input"
                placeholder="BSC_CSAI_2024_001 or 'student'"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold mb-1.5 text-[var(--text-secondary)] uppercase tracking-wider">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  className="input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="btn btn-ghost btn-icon absolute right-1.5 top-1/2 -translate-y-1/2"
                  style={{ padding: '4px' }}
                >
                  {showPw ? <EyeOff size={15} className="text-[var(--text-secondary)]" /> : <Eye size={15} className="text-[var(--text-secondary)]" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full mt-2"
              disabled={isLoading}
              style={{ fontSize: 13, padding: '10px 16px' }}
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><LogIn size={15} /> Sign In</>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="divider flex-1" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">Quick Demo</span>
            <div className="divider flex-1" />
          </div>

          {/* Quick login buttons */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: '🎓 Student', u: 'student', p: 'demo' },
              { label: '👨‍🏫 Faculty', u: 'faculty', p: 'demo' },
              { label: '🛡️ Admin', u: 'admin', p: 'demo' },
            ].map(item => (
              <button
                key={item.u}
                className="btn btn-secondary text-xs"
                style={{ padding: '6px 4px', fontSize: '11px' }}
                onClick={() => quickLogin(item.u, item.p)}
                disabled={isLoading}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] mt-6 text-[var(--text-secondary)] opacity-80">
          Prof. R. Anjit Raja · Director, CII · Royal Group of Universities
        </p>
      </motion.div>
    </div>
  );
}
