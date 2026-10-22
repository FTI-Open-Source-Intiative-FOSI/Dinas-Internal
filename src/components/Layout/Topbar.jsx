import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Bell, Menu } from 'lucide-react';

const breadcrumbMap = {
  '/': 'Dashboard',
  '/program-kerja': 'Program Kerja',
  '/keuangan': 'Keuangan',
  '/rapat': 'Rapat',
  '/piket': 'Piket Sekretariat',
  '/kalender': 'Kalender',
  '/notifikasi': 'Notifikasi',
};

export default function Topbar({ onMenuToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { unreadNotifCount } = useApp();

  const pathParts = location.pathname.split('/').filter(Boolean);
  let breadcrumb = 'Dashboard';
  if (pathParts.length > 0) {
    breadcrumb = breadcrumbMap['/' + pathParts[0]] || pathParts[0];
  }

  return (
    <header className="topbar">
      <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <button className="menu-toggle" onClick={onMenuToggle}>
          <Menu size={20} />
        </button>

        <div className="topbar-logo-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '12px', borderRight: '1px solid var(--gray-200)' }}>
          <img
            src="/logo-bem.png"
            alt="Logo BEM KM FTI UNAND"
            style={{ width: 28, height: 28, objectFit: 'contain' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-700)', lineHeight: 1.15 }}>
              BEM KM FTI UNAND
            </span>
            <span style={{ fontSize: '9px', color: 'var(--gray-500)', lineHeight: 1 }}>
              Kabinet Vismayakriya
            </span>
          </div>
        </div>

        <div className="topbar-breadcrumb">
          <span className="current">{breadcrumb}</span>
        </div>
      </div>

      <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        {user && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 10px',
            background: 'var(--gray-100)',
            borderRadius: '9999px',
            fontSize: 'var(--font-size-xs)'
          }}>
            <span style={{ fontWeight: 600, color: 'var(--gray-800)' }}>{user.nama}</span>
            <span style={{
              background: 'var(--primary-100)',
              color: 'var(--primary-700)',
              padding: '1px 6px',
              borderRadius: '9999px',
              fontSize: '10px',
              fontWeight: 600
            }}>
              {user.role}
            </span>
          </div>
        )}

        <button className="notif-btn" onClick={() => navigate('/notifikasi')} title="Notifikasi">
          <Bell size={20} />
          {unreadNotifCount > 0 && (
            <span className="notif-badge">{unreadNotifCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}
