import request from 'supertest';
import express from 'express';
import positionRoutes from '../../src/routes/positionRoutes';
import { PrismaPositionRepository } from '../../src/infrastructure/repositories/prismaPositionRepository';

// Mock the repository
jest.mock('../../src/infrastructure/repositories/prismaPositionRepository');

const app = express();
app.use(express.json());
app.use(positionRoutes);

describe('GET /positions/:id/candidates', () => {
    it('should return 200 and candidates list', async () => {
        const mockCandidates = [
            { id: 1, fullName: 'Jane Doe', currentInterviewStep: 'Final', averageScore: 95 }
        ];

        (PrismaPositionRepository.prototype.findCandidatesByPositionId as jest.Mock).mockResolvedValue(mockCandidates);

        const response = await request(app).get('/positions/1/candidates');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCandidates);
    });

    it('should return 400 for invalid ID', async () => {
        const response = await request(app).get('/positions/abc/candidates');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid ID format' });
    });
});
