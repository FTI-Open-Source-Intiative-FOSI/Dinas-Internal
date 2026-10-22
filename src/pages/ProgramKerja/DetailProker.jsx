import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowLeft, Calendar, User, Building2, Target, FileText,
  AlertTriangle, CheckCircle, Clock, Circle, TrendingUp,
  Edit3, Shield, History, Save, X
} from 'lucide-react';
import { getDinasById, getUserById, getProkerPic, formatDate, formatCurrency } from '../../data/mockData';
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

function StepIcon({ status }) {
  if (status === 'done') return <CheckCircle size={16} />;
  if (status === 'in-progress') return <Clock size={16} />;
  return <Circle size={16} />;
}

export default function DetailProker() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { programKerja, updateProkerProgress } = useApp();
  const { user, canEditProker } = useAuth();

  const proker = programKerja.find(pk => pk.id === id);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newProgress, setNewProgress] = useState(proker?.progress || 0);
  const [selectedStatus, setSelectedStatus] = useState(proker?.status || 'Berjalan');
  const [updateNotes, setUpdateNotes] = useState('');

  if (!proker) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <FileText />
          <p>Program kerja tidak ditemukan.</p>
          <button className="btn btn-secondary mt-4" onClick={() => navigate('/program-kerja')}>
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const dinas = getDinasById(proker.dinasId);
  const pic = getUserById(proker.picId);
  const isOverdue = proker.status !== 'Selesai' && new Date(proker.deadline) < new Date();
  const hasPermission = canEditProker(proker);

  const openEditModal = () => {
    setNewProgress(proker.progress);
    setSelectedStatus(proker.status);
    setUpdateNotes('');
    setIsEditModalOpen(true);
  };

  const handleProgressSliderChange = (val) => {
    const num = Number(val);
    setNewProgress(num);
    // Aturan otomatis status
    if (num === 0) {
      setSelectedStatus('Belum Mulai');
    } else if (num === 100) {
      setSelectedStatus('Selesai');
    } else {
      // jika sebelumnya persiapan atau tertunda, jangan dipaksa ganti kecuali user inginkan
      if (selectedStatus === 'Belum Mulai' || selectedStatus === 'Selesai') {
        setSelectedStatus('Berjalan');
      }
    }
  };

  const handleSaveProgress = (e) => {
    e.preventDefault();
    updateProkerProgress(proker.id, newProgress, selectedStatus, updateNotes, user);
    setIsEditModalOpen(false);
  };

  return (
    <div className="page-container">
      <button className="back-link" onClick={() => navigate('/program-kerja')}>
        <ArrowLeft size={16} /> Kembali ke Program Kerja
      </button>

      {/* Header */}
      <div className="page-header" style={{ alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 4 }}>
            <span className="badge badge-persiapan">{dinas?.nama}</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)' }}>
              Kabinet Vismayakriya 2025/2026
            </span>
          </div>
          <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>{proker.nama}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <StatusBadge status={proker.status} />
            {isOverdue && <span className="badge badge-ditolak">Melewati Deadline</span>}
            {proker.lastUpdated && (
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)' }}>
                Terakhir diupdate: {formatDate(proker.lastUpdated.split('T')[0])} oleh <strong>{proker.updatedBy || 'Kadin'}</strong>
              </span>
            )}
          </div>
        </div>

        <div>
          {hasPermission ? (
            <button
              className="btn btn-primary"
              onClick={openEditModal}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Edit3 size={16} />
              Edit Progress Program Kerja
            </button>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--gray-100)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--gray-600)'
            }}>
              <Shield size={14} />
              <span>Hanya Kepala {dinas?.nama || 'Dinas'} (Kadin) yang berwenang mengubah progress</span>
            </div>
          )}
        </div>
      </div>

      <div className="detail-grid">
        {/* Main Content */}
        <div>
          {/* Card Deskripsi & Meta */}
          <div className="card mb-6">
            <h3 className="mb-4">Informasi Program Kerja</h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-700)', lineHeight: 1.6, marginBottom: 'var(--space-5)' }}>
              {proker.deskripsi}
            </p>

            <div className="detail-meta">
              <div className="meta-item">
                <span className="meta-label">Dinas Penyelenggara</span>
                <span className="meta-value">{dinas?.namaLengkap} ({dinas?.nama})</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Penanggung Jawab (PIC)</span>
                <span className="meta-value">{getProkerPic(proker)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Tanggal Mulai</span>
                <span className="meta-value">{formatDate(proker.tanggalMulai)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Target Selesai / Deadline</span>
                <span className="meta-value" style={{ color: isOverdue ? 'var(--danger)' : undefined, fontWeight: 600 }}>
                  {formatDate(proker.deadline)}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Target Sasaran</span>
                <span className="meta-value">{proker.target}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Estimasi Anggaran</span>
                <span className="meta-value" style={{ fontWeight: 600, color: 'var(--primary-700)' }}>
                  {formatCurrency(proker.anggaran)}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Tahapan */}
          <div className="card mb-6">
            <div className="card-header">
              <div>
                <h3>Progress & Tahapan Kerja</h3>
                <span className="text-xs text-muted">Tahapan pelaksanaan proker Kabinet Vismayakriya</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--primary-600)' }}>
                  {proker.progress}%
                </span>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--gray-500)' }}>
                  Status: <strong>{proker.status}</strong>
                </span>
              </div>
            </div>

            <div className="progress-bar-container mb-6" style={{ height: 12, borderRadius: 6 }}>
              <div
                className={`progress-bar-fill ${proker.progress === 100 ? 'progress-success' : proker.progress < 30 ? 'progress-danger' : ''}`}
                style={{ width: `${proker.progress}%` }}
              />
            </div>

            <div className="progress-steps">
              {proker.tahapan?.map((tahap, i) => (
                <div key={i} className="progress-step">
                  <div className={`progress-step-icon ${tahap.status}`}>
                    <StepIcon status={tahap.status} />
                  </div>
                  <span className="progress-step-text">{tahap.nama}</span>
                  <span className="progress-step-value" style={{ fontWeight: 600 }}>
                    {tahap.progress === 100 ? '✓ Selesai' : tahap.progress > 0 ? `${tahap.progress}%` : 'Pending'}
                  </span>
                </div>
              ))}
            </div>

            {hasPermission && (
              <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary btn-sm" onClick={openEditModal}>
                  <Edit3 size={14} /> Perbarui Nilai Progress
                </button>
              </div>
            )}
          </div>

          {/* Kendala */}
          {proker.kendala && (
            <div className="card mb-6" style={{ borderLeft: '4px solid var(--warning)', background: '#fffdf5' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', color: 'var(--warning)' }}>
                <AlertTriangle size={18} /> Kendala & Catatan Khusus
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-800)', lineHeight: 1.6 }}>
                {proker.kendala}
              </p>
            </div>
          )}

          {/* Riwayat Perubahan Progress (Audit Log) */}
          <div className="card mb-6">
            <div className="card-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <History size={16} /> Riwayat Perubahan Progress
              </h3>
              <span className="text-xs text-muted">Audit trail perubahan oleh Kepala Dinas</span>
            </div>

            {proker.riwayatPerubahan && proker.riwayatPerubahan.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Waktu</th>
                      <th>Perubahan Nilai</th>
                      <th>Status Baru</th>
                      <th>Oleh</th>
                      <th>Catatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proker.riwayatPerubahan.map((r) => (
                      <tr key={r.id}>
                        <td style={{ fontSize: '11px', color: 'var(--gray-600)' }}>
                          {new Date(r.updatedAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                        </td>
                        <td>
                          <span style={{ fontWeight: 600, color: 'var(--gray-500)', textDecoration: 'line-through', marginRight: 6 }}>
                            {r.oldValue}%
                          </span>
                          <span style={{ fontWeight: 700, color: 'var(--primary-600)' }}>
                            → {r.newValue}%
                          </span>
                        </td>
                        <td>
                          <StatusBadge status={r.newStatus} />
                        </td>
                        <td style={{ fontWeight: 500 }}>{r.updatedBy}</td>
                        <td style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-700)' }}>{r.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-muted" style={{ padding: 'var(--space-3)' }}>
                Belum ada riwayat perubahan terekam.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar: Updates / Aktivitas */}
        <div>
          <div className="card">
            <div className="card-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <TrendingUp size={16} /> Aktivitas Terakhir
              </h3>
            </div>
            {proker.updates && proker.updates.length > 0 ? (
              <div className="timeline">
                {proker.updates.map((update, i) => (
                  <div key={i} className={`timeline-item ${i === 0 ? '' : 'completed'}`}>
                    <div className="timeline-date">{formatDate(update.tanggal)}</div>
                    <div className="timeline-content" style={{ fontWeight: i === 0 ? 500 : 400 }}>
                      {update.isi}
                    </div>
                    <div className="text-xs text-muted mt-2">
                      oleh {getUserById(update.author)?.nama || update.author}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state" style={{ padding: 'var(--space-6)' }}>
                <TrendingUp />
                <p>Belum ada update progress.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Edit Progress */}
      {isEditModalOpen && (
        <Modal
          title={`Update Progress: ${proker.nama}`}
          onClose={() => setIsEditModalOpen(false)}
        >
          <form onSubmit={handleSaveProgress}>
            {/* Range Slider & Input Number */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label className="form-label" style={{ fontWeight: 600, marginBottom: 0 }}>
                  Persentase Progress (0 - 100%)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProgress}
                    onChange={e => handleProgressSliderChange(e.target.value)}
                    className="form-input"
                    style={{ width: 75, textAlign: 'center', fontWeight: 700, fontSize: '1rem', padding: '4px 8px' }}
                  />
                  <span style={{ fontWeight: 600, color: 'var(--gray-600)' }}>%</span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={newProgress}
                onChange={e => handleProgressSliderChange(e.target.value)}
                style={{
                  width: '100%',
                  height: 8,
                  accentColor: 'var(--primary-600)',
                  cursor: 'pointer',
                  margin: '12px 0'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--gray-500)' }}>
                <span>0% (Belum Mulai)</span>
                <span>50% (Berjalan)</span>
                <span>100% (Selesai)</span>
              </div>
            </div>

            {/* Status Selector with Rules */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Status Program Kerja</label>
              <select
                className="form-select"
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
              >
                <option value="Belum Mulai">Belum Mulai (0%)</option>
                <option value="Persiapan">Persiapan (Tahap Rancangan/Proposal)</option>
                <option value="Berjalan">Berjalan (1 - 99%)</option>
                <option value="Tertunda">Tertunda (Ada Kendala)</option>
                <option value="Selesai">Selesai (100% & LPJ)</option>
              </select>
              <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginTop: 4 }}>
                *Sistem otomatis menyetel status berdasarkan nilai progress, namun Anda tetap dapat memilih <em>Persiapan</em> atau <em>Tertunda</em> secara manual.
              </div>
            </div>

            {/* Update Note / Activity */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Catatan / Keterangan Progress</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Contoh: Pembicara telah konfirmasi kehadiran, publikasi diperpanjang hingga 25 September..."
                value={updateNotes}
                onChange={e => setUpdateNotes(e.target.value)}
              />
            </div>

            <div className="modal-footer" style={{ padding: 'var(--space-3) 0 0', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditModalOpen(false)}
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Save size={16} />
                Simpan Perubahan
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
