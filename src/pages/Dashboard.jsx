import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard, FolderKanban, Clock, CheckCircle, AlertTriangle,
  Wallet, Users, ClipboardCheck, ArrowRight, TrendingUp, TrendingDown, Calendar
} from 'lucide-react';
import Modal from '../components/ui/Modal';
import { DINAS_LIST, getUserById, getDinasById, getProkerById, formatCurrency, formatDate, formatTime, STATUS_PROKER, STATUS_DANA } from '../data/mockData';

function StatusBadge({ status }) {
  const classMap = {
    'Belum Mulai': 'badge-belum-mulai',
    'Persiapan': 'badge-persiapan',
    'Berjalan': 'badge-berjalan',
    'Tertunda': 'badge-tertunda',
    'Selesai': 'badge-selesai',
    'Draft': 'badge-draft',
    'Menunggu Persetujuan': 'badge-menunggu',
    'Disetujui': 'badge-disetujui',
    'Ditolak': 'badge-ditolak',
  };
  return <span className={`badge ${classMap[status] || 'badge-belum-mulai'}`}>{status}</span>;
}

export default function Dashboard() {
  const { user, isPimpinan, isBendahara, isKadis, isSekdin, isDinasLevel, isStaff, getUserDinas } = useAuth();
  const { programKerja, pengajuanDana, rapat, jadwalPiket } = useApp();
  const navigate = useNavigate();

  if (isPimpinan()) {
    return <DashboardPimpinan />;
  }
  if (isDinasLevel()) {
    return <DashboardDinas />;
  }
  return <DashboardStaff />;
}

