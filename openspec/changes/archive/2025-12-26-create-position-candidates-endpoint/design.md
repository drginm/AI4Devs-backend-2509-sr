# Design: Get Candidates by Position

## Architecture
The implementation will follow a **Clean Architecture** approach, introducing specific layers for better separation of concerns and testability.

### Components

#### 1. API Interface (OpenAPI)
- Update `backend/api-spec.yaml` to define `GET /positions/{id}/candidates`.

#### 2. Domain Layer
- **Model**: `CandidateWithStatus` (interface/class) representing the data to return.
- **Repository Interface**: `PositionRepository` in `backend/src/domain/repositories/`.
  - Method: `findCandidatesByPositionId(id: number): Promise<CandidateWithStatus[]>`.

#### 3. Application Layer
- **Use Case**: `GetPositionCandidatesUseCase` in `backend/src/application/services/`.
  - Constructor injects `PositionRepository`.
  - Method: `execute(positionId: number): Promise<CandidateWithStatus[]>`.
  - Logic: Delegates to repository. Pure orchestration.

#### 4. Infrastructure Layer
- **Repository Implementation**: `PrismaPositionRepository` in `backend/src/infrastructure/repositories/`.
  - Implements `PositionRepository`.
  - Uses `PrismaClient` to query `Application` (join `Candidate`, `Interview`, `InterviewStep`).
  - Maps Prisma result to Domain Model `CandidateWithStatus`.
  
#### 5. Presentation Layer
- **Controller**: `PositionController` in `backend/src/presentation/controllers/`.
  - Instantiates `PrismaPositionRepository` and `GetPositionCandidatesUseCase` (or uses DI container if available).
  - Handles Request/Response.

### Data Access (Prisma)
Query `Application` table:
- Where: `positionId`.
- Include: `candidate` (details), `interviewStep` (status), `interviews` (scores).
- Calculation: Compute average score from `interviews` array in the Repository implementation context.

## API Interface
**Request**: `GET /positions/:id/candidates`

**Response**:
```json
[
  {
    "fullName": "John Doe",
    "currentInterviewStep": "Technical Interview",
    "averageScore": 85
  },
  ...
]
```

## Considerations
- **Pagination**: Not included in this iteration (per requirements).
- **Error Handling**: 404 if Position doesn't exist? Or just empty list? Standard is empty list usually, but if key is invalid format -> 400.
