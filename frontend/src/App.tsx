import { useEffect, useState } from 'react';
import { getHealth } from './api/health';
type ConnectionState = 'checking' | 'connected' | 'unavailable';
export default function App() {
  const [connection, setConnection] = useState<ConnectionState>('checking');
  useEffect(() => { void getHealth().then(() => setConnection('connected')).catch(() => setConnection('unavailable')); }, []);
  return <main className="app-shell"><section className="hero"><span className="eyebrow">Workforce operations</span><h1>ShiftFlow</h1><p className="lead">A clear home for weekly rosters, availability, and leave.</p><div className={`status status--${connection}`}><span className="status__dot"/>{connection === 'checking' ? 'Checking API…' : connection === 'connected' ? 'API connected' : 'API unavailable'}</div><div className="preview-grid"><article><strong>Phase 1</strong><span>Project foundation</span></article><article><strong>PostgreSQL</strong><span>Relational data model</span></article><article><strong>Next</strong><span>Authentication & roles</span></article></div></section></main>;
}
