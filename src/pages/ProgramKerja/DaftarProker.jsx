import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { FolderKanban, Search, Plus, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { getDinasById, getUserById, getProkerPic, formatDate, DINAS_LIST, STATUS_PROKER } from '../../data/mockData';
import Modal from '../../components/ui/Modal';

function StatusBadge({ status }) {
  const classMap = {
    'Belum Mulai': 'badge-belum-mulai',
    'Persiapan': 'badge-persiapan',
    'Berjalan': 'badge-berjalan',
    'Tertunda': 'badge-tertunda',
    'Selesai': 'badge-selesai',
  };
  return <span className={`badge ${classMap[status] || 'badge-belum-mulai'}`}>{status}</span>;
}

export default function DaftarProker() {
  const { user, isPimpinan, canEditProker } = useAuth();
  const { programKerja, updateProkerProgress, addToast } = useApp();
  const navigate = useNavigate();

  const [filterDinas, setFilterDinas] = useState(isPimpinan() ? '' : (user?.dinasId || ''));
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form tambah proker
  const [newProkerData, setNewProkerData] = useState({
    nama: '',
    dinasId: user?.dinasId || 'internal',
    target: '',
    deadline: '2026-11-30',
    anggaran: 5000000,
    deskripsi: '',
  });

  let filteredProker = [...programKerja];

  // Filtering
  if (filterDinas) {
    filteredProker = filteredProker.filter(pk => pk.dinasId === filterDinas);
  }
  if (filterStatus) {
    filteredProker = filteredProker.filter(pk => pk.status === filterStatus);
  }
  if (search) {
    filteredProker = filteredProker.filter(pk =>
      pk.nama.toLowerCase().includes(search.toLowerCase()) ||
      (pk.deskripsi && pk.deskripsi.toLowerCase().includes(search.toLowerCase()))
    );
  }

  // Summary Metrics
  const baseForMetrics = isPimpinan() ? programKerja : programKerja.filter(pk => pk.dinasId === user?.dinasId);
  const totalCount = baseForMetrics.length;
  const berjalanCount = baseForMetrics.filter(p => p.status === 'Berjalan').length;
  const selesaiCount = baseForMetrics.filter(p => p.status === 'Selesai').length;
  const persiapanCount = baseForMetrics.filter(p => p.status === 'Persiapan').length;
  const avgProgress = totalCount > 0 ? Math.round(baseForMetrics.reduce((s, p) => s + p.progress, 0) / totalCount) : 0;

  const handleCreateProker = (e) => {
    e.preventDefault();
    const createdId = 'pk' + (programKerja.length + 1);
    const newEntry = {
      id: createdId,
      nama: newProkerData.nama,
      dinasId: newProkerData.dinasId,
      picId: user?.id || 'u36',
      deskripsi: newProkerData.deskripsi || `Program kerja ${newProkerData.nama} oleh ${newProkerData.dinasId.toUpperCase()}.`,
      target: newProkerData.target || 'Mahasiswa FTI UNAND',
      tanggalMulai: new Date().toISOString().split('T')[0],
      deadline: newProkerData.deadline,
      status: 'Persiapan',
      progress: 0,
      anggaran: Number(newProkerData.anggaran) || 0,
      kendala: null,
      tahapan: [
        { nama: 'Penyusunan Proposal & RAB', progress: 0, status: 'pending' },
        { nama: 'Koordinasi Panitia', progress: 0, status: 'pending' },
        { nama: 'Publikasi', progress: 0, status: 'pending' },
        { nama: 'Pelaksanaan', progress: 0, status: 'pending' },
        { nama: 'Evaluasi & LPJ', progress: 0, status: 'pending' }
      ],
      updates: [
        { tanggal: new Date().toISOString().split('T')[0], isi: 'Program kerja baru didaftarkan ke sistem.', author: user?.id }
      ]
    };

    programKerja.unshift(newEntry);
    localStorage.setItem('bem_proker', JSON.stringify(programKerja));
    setIsAddModalOpen(false);
    addToast(`Program kerja "${newProkerData.nama}" berhasil ditambahkan!`, 'success');
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 'var(--space-5)' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <FolderKanban className="page-title-icon" />
            Program Kerja
          </h1>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)', marginTop: 4 }}>
            Pantau dan kelola perkembangan program kerja dinas BEM KM FTI UNAND, Kabinet Vismayakriya.
          </p>
        </div>

        <div>
          <button
            className="btn btn-primary"
            onClick={() => setIsAddModalOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Plus size={16} />
            Tambah Program
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid mb-6">
        <div className="stat-card stat-info">
          <span className="stat-label">Total Program Kerja</span>
          <span className="stat-value">{totalCount}</span>
          <span className="stat-sub">{isPimpinan() ? 'Seluruh Dinas & Biro' : `Dinas ${getDinasById(user?.dinasId)?.nama || ''}`}</span>
        </div>
        <div className="stat-card stat-success">
          <span className="stat-label">Program Berjalan</span>
          <span className="stat-value">{berjalanCount}</span>
          <span className="stat-sub">aktif dalam tahapan</span>
        </div>
        <div className="stat-card" style={{ borderLeft: '3px solid var(--primary-500)' }}>
          <span className="stat-label">Program Selesai</span>
          <span className="stat-value">{selesaiCount}</span>
          <span className="stat-sub">{totalCount > 0 ? Math.round((selesaiCount / totalCount) * 100) : 0}% tercapai</span>
        </div>
        <div className="stat-card stat-warning">
          <span className="stat-label">Program Persiapan</span>
          <span className="stat-value">{persiapanCount}</span>
          <span className="stat-sub">tahap rancangan</span>
        </div>
        <div className="stat-card" style={{ borderLeft: '3px solid #7ea5d2' }}>
          <span className="stat-label">Rata-rata Progress</span>
          <span className="stat-value">{avgProgress}%</span>
          <span className="stat-sub">keberhasilan dinas</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="filter-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', flex: 1 }}>
          <div className="search-input" style={{ minWidth: 260 }}>
            <Search size={16} />
            <input
              type="text"
              className="form-input"
              placeholder="Cari program kerja atau keyword..."
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
            <option value="">Semua Dinas / Biro ({programKerja.length})</option>
            {DINAS_LIST.map(d => (
              <option key={d.id} value={d.id}>{d.nama}</option>
            ))}
          </select>

          <select
            className="form-select"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{ width: 'auto', minWidth: 160 }}
          >
            <option value="">Semua Status</option>
            {Object.values(STATUS_PROKER).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)' }}>
          Menampilkan <strong>{filteredProker.length}</strong> program kerja
        </div>
      </div>

      {/* Table Program Kerja */}
      <div className="card">
        {filteredProker.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>Nama Program Kerja</th>
                  <th>Unit / Dinas</th>
                  <th>PIC</th>
                  <th>Status</th>
                  <th style={{ width: '22%' }}>Progress</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {filteredProker.map(pk => {
                  const dinas = getDinasById(pk.dinasId);
                  const pic = getUserById(pk.picId);
                  const isOverdue = pk.status !== 'Selesai' && new Date(pk.deadline) < new Date();

                  return (
                    <tr
                      key={pk.id}
                      className="clickable"
                      onClick={() => navigate(`/program-kerja/${pk.id}`)}
                      title="Klik untuk melihat detail & edit progress"
                    >
                      <td style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span>{pk.nama}</span>
                          {pk.lastUpdated && (
                            <span style={{ fontSize: '10px', color: 'var(--gray-500)', marginTop: 2 }}>
                              Diupdate oleh {pk.updatedBy || 'Kadin'}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-persiapan">{dinas?.nama}</span>
                      </td>
                      <td style={{ fontSize: 'var(--font-size-sm)' }}>
                        {getProkerPic(pk)}
                      </td>
                      <td>
                        <StatusBadge status={pk.status} />
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                          <div className="progress-bar-container" style={{ height: 7, flex: 1 }}>
                            <div
                              className={`progress-bar-fill ${pk.progress === 100 ? 'progress-success' : pk.progress < 30 ? 'progress-danger' : ''}`}
                              style={{ width: `${pk.progress}%` }}
                            />
                          </div>
                          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, minWidth: 32, textAlign: 'right' }}>
                            {pk.progress}%
                          </span>
                        </div>
                      </td>
                      <td style={{ fontSize: 'var(--font-size-sm)', color: isOverdue ? 'var(--danger)' : 'var(--gray-700)', fontWeight: isOverdue ? 600 : 400 }}>
                        {formatDate(pk.deadline)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <FolderKanban />
            <p>Tidak ada program kerja yang sesuai filter.</p>
          </div>
        )}
      </div>

      {/* Modal Tambah Program */}
      {isAddModalOpen && (
        <Modal
          title="Tambah Program Kerja Baru"
          onClose={() => setIsAddModalOpen(false)}
        >
          <form onSubmit={handleCreateProker}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Nama Program Kerja</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="Contoh: FTI Youth Innovation Camp 2026"
                value={newProkerData.nama}
                onChange={e => setNewProkerData({ ...newProkerData, nama: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Dinas / Biro</label>
                <select
                  className="form-select"
                  value={newProkerData.dinasId}
                  onChange={e => setNewProkerData({ ...newProkerData, dinasId: e.target.value })}
                  disabled={!isPimpinan()}
                >
                  {DINAS_LIST.map(d => (
                    <option key={d.id} value={d.id}>{d.nama}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Deadline</label>
                <input
                  type="date"
                  className="form-input"
                  required
                  value={newProkerData.deadline}
                  onChange={e => setNewProkerData({ ...newProkerData, deadline: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Target Sasaran</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: 100 Mahasiswa FTI"
                  value={newProkerData.target}
                  onChange={e => setNewProkerData({ ...newProkerData, target: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Estimasi Anggaran (Rp)</label>
                <input
                  type="number"
                  className="form-input"
                  min="0"
                  step="500000"
                  value={newProkerData.anggaran}
                  onChange={e => setNewProkerData({ ...newProkerData, anggaran: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Deskripsi Program</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Rincian tujuan dan ruang lingkup program kerja..."
                value={newProkerData.deskripsi}
                onChange={e => setNewProkerData({ ...newProkerData, deskripsi: e.target.value })}
              />
            </div>

            <div className="modal-footer" style={{ padding: 'var(--space-3) 0 0', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsAddModalOpen(false)}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan Program Kerja
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
