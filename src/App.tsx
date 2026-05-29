// ============================================================
// CII AI Training Hub — App Router (React Router v7)
// ============================================================
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Layout
import PortalLayout from './components/layout/PortalLayout';

// Auth
import LoginPage from './components/auth/LoginPage';

// Pages
import DashboardPage    from './components/dashboard/DashboardPage';
import ModulesPage      from './components/lms/ModulesPage';
import SessionsPage     from './components/sessions/SessionsPage';
import SessionDetailsPage from './components/sessions/SessionDetailsPage';
import WhatsappHelpPage from './components/support/WhatsappHelpPage';
import InvitationPosterPage from './components/support/InvitationPosterPage';
import IdeasPage        from './components/ideas/IdeasPage';
import AIToolsPage      from './components/tools/AIToolsPage';
import ReportsPage      from './components/reports/ReportsPage';
import CertificatesPage from './components/reports/CertificatesPage';
import ProfilePage      from './components/shared/ProfilePage';
import AgendaPage       from './components/agenda/AgendaPage';
import TutorialAIPage       from './components/tutorial/TutorialAIPage';
import AboutDeveloperPage   from './components/about/AboutDeveloperPage';
import RealProblemsPage     from './components/problems/RealProblemsPage';

// ── Route guard ──────────────────────────────────────────────
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function RequireRole({ roles, children }: { roles: string[]; children: React.ReactNode }) {
  const { role, isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!role || !roles.includes(role)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function RedirectIfAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

// ── App ──────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <LoginPage />
            </RedirectIfAuth>
          }
        />

        {/* Protected portal */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <PortalLayout />
            </RequireAuth>
          }
        >
          {/* Default redirect */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard — all roles */}
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Modules — all roles */}
          <Route path="modules" element={<ModulesPage />} />

          {/* Sessions — all roles */}
          <Route path="sessions" element={<SessionsPage />} />
          <Route path="sessions/:id" element={<SessionDetailsPage />} />

          {/* WhatsApp Support Help — all roles */}
          <Route path="whatsapp-help" element={<WhatsappHelpPage />} />

          {/* Event Invitation — all roles */}
          <Route path="invitation" element={<InvitationPosterPage />} />

          {/* Ideas Bank — all roles */}
          <Route path="ideas" element={<IdeasPage />} />

          {/* AI Tools — all roles */}
          <Route path="tools" element={<AIToolsPage />} />

          {/* Program Agenda — all roles */}
          <Route path="agenda" element={<AgendaPage />} />

          {/* Tutorial-AI — all roles */}
          <Route path="tutorial-ai" element={<TutorialAIPage />} />

          {/* About Developer — all roles */}
          <Route path="about-developer" element={<AboutDeveloperPage />} />

          {/* Real Problem Statements — all roles */}
          <Route path="real-problems" element={<RealProblemsPage />} />

          {/* Reports — faculty + admin only */}
          <Route
            path="reports"
            element={
              <RequireRole roles={['faculty', 'admin']}>
                <ReportsPage />
              </RequireRole>
            }
          />

          {/* Certificates — students only */}
          <Route
            path="certificates"
            element={
              <RequireRole roles={['student']}>
                <CertificatesPage />
              </RequireRole>
            }
          />

          {/* Profile — all roles */}
          <Route path="profile" element={<ProfilePage />} />

          {/* Catch-all → dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Absolute catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
