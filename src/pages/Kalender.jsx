import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  CalendarDays, ChevronLeft, ChevronRight, FolderKanban, Users, ClipboardCheck,
  AlertCircle, Plus, Edit2, Trash2, MapPin, Clock, Eye, Tag
} from 'lucide-react';
import { DINAS_LIST, getDinasById, getProkerById, getUserById, formatTime, formatDate } from '../data/mockData';
import Modal from '../components/ui/Modal';

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export default function Kalender() {
  const { user, isPimpinan, isStaff, canManageCalendarEvent } = useAuth();
  const { programKerja, rapat, jadwalPiket, calendarEvents, addCalendarEvent, updateCalendarEvent, deleteCalendarEvent } = useApp();

  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 14)); // September 2026
  const [activeTab, setActiveTab] = useState('monthly'); // 'monthly', 'weekly', 'daily'
  const [filterType, setFilterType] = useState('');
  const [selectedDay, setSelectedDay] = useState(14); // default selected day
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [agendaForm, setAgendaForm] = useState({
    id: '',
    judul: '',
    jenis: 'Kegiatan',
    tanggal: '2026-09-18',
    waktu: '14:00',
    lokasi: 'Sekretariat BEM KM FTI UNAND',
    deskripsi: '',
    dinasId: user?.dinasId || 'internal',
    warna: '#2d6ab4'
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Build unified events map for any date string (YYYY-MM-DD)
  const getEventsForDateStr = (dateStr) => {
    const events = [];

    // Custom calendar events
    calendarEvents?.forEach(ce => {
      if (ce.tanggal === dateStr) {
        events.push({
          id: ce.id,
          type: (ce.jenis || 'Kegiatan').toLowerCase(),
          jenis: ce.jenis || 'Kegiatan',
          label: ce.judul,
          judul: ce.judul,
          waktu: ce.waktu || '09:00',
          lokasi: ce.lokasi || 'Sekretariat BEM KM FTI',
          deskripsi: ce.deskripsi,
          dinasId: ce.dinasId,
          warna: ce.warna || '#2d6ab4',
          isCustom: true,
          data: ce
        });
      }
    });

    // Rapat (exclude if already tracked as calendarEvent)
    rapat?.forEach(r => {
      if (r.status !== 'dibatalkan' && r.tanggal === dateStr) {
        if (isStaff?.() && (r.isPresidium || r.judul?.toLowerCase().includes('presidium') || r.dinasId === 'sekda')) {
          return;
        }
        const alreadyIn = events.some(e => e.id === 'ce-' + r.id || e.data?.referenceId === r.id);
        if (!alreadyIn) {
          events.push({
            id: 'rapat-' + r.id,
            type: 'rapat',
            jenis: 'Rapat',
            label: r.judul,
            judul: r.judul,
            waktu: r.waktu,
            lokasi: r.lokasi,
            deskripsi: r.agenda || r.deskripsi,
            dinasId: r.dinasId,
            warna: '#1e3a5f',
            isCustom: false,
            data: r
          });
        }
      }
    });

    // Proker Deadlines & Mulai
    programKerja?.forEach(pk => {
      if (pk.deadline === dateStr) {
        events.push({
          id: 'dl-' + pk.id,
          type: 'deadline',
          jenis: 'Deadline',
          label: `DL: ${pk.nama}`,
          judul: `Deadline: ${pk.nama}`,
          waktu: '23:59',
          lokasi: 'Portal BEM KM FTI',
          deskripsi: `Batas akhir target pelaksanaan program kerja ${pk.nama}.`,
          dinasId: pk.dinasId,
          warna: '#c92a2a',
          isCustom: false,
          data: pk
        });
      }
      if (pk.tanggalMulai === dateStr) {
        events.push({
          id: 'pk-' + pk.id,
          type: 'program kerja',
          jenis: 'Program Kerja',
          label: pk.nama,
          judul: pk.nama,
          waktu: '08:00',
          lokasi: 'Kampus FTI UNAND',
          deskripsi: pk.deskripsi,
          dinasId: pk.dinasId,
          warna: '#2b8a3e',
          isCustom: false,
          data: pk
        });
      }
    });

    // Piket
    jadwalPiket?.forEach(jp => {
      if (jp.tanggal === dateStr) {
        const staff = getUserById(jp.staffId);
        events.push({
          id: 'piket-' + jp.id,
          type: 'piket',
          jenis: 'Piket',
          label: `Piket: ${staff?.nama || 'Petugas'}`,
          judul: `Piket Sekretariat: ${staff?.nama || 'Petugas'}`,
          waktu: jp.jamMulai,
          lokasi: 'Sekretariat BEM KM FTI',
          deskripsi: `Jadwal piket harian shift ${jp.jamMulai} WIB`,
          dinasId: staff?.dinasId || 'internal',
          warna: '#097969',
          isCustom: false,
          data: jp
        });
      }
    });

    if (filterType) {
      return events.filter(e => e.type.toLowerCase() === filterType.toLowerCase() || e.jenis.toLowerCase() === filterType.toLowerCase());
    }

    return events;
  };

  const getEventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return getEventsForDateStr(dateStr);
  };

  // Calendar cells
  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, isOtherMonth: true, events: [] });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isOtherMonth: false, events: getEventsForDay(d) });
  }
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ day: i, isOtherMonth: true, events: [] });
  }

  const selectedDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
  const selectedEvents = getEventsForDateStr(selectedDateStr);

  const openAddModal = (dateStr = null) => {
    setAgendaForm({
      id: '',
      judul: '',
      jenis: 'Kegiatan',
      tanggal: dateStr || selectedDateStr,
      waktu: '14:00',
      lokasi: 'Sekretariat BEM KM FTI UNAND',
      deskripsi: '',
      dinasId: user?.dinasId || 'internal',
      warna: '#2d6ab4'
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (evt) => {
    if (!evt.isCustom) return;
    setAgendaForm({
      id: evt.id,
      judul: evt.judul,
      jenis: evt.jenis,
      tanggal: evt.data.tanggal,
      waktu: evt.waktu,
      lokasi: evt.lokasi,
      deskripsi: evt.deskripsi,
      dinasId: evt.dinasId,
      warna: evt.warna
    });
    setSelectedEvent(null);
    setIsEditModalOpen(true);
  };

  const handleSaveAgendaSubmit = (e) => {
    e.preventDefault();
    if (isEditModalOpen) {
      updateCalendarEvent(agendaForm.id, agendaForm, user);
      setIsEditModalOpen(false);
    } else {
      addCalendarEvent(agendaForm, user);
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteEvent = (evt) => {
    if (window.confirm(`Hapus agenda "${evt.judul}" dari kalender?`)) {
      deleteCalendarEvent(evt.id, user);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <CalendarDays className="page-title-icon" />
            Kalender Agenda BEM KM FTI UNAND
          </h1>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)', marginTop: 4 }}>
            Sinkronisasi seluruh jadwal rapat dinas, program kerja, deadline, dan piket sekretariat.
          </p>
        </div>

        {canManageCalendarEvent() && (
          <button
            className="btn btn-primary"
            onClick={() => openAddModal()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Plus size={16} />
            Tambah Agenda
          </button>
        )}
      </div>

      {/* Tabs View Switch & Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
        <div className="tabs" style={{ marginBottom: 0, borderBottom: 'none' }}>
          <button className={`tab ${activeTab === 'monthly' ? 'active' : ''}`} onClick={() => setActiveTab('monthly')}>
            Tampilan Bulanan
          </button>
          <button className={`tab ${activeTab === 'weekly' ? 'active' : ''}`} onClick={() => setActiveTab('weekly')}>
            Tampilan Mingguan
          </button>
          <button className={`tab ${activeTab === 'daily' ? 'active' : ''}`} onClick={() => setActiveTab('daily')}>
            Agenda Harian ({selectedDay} {MONTHS[month]})
          </button>
        </div>

        {/* Filter Type */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <select className="form-select" value={filterType} onChange={e => setFilterType(e.target.value)} style={{ width: 'auto', minWidth: 170 }}>
            <option value="">Semua Kategori</option>
            <option value="rapat">Rapat</option>
            <option value="program kerja">Program Kerja</option>
            <option value="kegiatan">Kegiatan</option>
            <option value="deadline">Deadline</option>
            <option value="piket">Piket</option>
          </select>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="card mb-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>
              {MONTHS[month]} {year}
            </h2>
            <span className="badge badge-persiapan">Kabinet Vismayakriya</span>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
            <button className="btn btn-secondary btn-sm" onClick={prevMonth} title="Bulan Sebelumnya">
              <ChevronLeft size={16} />
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentDate(new Date(2026, 8, 14))}
              style={{ fontSize: 'var(--font-size-xs)' }}
            >
              Hari Ini
            </button>
            <button className="btn btn-secondary btn-sm" onClick={nextMonth} title="Bulan Berikutnya">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 1. MONTHLY VIEW */}
        {activeTab === 'monthly' && (
          <div className="calendar-grid">
            {DAYS.map(day => (
              <div key={day} className="calendar-header-cell">
                {day}
              </div>
            ))}

            {cells.map((cell, i) => {
              const isSelected = !cell.isOtherMonth && cell.day === selectedDay;

              return (
                <div
                  key={i}
                  className={`calendar-cell ${cell.isOtherMonth ? 'other-month' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    if (!cell.isOtherMonth) {
                      setSelectedDay(cell.day);
                    }
                  }}
                  style={{ minHeight: 90, cursor: cell.isOtherMonth ? 'default' : 'pointer' }}
                >
                  <div className="calendar-day-number" style={{ fontWeight: isSelected ? 700 : 500, color: isSelected ? 'var(--primary-600)' : undefined }}>
                    {cell.day}
                  </div>

                  <div className="calendar-events">
                    {cell.events.slice(0, 3).map((evt, j) => (
                      <div
                        key={j}
                        className={`calendar-event ${evt.type}`}
                        style={{ borderLeftColor: evt.warna }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(evt);
                        }}
                        title={`${evt.judul} (${evt.waktu} WIB)`}
                      >
                        {evt.label}
                      </div>
                    ))}
                    {cell.events.length > 3 && (
                      <div className="calendar-more">
                        +{cell.events.length - 3} lainnya
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. WEEKLY VIEW */}
        {activeTab === 'weekly' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 'var(--space-2)', minHeight: 380 }}>
            {[14, 15, 16, 17, 18, 19, 20].map((d, idx) => {
              const events = getEventsForDay(d);
              return (
                <div
                  key={d}
                  style={{
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-3)',
                    background: d === selectedDay ? 'var(--primary-50)' : '#fff'
                  }}
                  onClick={() => setSelectedDay(d)}
                >
                  <div style={{ textAlign: 'center', marginBottom: 8, borderBottom: '1px solid var(--gray-200)', paddingBottom: 6 }}>
                    <div style={{ fontSize: '11px', color: 'var(--gray-500)', textTransform: 'uppercase' }}>{DAYS[idx % 7]}</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)' }}>{d}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {events.map((evt, j) => (
                      <div
                        key={j}
                        className={`calendar-event ${evt.type}`}
                        style={{ padding: '6px 8px', fontSize: '11px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(evt);
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>{evt.waktu}</div>
                        <div>{evt.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. DAILY AGENDA VIEW */}
        {activeTab === 'daily' && (
          <div>
            <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-md)' }}>
              Agenda Terjadwal untuk {selectedDay} {MONTHS[month]} {year}
            </h3>

            {selectedEvents.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {selectedEvents.map((evt, idx) => (
                  <div
                    key={idx}
                    className="card"
                    style={{
                      borderLeft: `4px solid ${evt.warna}`,
                      padding: 'var(--space-4)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedEvent(evt)}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span className="badge badge-persiapan">{evt.jenis}</span>
                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)' }}>
                          {getDinasById(evt.dinasId)?.nama || 'BEM FTI'}
                        </span>
                      </div>
                      <h4 style={{ fontSize: 'var(--font-size-md)', fontWeight: 600 }}>{evt.judul}</h4>
                      <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--font-size-xs)', color: 'var(--gray-600)', marginTop: 4 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={13} /> {evt.waktu} WIB
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <MapPin size={13} /> {evt.lokasi}
                        </span>
                      </div>
                    </div>

                    <button className="btn btn-ghost btn-sm" onClick={() => setSelectedEvent(evt)}>
                      <Eye size={14} /> Detail
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <CalendarDays />
                <p>Tidak ada agenda pada tanggal {selectedDay} {MONTHS[month]}.</p>
                {canManageCalendarEvent() && (
                  <button className="btn btn-primary btn-sm mt-4" onClick={() => openAddModal()}>
                    + Tambah Agenda
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL DETAIL AGENDA */}
      {selectedEvent && (
        <Modal
          title={`Detail Agenda: ${selectedEvent.jenis}`}
          onClose={() => setSelectedEvent(null)}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-3)' }}>
              <span className="badge badge-persiapan">{selectedEvent.jenis}</span>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)' }}>
                Dinas: <strong>{getDinasById(selectedEvent.dinasId)?.nama || 'BEM KM FTI'}</strong>
              </span>
            </div>

            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
              {selectedEvent.judul}
            </h3>

            <div className="detail-meta mb-4">
              <div className="meta-item">
                <span className="meta-label">Tanggal</span>
                <span className="meta-value">{selectedDay} {MONTHS[month]} {year}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Waktu</span>
                <span className="meta-value">{selectedEvent.waktu} WIB</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Lokasi</span>
                <span className="meta-value">{selectedEvent.lokasi}</span>
              </div>
            </div>

            {selectedEvent.deskripsi && (
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <span className="meta-label">Deskripsi</span>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-800)', marginTop: 4, lineHeight: 1.6 }}>
                  {selectedEvent.deskripsi}
                </p>
              </div>
            )}

            <div className="modal-footer" style={{ padding: 'var(--space-3) 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                {selectedEvent.isCustom && canManageCalendarEvent(selectedEvent) && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    style={{ color: 'var(--danger)' }}
                    onClick={() => handleDeleteEvent(selectedEvent)}
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                {selectedEvent.isCustom && canManageCalendarEvent(selectedEvent) && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => openEditModal(selectedEvent)}
                  >
                    <Edit2 size={14} /> Edit Agenda
                  </button>
                )}

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => setSelectedEvent(null)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL TAMBAH / EDIT AGENDA */}
      {(isAddModalOpen || isEditModalOpen) && (
        <Modal
          title={isEditModalOpen ? "Edit Agenda Kalender" : "Tambah Agenda Kalender Baru"}
          onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
        >
          <form onSubmit={handleSaveAgendaSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Judul Agenda</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="Contoh: Diskusi Terbuka Mahasiswa FTI"
                value={agendaForm.judul}
                onChange={e => setAgendaForm({ ...agendaForm, judul: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Jenis Agenda</label>
                <select
                  className="form-select"
                  value={agendaForm.jenis}
                  onChange={e => setAgendaForm({ ...agendaForm, jenis: e.target.value })}
                >
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Rapat">Rapat</option>
                  <option value="Program Kerja">Program Kerja</option>
                  <option value="Deadline">Deadline</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Dinas Penyelenggara</label>
                <select
                  className="form-select"
                  value={agendaForm.dinasId}
                  onChange={e => setAgendaForm({ ...agendaForm, dinasId: e.target.value })}
                  disabled={!isPimpinan()}
                >
                  {DINAS_LIST.map(d => (
                    <option key={d.id} value={d.id}>{d.nama}</option>
                  ))}
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
                  value={agendaForm.tanggal}
                  onChange={e => setAgendaForm({ ...agendaForm, tanggal: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Waktu Pelaksanaan</label>
                <input
                  type="time"
                  className="form-input"
                  required
                  value={agendaForm.waktu}
                  onChange={e => setAgendaForm({ ...agendaForm, waktu: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Lokasi / Ruangan</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: Ruang Seminar FTI UNAND"
                value={agendaForm.lokasi}
                onChange={e => setAgendaForm({ ...agendaForm, lokasi: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>Deskripsi Agenda</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Catatan poin bahasan atau rundown acara..."
                value={agendaForm.deskripsi}
                onChange={e => setAgendaForm({ ...agendaForm, deskripsi: e.target.value })}
              />
            </div>

            <div className="modal-footer" style={{ padding: 'var(--space-2) 0 0', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                {isEditModalOpen ? "Simpan Perubahan" : "Tambahkan ke Kalender"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
