import cors from 'cors';
import express from 'express';
import { healthRouter } from './routes/health.js';
export const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:5173' }));
app.use(express.json());
app.use('/api/health', healthRouter);
