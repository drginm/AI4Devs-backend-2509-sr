import { Application } from '../models/Application';
import { ApplicationStatus } from '@prisma/client';

export interface ApplicationRepository {
    findActiveByCandidateId(candidateId: number): Promise<Application | null>;
    updateStatus(applicationId: number, status: ApplicationStatus): Promise<void>;
}
