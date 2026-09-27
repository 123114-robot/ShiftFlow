import cors from 'cors';
import express from 'express';
import { PrismaAuthUserRepository } from './repositories/AuthUserRepository.js';
import { PrismaEmployeeRepository } from './repositories/EmployeeRepository.js';
import { createAuthRouter } from './routes/auth.js';
import { healthRouter } from './routes/health.js';
import { createEmployeeRouter } from './routes/employees.js';
import { AuthenticationService } from './services/AuthenticationService.js';
import { EmployeeService } from './services/EmployeeService.js';

const jwtSecret = process.env.JWT_SECRET ?? 'development-only-secret-change-me-now';
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required in production.');
}
const authenticationService = new AuthenticationService(new PrismaAuthUserRepository(), jwtSecret);
const employeeService = new EmployeeService(new PrismaEmployeeRepository());

export const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:5173' }));
app.use(express.json());
app.use('/api/health', healthRouter);
app.use('/api/auth', createAuthRouter(authenticationService));
app.use('/api/employees', createEmployeeRouter(authenticationService, employeeService));
