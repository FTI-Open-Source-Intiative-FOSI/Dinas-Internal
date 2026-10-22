import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  ClipboardCheck, Camera, Upload, Clock, CheckCircle,
  AlertTriangle, Image as ImageIcon, Check, Eye, X, ShieldAlert, RotateCcw
} from 'lucide-react';
import { getUserById, formatDate, formatTime, USERS } from '../../data/mockData';
import Modal from '../../components/ui/Modal';

// Durasi batas absensi (1 jam = 3600000 ms)
const ABSENSI_WINDOW_MS = 60 * 60 * 1000;

export default function PiketPage() {
  const { user } = useAuth();
  const { jadwalPiket, recordPiketAttendance, resetPiketAttendance, addToast } = useApp();

  const [activeTab, setActiveTab] = useState('hari-ini'); // 'hari-ini', 'riwayat'
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [selectedPhotoPreview, setSelectedPhotoPreview] = useState(null);

  // Reference timestamp untuk window 1 jam agar persistent dan tidak reset saat refresh
  const [shiftStartTime, setShiftStartTime] = useState(() => {
    const saved = localStorage.getItem('bem_piket_shift_start');
    if (saved) return Number(saved);
    // Jika belum ada, set shift mulai 18 menit yang lalu agar countdown menampilkan ~42 menit seperti spesifikasi
    const defaultStart = Date.now() - (17 * 60 * 1000 + 43 * 1000); // sisa ~42:17
    localStorage.setItem('bem_piket_shift_start', defaultStart.toString());
    return defaultStart;
  });

  const [remainingMs, setRemainingMs] = useState(() => {
    const elapsed = Date.now() - shiftStartTime;
    return Math.max(0, ABSENSI_WINDOW_MS - elapsed);
  });

  // Countdown timer interval (1 second)
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - shiftStartTime;
      const left = ABSENSI_WINDOW_MS - elapsed;
      setRemainingMs(Math.max(0, left));
    }, 1000);

    return () => clearInterval(interval);
  }, [shiftStartTime]);

  const isWindowExpired = remainingMs <= 0;

  // Format MM:SS
  const formatCountdown = (ms) => {
    if (ms <= 0) return '00:00';
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // State shift yang dipilih untuk hari ini (prioritaskan yang Belum Absen atau staff Muhammad Yusuf u39)
  const [selectedShiftId, setSelectedShiftId] = useState(() => {
    // Cari shift yang belum absen dulu
    const uncompleted = jadwalPiket.find(j => j.status === 'Belum Absen' || j.status === 'Sedang Piket');
    if (uncompleted) return uncompleted.id;
    // Atau cari shift Muhammad Yusuf (Internal)
    const yusufShift = jadwalPiket.find(j => j.staffId === 'u39');
    if (yusufShift) return yusufShift.id;
    return jadwalPiket[0]?.id || 'jp1';
  });

  const shiftToday = jadwalPiket.find(j => j.id === selectedShiftId) || jadwalPiket[0] || {
    id: 'jp1',
    tanggal: '2026-09-18',
    jamMulai: '14:00',
    jamSelesai: '16:00',
    staffId: 'u39', // Muhammad Yusuf (Dinas INTERNAL)
    status: 'Belum Absen'
  };

  const assignedStaff = getUserById(shiftToday.staffId) || { nama: 'Muhammad Yusuf', role: 'Staff Dinas Internal' };
  const isShiftHadir = shiftToday.status === 'Hadir' || shiftToday.status === 'Selesai';

  // Camera & Photo State
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      setCapturedPhoto(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Webcam fallback active:', err);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop());
      setCameraStream(null);
    }
  };

  useEffect(() => {
    if (isCameraModalOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isCameraModalOpen]);

  const handleTakeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
      setCapturedPhoto(dataUrl);
    } else {
      // Fallback
      setCapturedPhoto('/logo-bem.png');
    }
  };

  const handleUploadFallback = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmAttendance = () => {
    const photoToSave = capturedPhoto || '/logo-bem.png';
    recordPiketAttendance(shiftToday.id, user, photoToSave);
    setIsCameraModalOpen(false);
  };

  // Reset shift testing timer
  const handleResetTimerTest = () => {
    const newStart = Date.now();
    localStorage.setItem('bem_piket_shift_start', newStart.toString());
    setShiftStartTime(newStart);
    setRemainingMs(ABSENSI_WINDOW_MS);
    addToast('Timer 1 jam berhasil di-reset untuk simulasi pengujian!', 'info');
  };

  // Reset shift status ke Belum Absen
  const handleResetStatus = () => {
    resetPiketAttendance(shiftToday.id);
    const newStart = Date.now() - (17 * 60 * 1000 + 43 * 1000); // sisa ~42:17
    localStorage.setItem('bem_piket_shift_start', newStart.toString());
    setShiftStartTime(newStart);
    setRemainingMs(ABSENSI_WINDOW_MS - (17 * 60 * 1000 + 43 * 1000));
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <ClipboardCheck className="page-title-icon" />
            Piket Sekretariat BEM KM FTI UNAND
          </h1>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)', marginTop: 4 }}>
            Sistem absensi piket harian berbasis bukti foto dan batas waktu countdown 1 jam.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleResetStatus}
            title="Reset status piket ke 'Belum Absen' agar tombol 'Absen Sekarang' muncul kembali"
          >
            <RotateCcw size={14} /> Reset Status (Belum Absen)
          </button>
          <button className="btn btn-ghost btn-sm" onClick={handleResetTimerTest} title="Reset Timer 1 Jam Demo">
            <Clock size={14} /> Reset Timer (60:00)
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--space-5)' }}>
        <button className={`tab ${activeTab === 'hari-ini' ? 'active' : ''}`} onClick={() => setActiveTab('hari-ini')}>
          Jadwal Piket Hari Ini
        </button>
        <button className={`tab ${activeTab === 'riwayat' ? 'active' : ''}`} onClick={() => setActiveTab('riwayat')}>
          Daftar Jadwal & Riwayat ({jadwalPiket.length})
        </button>
      </div>

      {activeTab === 'hari-ini' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-6)' }}>
          {/* Card Utama: Piket Hari Ini */}
          <div>
            <div
              className="card"
              style={{
                borderTop: isShiftHadir ? '4px solid var(--success)' : isWindowExpired ? '4px solid var(--danger)' : '4px solid var(--primary-600)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                <div>
                  <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-700)', letterSpacing: 0.5 }}>
                    PIKET SEKRETARIAT
                  </span>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--gray-900)' }}>
                    Hari Ini, {formatDate(shiftToday.tanggal)}
                  </h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${isShiftHadir ? 'badge-selesai' : isWindowExpired ? 'badge-ditolak' : 'badge-menunggu'}`}>
                    {isShiftHadir ? 'Hadir' : isWindowExpired ? 'Waktu Berakhir' : 'Belum Absen'}
                  </span>
                </div>
              </div>

              {/* Shift Selector Dropdown */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: '#f8fafc',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                border: '1px solid var(--gray-200)'
              }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--gray-700)' }}>
                  Pilih Jadwal Shift:
                </span>
                <select
                  className="form-select"
                  style={{ width: 'auto', padding: '4px 10px', fontSize: '12px' }}
                  value={shiftToday.id}
                  onChange={e => setSelectedShiftId(e.target.value)}
                >
                  {jadwalPiket.slice(0, 6).map(j => {
                    const stf = getUserById(j.staffId);
                    return (
                      <option key={j.id} value={j.id}>
                        {j.jamMulai} - {j.jamSelesai || '16:00'} WIB • {stf?.nama} ({j.status})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Shift Timing */}
              <div style={{
                background: 'var(--gray-50)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                marginBottom: 'var(--space-5)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-4)'
              }}>
                <div>
                  <span className="text-xs text-muted">Jadwal Shift:</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--gray-800)', marginTop: 2 }}>
                    {shiftToday.jamMulai} s/d {shiftToday.jamSelesai || '16:00'} WIB
                  </div>
                </div>

                <div>
                  <span className="text-xs text-muted">Petugas Piket:</span>
                  <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--gray-900)', marginTop: 2 }}>
                    {assignedStaff.nama}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>
                    {assignedStaff.role}
                  </div>
                </div>
              </div>

              {/* Countdown / Status Section */}
              {!isShiftHadir && (
                <div style={{
                  border: '1px dashed var(--gray-300)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  marginBottom: 'var(--space-5)',
                  textAlign: 'center',
                  background: isWindowExpired ? '#fff5f5' : '#f0f7ff'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: isWindowExpired ? 'var(--danger)' : 'var(--primary-700)', marginBottom: 4 }}>
                    <Clock size={16} />
                    <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'uppercase' }}>
                      {isWindowExpired ? 'Batas Waktu Absensi Berakhir' : 'Waktu Tersisa untuk Absensi'}
                    </span>
                  </div>

                  <div style={{
                    fontSize: '2.4rem',
                    fontWeight: 800,
                    fontFamily: 'monospace',
                    color: isWindowExpired ? 'var(--danger)' : 'var(--primary-700)',
                    letterSpacing: 2
                  }}>
                    {formatCountdown(remainingMs)}
                  </div>

                  <div style={{ fontSize: '11px', color: 'var(--gray-600)', marginTop: 4 }}>
                    {isWindowExpired ? (
                      <span style={{ color: 'var(--danger)', fontWeight: 600 }}>
                        Periode absensi telah berakhir (melewati batas toleransi 1 jam sejak jam piket dimulai).
                      </span>
                    ) : (
                      <span>
                        Batas absensi adalah 1 jam sejak waktu piket dimulai ({shiftToday.jamMulai} s.d. 15:00 WIB).
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button / Success Card */}
              {isShiftHadir ? (
                <div>
                  <div style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    marginBottom: 'var(--space-4)'
                  }}>
                    {shiftToday.fotoBukti && (
                      <img
                        src={shiftToday.fotoBukti}
                        alt="Bukti Kehadiran"
                        style={{
                          width: 70,
                          height: 70,
                          objectFit: 'cover',
                          borderRadius: 'var(--radius-md)',
                          border: '2px solid #86efac',
                          cursor: 'pointer'
                        }}
                        onClick={() => setSelectedPhotoPreview(shiftToday.fotoBukti)}
                        title="Klik untuk memperbesar foto bukti"
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success)', fontWeight: 700, fontSize: 'var(--font-size-md)' }}>
                        <CheckCircle size={18} />
                        Absensi Berhasil Dicatat
                      </div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-700)', marginTop: 4 }}>
                        Status: <strong>Hadir</strong> · Jam Absen: <strong>{shiftToday.jamAbsen || '14:18'} WIB</strong>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginTop: 2 }}>
                        Foto bukti telah tersimpan di sistem manajemen sekretariat.
                      </div>
                    </div>
                  </div>

                  {/* Tombol Aksi Tambahan saat sudah hadir */}
                  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <button
                      className="btn btn-primary"
                      style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                      onClick={() => setIsCameraModalOpen(true)}
                    >
                      <Camera size={16} /> Ambil Ulang Foto Absensi
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                      onClick={handleResetStatus}
                      title="Reset status ke Belum Absen"
                    >
                      <RotateCcw size={14} /> Reset Status
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn-primary btn-lg w-full"
                  disabled={isWindowExpired}
                  onClick={() => setIsCameraModalOpen(true)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    fontSize: '1rem',
                    fontWeight: 700,
                    padding: '14px 20px',
                    background: isWindowExpired ? 'var(--gray-300)' : 'var(--primary-600)',
                    boxShadow: '0 4px 12px rgba(30, 58, 95, 0.25)'
                  }}
                >
                  <Camera size={20} />
                  {isWindowExpired ? 'Periode Absensi Ditutup' : 'ABSEN SEKARANG (FOTO BUKTI)'}
                </button>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Panduan & Informasi Piket */}
          <div>
            <div className="card mb-6">
              <h3 className="mb-4">Ketentuan Piket Sekretariat</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--font-size-sm)', color: 'var(--gray-700)' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <Check size={16} color="var(--primary-600)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>Petugas wajib hadir di Sekretariat BEM KM FTI UNAND sesuai jadwal shift masing-masing.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <Check size={16} color="var(--primary-600)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>Absensi dilakukan menggunakan foto langsung di dalam ruangan sekretariat.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <Clock size={16} color="var(--warning)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span><strong>Countdown 1 Jam:</strong> Absensi hanya dibuka selama 1 jam pertama sejak jam mulai shift (contoh: 14.00 - 15.00 WIB).</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <AlertTriangle size={16} color="var(--danger)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>Jika lewat 1 jam, sistem otomatis mengunci form dan menandai shift sebagai tidak selesai/alpa.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB RIWAYAT JADWAL */}
      {activeTab === 'riwayat' && (
        <div className="card">
          <div className="card-header">
            <h3>Jadwal & Riwayat Absensi Piket Sekretariat</h3>
            <span className="text-xs text-muted">Total {jadwalPiket.length} jadwal terdaftar</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Shift</th>
                  <th>Petugas Piket</th>
                  <th>Status</th>
                  <th>Jam Absen</th>
                  <th>Bukti Kehadiran</th>
                </tr>
              </thead>
              <tbody>
                {jadwalPiket.map(jp => {
                  const staff = getUserById(jp.staffId);
                  const isDone = jp.status === 'Hadir' || jp.status === 'Selesai';

                  return (
                    <tr key={jp.id}>
                      <td style={{ fontWeight: 600 }}>{formatDate(jp.tanggal)}</td>
                      <td>{jp.jamMulai} s/d 16:00 WIB</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="sidebar-avatar" style={{ width: 24, height: 24, fontSize: '10px' }}>
                            {staff?.avatar}
                          </div>
                          <div>
                            <div style={{ fontWeight: 500 }}>{staff?.nama}</div>
                            <div className="text-xs text-muted">{staff?.role}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${isDone ? 'badge-selesai' : 'badge-belum-mulai'}`}>
                          {jp.status}
                        </span>
                      </td>
                      <td style={{ fontSize: 'var(--font-size-xs)' }}>
                        {jp.jamAbsen ? `${jp.jamAbsen} WIB` : '-'}
                      </td>
                      <td>
                        {jp.fotoBukti ? (
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => setSelectedPhotoPreview(jp.fotoBukti)}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--primary-600)' }}
                          >
                            <Eye size={13} /> Lihat Foto
                          </button>
                        ) : (
                          <span style={{ fontSize: '11px', color: 'var(--gray-400)' }}>Belum ada foto</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL KAMERA ABSENSI PIKET */}
      {isCameraModalOpen && (
        <Modal
          title="Ambil Foto Kehadiran Piket Sekretariat"
          onClose={() => setIsCameraModalOpen(false)}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: 420,
              height: 280,
              margin: '0 auto var(--space-4)',
              background: '#0c1929',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {capturedPhoto ? (
                <img
                  src={capturedPhoto}
                  alt="Snapshot"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}

              <canvas ref={canvasRef} style={{ display: 'none' }} />

              {/* Timestamp Watermark */}
              <div style={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                right: 8,
                background: 'rgba(0,0,0,0.65)',
                color: '#fff',
                fontSize: '10px',
                padding: '3px 8px',
                borderRadius: 4,
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>Sekretariat BEM KM FTI UNAND</span>
                <span>{new Date().toLocaleTimeString('id-ID')} WIB</span>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
              {!capturedPhoto ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleTakeSnapshot}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <Camera size={16} /> Ambil Foto
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setCapturedPhoto(null)}
                >
                  Ambil Ulang Foto
                </button>
              )}

              <label className="btn btn-secondary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Upload size={14} /> Upload File Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadFallback}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <div className="modal-footer" style={{ padding: 'var(--space-3) 0 0', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsCameraModalOpen(false)}
              >
                Batal
              </button>

              <button
                type="button"
                className="btn btn-success"
                disabled={!capturedPhoto}
                onClick={handleConfirmAttendance}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Check size={16} /> Konfirmasi & Catat Absensi
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL PREVIEW FOTO */}
      {selectedPhotoPreview && (
        <Modal
          title="Bukti Foto Kehadiran Piket"
          onClose={() => setSelectedPhotoPreview(null)}
        >
          <div style={{ textAlign: 'center' }}>
            <img
              src={selectedPhotoPreview}
              alt="Bukti Kehadiran"
              style={{
                width: '100%',
                maxHeight: 380,
                objectFit: 'contain',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)'
              }}
            />
            <button className="btn btn-primary" onClick={() => setSelectedPhotoPreview(null)}>
              Tutup
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
