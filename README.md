# ShiftFlow

Portfolio-quality workforce scheduling MVP for shift-based SMEs. Phase 1 provides React, TypeScript, Vite, Tailwind CSS, Express, Prisma, PostgreSQL, Vitest, and Supertest.

## Current scope

Phase 0 through Phase 9 are implemented, covering authentication, employee management, availability, Shift CRUD, scheduling validation, Leave, weekly roster views, and a basic manager dashboard.

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

## Employee management

Managers can list, create, view, edit, and soft-deactivate employees through /api/employees. Employee accounts receive FORBIDDEN. Deactivation changes status to INACTIVE and does not delete the employee or historical relationships. The manager UI provides a directory, create form, and deactivate action.
Employee cards open a detail page where managers can view status and created date or edit contact and job information. On startup, a stored JWT is validated through /api/auth/me; cached browser roles are not trusted, and invalid sessions are cleared before protected content renders.

## Availability

Employees can view and replace their own seven-day recurring availability through GET/PUT `/api/availability/me`. Each available day requires a valid start time earlier than its end time; unavailable days contain no times. Managers have read-only access through GET `/api/employees/:id/availability`. Availability exceptions remain outside V1 scope.

## Shift management

Managers can list shifts by date range, create and edit shifts, and cancel them without deleting historical rows. Shift creation supports an optional employee assignment. SchedulingService rejects invalid time ordering, overlapping assignments, shifts outside availability, approved-leave dates, and inactive employees. Adjacent shifts are allowed, and cancelled shifts do not block new assignments.

## Leave requests

Employees can submit date-ranged leave requests and view their own status. Managers can list all requests and approve or reject pending items. Employee ownership comes from the authenticated server session, invalid ranges are rejected, and reviewed requests cannot be reviewed twice. Approved leave blocks later shift assignment through SchedulingService.

## Weekly roster

Managers can view all non-cancelled shifts for a selected seven-day period. Employees receive a server-scoped weekly schedule containing only shifts assigned to their authenticated employee profile.

## Basic dashboard

Managers can view four operational metrics: employees working today, unfilled shifts this week, employees on approved leave today, and total scheduled hours this week. The API calculates these values from current scheduling and leave data; employee accounts cannot access the dashboard summary endpoint.

Architecture: React → REST → routes → controllers → services → repositories/Prisma → PostgreSQL. Authentication logic lives in AuthenticationService; business rules belong in services.
