import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import { useAuth } from './features/auth/auth-context';
import { ProtectedRoute } from './features/auth/ProtectedRoute';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { EmployeeDetailPage } from './pages/EmployeeDetailPage';
import { AvailabilityPage } from './pages/AvailabilityPage';
import { EmployeeAvailabilityPage } from './pages/EmployeeAvailabilityPage';

function HomeRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? (user.role === 'MANAGER' ? '/dashboard' : '/my-schedule') : '/login'} replace />;
}

export default function App() {
  return <BrowserRouter><AuthProvider><Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<ProtectedRoute roles={['MANAGER']}><DashboardPage /></ProtectedRoute>} />
    <Route path="/employees" element={<ProtectedRoute roles={['MANAGER']}><EmployeesPage /></ProtectedRoute>} />
    <Route path="/employees/:id" element={<ProtectedRoute roles={['MANAGER']}><EmployeeDetailPage /></ProtectedRoute>} />
    <Route path="/employees/:id/availability" element={<ProtectedRoute roles={['MANAGER']}><EmployeeAvailabilityPage /></ProtectedRoute>} />
    <Route path="/my-schedule" element={<ProtectedRoute roles={['EMPLOYEE']}><DashboardPage employee /></ProtectedRoute>} />
    <Route path="/availability" element={<ProtectedRoute roles={['EMPLOYEE']}><AvailabilityPage /></ProtectedRoute>} />
    <Route path="*" element={<HomeRedirect />} />
  </Routes></AuthProvider></BrowserRouter>;
}
