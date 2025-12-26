import { GetPositionCandidatesUseCase } from '../../src/application/services/getPositionCandidatesUseCase';
import { PositionRepository } from '../../src/domain/repositories/positionRepository';

describe('GetPositionCandidatesUseCase', () => {
    let positionRepository: PositionRepository;
    let useCase: GetPositionCandidatesUseCase;

    beforeEach(() => {
        positionRepository = {
            findCandidatesByPositionId: jest.fn()
        };
        useCase = new GetPositionCandidatesUseCase(positionRepository);
    });

    it('should throw error if position ID is invalid', async () => {
        await expect(useCase.execute(NaN)).rejects.toThrow('Invalid position ID');
    });

    it('should call repository with correct ID', async () => {
        const mockCandidates = [
            { id: 1, fullName: 'John Doe', currentInterviewStep: 'HR', averageScore: 80 }
        ];
        (positionRepository.findCandidatesByPositionId as jest.Mock).mockResolvedValue(mockCandidates);

        const result = await useCase.execute(1);

        expect(positionRepository.findCandidatesByPositionId).toHaveBeenCalledWith(1);
        expect(result).toEqual(mockCandidates);
    });
});
