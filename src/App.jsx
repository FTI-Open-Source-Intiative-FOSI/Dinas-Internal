import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/Layout/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DaftarProker from './pages/ProgramKerja/DaftarProker';
import DetailProker from './pages/ProgramKerja/DetailProker';
import DaftarPengajuan from './pages/Keuangan/DaftarPengajuan';
import DetailPengajuan from './pages/Keuangan/DetailPengajuan';
import DaftarRapat from './pages/Rapat/DaftarRapat';
import DetailRapat from './pages/Rapat/DetailRapat';
import PiketPage from './pages/Piket/PiketPage';
import Kalender from './pages/Kalender';
import Notifikasi from './pages/Notifikasi';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute><Login /></PublicRoute>
      } />
      <Route path="/" element={
        <ProtectedRoute><AppLayout /></ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="program-kerja" element={<DaftarProker />} />
        <Route path="program-kerja/:id" element={<DetailProker />} />
        <Route path="keuangan" element={<DaftarPengajuan />} />
        <Route path="keuangan/:id" element={<DetailPengajuan />} />
        <Route path="rapat" element={<DaftarRapat />} />
        <Route path="rapat/:id" element={<DetailRapat />} />
        <Route path="piket" element={<PiketPage />} />
        <Route path="kalender" element={<Kalender />} />
        <Route path="notifikasi" element={<Notifikasi />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
