import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowLeft, Calendar, Clock, MapPin, Users, FileText,
  CheckCircle, ArrowRight, User, Video, Building,
  BellRing, Camera, ScanFace, AlertTriangle, ShieldCheck,
  Send, ExternalLink, X, Check
} from 'lucide-react';
import { getDinasById, getUserById, getProkerById, formatDate, formatTime, USERS } from '../../data/mockData';
import Modal from '../../components/ui/Modal';
import FaceRecognitionService from '../../services/faceRecognitionService';

export default function DetailRapat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rapat, postPengumumanRapat, recordFaceAttendance, cancelRapat, addToast } = useApp();
  const { user, canManageRapat, canPostAnnouncement } = useAuth();

  const rapatItem = rapat.find(r => r.id === id);

  // Modals state
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [isFaceAttendanceModalOpen, setIsFaceAttendanceModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  // Announcement form
  const [announcementForm, setAnnouncementForm] = useState({
    judul: '',
    isi: '',
    lampiran: ''
  });

  // Face Recognition Camera state
  const [cameraStream, setCameraStream] = useState(null);
  const [scanningState, setScanningState] = useState('ready'); // 'ready', 'scanning', 'success', 'failed'
  const [scanMessage, setScanMessage] = useState('Posisikan wajah Anda tepat di dalam bingkai pemindai');
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  if (!rapatItem) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <Users />
          <p>Rapat tidak ditemukan.</p>
          <button className="btn btn-secondary mt-4" onClick={() => navigate('/rapat')}>Kembali</button>
        </div>
      </div>
    );
  }

  const dinas = rapatItem.dinasId ? getDinasById(rapatItem.dinasId) : null;
  const proker = rapatItem.prokerId ? getProkerById(rapatItem.prokerId) : null;
  const attendanceList = rapatItem.attendance || [];
  const announcements = rapatItem.pengumuman || [];

  const isUserParticipant = rapatItem.peserta?.includes(user?.id);
  const isAlreadyAttended = attendanceList.some(a => a.userId === user?.id);
  const canManage = canManageRapat(rapatItem);
  const canPost = canPostAnnouncement(rapatItem);

  // Camera handling for Face Recognition
  const startCamera = async () => {
    try {
      setScanningState('ready');
      setScanMessage('Posisikan wajah Anda tegak lurus dan stabil di dalam bingkai');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access issue, enabling simulation mode', err);
      setScanningState('ready');
      setScanMessage('Kamera simulasi siap. Klik "Pindai Wajah Sekarang".');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  useEffect(() => {
    if (isFaceAttendanceModalOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isFaceAttendanceModalOpen]);

  const handleTriggerFaceScan = async () => {
    setScanningState('scanning');
    setScanMessage('Memindai pola biometrik wajah & memverifikasi identitas peserta...');

    let photoData = null;
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      photoData = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedPhoto(photoData);
    }

    try {
      const result = await FaceRecognitionService.verifyFace(user.id, user.nama, photoData);
      if (result.success) {
        setScanningState('success');
        setScanMessage(result.message);
        recordFaceAttendance(rapatItem.id, user, photoData);
        setTimeout(() => {
          setIsFaceAttendanceModalOpen(false);
        }, 1600);
      } else {
        setScanningState('failed');
        setScanMessage(result.message);
      }
    } catch (err) {
      setScanningState('failed');
      setScanMessage('Terjadi kesalahan pemrosesan biometrik. Silakan ulangi.');
    }
  };

  const handlePostAnnouncementSubmit = (e) => {
    e.preventDefault();
    postPengumumanRapat(rapatItem.id, announcementForm, user);
    setAnnouncementForm({ judul: '', isi: '', lampiran: '' });
    setIsAnnouncementModalOpen(false);
  };

  const handleCancelMeetingSubmit = (e) => {
    e.preventDefault();
    cancelRapat(rapatItem.id, cancelReason, user);
    setIsCancelModalOpen(false);
  };

  return (
    <div className="page-container">
      <button className="back-link" onClick={() => navigate('/rapat')}>
        <ArrowLeft size={16} /> Kembali ke Daftar Rapat
      </button>

      {/* Header */}
      <div className="page-header" style={{ alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 4 }}>
            <span className="badge badge-persiapan">{dinas?.nama || 'BEM FTI'}</span>
            <span className={`badge ${rapatItem.status === 'upcoming' ? 'badge-berjalan' : rapatItem.status === 'dibatalkan' ? 'badge-ditolak' : 'badge-selesai'}`}>
              {rapatItem.status === 'upcoming' ? 'Mendatang' : rapatItem.status === 'dibatalkan' ? 'Dibatalkan' : 'Selesai'}
            </span>
          </div>

          <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>{rapatItem.judul}</h1>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)', marginTop: 4 }}>
            Diselenggarakan oleh {dinas?.namaLengkap || 'BEM KM FTI UNAND'}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {/* Absensi Wajah Button (for participants) */}
          {rapatItem.status === 'upcoming' && isUserParticipant && (
            isAlreadyAttended ? (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'var(--success-bg)',
                color: 'var(--success)',
                border: '1px solid var(--success-border)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 600
              }}>
                <CheckCircle size={16} /> Anda Sudah Absen Hadir
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => setIsFaceAttendanceModalOpen(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#097969' }}
              >
                <ScanFace size={18} />
                Absen Sekarang (Face Recognition)
              </button>
            )
          )}

          {/* Posting Pengumuman (Kadin/Sekdin) */}
          {canPost && rapatItem.status !== 'dibatalkan' && (
            <button
              className="btn btn-secondary"
              onClick={() => setIsAnnouncementModalOpen(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <BellRing size={16} />
              Posting Pengumuman
            </button>
          )}

          {/* Batalkan Rapat (Kadin) */}
          {canManage && rapatItem.status === 'upcoming' && (
            <button
              className="btn btn-ghost"
              onClick={() => setIsCancelModalOpen(true)}
              style={{ color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <X size={16} />
              Batalkan Rapat
            </button>
          )}
        </div>
      </div>

      <div className="detail-grid">
        {/* Main Details */}
        <div>
          {/* Card Info Rapat */}
          <div className="card mb-6">
            <h3 className="mb-4">Informasi & Detail Rapat</h3>
            <div className="detail-meta">
              <div className="meta-item">
                <span className="meta-label">Tanggal Pelaksanaan</span>
                <span className="meta-value">{formatDate(rapatItem.tanggal)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Waktu</span>
                <span className="meta-value">
                  {formatTime(rapatItem.waktu)} {rapatItem.waktuSelesai ? `s/d ${rapatItem.waktuSelesai} WIB` : ''}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Mode Pertemuan</span>
                <span className="meta-value" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {rapatItem.mode === 'Online' ? <Video size={14} color="var(--info)" /> : <Building size={14} />}
                  {rapatItem.mode || 'Offline'}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Lokasi / Tautan</span>
                <span className="meta-value">
                  {rapatItem.mode === 'Online' && rapatItem.linkMeeting ? (
                    <a
                      href={rapatItem.linkMeeting}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--primary-600)', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    >
                      Buka Ruang Virtual <ExternalLink size={12} />
                    </a>
                  ) : (
                    rapatItem.lokasi
                  )}
                </span>
              </div>
              {proker && (
                <div className="meta-item">
                  <span className="meta-label">Program Kerja Terkait</span>
                  <span
                    className="meta-value"
                    style={{ cursor: 'pointer', color: 'var(--primary-600)', fontWeight: 600 }}
                    onClick={() => navigate(`/program-kerja/${proker.id}`)}
                  >
                    {proker.nama} →
                  </span>
                </div>
              )}
            </div>

            {rapatItem.agenda && (
              <div style={{ marginTop: 'var(--space-5)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--gray-100)' }}>
                <span className="meta-label">Agenda / Pokok Pembahasan</span>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-800)', marginTop: 4, lineHeight: 1.6 }}>
                  {rapatItem.agenda}
                </p>
              </div>
            )}
          </div>

          {/* Pengumuman Rapat Section */}
          <div className="card mb-6">
            <div className="card-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <BellRing size={16} color="var(--primary-600)" />
                Pengumuman Rapat ({announcements.length})
              </h3>
              {canPost && rapatItem.status !== 'dibatalkan' && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setIsAnnouncementModalOpen(true)}
                  style={{ color: 'var(--primary-600)' }}
                >
                  + Posting Baru
                </button>
              )}
            </div>

            {announcements.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {announcements.map((ann, idx) => (
                  <div
                    key={ann.id || idx}
                    style={{
                      background: 'var(--primary-50)',
                      borderLeft: '4px solid var(--primary-600)',
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--primary-900)' }}>
                        {ann.judul}
                      </h4>
                      <span style={{ fontSize: '11px', color: 'var(--gray-500)' }}>
                        {new Date(ann.waktu).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>

                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-800)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                      {ann.isi}
                    </p>

                    <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginTop: 6 }}>
                      Diumumkan oleh: <strong>{ann.author}</strong> ({ann.authorRole || 'Kepala Dinas'})
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted" style={{ padding: 'var(--space-2) 0' }}>
                Belum ada pengumuman untuk rapat ini.
              </p>
            )}
          </div>

          {/* Status Kehadiran (Attendance Live Table) */}
          <div className="card mb-6">
            <div className="card-header">
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <ShieldCheck size={16} color="var(--success)" />
                  Daftar & Status Kehadiran Peserta
                </h3>
                <span className="text-xs text-muted">
                  Absensi resmi berbasis biometrik pengenalan wajah (Face Recognition)
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--success)' }}>
                  {attendanceList.length} / {rapatItem.peserta?.length || 0} Hadir
                </span>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Peserta</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Jam Absensi</th>
                    <th>Metode Verifikasi</th>
                  </tr>
                </thead>
                <tbody>
                  {rapatItem.peserta?.map(pId => {
                    const person = getUserById(pId);
                    const record = attendanceList.find(a => a.userId === pId);

                    return (
                      <tr key={pId}>
                        <td style={{ fontWeight: 600 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div className="sidebar-avatar" style={{
                              width: 26, height: 26, fontSize: '10px',
                              background: record ? 'var(--success-bg)' : 'var(--gray-200)',
                              color: record ? 'var(--success)' : 'var(--gray-700)'
                            }}>
                              {person?.avatar}
                            </div>
                            <span>{person?.nama}</span>
                          </div>
                        </td>
                        <td style={{ fontSize: 'var(--font-size-xs)' }}>{person?.role}</td>
                        <td>
                          {record ? (
                            <span className="badge badge-selesai" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                              <CheckCircle size={11} /> Hadir
                            </span>
                          ) : (
                            <span className="badge badge-belum-mulai">Belum Hadir</span>
                          )}
                        </td>
                        <td style={{ fontSize: 'var(--font-size-xs)', color: record ? 'var(--gray-900)' : 'var(--gray-400)' }}>
                          {record?.jam ? `${record.jam} WIB` : '-'}
                        </td>
                        <td style={{ fontSize: 'var(--font-size-xs)' }}>
                          {record ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--primary-700)' }}>
                              <ScanFace size={13} /> {record.metode}
                            </span>
                          ) : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Ringkasan Peserta */}
          <div className="card mb-6">
            <h3 className="mb-4">Undangan Peserta ({rapatItem.peserta?.length || 0})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxHeight: 340, overflowY: 'auto' }}>
              {rapatItem.peserta?.map(pId => {
                const peserta = getUserById(pId);
                const isHadir = attendanceList.some(a => a.userId === pId);

                return (
                  <div key={pId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <div className="sidebar-avatar" style={{
                        width: 28, height: 28, fontSize: '10px',
                        background: isHadir ? 'var(--success-bg)' : 'var(--primary-100)',
                        color: isHadir ? 'var(--success)' : 'var(--primary-700)'
                      }}>
                        {peserta?.avatar}
                      </div>
                      <div>
                        <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{peserta?.nama}</div>
                        <div className="text-xs text-muted">{peserta?.role}</div>
                      </div>
                    </div>
                    {isHadir && (
                      <span style={{ fontSize: '10px', color: 'var(--success)', fontWeight: 700 }}>✓ Hadir</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ABSENSI WAJAH (FACE RECOGNITION) */}
      {isFaceAttendanceModalOpen && (
        <Modal
          title="Absensi Rapat: Pemindai Wajah (Face Recognition)"
          onClose={() => setIsFaceAttendanceModalOpen(false)}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: 420,
              height: 290,
              margin: '0 auto var(--space-4)',
              background: '#0c1929',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
            }}>
              {/* Camera Video Feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Hidden Canvas for capture */}
              <canvas ref={canvasRef} style={{ display: 'none' }} />

              {/* High-Tech HUD Scanner Overlay */}
              <div style={{
                position: 'absolute',
                inset: 30,
                border: scanningState === 'success' ? '3px solid var(--success)' : '2px dashed #5387c3',
                borderRadius: '50%',
                boxShadow: scanningState === 'scanning' ? '0 0 25px rgba(83, 135, 195, 0.7)' : 'none',
                pointerEvents: 'none',
                transition: 'all 0.3s ease'
              }}>
                {scanningState === 'scanning' && (
                  <div style={{
                    width: '100%',
                    height: 2,
                    background: '#00f0ff',
                    boxShadow: '0 0 10px #00f0ff',
                    animation: 'slideUp 1.2s infinite alternate'
                  }} />
                )}
              </div>

              {/* Status Badge inside Camera */}
              <div style={{
                position: 'absolute',
                bottom: 12,
                left: 12,
                right: 12,
                background: 'rgba(0,0,0,0.7)',
                color: scanningState === 'success' ? '#4ade80' : '#fff',
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6
              }}>
                <ScanFace size={13} />
                <span>{scanMessage}</span>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--gray-900)' }}>
                {user?.nama} ({user?.role})
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)', marginTop: 2 }}>
                Sistem akan memverifikasi kecocokan wajah dengan template profil terdaftar.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsFaceAttendanceModalOpen(false)}
              >
                Batal
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleTriggerFaceScan}
                disabled={scanningState === 'scanning' || scanningState === 'success'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#097969' }}
              >
                <Camera size={16} />
                {scanningState === 'scanning' ? 'Memindai Wajah...' : scanningState === 'success' ? 'Terverifikasi ✓' : 'Pindai & Absen Sekarang'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL POSTING PENGUMUMAN RAPAT */}
      {isAnnouncementModalOpen && (
        <Modal
          title="Posting Pengumuman Rapat"
          onClose={() => setIsAnnouncementModalOpen(false)}
        >
          <form onSubmit={handlePostAnnouncementSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Judul Pengumuman</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="Contoh: Pengingat Rapat Dinas Internal Malam Ini"
                value={announcementForm.judul}
                onChange={e => setAnnouncementForm({ ...announcementForm, judul: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Isi Pengumuman</label>
              <textarea
                className="form-textarea"
                rows={4}
                required
                placeholder="Rapat internal Dinas Internal akan dilaksanakan malam ini pukul 19.00 di Sekretariat BEM KM FTI UNAND. Seluruh anggota diharapkan hadir tepat waktu..."
                value={announcementForm.isi}
                onChange={e => setAnnouncementForm({ ...announcementForm, isi: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Lampiran Opsional (Link Dokumen / TOR)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: https://drive.google.com/file/d/..."
                value={announcementForm.lampiran}
                onChange={e => setAnnouncementForm({ ...announcementForm, lampiran: e.target.value })}
              />
            </div>

            <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: 'var(--space-4)' }}>
              *Pengumuman akan langsung disiarkan ke halaman Notifikasi seluruh {rapatItem.peserta?.length || 0} peserta rapat dengan timestamp dan identitas Anda.
            </div>

            <div className="modal-footer" style={{ padding: 'var(--space-2) 0 0', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsAnnouncementModalOpen(false)}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Send size={15} />
                Publikasikan Pengumuman
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL BATALKAN RAPAT */}
      {isCancelModalOpen && (
        <Modal
          title="Batalkan Agenda Rapat"
          onClose={() => setIsCancelModalOpen(false)}
        >
          <form onSubmit={handleCancelMeetingSubmit}>
            <div style={{ padding: 'var(--space-3) 0', color: 'var(--gray-700)' }}>
              Apakah Anda yakin ingin membatalkan rapat <strong>{rapatItem.judul}</strong>? Agenda di kalender akan diperbarui dan seluruh peserta akan menerima notifikasi pembatalan.
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Alasan Pembatalan (Opsional)</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Contoh: Penjadwalan ulang karena bentrok dengan agenda akademik fakultas..."
                value={cancelReason}
                onChange={e => setCancelReason(e.target.value)}
              />
            </div>

            <div className="modal-footer" style={{ padding: 'var(--space-2) 0 0', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsCancelModalOpen(false)}
              >
                Tutup
              </button>
              <button type="submit" className="btn btn-danger">
                Ya, Batalkan Rapat
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
