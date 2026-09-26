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

- [ ] Password hashing and real development credentials
- [ ] Login and current-user endpoints
- [ ] JWT authentication middleware
- [ ] Manager/employee authorization middleware
- [ ] Protected frontend routes
- [ ] Authentication and RBAC tests

Later: employee management, availability, shift CRUD, scheduling rules, leave, roster, then optional dashboard. V2 is out of scope.
