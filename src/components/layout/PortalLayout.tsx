// ============================================================
// Portal Layout — wraps Sidebar + Topbar + page content
// ============================================================
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function PortalLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="portal-layout">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="portal-main">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
