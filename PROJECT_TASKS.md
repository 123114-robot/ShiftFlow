# ShiftFlow Project Tasks

## Phase 0 — Planning

- [x] Business problem, stakeholders, scope, requirements, and rules
- [x] User stories and use cases
- [x] Architecture, database, API, security, testing, roadmap
- [x] Separate V1 from V2

## Phase 1 — Scaffold

- [x] npm frontend/backend workspace
- [x] React, TypeScript, Vite, Tailwind
- [x] Express and TypeScript
- [x] Prisma and PostgreSQL
- [x] Five core data models and seed
- [x] GET /api/health and frontend connection screen
- [x] Vitest, Testing Library, Supertest, database integration test
- [x] Record final install/build/lint/test/database results

### Phase 1 verification (2026-09-26)

- npm install: passed (433 packages installed; npm reported 5 dependency advisories)
- Prisma client generation and schema validation: passed
- Backend tests: 1 passed; live database test skipped because Docker Desktop engine did not become ready
- Frontend tests: 1 passed
- TypeScript/backend and Vite/frontend production builds: passed
- Backend and frontend ESLint: passed
- PostgreSQL container, db push, seed, and live SELECT 1: not verified; Docker engine unavailable

## Phase 2 — Authentication and roles

- [x] Password hashing and real development credentials
- [x] Login and current-user endpoints
- [x] JWT authentication middleware
- [x] Manager/employee authorization middleware
- [x] Protected frontend routes
- [x] Authentication and RBAC tests

### Phase 2 verification (2026-09-27)

- Authentication and route tests: 6 passed
- Health regression test: 1 passed
- Frontend authentication tests: 2 passed
- Full TypeScript/Vite production build: passed
- Backend and frontend ESLint: passed without warnings
- Prisma schema validation: passed
- Live PostgreSQL test and seed execution: not verified; Docker Desktop engine was unavailable

Later: employee management, availability, shift CRUD, scheduling rules, leave, roster, then optional dashboard. V2 is out of scope.
