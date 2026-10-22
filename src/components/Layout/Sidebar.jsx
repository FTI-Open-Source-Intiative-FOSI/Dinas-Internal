import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, FolderKanban, Wallet, Users, CalendarDays,
  Bell, ClipboardCheck, LogOut, X
} from 'lucide-react';

const iconMap = {
  'dashboard': LayoutDashboard,
  'program-kerja': FolderKanban,
  'keuangan': Wallet,
  'rapat': Users,
  'piket': ClipboardCheck,
  'kalender': CalendarDays,
};

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout, getNavItems, isStaff } = useAuth();
  const { notifikasi } = useApp();
  const location = useLocation();
  const navItems = getNavItems();

  const unreadNotifCount = notifikasi.filter(n => {
    if (n.read) return false;
    if (isStaff?.() && (n.target === 'presidium' || n.pesan?.toLowerCase().includes('presidium') || n.link?.includes('/rapat/r1'))) {
      return false;
    }
    return true;
  }).length;

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div style={{
            width: 36,
            height: 36,
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            flexShrink: 0
          }}>
            <img src="/logo-bem.png" alt="Logo BEM KM FTI UNAND" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div className="sidebar-brand-text">
            BEM KM FTI UNAND
            <span>Kabinet Vismayakriya</span>
          </div>
          <button className="btn-icon menu-toggle" onClick={onClose} style={{ color: '#fff', marginLeft: 'auto' }}>
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Menu</div>
          {navItems.map(item => {
            const Icon = iconMap[item.key] || LayoutDashboard;
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.key}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}

          <div className="nav-section-label">Lainnya</div>
          <NavLink
            to="/notifikasi"
            className={`nav-item ${location.pathname === '/notifikasi' ? 'active' : ''}`}
            onClick={onClose}
          >
            <Bell size={18} />
            Notifikasi
            {unreadNotifCount > 0 && (
              <span style={{
                marginLeft: 'auto',
                background: 'var(--danger)',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '9999px',
              }}>
                {unreadNotifCount}
              </span>
            )}
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user" onClick={logout} title="Keluar">
            <div className="sidebar-avatar">{user?.avatar}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.nama}</div>
              <div className="sidebar-user-role">{user?.role}</div>
            </div>
            <LogOut size={16} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
          </div>
        </div>
      </aside>
    </>
  );
}
