// ============================================================
// Dashboard page — routes to correct role view
// ============================================================
import { useAuthStore } from '../../stores/authStore';
import StudentDashboard from './StudentDashboard';
import FacultyDashboard from './FacultyDashboard';
import AdminDashboard from './AdminDashboard';

export default function DashboardPage() {
  const { role } = useAuthStore();
  if (role === 'faculty') return <FacultyDashboard />;
  if (role === 'admin')   return <AdminDashboard />;
  return <StudentDashboard />;
}
