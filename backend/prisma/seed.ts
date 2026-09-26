import { DayOfWeek, EmployeeStatus, LeaveStatus, PrismaClient, ShiftStatus, UserRole } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const manager = await prisma.user.upsert({ where: { email: 'manager@shiftflow.local' }, update: {}, create: { email: 'manager@shiftflow.local', passwordHash: 'DEV_ONLY_NOT_A_REAL_HASH', role: UserRole.MANAGER } });
  const employees = await Promise.all([
    ['Barry','Nguyen','barry@shiftflow.local','Chef'], ['Alice','Morgan','alice@shiftflow.local','Supervisor'], ['James','Patel','james@shiftflow.local','Team Member'],
  ].map(([firstName,lastName,email,jobTitle]) => prisma.employee.upsert({ where: { email }, update: {}, create: { firstName, lastName, email, jobTitle, status: EmployeeStatus.ACTIVE } })));
  for (const employee of employees) {
    for (const dayOfWeek of [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY]) {
      await prisma.availability.upsert({ where: { employeeId_dayOfWeek: { employeeId: employee.id, dayOfWeek } }, update: {}, create: { employeeId: employee.id, dayOfWeek, startTime: '09:00', endTime: '17:00', isAvailable: true } });
    }
  }
  if (await prisma.shift.count() === 0) await prisma.shift.createMany({ data: [
    { employeeId: employees[0].id, date: new Date('2026-09-21'), startTime: '09:00', endTime: '17:00', role: 'Chef', status: ShiftStatus.SCHEDULED, createdById: manager.id },
    { employeeId: employees[1].id, date: new Date('2026-09-23'), startTime: '09:00', endTime: '17:00', role: 'Supervisor', status: ShiftStatus.SCHEDULED, createdById: manager.id },
    { date: new Date('2026-09-24'), startTime: '12:00', endTime: '20:00', role: 'Team Member', status: ShiftStatus.DRAFT, createdById: manager.id },
  ] });
  if (await prisma.leaveRequest.count() === 0) await prisma.leaveRequest.createMany({ data: [
    { employeeId: employees[2].id, startDate: new Date('2026-09-28'), endDate: new Date('2026-09-29'), reason: 'Personal leave', status: LeaveStatus.PENDING },
    { employeeId: employees[0].id, startDate: new Date('2026-10-05'), endDate: new Date('2026-10-06'), reason: 'Annual leave', status: LeaveStatus.APPROVED, reviewedById: manager.id, reviewedAt: new Date() },
  ] });
}
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => prisma.$disconnect());
