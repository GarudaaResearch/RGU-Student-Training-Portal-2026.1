// ============================================================
// CII AI Training Hub — Login Page (Microsoft Fluent Redesign)
// ============================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { Eye, EyeOff, LogIn } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full px-4"
        style={{ maxWidth: '490px' }}
      >
        {/* Logo — Fluent / Microsoft Inspired */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-3">
            <img src="/rgu-logo.png" alt="Rathinam Global Deemed to be University (RGU) Logo" className="h-16 w-auto object-contain" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]" style={{ margin: 0 }}>
            CII AI Training Hub
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Centre for Innovation & Incubation · RGU 2026
          </p>
        </div>

        {/* Login card */}
        <div className="card rounded-lg bg-[var(--bg-card)] border border-[var(--border-strong)]" style={{ padding: '40px', boxShadow: 'var(--shadow-xl)' }}>
          <h2 className="text-base font-semibold mb-6 text-[var(--text-primary)]">
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-[var(--text-secondary)] uppercase tracking-wider">
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
              <label className="block text-xs font-bold mb-1.5 text-[var(--text-secondary)] uppercase tracking-wider">
                PASSWORD
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  className="input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ paddingRight: '44px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    padding: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    opacity: 0.8,
                    zIndex: 10,
                  }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
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
            <span className="text-xs uppercase font-bold tracking-wider text-[var(--text-muted)]">Quick Demo</span>
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
        <p className="text-center text-xs mt-6 text-[var(--text-secondary)] opacity-80">
          Prof. R. Anjit Raja · Director, CII · Rathinam Global Deemed to be University (RGU)
        </p>
      </motion.div>
    </div>
  );
}
