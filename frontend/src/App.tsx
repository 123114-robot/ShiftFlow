import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import { useAuth } from './features/auth/auth-context';
import { ProtectedRoute } from './features/auth/ProtectedRoute';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';

function HomeRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? (user.role === 'MANAGER' ? '/dashboard' : '/my-schedule') : '/login'} replace />;
}

export default function App() {
  return <BrowserRouter><AuthProvider><Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<ProtectedRoute roles={['MANAGER']}><DashboardPage /></ProtectedRoute>} />
    <Route path="/my-schedule" element={<ProtectedRoute roles={['EMPLOYEE']}><DashboardPage employee /></ProtectedRoute>} />
    <Route path="*" element={<HomeRedirect />} />
  </Routes></AuthProvider></BrowserRouter>;
}
