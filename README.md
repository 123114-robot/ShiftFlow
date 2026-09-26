# ShiftFlow

Portfolio-quality workforce scheduling MVP for shift-based SMEs. Phase 1 provides React, TypeScript, Vite, Tailwind CSS, Express, Prisma, PostgreSQL, Vitest, and Supertest.

## Current scope

Phase 0 planning, Phase 1 scaffold, and Phase 2 authentication/RBAC are complete. Employee, availability, scheduling, leave, and roster workflows are deliberately deferred.

## Quick start

Prerequisites: Node.js 20.19+, npm, and Docker Desktop.

1. Copy .env.example to .env and backend/.env.example to backend/.env.
2. Run npm install.
3. Run docker compose up -d postgres.
4. Run npm run db:generate, npm run db:push, and npm run db:seed.
5. Run npm run dev.

Frontend: http://localhost:5173. Health: http://localhost:3000/api/health.

Validation commands: npm test, npm run lint, npm run build, and npm run db:validate -w backend. For the live database test in PowerShell: set DATABASE_TESTS to true and run the backend test.

The seed creates manager@shiftflow.local, Barry, Alice, James, availability, shifts, and leave. Development accounts use the password ShiftFlow123!; the seed stores only bcrypt hashes. Never reuse this password outside local development.

## Authentication

- POST /api/auth/login accepts email and password and returns an eight-hour JWT plus a safe user object.
- GET /api/auth/me requires an Authorization: Bearer token.
- The API supplies reusable authentication and MANAGER/EMPLOYEE role middleware.
- The frontend provides login, logout, role-aware redirects, and protected manager/employee routes.

Architecture: React → REST → routes → controllers → services → repositories/Prisma → PostgreSQL. Authentication logic lives in AuthenticationService; business rules belong in services.