function DashboardPimpinan() {
  const { user } = useAuth();
  const { programKerja, pengajuanDana, rapat, jadwalPiket } = useApp();
  const navigate = useNavigate();

  const totalProker = programKerja.length;
  const prokerBerjalan = programKerja.filter(pk => pk.status === STATUS_PROKER.BERJALAN).length;
  const prokerSelesai = programKerja.filter(pk => pk.status === STATUS_PROKER.SELESAI).length;
  const prokerTerlambat = programKerja.filter(pk => {
    return pk.status !== STATUS_PROKER.SELESAI && new Date(pk.deadline) < new Date();
  }).length;
  const prokerTertunda = programKerja.filter(pk => pk.status === STATUS_PROKER.TERTUNDA).length;

  const avgProgress = Math.round(programKerja.reduce((sum, pk) => sum + pk.progress, 0) / totalProker);

  // Progress per dinas
  const dinasProgress = DINAS_LIST.map(d => {
    const prokerDinas = programKerja.filter(pk => pk.dinasId === d.id);
    const avg = prokerDinas.length > 0
      ? Math.round(prokerDinas.reduce((s, p) => s + p.progress, 0) / prokerDinas.length)
      : 0;
    return { ...d, avgProgress: avg, totalProker: prokerDinas.length };
  }).sort((a, b) => b.avgProgress - a.avgProgress);

  const pendingDana = pengajuanDana.filter(pd => pd.status === STATUS_DANA.MENUNGGU);
  const upcomingRapat = rapat.filter(r => r.status === 'upcoming').sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

  const piketHariIni = jadwalPiket.filter(jp => jp.tanggal === '2026-09-12');

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          <LayoutDashboard className="page-title-icon" />
          Dashboard
        </h1>
        <span className="text-sm text-muted">Selamat datang, {user?.nama}</span>
      </div>

      {/* Stats */}
      <div className="stats-grid mb-6">
        <div className="stat-card stat-info">
          <span className="stat-label">Total Program Kerja</span>
          <span className="stat-value">{totalProker}</span>
          <span className="stat-sub">dari seluruh dinas</span>
        </div>
        <div className="stat-card stat-success">
          <span className="stat-label">Berjalan</span>
          <span className="stat-value">{prokerBerjalan}</span>
          <span className="stat-sub">proker aktif</span>
        </div>
        <div className="stat-card" style={{ borderLeft: '3px solid var(--primary-500)' }}>
          <span className="stat-label">Selesai</span>
          <span className="stat-value">{prokerSelesai}</span>
          <span className="stat-sub">{Math.round(prokerSelesai / totalProker * 100)}% dari total</span>
        </div>
        <div className="stat-card stat-warning">
          <span className="stat-label">Tertunda</span>
          <span className="stat-value">{prokerTertunda}</span>
          <span className="stat-sub">perlu perhatian</span>
        </div>
        <div className="stat-card stat-danger">
          <span className="stat-label">Melewati Deadline</span>
          <span className="stat-value">{prokerTerlambat}</span>
          <span className="stat-sub">terlambat</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        <div>
          {/* Progress per Dinas */}
          <div className="card mb-6">
            <div className="card-header">
              <h3>Progress per Dinas</h3>
              <span className="text-sm text-muted">Rata-rata: {avgProgress}%</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {dinasProgress.map(d => (
                <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <span style={{ width: 80, fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--gray-700)' }}>
                    {d.nama}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div className="progress-bar-container">
                      <div
                        className={`progress-bar-fill ${d.avgProgress >= 70 ? 'progress-success' : d.avgProgress >= 40 ? '' : 'progress-danger'}`}
                        style={{ width: `${d.avgProgress}%` }}
                      />
                    </div>
                  </div>
                  <span style={{ width: 40, textAlign: 'right', fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--gray-700)' }}>
                    {d.avgProgress}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Program Kerja Terbaru */}
          <div className="card">
            <div className="card-header">
              <h3>Program Kerja Terbaru</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/program-kerja')}>
                Lihat Semua <ArrowRight size={14} />
              </button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Dinas</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {programKerja.filter(pk => pk.status !== STATUS_PROKER.SELESAI).slice(0, 5).map(pk => (
                  <tr key={pk.id} className="clickable" onClick={() => navigate(`/program-kerja/${pk.id}`)}>
                    <td style={{ fontWeight: 500, color: 'var(--gray-800)' }}>{pk.nama}</td>
                    <td>{getDinasById(pk.dinasId)?.nama}</td>
                    <td><StatusBadge status={pk.status} /></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div className="progress-bar-container" style={{ width: 60 }}>
                          <div className="progress-bar-fill" style={{ width: `${pk.progress}%` }} />
                        </div>
                        <span className="text-xs">{pk.progress}%</span>
                      </div>
                    </td>
                    <td>{formatDate(pk.deadline)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          {/* Pending Dana */}
          {pendingDana.length > 0 && (
            <div className="card mb-6">
              <div className="card-header">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Wallet size={16} /> Pengajuan Dana
                </h3>
                <span className="badge badge-menunggu">{pendingDana.length} menunggu</span>
              </div>
              {pendingDana.map(pd => {
                const proker = getProkerById(pd.prokerId);
                return (
                  <div
                    key={pd.id}
                    style={{
                      padding: 'var(--space-3)',
                      borderBottom: '1px solid var(--gray-100)',
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/keuangan/${pd.id}`)}
                  >
                    <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--gray-800)' }}>
                      {proker?.nama}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)', marginTop: 2 }}>
                      {getDinasById(pd.dinasId)?.nama} · {formatCurrency(pd.nominal)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Upcoming Rapat */}
          <div className="card mb-6">
            <div className="card-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Users size={16} /> Rapat Mendatang
              </h3>
            </div>
            {upcomingRapat.length > 0 ? upcomingRapat.slice(0, 3).map(r => (
              <div
                key={r.id}
                style={{
                  padding: 'var(--space-3)',
                  borderBottom: '1px solid var(--gray-100)',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/rapat/${r.id}`)}
              >
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--gray-800)' }}>
                  {r.judul}
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)', marginTop: 2 }}>
                  {formatDate(r.tanggal)} · {formatTime(r.waktu)}
                </div>
              </div>
            )) : (
              <p className="text-sm text-muted" style={{ padding: 'var(--space-3)' }}>Tidak ada rapat mendatang</p>
            )}
          </div>

          {/* Piket Hari Ini */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <ClipboardCheck size={16} /> Piket Hari Ini
              </h3>
            </div>
            {piketHariIni.length > 0 ? piketHariIni.map(jp => {
              const staff = getUserById(jp.staffId);
              return (
                <div key={jp.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: 'var(--space-3)', borderBottom: '1px solid var(--gray-100)',
                }}>
                  <div>
                    <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{staff?.nama}</div>
                    <div className="text-xs text-muted">{formatTime(jp.jamMulai)}</div>
                  </div>
                  <StatusBadge status={jp.status} />
                </div>
              );
            }) : (
              <p className="text-sm text-muted" style={{ padding: 'var(--space-3)' }}>Tidak ada piket hari ini</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardDinas() {
  const { user, getUserDinas, isPimpinan } = useAuth();
  const { programKerja, pengajuanDana, rapat, jadwalPiket, updateProkerProgress } = useApp();
  const navigate = useNavigate();
  const dinas = getUserDinas();

  const prokerDinas = programKerja.filter(pk => pk.dinasId === user?.dinasId);
  const danaDinas = pengajuanDana.filter(pd => pd.dinasId === user?.dinasId);
  const rapatDinas = rapat.filter(r => r.dinasId === user?.dinasId || r.peserta?.includes(user?.id));
  const upcomingRapatDinas = rapatDinas.filter(r => r.status === 'upcoming').sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

  // Quick edit modal on dashboard
  const [editingProker, setEditingProker] = useState(null);
  const [editVal, setEditVal] = useState(0);
  const [editStatus, setEditStatus] = useState('Berjalan');
  const [editNotes, setEditNotes] = useState('');

  // Metrics (7 prokers for Dinas Internal)
  const totalCount = prokerDinas.length;
  const berjalan = prokerDinas.filter(pk => pk.status === STATUS_PROKER.BERJALAN).length;
  const selesai = prokerDinas.filter(pk => pk.status === STATUS_PROKER.SELESAI).length;
  const persiapan = prokerDinas.filter(pk => pk.status === STATUS_PROKER.PERSIAPAN).length;
  const tertunda = prokerDinas.filter(pk => pk.status === STATUS_PROKER.TERTUNDA).length;
  const avgProgress = totalCount > 0
    ? Math.round(prokerDinas.reduce((s, pk) => s + pk.progress, 0) / totalCount)
    : 0;

  // Recent announcements from meetings
  const allAnnouncements = rapatDinas.flatMap(r => (r.pengumuman || []).map(p => ({ ...p, meetingJudul: r.judul, meetingId: r.id })));

  const handleOpenEdit = (pk, e) => {
    e.stopPropagation();
    setEditingProker(pk);
    setEditVal(pk.progress);
    setEditStatus(pk.status);
    setEditNotes('');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editingProker) {
      updateProkerProgress(editingProker.id, editVal, editStatus, editNotes, user);
      setEditingProker(null);
    }
  };

  return (
    <div className="page-container">
      {/* Header Executive */}
      <div className="page-header" style={{ marginBottom: 'var(--space-5)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 4 }}>
            <span className="badge badge-persiapan">{dinas?.nama || 'Dinas INTERNAL'}</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)' }}>
              BEM KM FTI UNAND • Kabinet Vismayakriya 2025/2026
            </span>
          </div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <LayoutDashboard className="page-title-icon" />
            Dashboard: {dinas?.namaLengkap || 'Dinas Hubungan Internal'}
          </h1>
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)', marginTop: 2 }}>
            Selamat datang, <strong>{user?.nama}</strong> (Kepala Dinas)
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <button className="btn btn-primary" onClick={() => navigate('/rapat')}>
            <Users size={15} /> Buat Rapat Dinas
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/kalender')}>
            <Calendar size={15} /> Agenda Kalender
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/program-kerja')}>
            <FolderKanban size={15} /> Kelola Proker
          </button>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="stats-grid mb-6">
        <div className="stat-card stat-info">
          <span className="stat-label">Total Program Kerja</span>
          <span className="stat-value">{totalCount}</span>
          <span className="stat-sub">Dinas {dinas?.nama}</span>
        </div>
        <div className="stat-card stat-success">
          <span className="stat-label">Program Berjalan</span>
          <span className="stat-value">{berjalan}</span>
          <span className="stat-sub">aktif dalam tahapan</span>
        </div>
        <div className="stat-card" style={{ borderLeft: '3px solid var(--primary-500)' }}>
          <span className="stat-label">Program Selesai</span>
          <span className="stat-value">{selesai}</span>
          <span className="stat-sub">{totalCount > 0 ? Math.round((selesai / totalCount) * 100) : 0}% tercapai</span>
        </div>
        <div className="stat-card stat-warning">
          <span className="stat-label">Program Persiapan</span>
          <span className="stat-value">{persiapan}</span>
          <span className="stat-sub">tahap rancangan/RAB</span>
        </div>
        <div className="stat-card" style={{ borderLeft: '3px solid #7ea5d2' }}>
          <span className="stat-label">Rata-rata Progress</span>
          <span className="stat-value">{avgProgress}%</span>
          <span className="stat-sub">capaian keseluruhan</span>
        </div>
        <div className="stat-card" style={{ borderLeft: '3px solid #1e3a5f' }}>
          <span className="stat-label">Rapat Mendatang</span>
          <span className="stat-value">{upcomingRapatDinas.length}</span>
          <span className="stat-sub">agenda terdaftar</span>
        </div>
      </div>

      {/* Main Grid: Progress Visualizer & Sidebar Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--space-6)' }}>
        {/* Kolom Kiri: Progress Visualizer Program Kerja */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <FolderKanban size={18} color="var(--primary-600)" />
                Progress Program Kerja {dinas?.nama}
              </h3>
              <span className="text-xs text-muted">
                Klik pada baris atau tombol edit untuk memperbarui progress secara real-time
              </span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/program-kerja')}>
              Lihat Detail <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
            {prokerDinas.map(pk => {
              const pic = getUserById(pk.picId);
              return (
                <div
                  key={pk.id}
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    background: 'var(--gray-50)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--gray-200)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onClick={() => navigate(`/program-kerja/${pk.id}`)}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary-400)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--gray-900)', fontSize: 'var(--font-size-sm)' }}>
                        {pk.nama}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginTop: 2 }}>
                        PIC: {pic?.nama || 'Anggota'} · Deadline: {formatDate(pk.deadline)}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <StatusBadge status={pk.status} />
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '2px 6px', fontSize: '11px', color: 'var(--primary-600)' }}
                        onClick={(e) => handleOpenEdit(pk, e)}
                        title="Ubah Progress Cepat"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* Visual Progress Bar Meter */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div className="progress-bar-container" style={{ height: 8, flex: 1 }}>
                      <div
                        className={`progress-bar-fill ${pk.progress === 100 ? 'progress-success' : pk.progress < 30 ? 'progress-danger' : ''}`}
                        style={{ width: `${pk.progress}%` }}
                      />
                    </div>
                    <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, minWidth: 35, textAlign: 'right', color: 'var(--gray-800)' }}>
                      {pk.progress}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kolom Kanan: Rapat Terdekat & Pengumuman Terbaru */}
        <div>
          {/* Rapat Mendatang */}
          <div className="card mb-6">
            <div className="card-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Users size={16} /> Rapat Terdekat
              </h3>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/rapat')}>
                Semua Rapat
              </button>
            </div>

            {upcomingRapatDinas.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {upcomingRapatDinas.slice(0, 3).map(r => (
                  <div
                    key={r.id}
                    style={{
                      padding: 'var(--space-3)',
                      background: 'var(--gray-50)',
                      borderRadius: 'var(--radius-md)',
                      borderLeft: '3px solid var(--primary-600)',
                      cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/rapat/${r.id}`)}
                  >
                    <div style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)', color: 'var(--gray-900)' }}>
                      {r.judul}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-600)', marginTop: 4, display: 'flex', gap: 'var(--space-3)' }}>
                      <span><Calendar size={12} /> {formatDate(r.tanggal)}</span>
                      <span><Clock size={12} /> {formatTime(r.waktu)}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginTop: 2 }}>
                      {r.peserta?.length || 0} peserta terundang · {r.lokasi}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted" style={{ padding: 'var(--space-3) 0' }}>
                Tidak ada agenda rapat dinas mendatang.
              </p>
            )}
          </div>

          {/* Pengumuman Terbaru */}
          <div className="card mb-6">
            <div className="card-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Clock size={16} /> Pengumuman Terbaru
              </h3>
            </div>

            {allAnnouncements.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {allAnnouncements.slice(0, 2).map((ann, idx) => (
                  <div key={idx} style={{ padding: 'var(--space-3)', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
                    <div style={{ fontWeight: 600, fontSize: 'var(--font-size-xs)', color: 'var(--primary-800)' }}>
                      {ann.judul}
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--gray-700)', marginTop: 2, lineHeight: 1.4 }}>
                      {ann.isi.slice(0, 110)}...
                    </p>
                    <div style={{ fontSize: '10px', color: 'var(--gray-500)', marginTop: 4 }}>
                      {new Date(ann.waktu).toLocaleDateString('id-ID')} oleh {ann.author}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted" style={{ padding: 'var(--space-3) 0' }}>
                Belum ada pengumuman rapat yang diposting.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* QUICK MODAL EDIT PROGRESS DARI DASHBOARD */}
      {editingProker && (
        <Modal
          title={`Ubah Progress: ${editingProker.nama}`}
          onClose={() => setEditingProker(null)}
        >
          <form onSubmit={handleSaveEdit}>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label className="form-label" style={{ fontWeight: 600, marginBottom: 0 }}>
                  Progress Program Kerja ({editVal}%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editVal}
                  onChange={e => {
                    const v = Number(e.target.value);
                    setEditVal(v);
                    if (v === 0) setEditStatus('Belum Mulai');
                    else if (v === 100) setEditStatus('Selesai');
                    else if (editStatus === 'Belum Mulai' || editStatus === 'Selesai') setEditStatus('Berjalan');
                  }}
                  className="form-input"
                  style={{ width: 70, textAlign: 'center', fontWeight: 700, padding: '4px' }}
                />
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={editVal}
                onChange={e => {
                  const v = Number(e.target.value);
                  setEditVal(v);
                  if (v === 0) setEditStatus('Belum Mulai');
                  else if (v === 100) setEditStatus('Selesai');
                  else if (editStatus === 'Belum Mulai' || editStatus === 'Selesai') setEditStatus('Berjalan');
                }}
                style={{ width: '100%', height: 8, accentColor: 'var(--primary-600)', margin: '10px 0' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--gray-500)' }}>
                <span>0% Belum Mulai</span>
                <span>50% Berjalan</span>
                <span>100% Selesai</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Status</label>
              <select
                className="form-select"
                value={editStatus}
                onChange={e => setEditStatus(e.target.value)}
              >
                <option value="Belum Mulai">Belum Mulai (0%)</option>
                <option value="Persiapan">Persiapan</option>
                <option value="Berjalan">Berjalan (1-99%)</option>
                <option value="Tertunda">Tertunda</option>
                <option value="Selesai">Selesai (100%)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Catatan Update</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="Keterangan perkembangan tahapan..."
                value={editNotes}
                onChange={e => setEditNotes(e.target.value)}
              />
            </div>

            <div className="modal-footer" style={{ padding: 'var(--space-2) 0 0', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingProker(null)}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function DashboardStaff() {
  const { user } = useAuth();
  const { programKerja, rapat, jadwalPiket, sesiPiket } = useApp();
  const navigate = useNavigate();

  const myPiket = jadwalPiket.filter(jp => jp.staffId === user.id);
  const myRapat = rapat.filter(r => r.peserta.includes(user.id) && r.status === 'upcoming');

  // Proker from user's dinas
  const myProker = programKerja.filter(pk => pk.dinasId === user.dinasId);

  const nextPiket = myPiket.find(jp => jp.status === 'Belum Mulai');
  const activePiket = myPiket.find(jp => jp.status === 'Sedang Piket');
  const completedPiket = myPiket.filter(jp => jp.status === 'Selesai').length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          <LayoutDashboard className="page-title-icon" />
          Dashboard
        </h1>
        <span className="text-sm text-muted">Halo, {user.nama}</span>
      </div>

      <div className="stats-grid mb-6">
        <div className="stat-card stat-info">
          <span className="stat-label">Piket Selesai</span>
          <span className="stat-value">{completedPiket}</span>
          <span className="stat-sub">dari {myPiket.length} jadwal</span>
        </div>
        <div className="stat-card stat-success">
          <span className="stat-label">Rapat Mendatang</span>
          <span className="stat-value">{myRapat.length}</span>
        </div>
        <div className="stat-card stat-warning">
          <span className="stat-label">Proker Dinas</span>
          <span className="stat-value">{myProker.length}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        {/* Piket */}
        <div className="card">
          <div className="card-header">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <ClipboardCheck size={16} /> Piket Saya
            </h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/piket')}>Lihat Semua</button>
          </div>
          {activePiket && (
            <div style={{
              padding: 'var(--space-4)',
              background: 'var(--info-bg)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-3)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--info)' }}>Piket Sedang Berlangsung</div>
                  <div className="text-xs text-muted">{formatTime(activePiket.jamMulai)}</div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/piket')}>Lanjutkan</button>
              </div>
            </div>
          )}
          {nextPiket && !activePiket && (
            <div style={{
              padding: 'var(--space-4)',
              background: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-3)',
            }}>
              <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>Piket Berikutnya</div>
              <div className="text-xs text-muted">{formatDate(nextPiket.tanggal)} · {formatTime(nextPiket.jamMulai)}</div>
            </div>
          )}
          {myPiket.slice(0, 4).map(jp => (
            <div key={jp.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: 'var(--space-3)', borderBottom: '1px solid var(--gray-100)',
            }}>
              <div>
                <div className="text-sm">{formatDate(jp.tanggal)}</div>
                <div className="text-xs text-muted">{formatTime(jp.jamMulai)}</div>
              </div>
              <StatusBadge status={jp.status} />
            </div>
          ))}
        </div>

        {/* Rapat & Proker */}
        <div>
          <div className="card mb-6">
            <div className="card-header">
              <h3>Rapat Mendatang</h3>
            </div>
            {myRapat.length > 0 ? myRapat.map(r => (
              <div key={r.id} style={{
                padding: 'var(--space-3)', borderBottom: '1px solid var(--gray-100)',
                cursor: 'pointer',
              }} onClick={() => navigate(`/rapat/${r.id}`)}>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{r.judul}</div>
                <div className="text-xs text-muted">{formatDate(r.tanggal)} · {formatTime(r.waktu)} · {r.lokasi}</div>
              </div>
            )) : (
              <p className="text-sm text-muted" style={{ padding: 'var(--space-4)' }}>Tidak ada rapat mendatang</p>
            )}
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Program Kerja Dinas</h3>
            </div>
            {myProker.slice(0, 3).map(pk => (
              <div key={pk.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: 'var(--space-3)', borderBottom: '1px solid var(--gray-100)',
                cursor: 'pointer',
              }} onClick={() => navigate(`/program-kerja/${pk.id}`)}>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{pk.nama}</div>
                <StatusBadge status={pk.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
