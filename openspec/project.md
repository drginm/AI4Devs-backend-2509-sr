# Project Context

## Purpose
The **Talent Tracking System (LTI)** is a full-stack application designed to manage recruitment processes. It allows users to track candidates, their education, work experience, resumes, and job applications. The goal is to provide a seamless interface for recruiters to manage talent pipelines, from candidate entry to interview tracking.

## Tech Stack
- **Frontend**: React (Create React App), Bootstrap 5, React Bootstrap, React Router DOM.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: PostgreSQL.
- **ORM**: Prisma.
- **API Documentation**: OpenAPI / Swagger (`api-spec.yaml`).
- **Containerization**: Docker, Docker Compose.
- **Testing**: Jest, React Testing Library.

## Project Conventions

### Code Style
- **Backend**: TypeScript with ESLint and Prettier.
- **Frontend**: JavaScript/React (currently converting to or mixed with TypeScript based on `tsconfig.json` presence vs `App.js` existence - *Note: Frontend seems to be in a transition or mixed state*).
- **Formatting**: Prettier default settings.

### Architecture Patterns
**Backend**:
- **Layered / Hexagonal Inspiration**: The project structure suggests a separation of concerns (`application`, `domain`, `presentation`), but relies heavily on the **Active Record** pattern.
- **Active Record**: Domain models (e.g., `Candidate`) contain business logic and direct data access methods (`save`, `findOne`) using `PrismaClient`. This deviates from a pure Repository pattern.
- **Services**: Application services (`candidateService`, `fileUploadService`) orchestrate business operations and validation, often calling Model methods.
- **Presentation**: Express controllers handle HTTP requests and responses, delegating to Services.

### Implemented Services
- **Candidate Service** (`candidateService.ts`): Handles candidate creation, validation, and retrieval. Manages nested relations (Education, WorkExperience, Resume) during creation.
- **File Upload Service** (`fileUploadService.ts`): Manages Resume/CV file uploads.

### API & Swagger
- **OpenAPI**: The API is defined using OpenAPI specifications (`api-spec.yaml`).
- **Swagger**: The project is set up to use `swagger-jsdoc` and `swagger-ui-express` for API documentation and exploration.

### Testing Strategy
- **Backend**: Jest is used for unit and integration tests.
- **Frontend**: Jest and React Testing Library for component testing.

### Git Workflow
- Standard Git workflow.

## Domain Context
- **Entities**: Candidate, Education, WorkExperience, Resume, Application, Position, Interview.
- **Flow**: Candidates apply for Positions -> Applications are tracked through Interview Steps -> Interviews have Scores and Notes.

## Important Constraints
- **Database**: Must use PostgreSQL via Docker.
- **Prisma**: Schema changes require migration generation (`npx prisma migrate dev`).

## External Dependencies
- **PostgreSQL**: Managed via Docker Compose (`docker-compose.yml`).
