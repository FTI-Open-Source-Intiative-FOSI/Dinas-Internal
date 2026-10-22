import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  Bell, Wallet, FolderKanban, Users, ClipboardCheck, CheckCheck,
  BellRing, Filter, CheckCircle
} from 'lucide-react';

const iconMap = {
  dana: { icon: Wallet, className: 'notif-dana', label: 'Keuangan' },
  proker: { icon: FolderKanban, className: 'notif-proker', label: 'Program Kerja' },
  rapat: { icon: Users, className: 'notif-rapat', label: 'Rapat' },
  piket: { icon: ClipboardCheck, className: 'notif-piket', label: 'Piket' },
  pengumuman: { icon: BellRing, className: 'notif-rapat', label: 'Pengumuman' },
};

export default function Notifikasi() {
  const { notifikasi, markNotifRead, markAllNotifRead } = useApp();
  const { isStaff } = useAuth();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('all');

  const handleClick = (notif) => {
    markNotifRead(notif.id);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const formatRelativeTime = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.max(0, now - date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit lalu`;
    if (hours < 24) return `${hours} jam lalu`;
    if (days === 1) return 'Kemarin';
    return `${days} hari lalu`;
  };

  // Staff tidak mendapatkan pemberitahuan presidium
  const visibleNotif = notifikasi.filter(n => {
    if (isStaff() && (n.target === 'presidium' || n.pesan?.toLowerCase().includes('presidium') || n.link?.includes('/rapat/r1'))) {
      return false;
    }
    return true;
  });

  const unreadCount = visibleNotif.filter(n => !n.read).length;

  const filteredNotif = filterType === 'all'
    ? visibleNotif
    : visibleNotif.filter(n => n.tipe === filterType);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Bell className="page-title-icon" />
            Pusat Notifikasi & Pengumuman
          </h1>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)', marginTop: 4 }}>
            Pemberitahuan resmi rapat dinas, perubahan progress program kerja, dan jadwal piket.
          </p>
        </div>

        {unreadCount > 0 && (
          <button className="btn btn-secondary btn-sm" onClick={markAllNotifRead} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <CheckCheck size={16} /> Tandai Semua Dibaca
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
        <button className={`tab ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>
          Semua ({notifikasi.length})
        </button>
        <button className={`tab ${filterType === 'rapat' ? 'active' : ''}`} onClick={() => setFilterType('rapat')}>
          Rapat
        </button>
        <button className={`tab ${filterType === 'pengumuman' ? 'active' : ''}`} onClick={() => setFilterType('pengumuman')}>
          Pengumuman
        </button>
        <button className={`tab ${filterType === 'proker' ? 'active' : ''}`} onClick={() => setFilterType('proker')}>
          Program Kerja
        </button>
        <button className={`tab ${filterType === 'piket' ? 'active' : ''}`} onClick={() => setFilterType('piket')}>
          Piket
        </button>
      </div>

      <div className="card">
        {filteredNotif.length > 0 ? (
          <div className="notif-list">
            {filteredNotif.map(notif => {
              const config = iconMap[notif.tipe] || iconMap.proker;
              const Icon = config.icon;
              return (
                <div
                  key={notif.id}
                  className={`notif-item ${!notif.read ? 'unread' : ''}`}
                  onClick={() => handleClick(notif)}
                  style={{ cursor: 'pointer', transition: 'background 0.15s ease' }}
                >
                  <div className={`notif-icon ${config.className}`}>
                    <Icon size={16} />
                  </div>
                  <div className="notif-content" style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="badge badge-persiapan" style={{ fontSize: '10px', padding: '1px 6px' }}>
                        {config.label}
                      </span>
                      <span className="notif-time">{formatRelativeTime(notif.waktu)}</span>
                    </div>

                    <div className="notif-message" style={{ fontWeight: !notif.read ? 600 : 400, marginTop: 3 }}>
                      {notif.pesan}
                    </div>

                    {notif.detail && (
                      <div style={{ fontSize: '11px', color: 'var(--gray-600)', marginTop: 4, background: 'rgba(0,0,0,0.03)', padding: '4px 8px', borderRadius: 4 }}>
                        {notif.detail}
                      </div>
                    )}
                  </div>
                  {!notif.read && <div className="notif-dot" title="Belum dibaca" />}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <Bell />
            <p>Tidak ada notifikasi pada kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
