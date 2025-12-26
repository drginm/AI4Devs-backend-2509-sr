import { PrismaClient, ApplicationStatus } from '@prisma/client';
import { ApplicationRepository } from '../../domain/repositories/applicationRepository';
import { Application } from '../../domain/models/Application';

const prisma = new PrismaClient();

export class PrismaApplicationRepository implements ApplicationRepository {
    async findActiveByCandidateId(candidateId: number): Promise<Application | null> {
        const application = await prisma.application.findFirst({
            where: { candidateId: candidateId },
            orderBy: { applicationDate: 'desc' }, // Assuming the latest is the active one for now
            include: { interviews: true }
        });

        if (!application) return null;
        return new Application({
            ...application,
            status: application.status
        });
    }

    async updateStatus(applicationId: number, status: ApplicationStatus): Promise<void> {
        await prisma.application.update({
            where: { id: applicationId },
            data: { status }
        });
    }
}
