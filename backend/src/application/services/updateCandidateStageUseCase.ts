import { ApplicationRepository } from '../../domain/repositories/applicationRepository';
import { ApplicationStatus } from '@prisma/client';

export class UpdateCandidateStageUseCase {
    constructor(private applicationRepository: ApplicationRepository) {}

    async execute(candidateId: number, stage: string): Promise<{ message: string; status: string }> {
        // Validate stage
        if (!Object.values(ApplicationStatus).includes(stage as ApplicationStatus)) {
            throw new Error('Invalid stage value');
        }

        const application = await this.applicationRepository.findActiveByCandidateId(candidateId);

        if (!application) {
            throw new Error('No active application found for this candidate');
        }

        if (!application.id) {
             throw new Error('Application ID missing');
        }

        const newStatus = stage as ApplicationStatus;
        await this.applicationRepository.updateStatus(application.id, newStatus);

        return {
            message: 'Candidate stage updated successfully',
            status: newStatus
        };
    }
}
