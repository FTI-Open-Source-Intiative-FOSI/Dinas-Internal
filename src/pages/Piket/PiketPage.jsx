import { useState, useEffect, useRef, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  ClipboardCheck, Camera, Upload, Clock, CheckCircle,
  Check, Eye, RotateCcw,
  Calendar, Award, Search
} from 'lucide-react';
import { KETENTUAN_PIKET, getUserById, formatDate } from '../../data/mockData';
import Modal from '../../components/ui/Modal';

const DAYS_LIST = ['Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at"];

// Jam operasional piket resmi: 09.00 - 16.00 WIB (Durasi minimal 1 jam)
export default function PiketPage() {
  const { user } = useAuth();
  const { jadwalPiket, recordPiketAttendance, resetPiketAttendance, addToast } = useApp();

  const [activeTab, setActiveTab] = useState('hari-ini'); // 'hari-ini', 'matriks', 'riwayat', 'ketentuan'
  const [selectedMinggu, setSelectedMinggu] = useState('Ganjil'); // 'Ganjil' | 'Genap'
  const [selectedHariFilter, setSelectedHariFilter] = useState('Semua'); // 'Semua', 'Senin', ...
  const [searchQuery, setSearchQuery] = useState('');
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [selectedPhotoPreview, setSelectedPhotoPreview] = useState(null);
  const [highlightShiftCard, setHighlightShiftCard] = useState(false);

  // Waktu berjalan
  const [currentTimeStr, setCurrentTimeStr] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      setCurrentTimeStr(d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Temukan jadwal piket user yang sedang login jika ada
  const myPiketShift = useMemo(() => {
    if (!user?.id) return null;
    return jadwalPiket.find(j => j.staffId === user.id) || null;
  }, [jadwalPiket, user]);

  // Shift aktif yang dipilih untuk dicatat/dilihat
  const [selectedShiftId, setSelectedShiftId] = useState(() => {
    // Utamakan shift user sendiri jika ada
    const mine = jadwalPiket.find(j => j.staffId === user?.id);
    if (mine) return mine.id;
    // Atau shift Yusuf (internal)
    const yusuf = jadwalPiket.find(j => j.staffId === 'u39');
    if (yusuf) return yusuf.id;
    return jadwalPiket[0]?.id || 'jp1';
  });

  // Sinkronkan selectedShiftId jika user login berganti
  useEffect(() => {
    if (user?.id) {
      const mine = jadwalPiket.find(j => j.staffId === user.id);
      if (mine) {
        setSelectedShiftId(mine.id);
      }
    }
  }, [user?.id, jadwalPiket]);

  const shiftToday = useMemo(() => {
    return jadwalPiket.find(j => j.id === selectedShiftId) || jadwalPiket[0] || {
      id: 'jp1',
      minggu: 'Ganjil',
      hari: 'Senin',
      tanggal: '2026-09-14',
      jamMulai: '09:00',
      jamSelesai: '16:00',
      staffId: 'u1',
      status: 'Belum Absen'
    };
  }, [jadwalPiket, selectedShiftId]);

  const assignedStaff = getUserById(shiftToday.staffId) || {
    nama: shiftToday.namaPetugas || 'Petugas Piket',
    role: 'Pengurus BEM'
  };

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

  const handleResetStatus = (idToReset = shiftToday.id) => {
    resetPiketAttendance(idToReset);
    addToast('Status piket di-reset ke Belum Absen.', 'info');
  };

  const ganjilByDay = useMemo(() => {
    const res = {};
    DAYS_LIST.forEach(d => {
      res[d] = jadwalPiket.filter(j => j.minggu === 'Ganjil' && j.hari === d);
    });
    return res;
  }, [jadwalPiket]);

  const genapByDay = useMemo(() => {
    const res = {};
    DAYS_LIST.forEach(d => {
      res[d] = jadwalPiket.filter(j => j.minggu === 'Genap' && j.hari === d);
    });
    return res;
  }, [jadwalPiket]);

  // Filtered Riwayat
  const filteredRiwayat = useMemo(() => {
    return jadwalPiket.filter(jp => {
      const staff = getUserById(jp.staffId);
      const matchMinggu = selectedMinggu === 'Semua' || jp.minggu === selectedMinggu;
      const matchHari = selectedHariFilter === 'Semua' || jp.hari === selectedHariFilter;
      const matchQuery = !searchQuery ||
        (staff?.nama || jp.namaPetugas || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (staff?.role || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (jp.hari || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchMinggu && matchHari && matchQuery;
    });
  }, [jadwalPiket, selectedMinggu, selectedHariFilter, searchQuery]);

  const handleViewMyShift = () => {
    if (!myPiketShift) return;
    setSelectedShiftId(myPiketShift.id);
    setActiveTab('hari-ini');
    setHighlightShiftCard(true);
    addToast(`Menampilkan jadwal piket Anda: Minggu ${myPiketShift.minggu} (${myPiketShift.hari})`, 'info');
    setTimeout(() => {
      const el = document.getElementById('lembar-absensi-card');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
    setTimeout(() => {
      setHighlightShiftCard(false);
    }, 2500);
  };

  return (
    <div className="page-container">
      {/* Header Halaman */}
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
            <span className="badge badge-persiapan">Sistem Piket Sekretariat</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)' }}>
              09.00 – 16.00 WIB • Min. 1 Jam • +3 Poin Hadir
            </span>
          </div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <ClipboardCheck className="page-title-icon" />
            Piket Sekretariat BEM KM FTI UNAND
          </h1>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)', marginTop: 4 }}>
            Manajemen jadwal, ketentuan resmi piket, dan sistem absensi digital pengurus Kabinet Vismayakriya 2025/2026.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center' }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setIsCameraModalOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Camera size={14} /> Absen Sekarang
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleResetStatus(shiftToday.id)}
            title="Reset status jadwal piket yang sedang dipilih"
          >
            <RotateCcw size={14} /> Reset Status
          </button>
        </div>
      </div>

      {/* Banner Info Jadwal Personal */}
      {myPiketShift && (
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)',
          border: '1px solid #bae6fd',
          borderRadius: 'var(--radius-lg)',
          padding: '12px 18px',
          marginBottom: 'var(--space-5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'var(--primary-600)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700
            }}>
              <Calendar size={18} />
            </div>
            <div>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--primary-800)', textTransform: 'uppercase' }}>
                Jadwal Piket Anda Terdaftar
              </div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-800)' }}>
                <strong>{myPiketShift.minggu} ({myPiketShift.hari})</strong> • Waktu Operasional: <strong>09.00 - 16.00 WIB</strong> (Min. 1 Jam)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className={`badge ${myPiketShift.status === 'Hadir' ? 'badge-selesai' : 'badge-menunggu'}`}>
              Status: {myPiketShift.status} {myPiketShift.status === 'Hadir' && '(+3 Poin)'}
            </span>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleViewMyShift}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Eye size={14} /> Lihat Shift Saya
            </button>
          </div>
        </div>
      )}

      {/* Navigasi Tab */}
      <div className="tabs" style={{ marginBottom: 'var(--space-5)' }}>
        <button
          className={`tab ${activeTab === 'hari-ini' ? 'active' : ''}`}
          onClick={() => setActiveTab('hari-ini')}
        >
          Absensi & Shift Terpilih
        </button>
        <button
          className={`tab ${activeTab === 'matriks' ? 'active' : ''}`}
          onClick={() => setActiveTab('matriks')}
        >
          Matriks Jadwal (Ganjil & Genap)
        </button>
        <button
          className={`tab ${activeTab === 'ketentuan' ? 'active' : ''}`}
          onClick={() => setActiveTab('ketentuan')}
        >
          Ketentuan Pelaksanaan Piket (10 Poin)
        </button>
        <button
          className={`tab ${activeTab === 'riwayat' ? 'active' : ''}`}
          onClick={() => setActiveTab('riwayat')}
        >
          Daftar 81 Pengurus ({jadwalPiket.length})
        </button>
      </div>

      {/* ================= TAB 1: ABSENSI & SHIFT HARI INI ================= */}
      {activeTab === 'hari-ini' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-6)' }}>
          {/* Kolom Kiri: Kartu Absensi */}
          <div>
            <div
              id="lembar-absensi-card"
              className="card"
              style={{
                borderTop: isShiftHadir ? '4px solid var(--success)' : '4px solid var(--primary-600)',
                boxShadow: highlightShiftCard ? '0 0 0 3px var(--primary-500), 0 10px 25px -5px rgba(59, 130, 246, 0.4)' : 'var(--shadow-md)',
                transform: highlightShiftCard ? 'scale(1.01)' : 'scale(1)',
                transition: 'all 0.35s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                <div>
                  <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-700)', letterSpacing: 0.5 }}>
                    LEMBAR ABSENSI PIKET SEKRETARIAT
                  </span>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--gray-900)' }}>
                    {shiftToday.minggu} — {shiftToday.hari}, {formatDate(shiftToday.tanggal)}
                  </h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${isShiftHadir ? 'badge-selesai' : 'badge-menunggu'}`}>
                    {isShiftHadir ? 'Hadir (+3 Poin)' : 'Belum Absen'}
                  </span>
                </div>
              </div>

              {/* Selector Petugas / Shift */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: '#f8fafc',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                border: '1px solid var(--gray-200)',
                flexWrap: 'wrap',
                gap: 8
              }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--gray-700)' }}>
                  Pilih Pengurus / Jadwal Shift:
                </span>
                <select
                  className="form-select"
                  style={{ width: 'auto', minWidth: 260, padding: '5px 12px', fontSize: '12px' }}
                  value={shiftToday.id}
                  onChange={e => setSelectedShiftId(e.target.value)}
                >
                  <optgroup label="Minggu Ganjil">
                    {jadwalPiket.filter(j => j.minggu === 'Ganjil').slice(0, 15).map(j => {
                      const stf = getUserById(j.staffId);
                      return (
                        <option key={j.id} value={j.id}>
                          [{j.hari}] {stf?.nama || j.namaPetugas} — {j.status}
                        </option>
                      );
                    })}
                  </optgroup>
                  <optgroup label="Minggu Genap">
                    {jadwalPiket.filter(j => j.minggu === 'Genap').slice(0, 15).map(j => {
                      const stf = getUserById(j.staffId);
                      return (
                        <option key={j.id} value={j.id}>
                          [{j.hari}] {stf?.nama || j.namaPetugas} — {j.status}
                        </option>
                      );
                    })}
                  </optgroup>
                </select>
              </div>

              {/* Card Ringkasan Shift */}
              <div style={{
                background: 'var(--gray-50)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                marginBottom: 'var(--space-5)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-4)',
                border: '1px solid var(--gray-200)'
              }}>
                <div>
                  <span className="text-xs text-muted">Rentang Jam Operasional:</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-700)', marginTop: 2 }}>
                    09.00 – 16.00 WIB
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                    <span className="badge badge-persiapan" style={{ fontSize: '10px' }}>Durasi Min. 1 Jam</span>
                    <span className="badge badge-selesai" style={{ fontSize: '10px' }}>+3 Poin Sesuai Jadwal</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-muted">Petugas Terjadwal:</span>
                  <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--gray-900)', marginTop: 2 }}>
                    {assignedStaff.nama}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--gray-600)' }}>
                    {assignedStaff.role}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--primary-600)', marginTop: 2, fontWeight: 500 }}>
                    Minggu {shiftToday.minggu} • Hari {shiftToday.hari}
                  </div>
                </div>
              </div>

              {/* Status Absensi Card */}
              {!isShiftHadir ? (
                <div style={{
                  border: '1px dashed var(--primary-300)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  marginBottom: 'var(--space-5)',
                  textAlign: 'center',
                  background: '#f0f7ff'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--primary-700)', marginBottom: 4 }}>
                    <Clock size={16} />
                    <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase' }}>
                      Waktu Sekarang: {currentTimeStr} WIB
                    </span>
                  </div>

                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-800)', marginTop: 4 }}>
                    Piket Dilaksanakan Pukul 09.00–16.00 WIB
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--gray-600)', marginTop: 6, maxWidth: 440, margin: '6px auto 0' }}>
                    Sesuai <strong>Ketentuan Pelaksanaan Piket</strong>, setiap pengurus wajib piket minimal <strong>1 jam</strong>, melakukan absensi langsung di website ini, dan menjaga kebersihan sekretariat.
                  </div>
                </div>
              ) : (
                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-5)'
                }}>
                  {shiftToday.fotoBukti ? (
                    <img
                      src={shiftToday.fotoBukti}
                      alt="Bukti Kehadiran"
                      style={{
                        width: 76,
                        height: 76,
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-md)',
                        border: '2px solid #86efac',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedPhotoPreview(shiftToday.fotoBukti)}
                      title="Klik untuk memperbesar bukti kehadiran"
                    />
                  ) : (
                    <div style={{ width: 76, height: 76, background: '#dcfce7', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                      <CheckCircle size={32} />
                    </div>
                  )}

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success)', fontWeight: 700, fontSize: 'var(--font-size-md)' }}>
                      <CheckCircle size={18} />
                      Absensi Piket Telah Tercatat
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-800)', marginTop: 4 }}>
                      Status: <strong>Hadir</strong> · Jam Absen: <strong>{shiftToday.jamAbsen || '10:15'} WIB</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <span className="badge badge-selesai" style={{ fontSize: '10px' }}>
                        <Award size={11} style={{ marginRight: 2 }} /> +3 Poin Keaktifan Diperoleh
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsCameraModalOpen(true)}
                  style={{
                    flex: 1,
                    minWidth: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '12px 18px',
                    fontWeight: 700
                  }}
                >
                  <Camera size={18} />
                  {isShiftHadir ? 'AMBIL ULANG FOTO ABSENSI' : 'ABSEN SEKARANG (FOTO BUKTI WEB)'}
                </button>

                {isShiftHadir && (
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleResetStatus(shiftToday.id)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 16px' }}
                    title="Reset status ke Belum Absen"
                  >
                    <RotateCcw size={15} /> Reset Status
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Ringkasan 10 Ketentuan & Checklist */}
          <div>
            <div className="card mb-6" style={{ borderLeft: '4px solid var(--primary-600)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <h3 style={{ fontSize: '1.05rem', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ClipboardCheck size={18} color="var(--primary-600)" />
                  Ketentuan Pelaksanaan Piket
                </h3>
                <button
                  className="btn btn-ghost btn-xs text-primary"
                  onClick={() => setActiveTab('ketentuan')}
                >
                  Lihat 10 Poin Lengkap →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 'var(--font-size-xs)' }}>
                {KETENTUAN_PIKET.slice(0, 5).map(k => (
                  <div key={k.no} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '4px 0' }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: 'var(--primary-100)',
                      color: 'var(--primary-800)',
                      fontSize: '10px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {k.no}
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{k.deskripsi}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 'var(--space-4)',
                paddingTop: 'var(--space-3)',
                borderTop: '1px solid var(--gray-200)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8
              }}>
                <div style={{ background: '#f0fdf4', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534' }}>+3 Poin Keaktifan</div>
                  <div style={{ fontSize: '10px', color: '#15803d' }}>Bagi yang piket sesuai jadwal</div>
                </div>
                <div style={{ background: '#fef2f2', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #fecaca' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#991b1b' }}>-3 Poin / Denda</div>
                  <div style={{ fontSize: '10px', color: '#b91c1c' }}>Jika tidak piket tanpa izin</div>
                </div>
              </div>
            </div>

            {/* Checklist Kewajiban Piket */}
            <div className="card">
              <h4 style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-3)', color: 'var(--gray-800)' }}>
                Checklist Selama Piket Berlangsung
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '12px', color: 'var(--gray-700)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={14} color="var(--success)" />
                  <span>Lakukan absensi digital langsung melalui website ini</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={14} color="var(--success)" />
                  <span>Jaga kebersihan lantai, meja kerja, dan ruang sekre</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={14} color="var(--success)" />
                  <span>Pengecekan kelengkapan & kerapian inventaris</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={14} color="var(--success)" />
                  <span>Pelaksanaan piket memenuhi durasi minimal 1 jam</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={14} color="var(--success)" />
                  <span>Kondisi rapi, bersih, lampu mati & sekre terkunci aman saat pulang</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: MATRIKS JADWAL (GANJIL & GENAP) ================= */}
      {activeTab === 'matriks' && (
        <div>
          {/* Sub Header & Selector Minggu */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-5)'
          }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                Matriks Jadwal Piket Sekretariat BEM KM FTI UNAND
              </h2>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-600)', margin: '2px 0 0' }}>
                Jadwal resmi per putaran Minggu Ganjil (40 Pengurus) & Minggu Genap (41 Pengurus) • Jam 09.00 - 16.00 WIB
              </p>
            </div>

            {/* Toggle Switch Minggu Ganjil / Genap */}
            <div style={{
              display: 'inline-flex',
              background: 'var(--gray-200)',
              borderRadius: 'var(--radius-md)',
              padding: 3
            }}>
              <button
                type="button"
                className={`btn btn-sm ${selectedMinggu === 'Ganjil' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSelectedMinggu('Ganjil')}
                style={{ padding: '6px 16px', fontWeight: 600 }}
              >
                Minggu Ganjil (40 Orang)
              </button>
              <button
                type="button"
                className={`btn btn-sm ${selectedMinggu === 'Genap' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSelectedMinggu('Genap')}
                style={{ padding: '6px 16px', fontWeight: 600 }}
              >
                Minggu Genap (41 Orang)
              </button>
            </div>
          </div>

          {/* Grid Hari: Senin s.d. Jum'at */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 'var(--space-4)'
          }}>
            {DAYS_LIST.map(hari => {
              const currentList = selectedMinggu === 'Ganjil' ? ganjilByDay[hari] : genapByDay[hari];
              const isTodayDay = hari === "Jum'at"; // Jum'at demo hari ini

              return (
                <div
                  key={hari}
                  className="card"
                  style={{
                    padding: 'var(--space-4)',
                    background: '#fff',
                    border: isTodayDay ? '2px solid var(--primary-500)' : '1px solid var(--gray-200)',
                    boxShadow: isTodayDay ? '0 4px 14px rgba(30, 58, 95, 0.12)' : 'var(--shadow-sm)'
                  }}
                >
                  {/* Header Kartu Hari */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 'var(--space-2)',
                    borderBottom: '2px solid var(--primary-100)',
                    marginBottom: 'var(--space-3)'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--primary-800)' }}>
                        {hari}
                      </h3>
                      <span style={{ fontSize: '11px', color: 'var(--gray-500)' }}>
                        Minggu {selectedMinggu}
                      </span>
                    </div>
                    <span className="badge badge-persiapan" style={{ fontSize: '10px' }}>
                      {currentList?.length || 0} Petugas
                    </span>
                  </div>

                  {/* Daftar Petugas Piket */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {currentList?.map((jp, idx) => {
                      const staff = getUserById(jp.staffId);
                      const isMe = user?.id === jp.staffId;
                      const isDone = jp.status === 'Hadir' || jp.status === 'Selesai';

                      return (
                        <div
                          key={jp.id}
                          style={{
                            padding: '7px 9px',
                            borderRadius: 'var(--radius-sm)',
                            background: isMe ? '#e0f2fe' : (idx % 2 === 0 ? '#f8fafc' : '#ffffff'),
                            border: isMe ? '1px solid #7dd3fc' : '1px solid var(--gray-100)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 6
                          }}
                        >
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              fontSize: '11.5px',
                              fontWeight: isMe ? 700 : 600,
                              color: isMe ? 'var(--primary-800)' : 'var(--gray-900)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              <span style={{ color: 'var(--gray-400)', fontSize: '10px', width: 14 }}>
                                {idx + 1}.
                              </span>
                              <span title={staff?.nama || jp.namaPetugas} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {staff?.nama || jp.namaPetugas}
                              </span>
                              {isMe && (
                                <span className="badge badge-admin" style={{ fontSize: '9px', padding: '1px 4px' }}>
                                  Anda
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--gray-500)', paddingLeft: 20 }}>
                              {staff?.role || 'Pengurus'}
                            </div>
                          </div>

                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            {isDone ? (
                              <span className="badge badge-selesai" style={{ fontSize: '9px', padding: '2px 5px' }} title="Hadir (+3 Poin)">
                                Hadir
                              </span>
                            ) : (
                              <button
                                className="btn btn-ghost btn-xs text-primary"
                                style={{ padding: '2px 6px', fontSize: '10px' }}
                                onClick={() => {
                                  setSelectedShiftId(jp.id);
                                  setActiveTab('hari-ini');
                                }}
                                title="Pilih jadwal ini untuk absen"
                              >
                                Pilih
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 3: KETENTUAN RESMI 10 POIN ================= */}
      {activeTab === 'ketentuan' && (
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div className="card mb-6" style={{ borderTop: '4px solid var(--primary-600)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-5)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--gray-200)' }}>
              <span className="badge badge-persiapan" style={{ marginBottom: 6 }}>Surat Ketentuan Resmi</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-900)' }}>
                Ketentuan Pelaksanaan Piket Sekretariat
              </h2>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)', margin: '4px 0 0' }}>
                Badan Eksekutif Mahasiswa Keluarga Mahasiswa Fakultas Teknologi Informasi (BEM KM FTI UNAND) • Kabinet Vismayakriya 2025/2026
              </p>
            </div>

            {/* 10 Poin Ketentuan List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {KETENTUAN_PIKET.map(k => (
                <div
                  key={k.no}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-4)',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: k.no % 2 === 1 ? '#f8fafc' : '#ffffff',
                    border: '1px solid var(--gray-200)'
                  }}
                >
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--primary-600)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '13px',
                    flexShrink: 0
                  }}>
                    {k.no}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
                      <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, margin: 0, color: 'var(--gray-900)' }}>
                        {k.judul}
                      </h4>
                      <span className="badge badge-persiapan" style={{ fontSize: '10px' }}>
                        {k.badge}
                      </span>
                    </div>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-700)', margin: 0, lineHeight: 1.5 }}>
                      {k.deskripsi}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Catatan Sanksi & Poin */}
            <div style={{
              marginTop: 'var(--space-6)',
              padding: 'var(--space-4)',
              background: '#f8fafc',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--gray-200)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-4)'
            }}>
              <div>
                <h5 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', color: '#166534', fontWeight: 800, marginBottom: 4 }}>
                  Reward Kehadiran:
                </h5>
                <p style={{ fontSize: '12px', color: 'var(--gray-700)', margin: 0 }}>
                  Pengurus yang hadir dan melaksanakan piket tepat waktu sesuai jadwal akan mendapatkan penambahan <strong>+3 Poin Keaktifan</strong> pada database pengurus.
                </p>
              </div>

              <div>
                <h5 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', color: '#991b1b', fontWeight: 800, marginBottom: 4 }}>
                  Konsekuensi Ketidakhadiran:
                </h5>
                <p style={{ fontSize: '12px', color: 'var(--gray-700)', margin: 0 }}>
                  Pengurus yang tidak melaksanakan piket tanpa izin (alpha) akan dikenakan pengurangan <strong>-3 Poin</strong> atau sanksi denda sekretariat sesuai ketetapan dinas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: DAFTAR 81 PENGURUS & LOG ================= */}
      {activeTab === 'riwayat' && (
        <div className="card">
          <div className="card-header" style={{ flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <div>
              <h3>Daftar Seluruh Pengurus & Jadwal Piket</h3>
              <span className="text-xs text-muted">
                Total {jadwalPiket.length} penugasan piket (Minggu Ganjil & Minggu Genap)
              </span>
            </div>

            {/* Filter Controls */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', width: 200 }}>
                <Search size={14} style={{ position: 'absolute', left: 9, top: 10, color: 'var(--gray-400)' }} />
                <input
                  type="text"
                  placeholder="Cari pengurus..."
                  className="form-control"
                  style={{ paddingLeft: 28, fontSize: '12px', height: 34 }}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="form-select"
                style={{ width: 'auto', fontSize: '12px', height: 34 }}
                value={selectedMinggu}
                onChange={e => setSelectedMinggu(e.target.value)}
              >
                <option value="Semua">Semua Minggu</option>
                <option value="Ganjil">Minggu Ganjil</option>
                <option value="Genap">Minggu Genap</option>
              </select>

              <select
                className="form-select"
                style={{ width: 'auto', fontSize: '12px', height: 34 }}
                value={selectedHariFilter}
                onChange={e => setSelectedHariFilter(e.target.value)}
              >
                <option value="Semua">Semua Hari</option>
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jum'at">Jum'at</option>
              </select>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>No</th>
                  <th>Minggu & Hari</th>
                  <th>Petugas Piket</th>
                  <th>Jabatan / Dinas</th>
                  <th>Jam Operasional</th>
                  <th>Status</th>
                  <th>Jam Absen</th>
                  <th>Bukti Absensi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredRiwayat.map((jp, idx) => {
                  const staff = getUserById(jp.staffId);
                  const isDone = jp.status === 'Hadir' || jp.status === 'Selesai';
                  const isMe = user?.id === jp.staffId;

                  return (
                    <tr key={jp.id} style={{ background: isMe ? '#f0f9ff' : undefined }}>
                      <td style={{ fontSize: '11px', color: 'var(--gray-500)', textAlign: 'center' }}>
                        {idx + 1}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
                          Minggu {jp.minggu}
                        </div>
                        <div className="text-xs text-muted">
                          {jp.hari}, {formatDate(jp.tanggal)}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="sidebar-avatar" style={{ width: 26, height: 26, fontSize: '10px' }}>
                            {staff?.avatar || 'BEM'}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '12.5px' }}>
                              {staff?.nama || jp.namaPetugas}
                              {isMe && (
                                <span className="badge badge-admin" style={{ marginLeft: 6, fontSize: '9px', padding: '1px 5px' }}>
                                  Anda
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted">{staff?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', fontWeight: 500 }}>
                          {staff?.role || 'Pengurus BEM'}
                        </span>
                      </td>
                      <td style={{ fontSize: '12px' }}>
                        09.00 – 16.00 WIB
                      </td>
                      <td>
                        <span className={`badge ${isDone ? 'badge-selesai' : 'badge-belum-mulai'}`}>
                          {jp.status} {isDone && '(+3)'}
                        </span>
                      </td>
                      <td style={{ fontSize: 'var(--font-size-xs)' }}>
                        {jp.jamAbsen ? `${jp.jamAbsen} WIB` : '-'}
                      </td>
                      <td>
                        {jp.fotoBukti ? (
                          <button
                            className="btn btn-ghost btn-xs text-primary"
                            onClick={() => setSelectedPhotoPreview(jp.fotoBukti)}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                          >
                            <Eye size={12} /> Lihat Foto
                          </button>
                        ) : (
                          <span style={{ fontSize: '11px', color: 'var(--gray-400)' }}>-</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => {
                            setSelectedShiftId(jp.id);
                            setActiveTab('hari-ini');
                          }}
                          title="Buka shift ini di lembar absensi"
                        >
                          Pilih
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}



      {/* ================= MODAL KAMERA FOTO ABSENSI ================= */}
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
                padding: '4px 8px',
                borderRadius: 4,
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>Sekretariat BEM KM FTI UNAND</span>
                <span>{shiftToday.minggu} ({shiftToday.hari}) • {new Date().toLocaleTimeString('id-ID')} WIB</span>
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
                  <Camera size={16} /> Ambil Foto Sekarang
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
                <Check size={16} /> Konfirmasi & Catat Hadir (+3 Poin)
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ================= MODAL PREVIEW FOTO ================= */}
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
