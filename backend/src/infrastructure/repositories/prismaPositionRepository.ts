import { PrismaClient } from '@prisma/client';
import { PositionRepository } from '../../domain/repositories/positionRepository';
import { CandidateWithStatus } from '../../domain/models/candidateWithStatus';

const prisma = new PrismaClient();

export class PrismaPositionRepository implements PositionRepository {
    async findCandidatesByPositionId(id: number): Promise<CandidateWithStatus[]> {
        const applications = await prisma.application.findMany({
            where: { positionId: id },
            include: {
                candidate: true,
                interviews: true
            }
        });

        return applications.map(app => {
            const totalScore = app.interviews.reduce((sum, interview) => sum + (interview.score || 0), 0);
            const countWithScore = app.interviews.filter(i => i.score !== null).length;
            const averageScore = countWithScore > 0 ? parseFloat((totalScore / countWithScore).toFixed(2)) : null;

            return {
                id: app.candidate.id,
                fullName: `${app.candidate.firstName} ${app.candidate.lastName}`,
                currentInterviewStep: app.status,
                averageScore: averageScore
            };
        });
    }
}
