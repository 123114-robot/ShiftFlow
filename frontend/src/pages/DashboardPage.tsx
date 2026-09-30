import { useAuth } from '../features/auth/auth-context';

export function DashboardPage({ employee = false }: { employee?: boolean }) {
  const { user, logout } = useAuth();
  return <main className="dashboard-shell"><nav><strong>ShiftFlow</strong><div><span>{user?.email}</span><button className="secondary" onClick={logout}>Log out</button></div></nav><section className="dashboard-card"><p className="eyebrow">{employee ? 'Employee workspace' : 'Manager workspace'}</p><h1>{employee ? 'My schedule' : 'Manager dashboard'}</h1><p className="muted">Authentication is active. Workforce modules arrive in the next phases.</p>{employee?<a href="/availability">Manage my availability</a>:<a href="/employees">Manage employees</a>}</section></main>;
}
