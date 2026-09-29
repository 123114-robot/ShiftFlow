import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './auth.css';
import './employee-detail.css';
import './availability.css';
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
