import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/ui/Modal';
import {
  ArrowLeft, CheckCircle, XCircle, FileText, Calendar, User, Building2
} from 'lucide-react';
import { getProkerById, getDinasById, getUserById, formatCurrency, formatDate, STATUS_DANA } from '../../data/mockData';

function StatusBadge({ status }) {
  const classMap = {
    'Draft': 'badge-draft',
    'Menunggu Persetujuan': 'badge-menunggu',
    'Disetujui': 'badge-disetujui',
    'Ditolak': 'badge-ditolak',
  };
  return <span className={`badge ${classMap[status] || ''}`}>{status}</span>;
}

export default function DetailPengajuan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isBendahara } = useAuth();
  const { pengajuanDana, updateDanaStatus, addToast } = useApp();

  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectError, setRejectError] = useState('');

  const dana = pengajuanDana.find(pd => pd.id === id);

  if (!dana) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <FileText />
          <p>Pengajuan dana tidak ditemukan.</p>
          <button className="btn btn-secondary mt-4" onClick={() => navigate('/keuangan')}>Kembali</button>
        </div>
      </div>
    );
  }

  const proker = getProkerById(dana.prokerId);
  const dinas = getDinasById(dana.dinasId);
  const pengaju = getUserById(dana.diajukanOleh);
  const approver = dana.disetujuiOleh ? getUserById(dana.disetujuiOleh) : null;

  const totalRAB = dana.rab.reduce((sum, item) => sum + item.total, 0);

  const handleApprove = () => {
    updateDanaStatus(dana.id, {
      status: STATUS_DANA.DISETUJUI,
      disetujuiOleh: 'u4',
      tanggalDisetujui: new Date().toISOString().split('T')[0],
    });
    setShowApprove(false);
    addToast('Pengajuan dana berhasil disetujui', 'success');
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      setRejectError('Alasan penolakan wajib diisi');
      return;
    }
    updateDanaStatus(dana.id, {
      status: STATUS_DANA.DITOLAK,
      alasanDitolak: rejectReason,
    });
    setShowReject(false);
    setRejectReason('');
    addToast('Pengajuan dana ditolak', 'warning');
  };

  return (
    <div className="page-container">
      <button className="back-link" onClick={() => navigate('/keuangan')}>
        <ArrowLeft size={16} /> Kembali ke Keuangan
      </button>

      <div className="page-header">
        <div>
          <h1 style={{ fontSize: 'var(--font-size-xl)' }}>Detail Pengajuan Dana</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <StatusBadge status={dana.status} />
          </div>
        </div>
        {isBendahara() && dana.status === STATUS_DANA.MENUNGGU && (
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button className="btn btn-success" onClick={() => setShowApprove(true)}>
              <CheckCircle size={16} /> Setujui
            </button>
            <button className="btn btn-danger" onClick={() => setShowReject(true)}>
              <XCircle size={16} /> Tolak
            </button>
          </div>
        )}
      </div>

      <div className="detail-grid">
        <div>
          {/* Info Pengajuan */}
          <div className="card mb-6">
            <h3 className="mb-4">Informasi Pengajuan</h3>
            <div className="detail-meta">
              <div className="meta-item">
                <span className="meta-label">Program Kerja</span>
                <span className="meta-value"
                  style={{ cursor: 'pointer', color: 'var(--primary-600)' }}
                  onClick={() => navigate(`/program-kerja/${dana.prokerId}`)}
                >{proker?.nama}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Dinas</span>
                <span className="meta-value">{dinas?.namaLengkap}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Nominal</span>
                <span className="meta-value" style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, color: 'var(--primary-600)' }}>
                  {formatCurrency(dana.nominal)}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Tanggal Pengajuan</span>
                <span className="meta-value">{formatDate(dana.tanggal)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Diajukan oleh</span>
                <span className="meta-value">{pengaju?.nama}</span>
              </div>
              {approver && (
                <div className="meta-item">
                  <span className="meta-label">Disetujui oleh</span>
                  <span className="meta-value">{approver.nama}, {formatDate(dana.tanggalDisetujui)}</span>
                </div>
              )}
            </div>

            {dana.catatan && (
              <div style={{ marginTop: 'var(--space-5)' }}>
                <span className="meta-label">Catatan</span>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-700)', marginTop: 'var(--space-1)' }}>
                  {dana.catatan}
                </p>
              </div>
            )}

            {dana.alasanDitolak && (
              <div style={{
                marginTop: 'var(--space-5)', padding: 'var(--space-4)',
                background: 'var(--danger-bg)', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--danger-border)',
              }}>
                <span className="meta-label" style={{ color: 'var(--danger)' }}>Alasan Penolakan</span>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-800)', marginTop: 'var(--space-1)' }}>
                  {dana.alasanDitolak}
                </p>
              </div>
            )}
          </div>

          {/* RAB Table */}
          <div className="card">
            <h3 className="mb-4">Rincian Anggaran Biaya (RAB)</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th style={{ textAlign: 'right' }}>Jumlah</th>
                  <th>Satuan</th>
                  <th style={{ textAlign: 'right' }}>Harga Satuan</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {dana.rab.map((item, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{item.item}</td>
                    <td style={{ textAlign: 'right' }}>{item.jumlah}</td>
                    <td>{item.satuan}</td>
                    <td style={{ textAlign: 'right' }}>{formatCurrency(item.harga)}</td>
                    <td style={{ textAlign: 'right', fontWeight: 500 }}>{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} style={{ textAlign: 'right', fontWeight: 600, borderTop: '2px solid var(--gray-200)' }}>
                    Total
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 700, fontSize: 'var(--font-size-md)', color: 'var(--primary-600)', borderTop: '2px solid var(--gray-200)' }}>
                    {formatCurrency(totalRAB)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="card">
            <h3 className="mb-4">Riwayat Status</h3>
            <div className="timeline">
              {dana.status === STATUS_DANA.DISETUJUI && (
                <div className="timeline-item completed">
                  <div className="timeline-date">{formatDate(dana.tanggalDisetujui)}</div>
                  <div className="timeline-content">Disetujui oleh {approver?.nama}</div>
                </div>
              )}
              {dana.status === STATUS_DANA.DITOLAK && (
                <div className="timeline-item">
                  <div className="timeline-date">-</div>
                  <div className="timeline-content">Ditolak</div>
                </div>
              )}
              {dana.status === STATUS_DANA.MENUNGGU && (
                <div className="timeline-item">
                  <div className="timeline-date">-</div>
                  <div className="timeline-content">Menunggu persetujuan Bendahara Daerah</div>
                </div>
              )}
              <div className="timeline-item completed">
                <div className="timeline-date">{formatDate(dana.tanggal)}</div>
                <div className="timeline-content">Pengajuan diajukan oleh {pengaju?.nama}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      <Modal
        isOpen={showApprove}
        onClose={() => setShowApprove(false)}
        title="Konfirmasi Persetujuan"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowApprove(false)}>Batal</button>
            <button className="btn btn-success" onClick={handleApprove}>Ya, Setujui</button>
          </>
        }
      >
        <p style={{ fontSize: 'var(--font-size-sm)' }}>
          Apakah Anda yakin ingin menyetujui pengajuan dana sebesar <strong>{formatCurrency(dana.nominal)}</strong> untuk <strong>{proker?.nama}</strong>?
        </p>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={showReject}
        onClose={() => { setShowReject(false); setRejectReason(''); setRejectError(''); }}
        title="Tolak Pengajuan"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => { setShowReject(false); setRejectReason(''); setRejectError(''); }}>Batal</button>
            <button className="btn btn-danger" onClick={handleReject}>Tolak Pengajuan</button>
          </>
        }
      >
        <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-4)' }}>
          Anda akan menolak pengajuan dana untuk <strong>{proker?.nama}</strong>.
        </p>
        <div className="form-group">
          <label className="form-label">Alasan Penolakan *</label>
          <textarea
            className={`form-textarea ${rejectError ? 'error' : ''}`}
            placeholder="Jelaskan alasan penolakan..."
            value={rejectReason}
            onChange={e => { setRejectReason(e.target.value); setRejectError(''); }}
          />
          {rejectError && <span className="form-error">{rejectError}</span>}
        </div>
      </Modal>
    </div>
  );
}
