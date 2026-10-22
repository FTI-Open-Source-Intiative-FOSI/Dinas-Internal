import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { USERS, ROLES, DINAS_LIST, ORGANISASI } from '../data/mockData';
import { LogIn, Sparkles, ShieldCheck } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const [selectedUser, setSelectedUser] = useState('');

  const groupedUsers = {
    'Presidium BEM': USERS.filter(u =>
      [ROLES.GUBERNUR, ROLES.SEKRETARIS_DAERAH, ROLES.BENDAHARA_DAERAH].includes(u.role)
    ),
    'Kepala Dinas & Kepala Biro': USERS.filter(u =>
      [ROLES.KEPALA_DINAS, ROLES.KEPALA_BIRO].includes(u.role)
    ),
    'Sekretaris Dinas & Biro': USERS.filter(u =>
      [ROLES.SEKRETARIS_DINAS, ROLES.SEKRETARIS_BIRO].includes(u.role)
    ),
    'Bendahara Dinas & Biro': USERS.filter(u =>
      [ROLES.BENDAHARA_DINAS, ROLES.BENDAHARA_BIRO].includes(u.role)
    ),
    'Staff Ahli & Pelaksana': USERS.filter(u => u.role === ROLES.STAFF),
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedUser) {
      login(selectedUser);
    }
  };

  const getDinasName = (dinasId) => {
    if (!dinasId) return '';
    const dinas = DINAS_LIST.find(d => d.id === dinasId);
    return dinas ? ` (${dinas.nama})` : '';
  };

  // Quick select accounts for easy testing
  const quickAccounts = [
    { id: 'u1', label: 'Gubernur (Mujahid Adlis Salam)' },
    { id: 'u3', label: 'Bendahara Daerah (Ashyra Prasiwi)' },
    { id: 'u36', label: 'Kadis Internal (Ferdian Rahman)' },
    { id: 'u44', label: 'Kadis Kastrat (Bayu Mutawakkil)' },
    { id: 'u7', label: 'Staff Audkes (Muhammad Rafi Saddiq)' },
  ];

  return (
    <div className="login-page">
      <div className="login-card" style={{ maxWidth: 540 }}>
        <div className="login-logo" style={{ flexDirection: 'column', textAlign: 'center', gap: 'var(--space-3)' }}>
          <img
            src="/logo-bem.png"
            alt="Logo BEM KM FTI UNAND"
            style={{
              width: 84,
              height: 84,
              objectFit: 'contain',
              margin: '0 auto',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
            }}
          />
          <div className="login-logo-text">
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--gray-900)' }}>
              {ORGANISASI.nama}
            </h2>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--primary-50)',
              color: 'var(--primary-700)',
              padding: '4px 12px',
              borderRadius: 9999,
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              marginTop: 4
            }}>
              <Sparkles size={13} />
              Kabinet {ORGANISASI.kabinet} • Periode {ORGANISASI.periode}
            </div>
          </div>
        </div>

        <form onSubmit={handleLogin} style={{ marginTop: 'var(--space-5)' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600 }}>Pilih Akun Pengurus ({USERS.length} Terdaftar)</label>
            <select
              className="form-select"
              value={selectedUser}
              onChange={e => setSelectedUser(e.target.value)}
              required
              style={{ fontSize: '0.9rem', padding: '10px 12px' }}
            >
              <option value="">-- Pilih Akun Fungsionaris untuk Masuk --</option>
              {Object.entries(groupedUsers).map(([group, userList]) => (
                <optgroup key={group} label={`${group} (${userList.length})`}>
                  {userList.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.nama}, {user.role}{getDinasName(user.dinasId)}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Quick Demo Buttons */}
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)', display: 'block', marginBottom: 6 }}>
              Akses Cepat Demo:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {quickAccounts.map(acc => (
                <button
                  type="button"
                  key={acc.id}
                  onClick={() => setSelectedUser(acc.id)}
                  style={{
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)',
                    background: selectedUser === acc.id ? 'var(--primary-600)' : 'var(--gray-100)',
                    color: selectedUser === acc.id ? '#fff' : 'var(--gray-700)',
                    border: '1px solid',
                    borderColor: selectedUser === acc.id ? 'var(--primary-600)' : 'var(--gray-200)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={!selectedUser}
            style={{ width: '100%', marginTop: 'var(--space-3)' }}
          >
            <LogIn size={18} />
            Masuk ke Sistem Manajemen
          </button>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          marginTop: 'var(--space-5)',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--gray-100)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--gray-500)'
        }}>
          <ShieldCheck size={14} color="var(--primary-600)" />
          <span>Sistem Manajemen Internal Resmi BEM KM FTI UNAND</span>
        </div>
      </div>
    </div>
  );
}
