import { PrismaClient, PositionStatus, EmploymentType, ApplicationStatus, EmployeeRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding verification data...');

  try {
    const cols = await prisma.$queryRaw`SELECT column_name FROM information_schema.columns WHERE table_name = 'Interview'`;
    console.log('Interview Columns:', cols);
  } catch (e) {
    console.log('Could not query columns:', e);
  }
  
  // 1. Create Company
  const company = await prisma.company.create({
    data: { name: 'Verification Corp ' + Date.now() }
  });

  // 2. Create Interview Flow & Type
  const flow = await prisma.interviewFlow.create({
    data: { description: 'Verify Flow' }
  });
  const type = await prisma.interviewType.create({
    data: { name: 'Verify Type ' + Date.now() }
  });
  const step = await prisma.interviewStep.create({
    data: {
      interviewFlowId: flow.id,
      interviewTypeId: type.id,
      name: 'Verification Step',
      orderIndex: 1
    }
  });

  // 3. Create Position
  const position = await prisma.position.create({
    data: {
      title: 'Verification Position ' + Date.now(),
      description: 'Test',
      status: PositionStatus.OPEN,
      location: 'Test',
      employmentType: EmploymentType.FULL_TIME,
      jobDescription: 'Test',
      companyId: company.id,
      interviewFlowId: flow.id
    }
  });
  console.log(`VERIFICATION_POSITION_ID=${position.id}`);

  // 4. Create Candidate & Application
  const candidate = await prisma.candidate.create({
    data: {
      firstName: 'Verify',
      lastName: 'User',
      email: `verify${Date.now()}@test.com`
    }
  });

  const app = await prisma.application.create({
    data: {
      positionId: position.id,
      candidateId: candidate.id,
      applicationDate: new Date(),
      status: ApplicationStatus.APPLIED
    }
  });

  // 5. Create Employee
  const emp = await prisma.employee.create({
      data: { companyId: company.id, name: 'Tester', email: 'tester'+Date.now()+'@test.com', role: EmployeeRole.INTERVIEWER }
  });
  
  // 6. Create Interview
  await prisma.interview.create({
     data: {
         applicationId: app.id,
         interviewStepId: step.id,
         employeeId: emp.id,
         interviewDate: new Date(),
         score: 95
     }
  });

  console.log('Seeding complete.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
