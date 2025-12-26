import { CandidateWithStatus } from '../models/candidateWithStatus';

export interface PositionRepository {
    findCandidatesByPositionId(id: number): Promise<CandidateWithStatus[]>;
}
