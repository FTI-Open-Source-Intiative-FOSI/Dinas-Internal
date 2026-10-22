import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Users, Calendar, MapPin, Clock, Plus, Video, Building, Search, XCircle, CheckCircle
} from 'lucide-react';
import { getDinasById, getUserById, getProkerById, formatDate, formatTime, USERS, DINAS_LIST } from '../../data/mockData';
import Modal from '../../components/ui/Modal';

export default function DaftarRapat() {
  const { user, isPimpinan, isStaff, canManageRapat } = useAuth();
  const { rapat, createRapat } = useApp();
  const navigate = useNavigate();

  const [tab, setTab] = useState('upcoming');
  const [search, setSearch] = useState('');
  const [filterDinas, setFilterDinas] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form State
  const defaultDinasId = user?.dinasId || 'internal';
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    dinasId: defaultDinasId,
    tanggal: '2026-09-18',
    waktu: '19:00',
    waktuSelesai: '21:00',
    lokasi: 'Sekretariat BEM KM FTI',
    mode: 'Offline',
    linkMeeting: '',
    peserta: USERS.filter(u => u.dinasId === defaultDinasId).map(u => u.id)
  });

  // Filter rapat: Staff ahli tidak diberikan akses / notifikasi tentang forum presidium
  let filtered = rapat.filter(r => {
    if (isStaff?.() && (r.isPresidium || r.judul?.toLowerCase().includes('presidium') || r.dinasId === 'sekda')) {
      return false;
    }
    return true;
  });
  if (filterDinas) {
    filtered = filtered.filter(r => r.dinasId === filterDinas);
  }
  if (search) {
    filtered = filtered.filter(r =>
      r.judul.toLowerCase().includes(search.toLowerCase()) ||
      (r.lokasi && r.lokasi.toLowerCase().includes(search.toLowerCase()))
    );
  }

  const upcoming = filtered.filter(r => r.status === 'upcoming').sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
  const selesai = filtered.filter(r => r.status === 'selesai').sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  const dibatalkan = filtered.filter(r => r.status === 'dibatalkan').sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  let displayList = upcoming;
  if (tab === 'selesai') displayList = selesai;
  if (tab === 'dibatalkan') displayList = dibatalkan;

  // Handle Dinas change in form
  const handleFormDinasChange = (newDinasId) => {
    const dinasUsers = USERS.filter(u => u.dinasId === newDinasId).map(u => u.id);
    setFormData({
      ...formData,
      dinasId: newDinasId,
      peserta: dinasUsers.length > 0 ? dinasUsers : [user?.id]
    });
  };

  const togglePeserta = (userId) => {
    setFormData(prev => ({
      ...prev,
      peserta: prev.peserta.includes(userId)
        ? prev.peserta.filter(id => id !== userId)
        : [...prev.peserta, userId]
    }));
  };

  const selectAllDinasMembers = () => {
    const allUnit = USERS.filter(u => u.dinasId === formData.dinasId).map(u => u.id);
    setFormData(prev => ({ ...prev, peserta: allUnit }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const createdId = createRapat(formData, user);
    setIsCreateModalOpen(false);
    navigate(`/rapat/${createdId}`);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Users className="page-title-icon" />
            Manajemen Rapat
          </h1>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)', marginTop: 4 }}>
            Kelola agenda rapat, absensi pengenalan wajah, dan pengumuman dinas BEM KM FTI UNAND.
          </p>
        </div>

        {canManageRapat() && (
          <button
            className="btn btn-primary"
            onClick={() => setIsCreateModalOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Plus size={16} />
            Buat Rapat
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
        <button className={`tab ${tab === 'upcoming' ? 'active' : ''}`} onClick={() => setTab('upcoming')}>
          Mendatang ({upcoming.length})
        </button>
        <button className={`tab ${tab === 'selesai' ? 'active' : ''}`} onClick={() => setTab('selesai')}>
          Selesai ({selesai.length})
        </button>
        <button className={`tab ${tab === 'dibatalkan' ? 'active' : ''}`} onClick={() => setTab('dibatalkan')}>
          Dibatalkan ({dibatalkan.length})
        </button>
      </div>

      {/* Filters */}
      <div className="filter-bar" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="search-input" style={{ minWidth: 260 }}>
          <Search size={16} />
          <input
            type="text"
            className="form-input"
            placeholder="Cari judul rapat atau lokasi..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select
          className="form-select"
          value={filterDinas}
          onChange={e => setFilterDinas(e.target.value)}
          style={{ width: 'auto', minWidth: 180 }}
        >
          <option value="">Semua Dinas Penyelenggara</option>
          {DINAS_LIST.map(d => (
            <option key={d.id} value={d.id}>{d.nama}</option>
          ))}
        </select>
      </div>

      {/* List Rapat */}
      {displayList.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {displayList.map(r => {
            const dinas = r.dinasId ? getDinasById(r.dinasId) : null;
            const proker = r.prokerId ? getProkerById(r.prokerId) : null;
            const attendanceCount = r.attendance ? r.attendance.length : 0;

            return (
              <div
                key={r.id}
                className="card"
                style={{
                  cursor: 'pointer',
                  transition: 'box-shadow var(--transition-fast)',
                  borderLeft: r.status === 'upcoming' ? '4px solid var(--primary-500)' : r.status === 'dibatalkan' ? '4px solid var(--danger)' : '4px solid var(--success)'
                }}
                onClick={() => navigate(`/rapat/${r.id}`)}
                onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                  <div style={{ flex: 1, minWidth: 280 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span className="badge badge-persiapan">{dinas?.nama || 'BEM FTI'}</span>
                      <span style={{ fontSize: '11px', color: 'var(--gray-500)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {r.mode === 'Online' ? <Video size={12} color="var(--info)" /> : <Building size={12} />} {r.mode || 'Offline'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, color: 'var(--gray-900)', marginBottom: 'var(--space-2)' }}>
                      {r.judul}
                    </h3>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Calendar size={15} color="var(--primary-600)" /> {formatDate(r.tanggal)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Clock size={15} color="var(--primary-600)" /> {formatTime(r.waktu)} {r.waktuSelesai ? `s/d ${r.waktuSelesai} WIB` : ''}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <MapPin size={15} color="var(--primary-600)" /> {r.lokasi}
                      </span>
                    </div>

                    {r.agenda && (
                      <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-600)', marginTop: 8, lineHeight: 1.4 }}>
                        <strong>Agenda:</strong> {r.agenda}
                      </p>
                    )}
                  </div>

                  {/* Status & Peserta */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-2)' }}>
                    <span className={`badge ${r.status === 'upcoming' ? 'badge-berjalan' : r.status === 'dibatalkan' ? 'badge-ditolak' : 'badge-selesai'}`}>
                      {r.status === 'upcoming' ? 'Mendatang' : r.status === 'dibatalkan' ? 'Dibatalkan' : 'Selesai'}
                    </span>

                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-600)', marginTop: 4 }}>
                      Peserta: <strong>{r.peserta?.length || 0} orang</strong>
                    </div>

                    {attendanceCount > 0 && (
                      <div style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <CheckCircle size={13} /> {attendanceCount} Hadir (Face Scan)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <Users />
            <p>
              {tab === 'upcoming' ? 'Tidak ada rapat mendatang.' : tab === 'selesai' ? 'Belum ada rapat yang selesai.' : 'Tidak ada rapat yang dibatalkan.'}
            </p>
            {canManageRapat() && (
              <button className="btn btn-primary btn-sm mt-4" onClick={() => setIsCreateModalOpen(true)}>
                <Plus size={14} /> Buat Rapat Baru
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal Buat Rapat Baru */}
      {isCreateModalOpen && (
        <Modal
          title="Buat Rapat Baru: BEM KM FTI UNAND"
          onClose={() => setIsCreateModalOpen(false)}
        >
          <form onSubmit={handleCreateSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Judul / Nama Rapat</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="Contoh: Rapat Internal Dinas Internal"
                value={formData.judul}
                onChange={e => setFormData({ ...formData, judul: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Dinas Penyelenggara</label>
                <select
                  className="form-select"
                  value={formData.dinasId}
                  onChange={e => handleFormDinasChange(e.target.value)}
                  disabled={!isPimpinan()}
                >
                  {DINAS_LIST.map(d => (
                    <option key={d.id} value={d.id}>{d.nama} ({d.namaLengkap})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Mode Rapat</label>
                <select
                  className="form-select"
                  value={formData.mode}
                  onChange={e => setFormData({ ...formData, mode: e.target.value })}
                >
                  <option value="Offline">Offline (Tatap Muka)</option>
                  <option value="Online">Online (Zoom / Google Meet)</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Tanggal</label>
                <input
                  type="date"
                  className="form-input"
                  required
                  value={formData.tanggal}
                  onChange={e => setFormData({ ...formData, tanggal: e.target.value })}
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                  <div>
                    <label className="form-label" style={{ fontWeight: 600 }}>Mulai</label>
                    <input
                      type="time"
                      className="form-input"
                      required
                      value={formData.waktu}
                      onChange={e => setFormData({ ...formData, waktu: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontWeight: 600 }}>Selesai</label>
                    <input
                      type="time"
                      className="form-input"
                      required
                      value={formData.waktuSelesai}
                      onChange={e => setFormData({ ...formData, waktuSelesai: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>
                {formData.mode === 'Online' ? 'Platform / Link Meeting' : 'Lokasi / Ruangan'}
              </label>
              <input
                type="text"
                className="form-input"
                required
                placeholder={formData.mode === 'Online' ? 'Contoh: https://meet.google.com/xyz-abcd-efg' : 'Contoh: Sekretariat BEM KM FTI UNAND'}
                value={formData.lokasi}
                onChange={e => setFormData({ ...formData, lokasi: e.target.value, linkMeeting: formData.mode === 'Online' ? e.target.value : formData.linkMeeting })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Deskripsi / Agenda Pembahasan</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="Rincian poin bahasan rapat, materi evaluasi, dll..."
                value={formData.deskripsi}
                onChange={e => setFormData({ ...formData, deskripsi: e.target.value, agenda: e.target.value })}
              />
            </div>

            {/* Peserta Selector */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="form-label" style={{ fontWeight: 600, marginBottom: 0 }}>
                  Peserta Rapat ({formData.peserta.length} terpilih)
                </label>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={selectAllDinasMembers}
                  style={{ fontSize: '11px', color: 'var(--primary-600)' }}
                >
                  Pilih Seluruh Anggota {getDinasById(formData.dinasId)?.nama}
                </button>
              </div>

              <div style={{
                maxHeight: 180,
                overflowY: 'auto',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                background: '#fafafa'
              }}>
                {USERS.filter(u => !formData.dinasId || u.dinasId === formData.dinasId || isPimpinan()).map(u => {
                  const isChecked = formData.peserta.includes(u.id);
                  return (
                    <label
                      key={u.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 'var(--font-size-xs)',
                        background: isChecked ? 'var(--primary-50)' : '#fff',
                        padding: '6px 8px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid',
                        borderColor: isChecked ? 'var(--primary-200)' : 'var(--gray-200)',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePeserta(u.id)}
                      />
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <strong>{u.nama}</strong>
                        <span style={{ color: 'var(--gray-500)', marginLeft: 4 }}>({u.role})</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="modal-footer" style={{ padding: 'var(--space-3) 0 0', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan & Agendakan Rapat
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
