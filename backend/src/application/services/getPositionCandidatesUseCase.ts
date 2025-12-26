import { PositionRepository } from '../../domain/repositories/positionRepository';
import { CandidateWithStatus } from '../../domain/models/candidateWithStatus';

export class GetPositionCandidatesUseCase {
    constructor(private positionRepository: PositionRepository) {}

    async execute(positionId: number): Promise<CandidateWithStatus[]> {
        if (!positionId || isNaN(positionId)) {
            throw new Error('Invalid position ID');
        }
        
        return await this.positionRepository.findCandidatesByPositionId(positionId);
    }
}
