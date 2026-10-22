import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import {
  PROGRAM_KERJA as INITIAL_PROKER,
  PENGAJUAN_DANA as INITIAL_DANA,
  RAPAT as INITIAL_RAPAT,
  JADWAL_PIKET as INITIAL_JADWAL,
  SESI_PIKET as INITIAL_SESI,
  NOTIFIKASI as INITIAL_NOTIF,
} from '../data/mockData';

const AppContext = createContext(null);

// Initial state with localStorage hydration
function getSavedState(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
  }
  return fallback;
}

// Initial custom calendar events
const INITIAL_CALENDAR_EVENTS = [
  {
    id: 'ce-1',
    judul: 'Konsolidasi Internal Vismayakriya',
    jenis: 'Kegiatan',
    tanggal: '2026-09-18',
    waktu: '16:00',
    lokasi: 'Sekretariat BEM KM FTI',
    deskripsi: 'Pertemuan penguatan koordinasi fungsionaris Dinas Internal.',
    dinasId: 'internal',
    warna: '#2d6ab4'
  },
  {
    id: 'ce-2',
    judul: 'Batas Pengumpulan Berkas Beasiswa',
    jenis: 'Deadline',
    tanggal: '2026-09-22',
    waktu: '23:59',
    lokasi: 'Online Portal',
    deskripsi: 'Batas akhir upload berkas beasiswa FTI UNAND.',
    dinasId: 'adkesma',
    warna: '#e67700'
  }
];

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_PROKER_LIST':
      return { ...state, programKerja: action.payload };

    case 'UPDATE_PROKER':
      return {
        ...state,
        programKerja: state.programKerja.map(pk =>
          pk.id === action.payload.id ? { ...pk, ...action.payload } : pk
        ),
      };

    case 'UPDATE_DANA_STATUS':
      return {
        ...state,
        pengajuanDana: state.pengajuanDana.map(pd =>
          pd.id === action.payload.id ? { ...pd, ...action.payload } : pd
        ),
      };

    case 'SET_RAPAT_LIST':
      return { ...state, rapat: action.payload };

    case 'ADD_RAPAT':
      return {
        ...state,
        rapat: [action.payload, ...state.rapat],
      };

    case 'UPDATE_RAPAT':
      return {
        ...state,
        rapat: state.rapat.map(r =>
          r.id === action.payload.id ? { ...r, ...action.payload } : r
        ),
      };

    case 'SET_CALENDAR_EVENTS':
      return { ...state, calendarEvents: action.payload };

    case 'ADD_CALENDAR_EVENT':
      return {
        ...state,
        calendarEvents: [...state.calendarEvents, action.payload],
      };

    case 'UPDATE_CALENDAR_EVENT':
      return {
        ...state,
        calendarEvents: state.calendarEvents.map(e =>
          e.id === action.payload.id ? { ...e, ...action.payload } : e
        ),
      };

    case 'DELETE_CALENDAR_EVENT':
      return {
        ...state,
        calendarEvents: state.calendarEvents.filter(e => e.id !== action.payload),
      };

    case 'SET_JADWAL_PIKET':
      return { ...state, jadwalPiket: action.payload };

    case 'UPDATE_JADWAL_PIKET':
      return {
        ...state,
        jadwalPiket: state.jadwalPiket.map(jp =>
          jp.id === action.payload.id ? { ...jp, ...action.payload } : jp
        ),
      };

    case 'ADD_SESI_PIKET':
      return {
        ...state,
        sesiPiket: [...state.sesiPiket, action.payload],
      };

    case 'UPDATE_SESI_PIKET':
      return {
        ...state,
        sesiPiket: state.sesiPiket.map(sp =>
          sp.id === action.payload.id ? { ...sp, ...action.payload } : sp
        ),
      };

    case 'ADD_NOTIFIKASI':
      return {
        ...state,
        notifikasi: [action.payload, ...state.notifikasi],
      };

    case 'MARK_NOTIF_READ':
      return {
        ...state,
        notifikasi: state.notifikasi.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };

    case 'MARK_ALL_NOTIF_READ':
      return {
        ...state,
        notifikasi: state.notifikasi.map(n => ({ ...n, read: true })),
      };

    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.payload),
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    programKerja: getSavedState('bem_proker', INITIAL_PROKER),
    pengajuanDana: getSavedState('bem_dana', INITIAL_DANA),
    rapat: getSavedState('bem_rapat', INITIAL_RAPAT),
    calendarEvents: getSavedState('bem_calendar_events', INITIAL_CALENDAR_EVENTS),
    jadwalPiket: getSavedState('bem_piket', INITIAL_JADWAL),
    sesiPiket: getSavedState('bem_sesi_piket', INITIAL_SESI),
    notifikasi: getSavedState('bem_notifikasi', INITIAL_NOTIF),
    toasts: [],
  });

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem('bem_proker', JSON.stringify(state.programKerja));
  }, [state.programKerja]);

  useEffect(() => {
    localStorage.setItem('bem_rapat', JSON.stringify(state.rapat));
  }, [state.rapat]);

  useEffect(() => {
    localStorage.setItem('bem_calendar_events', JSON.stringify(state.calendarEvents));
  }, [state.calendarEvents]);

  useEffect(() => {
    localStorage.setItem('bem_piket', JSON.stringify(state.jadwalPiket));
  }, [state.jadwalPiket]);

  useEffect(() => {
    localStorage.setItem('bem_notifikasi', JSON.stringify(state.notifikasi));
  }, [state.notifikasi]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type } });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id });
    }, 3500);
  }, []);

  // 1. UPDATE PROKER PROGRESS (WITH AUDIT LOG & STATUS RULES)
  const updateProkerProgress = useCallback((prokerId, newProgress, manualStatus = null, notes = '', currentUser) => {
    const target = state.programKerja.find(pk => pk.id === prokerId);
    if (!target) return;

    const progressNum = Math.min(100, Math.max(0, Number(newProgress)));
    
    // Status rule: 0% = Belum Mulai, 1-99% = Berjalan, 100% = Selesai
    // Respects 'Persiapan' or 'Tertunda' if manually specified
    let computedStatus = target.status;
    if (manualStatus && ['Persiapan', 'Tertunda'].includes(manualStatus)) {
      computedStatus = manualStatus;
    } else {
      if (progressNum === 0) computedStatus = 'Belum Mulai';
      else if (progressNum === 100) computedStatus = 'Selesai';
      else computedStatus = 'Berjalan';
    }

    const now = new Date().toISOString();
    const updaterName = currentUser?.nama || 'Kepala Dinas';

    // Audit log
    const auditEntry = {
      id: 'audit-' + Date.now(),
      oldValue: target.progress,
      newValue: progressNum,
      oldStatus: target.status,
      newStatus: computedStatus,
      updatedBy: updaterName,
      updatedAt: now,
      notes: notes || `Progress diperbarui menjadi ${progressNum}%`
    };

    const riwayat = target.riwayatPerubahan ? [auditEntry, ...target.riwayatPerubahan] : [auditEntry];

    // Activity update timeline
    const updateItem = {
      tanggal: now.split('T')[0],
      isi: notes ? `Progress diubah ke ${progressNum}%: ${notes}` : `Progress diperbarui ke ${progressNum}% (${computedStatus})`,
      author: currentUser?.id || target.picId
    };
    const updatesList = [updateItem, ...(target.updates || [])];

    // Update tahapan proportionally
    const updatedTahapan = (target.tahapan || []).map((t, idx, arr) => {
      const stepTarget = Math.round(((idx + 1) / arr.length) * 100);
      const prevStepTarget = Math.round((idx / arr.length) * 100);
      if (progressNum >= stepTarget) {
        return { ...t, progress: 100, status: 'done' };
      } else if (progressNum > prevStepTarget) {
        const stepProgress = Math.round(((progressNum - prevStepTarget) / (stepTarget - prevStepTarget)) * 100);
        return { ...t, progress: stepProgress, status: 'in-progress' };
      } else {
        return { ...t, progress: 0, status: 'pending' };
      }
    });

    dispatch({
      type: 'UPDATE_PROKER',
      payload: {
        id: prokerId,
        progress: progressNum,
        status: computedStatus,
        lastUpdated: now,
        updatedBy: updaterName,
        riwayatPerubahan: riwayat,
        updates: updatesList,
        tahapan: updatedTahapan
      }
    });

    addToast(`Progress ${target.nama} berhasil diperbarui menjadi ${progressNum}%!`, 'success');
  }, [state.programKerja, addToast]);

  // 2. KELOLA RAPAT (CREATE, UPDATE, CANCEL)
  const createRapat = useCallback((meetingData, currentUser) => {
    const meetingId = 'r-' + Date.now();
    const newMeeting = {
      id: meetingId,
      judul: meetingData.judul,
      deskripsi: meetingData.deskripsi || '',
      dinasId: meetingData.dinasId,
      prokerId: meetingData.prokerId || null,
      tanggal: meetingData.tanggal,
      waktu: meetingData.waktu,
      waktuSelesai: meetingData.waktuSelesai || '',
      lokasi: meetingData.lokasi,
      mode: meetingData.mode || 'Offline',
      linkMeeting: meetingData.linkMeeting || '',
      agenda: meetingData.agenda || meetingData.deskripsi || '',
      peserta: meetingData.peserta || [],
      status: 'upcoming',
      hasil: null,
      pengumuman: [],
      attendance: [],
      createdBy: currentUser?.nama || 'Kepala Dinas',
      createdAt: new Date().toISOString()
    };

    dispatch({ type: 'ADD_RAPAT', payload: newMeeting });

    // Sync to calendar
    const calendarEvent = {
      id: 'ce-' + meetingId,
      judul: meetingData.judul,
      jenis: 'Rapat',
      tanggal: meetingData.tanggal,
      waktu: meetingData.waktu,
      lokasi: meetingData.lokasi,
      deskripsi: meetingData.deskripsi || '',
      dinasId: meetingData.dinasId,
      warna: '#1e3a5f',
      referenceId: meetingId
    };
    dispatch({ type: 'ADD_CALENDAR_EVENT', payload: calendarEvent });

    // Send notifications to participants
    const notifItem = {
      id: 'notif-' + Date.now(),
      tipe: 'rapat',
      pesan: `Undangan Rapat: ${meetingData.judul} pada ${meetingData.tanggal} pukul ${meetingData.waktu} WIB`,
      waktu: new Date().toISOString(),
      read: false,
      link: `/rapat/${meetingId}`,
      meetingId: meetingId,
      peserta: meetingData.peserta
    };
    dispatch({ type: 'ADD_NOTIFIKASI', payload: notifItem });

    addToast(`Rapat "${meetingData.judul}" berhasil dibuat dan diagendakan di Kalender!`, 'success');
    return meetingId;
  }, [addToast]);

  const updateRapatDetail = useCallback((meetingId, updates, currentUser) => {
    dispatch({
      type: 'UPDATE_RAPAT',
      payload: { id: meetingId, ...updates }
    });

    // Update matching calendar event
    dispatch({
      type: 'UPDATE_CALENDAR_EVENT',
      payload: {
        id: 'ce-' + meetingId,
        judul: updates.judul,
        tanggal: updates.tanggal,
        waktu: updates.waktu,
        lokasi: updates.lokasi,
        deskripsi: updates.deskripsi
      }
    });

    addToast(`Detail rapat berhasil diperbarui.`, 'success');
  }, [addToast]);

  const cancelRapat = useCallback((meetingId, reason = '', currentUser) => {
    const meeting = state.rapat.find(r => r.id === meetingId);
    if (!meeting) return;

    dispatch({
      type: 'UPDATE_RAPAT',
      payload: {
        id: meetingId,
        status: 'dibatalkan',
        alasanBatal: reason || 'Dibatalkan oleh penyelenggara'
      }
    });

    // Remove or mark calendar event
    dispatch({
      type: 'DELETE_CALENDAR_EVENT',
      payload: 'ce-' + meetingId
    });

    // Send cancellation notification
    dispatch({
      type: 'ADD_NOTIFIKASI',
      payload: {
        id: 'notif-batal-' + Date.now(),
        tipe: 'rapat',
        pesan: `PEMBERITAHUAN: Rapat "${meeting.judul}" telah DIBATALKAN. ${reason ? `Alasan: ${reason}` : ''}`,
        waktu: new Date().toISOString(),
        read: false,
        link: `/rapat`,
        peserta: meeting.peserta
      }
    });

    addToast(`Rapat "${meeting.judul}" telah dibatalkan.`, 'info');
  }, [state.rapat, addToast]);

  // 3. PENGUMUMAN RAPAT
  const postPengumumanRapat = useCallback((meetingId, announcementData, currentUser) => {
    const meeting = state.rapat.find(r => r.id === meetingId);
    if (!meeting) return;

    const newAnnouncement = {
      id: 'ann-' + Date.now(),
      judul: announcementData.judul,
      isi: announcementData.isi,
      lampiran: announcementData.lampiran || null,
      waktu: new Date().toISOString(),
      author: currentUser?.nama || 'Kepala Dinas',
      authorRole: currentUser?.role || 'Fungsionaris'
    };

    const existingAnnouncements = meeting.pengumuman || [];
    dispatch({
      type: 'UPDATE_RAPAT',
      payload: {
        id: meetingId,
        pengumuman: [newAnnouncement, ...existingAnnouncements]
      }
    });

    // Push notification to all attendees
    dispatch({
      type: 'ADD_NOTIFIKASI',
      payload: {
        id: 'notif-ann-' + Date.now(),
        tipe: 'pengumuman',
        pesan: `[Pengumuman Rapat] ${announcementData.judul} (${meeting.judul})`,
        detail: announcementData.isi,
        waktu: new Date().toISOString(),
        read: false,
        link: `/rapat/${meetingId}`,
        author: currentUser?.nama,
        peserta: meeting.peserta
      }
    });

    addToast('Pengumuman rapat berhasil diposting dan dikirim ke seluruh peserta!', 'success');
  }, [state.rapat, addToast]);

  // 4. FACE RECOGNITION ATTENDANCE
  const recordFaceAttendance = useCallback((meetingId, currentUser, photoDataUrl = null) => {
    const meeting = state.rapat.find(r => r.id === meetingId);
    if (!meeting) return { success: false, message: 'Rapat tidak ditemukan' };

    const attendanceList = meeting.attendance || [];
    const alreadyAttended = attendanceList.some(a => a.userId === currentUser.id);

    if (alreadyAttended) {
      addToast('Anda sudah melakukan absensi untuk rapat ini.', 'info');
      return { success: false, message: 'Sudah absen' };
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dateStr = now.toISOString().split('T')[0];

    const attendanceRecord = {
      userId: currentUser.id,
      nama: currentUser.nama,
      role: currentUser.role,
      tanggal: dateStr,
      jam: timeStr,
      status: 'Hadir',
      metode: 'Face Recognition',
      foto: photoDataUrl || '/logo-bem.png',
      confidence: 0.985
    };

    dispatch({
      type: 'UPDATE_RAPAT',
      payload: {
        id: meetingId,
        attendance: [...attendanceList, attendanceRecord]
      }
    });

    addToast(`Absensi Wajah Berhasil! Selamat datang, ${currentUser.nama}.`, 'success');
    return { success: true, record: attendanceRecord };
  }, [state.rapat, addToast]);

  // 5. CALENDAR EVENTS (ADD, UPDATE, DELETE)
  const addCalendarEvent = useCallback((eventData, currentUser) => {
    const newEvent = {
      id: 'ce-' + Date.now(),
      judul: eventData.judul,
      jenis: eventData.jenis || 'Kegiatan',
      tanggal: eventData.tanggal,
      waktu: eventData.waktu || '09:00',
      lokasi: eventData.lokasi || 'Sekretariat BEM KM FTI',
      deskripsi: eventData.deskripsi || '',
      dinasId: eventData.dinasId || currentUser?.dinasId || 'internal',
      warna: eventData.warna || '#2d6ab4',
      createdBy: currentUser?.nama
    };

    dispatch({ type: 'ADD_CALENDAR_EVENT', payload: newEvent });
    addToast(`Agenda "${eventData.judul}" berhasil ditambahkan ke kalender!`, 'success');
  }, [addToast]);

  const updateCalendarEvent = useCallback((eventId, updates, currentUser) => {
    dispatch({
      type: 'UPDATE_CALENDAR_EVENT',
      payload: { id: eventId, ...updates }
    });
    addToast('Agenda kalender berhasil diperbarui.', 'success');
  }, [addToast]);

  const deleteCalendarEvent = useCallback((eventId, currentUser) => {
    dispatch({
      type: 'DELETE_CALENDAR_EVENT',
      payload: eventId
    });
    addToast('Agenda berhasil dihapus dari kalender.', 'info');
  }, [addToast]);

  // 6. PIKET SEKRETARIAT ATTENDANCE (FOTO & 1-HOUR COUNTDOWN LOGIC)
  const recordPiketAttendance = useCallback((jadwalId, currentUser, photoProof) => {
    const jadwal = state.jadwalPiket.find(j => j.id === jadwalId);
    if (!jadwal) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dateStr = now.toISOString().split('T')[0];

    const sesiId = 'sp-' + Date.now();
    const newSesi = {
      id: sesiId,
      jadwalId,
      staffId: currentUser.id,
      namaPetugas: currentUser.nama,
      fotoBukti: photoProof,
      tanggal: dateStr,
      jamAbsen: timeStr,
      status: 'Hadir',
      metode: 'Foto Sekretariat'
    };

    dispatch({ type: 'ADD_SESI_PIKET', payload: newSesi });
    dispatch({
      type: 'UPDATE_JADWAL_PIKET',
      payload: {
        id: jadwalId,
        status: 'Hadir',
        jamAbsen: timeStr,
        fotoBukti: photoProof
      }
    });

    addToast(`Absensi piket berhasil dicatat! Status: Hadir (${timeStr} WIB)`, 'success');
    return newSesi;
  }, [state.jadwalPiket, addToast]);

  const resetPiketAttendance = useCallback((jadwalId) => {
    dispatch({
      type: 'UPDATE_JADWAL_PIKET',
      payload: {
        id: jadwalId,
        status: 'Belum Absen',
        jamAbsen: null,
        fotoBukti: null
      }
    });
    addToast('Status jadwal piket berhasil di-reset ke "Belum Absen"!', 'info');
  }, [addToast]);

  const updateDanaStatus = useCallback((id, updates) => {
    dispatch({ type: 'UPDATE_DANA_STATUS', payload: { id, ...updates } });
  }, []);

  const markNotifRead = useCallback((id) => {
    dispatch({ type: 'MARK_NOTIF_READ', payload: id });
  }, []);

  const markAllNotifRead = useCallback(() => {
    dispatch({ type: 'MARK_ALL_NOTIF_READ' });
  }, []);

  const unreadNotifCount = state.notifikasi.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      ...state,
      addToast,
      updateProkerProgress,
      createRapat,
      updateRapatDetail,
      cancelRapat,
      postPengumumanRapat,
      recordFaceAttendance,
      addCalendarEvent,
      updateCalendarEvent,
      deleteCalendarEvent,
      recordPiketAttendance,
      resetPiketAttendance,
      updateDanaStatus,
      markNotifRead,
      markAllNotifRead,
      unreadNotifCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
