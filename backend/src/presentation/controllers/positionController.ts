import { Request, Response } from 'express';
import { GetPositionCandidatesUseCase } from '../../application/services/getPositionCandidatesUseCase';
import { PrismaPositionRepository } from '../../infrastructure/repositories/prismaPositionRepository';

export const getPositionCandidates = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const repository = new PrismaPositionRepository();
        const useCase = new GetPositionCandidatesUseCase(repository);
        const candidates = await useCase.execute(id);

        res.json(candidates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
