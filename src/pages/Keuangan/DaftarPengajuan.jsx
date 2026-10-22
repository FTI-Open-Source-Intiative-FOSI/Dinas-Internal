import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Wallet, Search } from 'lucide-react';
import { getProkerById, getDinasById, getUserById, formatCurrency, formatDate, DINAS_LIST, STATUS_DANA } from '../../data/mockData';

function StatusBadge({ status }) {
  const classMap = {
    'Draft': 'badge-draft',
    'Menunggu Persetujuan': 'badge-menunggu',
    'Disetujui': 'badge-disetujui',
    'Ditolak': 'badge-ditolak',
  };
  return <span className={`badge ${classMap[status] || ''}`}>{status}</span>;
}

export default function DaftarPengajuan() {
  const { user, isPimpinan, isBendahara } = useAuth();
  const { pengajuanDana } = useApp();
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState('');
  const [filterDinas, setFilterDinas] = useState('');

  let filtered = [...pengajuanDana];

  if (!isPimpinan() && !isBendahara() && user.dinasId) {
    filtered = filtered.filter(pd => pd.dinasId === user.dinasId);
  }

  if (filterStatus) filtered = filtered.filter(pd => pd.status === filterStatus);
  if (filterDinas) filtered = filtered.filter(pd => pd.dinasId === filterDinas);

  const totalMenunggu = pengajuanDana.filter(pd => pd.status === STATUS_DANA.MENUNGGU).length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          <Wallet className="page-title-icon" />
          Keuangan
        </h1>
        {totalMenunggu > 0 && (
          <span className="badge badge-menunggu">{totalMenunggu} menunggu persetujuan</span>
        )}
      </div>

      <div className="filter-bar">
        {(isPimpinan() || isBendahara()) && (
          <select className="form-select" value={filterDinas} onChange={e => setFilterDinas(e.target.value)}>
            <option value="">Semua Dinas</option>
            {DINAS_LIST.map(d => (
              <option key={d.id} value={d.id}>{d.nama}</option>
            ))}
          </select>
        )}
        <select className="form-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">Semua Status</option>
          {Object.values(STATUS_DANA).map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="card">
        {filtered.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Program Kerja</th>
                <th>Dinas</th>
                <th>Nominal</th>
                <th>Tanggal Pengajuan</th>
                <th>Diajukan oleh</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(pd => {
                const proker = getProkerById(pd.prokerId);
                return (
                  <tr key={pd.id} className="clickable" onClick={() => navigate(`/keuangan/${pd.id}`)}>
                    <td style={{ fontWeight: 500, color: 'var(--gray-800)' }}>{proker?.nama}</td>
                    <td>{getDinasById(pd.dinasId)?.nama}</td>
                    <td style={{ fontWeight: 500 }}>{formatCurrency(pd.nominal)}</td>
                    <td>{formatDate(pd.tanggal)}</td>
                    <td>{getUserById(pd.diajukanOleh)?.nama}</td>
                    <td><StatusBadge status={pd.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <Wallet />
            <p>Tidak ada pengajuan dana yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
