# ShiftFlow

Portfolio-quality workforce scheduling MVP for shift-based SMEs. Phase 1 provides React, TypeScript, Vite, Tailwind CSS, Express, Prisma, PostgreSQL, Vitest, and Supertest.

## Current scope

Phase 0 planning and Phase 1 scaffold are complete. Authentication, employee, availability, scheduling, leave, and roster workflows are deliberately deferred.

## Quick start

Prerequisites: Node.js 20.19+, npm, and Docker Desktop.

1. Copy .env.example to .env and backend/.env.example to backend/.env.
2. Run npm install.
3. Run docker compose up -d postgres.
4. Run npm run db:generate, npm run db:push, and npm run db:seed.
5. Run npm run dev.

Frontend: http://localhost:5173. Health: http://localhost:3000/api/health.

Validation commands: npm test, npm run lint, npm run build, and npm run db:validate -w backend. For the live database test in PowerShell: set DATABASE_TESTS to true and run the backend test.

The seed creates manager@shiftflow.local, Barry, Alice, James, availability, shifts, and leave. Its manager password is a non-login placeholder; Phase 2 adds hashing and JWT.

Architecture: React → REST → routes → controllers → services → repositories/Prisma → PostgreSQL. Business rules belong in services.
