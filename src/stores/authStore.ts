// ============================================================
// CII AI Training Hub — Auth Store (Zustand)
// ============================================================
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Student, Faculty, Admin, UserRole } from '../types';
import { MOCK_STUDENT, MOCK_FACULTY } from '../data/mockData';

interface AuthState {
  user: Student | Faculty | Admin | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<Student | Faculty | Admin>) => void;
}

// Demo credentials for the portal
const DEMO_USERS = {
  'cii_admin1': { password: 'CII@Admin#2026!', role: 'admin' as UserRole },
  'cii_admin2': { password: 'CII@Portal#2026!', role: 'admin' as UserRole },
  'fac_anjit_raja': { password: 'Faculty@123', role: 'faculty' as UserRole },
  'BSC_CSAI_2024_001': { password: 'Student@123', role: 'student' as UserRole },
  // Quick demo logins
  'student': { password: 'demo', role: 'student' as UserRole },
  'faculty': { password: 'demo', role: 'faculty' as UserRole },
  'admin': { password: 'demo', role: 'admin' as UserRole },
};

const MOCK_ADMIN = {
  id: 'a001',
  username: 'cii_admin1',
  email: 'admin@rgu.edu.in',
  role: 'admin' as UserRole,
  isActive: true,
  createdAt: '2024-01-01',
  name: 'CII Administrator',
  level: 1 as const,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (username: string, password: string) => {
        set({ isLoading: true });
        // Simulate API call delay
        await new Promise(r => setTimeout(r, 800));

        const creds = DEMO_USERS[username as keyof typeof DEMO_USERS];
        if (!creds || creds.password !== password) {
          set({ isLoading: false });
          return { success: false, error: 'Invalid username or password' };
        }

        let user;
        if (creds.role === 'student') {
          user = MOCK_STUDENT;
        } else if (creds.role === 'faculty') {
          user = MOCK_FACULTY;
        } else {
          user = MOCK_ADMIN;
        }

        set({ user, role: creds.role, isAuthenticated: true, isLoading: false });
        return { success: true };
      },

      logout: () => {
        set({ user: null, role: null, isAuthenticated: false });
      },

      updateUser: (updates) => {
        const current = get().user;
        if (current) {
          set({ user: { ...current, ...updates } as any });
        }
      },
    }),
    {
      name: 'cii-auth',
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
