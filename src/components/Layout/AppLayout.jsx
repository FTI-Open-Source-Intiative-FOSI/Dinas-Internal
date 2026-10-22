import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Toast from '../ui/Toast';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Topbar onMenuToggle={() => setSidebarOpen(prev => !prev)} />
        <main>
          <Outlet />
        </main>
      </div>
      <Toast />
    </div>
  );
}
