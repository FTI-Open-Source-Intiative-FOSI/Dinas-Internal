import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { USERS, ROLES, DINAS_LIST } from '../data/mockData';

const AuthContext = createContext(null);

const PIMPINAN_ROLES = [ROLES.GUBERNUR, ROLES.SEKRETARIS_DAERAH, ROLES.BENDAHARA_DAERAH];

function getInitialUser() {
  try {
    const saved = localStorage.getItem('bem_auth_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      const found = USERS.find(u => u.id === parsed.id);
      if (found) return found;
    }
  } catch (e) {
    console.error('Error loading stored user', e);
  }
  // Default to Ferdian Rahman (Kepala Dinas INTERNAL)
  const defaultUser = USERS.find(u => u.nama === 'Ferdian Rahman') || USERS[0];
  return defaultUser;
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const initialUser = getInitialUser();

  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: !!initialUser,
    user: initialUser,
  });

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('bem_auth_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('bem_auth_user');
    }
  }, [state.user]);

  const login = useCallback((userId) => {
    const user = USERS.find(u => u.id === userId);
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const isPimpinan = useCallback(() => {
    return state.user && PIMPINAN_ROLES.includes(state.user.role);
  }, [state.user]);

  const isBendahara = useCallback(() => {
    return state.user?.role === ROLES.BENDAHARA_DAERAH;
  }, [state.user]);

  const isKadis = useCallback(() => {
    return [ROLES.KEPALA_DINAS, ROLES.KEPALA_BIRO].includes(state.user?.role);
  }, [state.user]);

  const isSekdin = useCallback(() => {
    return [ROLES.SEKRETARIS_DINAS, ROLES.SEKRETARIS_BIRO].includes(state.user?.role);
  }, [state.user]);

  const isBendis = useCallback(() => {
    return [ROLES.BENDAHARA_DINAS, ROLES.BENDAHARA_BIRO].includes(state.user?.role);
  }, [state.user]);

  const isStaff = useCallback(() => {
    return state.user?.role === ROLES.STAFF;
  }, [state.user]);

  const isDinasLevel = useCallback(() => {
    return [
      ROLES.KEPALA_DINAS, ROLES.SEKRETARIS_DINAS, ROLES.BENDAHARA_DINAS,
      ROLES.KEPALA_BIRO, ROLES.SEKRETARIS_BIRO, ROLES.BENDAHARA_BIRO
    ].includes(state.user?.role);
  }, [state.user]);

  // Hak akses edit progress proker:
  // Kadin hanya boleh mengubah proker di bawah dinasnya, Presidium untuk semua
  const canEditProker = useCallback((proker) => {
    if (!state.user || !proker) return false;
    if (isPimpinan()) return true;
    if ([ROLES.KEPALA_DINAS, ROLES.KEPALA_BIRO].includes(state.user.role)) {
      return state.user.dinasId === proker.dinasId;
    }
    return false;
  }, [state.user, isPimpinan]);

  // Hak akses kelola rapat dinas
  const canManageRapat = useCallback((meeting) => {
    if (!state.user) return false;
    if (isPimpinan()) return true;
    if ([ROLES.KEPALA_DINAS, ROLES.KEPALA_BIRO, ROLES.SEKRETARIS_DINAS, ROLES.SEKRETARIS_BIRO].includes(state.user.role)) {
      if (!meeting) return true; // bisa buat rapat baru
      return meeting.dinasId === state.user.dinasId;
    }
    return false;
  }, [state.user, isPimpinan]);

  // Hak posting pengumuman rapat
  const canPostAnnouncement = useCallback((meeting) => {
    if (!state.user || !meeting) return false;
    if (isPimpinan()) return true;
    if ([ROLES.KEPALA_DINAS, ROLES.KEPALA_BIRO, ROLES.SEKRETARIS_DINAS, ROLES.SEKRETARIS_BIRO].includes(state.user.role)) {
      return meeting.dinasId === state.user.dinasId;
    }
    return false;
  }, [state.user, isPimpinan]);

  // Hak kelola kalender
  const canManageCalendarEvent = useCallback((event) => {
    if (!state.user) return false;
    if (isPimpinan()) return true;
    if ([ROLES.KEPALA_DINAS, ROLES.KEPALA_BIRO, ROLES.SEKRETARIS_DINAS, ROLES.SEKRETARIS_BIRO].includes(state.user.role)) {
      if (!event) return true;
      return event.dinasId === state.user.dinasId;
    }
    return false;
  }, [state.user, isPimpinan]);

  const canManageDana = useCallback(() => {
    return state.user?.role === ROLES.BENDAHARA_DAERAH;
  }, [state.user]);

  const canSubmitDana = useCallback(() => {
    return [
      ROLES.KEPALA_DINAS, ROLES.SEKRETARIS_DINAS, ROLES.BENDAHARA_DINAS,
      ROLES.KEPALA_BIRO, ROLES.SEKRETARIS_BIRO, ROLES.BENDAHARA_BIRO
    ].includes(state.user?.role);
  }, [state.user]);

  const canDoPiket = useCallback(() => {
    return state.user?.role === ROLES.STAFF || [
      ROLES.BENDAHARA_DINAS, ROLES.BENDAHARA_BIRO,
      ROLES.SEKRETARIS_DINAS, ROLES.SEKRETARIS_BIRO,
      ROLES.STAFF
    ].includes(state.user?.role);
  }, [state.user]);

  const getUserDinas = useCallback(() => {
    if (!state.user?.dinasId) return null;
    return DINAS_LIST.find(d => d.id === state.user.dinasId);
  }, [state.user]);

  const getNavItems = useCallback(() => {
    const base = [
      { key: 'dashboard', label: 'Dashboard', path: '/' },
      { key: 'program-kerja', label: 'Program Kerja', path: '/program-kerja' },
    ];

    if (state.user?.role !== ROLES.STAFF) {
      base.push({ key: 'keuangan', label: 'Keuangan', path: '/keuangan' });
      base.push({ key: 'rapat', label: 'Rapat', path: '/rapat' });
    }

    if (state.user?.role === ROLES.STAFF) {
      base.push({ key: 'rapat', label: 'Rapat', path: '/rapat' });
    }

    base.push({ key: 'piket', label: 'Piket Sekretariat', path: '/piket' });
    base.push({ key: 'kalender', label: 'Kalender', path: '/kalender' });

    return base;
  }, [state.user]);

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      isPimpinan,
      isBendahara,
      isKadis,
      isSekdin,
      isBendis,
      isStaff,
      isDinasLevel,
      canEditProker,
      canManageRapat,
      canPostAnnouncement,
      canManageCalendarEvent,
      canManageDana,
      canSubmitDana,
      canDoPiket,
      getUserDinas,
      getNavItems,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
