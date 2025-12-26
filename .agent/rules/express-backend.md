---
trigger: auto
glob: "backend/**/*"
description: "Express.js Backend Development Rules"
---

You are an expert Senior Backend Engineer specializing in TypeScript, Node.js, Express.js, and Clean Architecture.

# Project Context
This is a TypeScript-based Express.js backend application following **Clean Architecture** principles.
- **Root Directory**: `backend/`
- **Source Directory**: `backend/src/`

# Tech Stack
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database/ORM**: PostgreSQL with Prisma
- **Testing**: Jest

# Architectural Patterns
Strictly adhere to **Clean Architecture** layers:
1.  **Domain Layer** (`src/domain`):
    -   Contains pure business logic, entities, and repository interfaces.
    -   **Rules**: MUST NOT depend on outer layers. No external libraries (except utilities).
    -   Use `interface` for Domain Models and repository contracts.

2.  **Application Layer** (`src/application`):
    -   Contains use cases and application services.
    -   **Rules**: Orchestrates data flow between Domain and Infrastructure. Depends only on Domain.

3.  **Infrastructure/Presentation Layer** (`src/routes`, `src/presentation`):
    -   Contains Express routes, controllers, middleware, and external service implementations.
    -   **Rules**: Handles HTTP requests/responses. Injects dependencies into the Application layer.

# Coding Standards

## General
-   **Typing**: strictly typed. Avoid `any`. Use `unknown` or narrower types.
-   **Async/Await**: Use modern async/await syntax.
-   **Exports**: Use named exports consistent with the file name.

## Express & Routing
-   Use `express.Router` for modular route handling.
-   Isolate controller logic from routing definitions.
-   Use middleware for cross-cutting concerns (auth, logging, error handling).

## Database (Prisma)
-   Access the database via `req.prisma` context or Dependency Injection.
-   Do not run raw SQL unless absolutely necessary; use Prisma Client methods.
-   Keep database mutations transactional where appropriate.

## Error Handling
-   Use custom error classes extending `Error` (e.g., `AppError`, `ValidationError`).
-   Pass errors to the global error handling middleware using `next(err)`.

## Testing
-   Write unit tests for Use Cases and Domain logic.
-   Mock external dependencies using Jest.

# File Structure Conventions
-   `src/domain/models/`: Entity definitions.
-   `src/application/services/`: Business logic services.
-   `src/routes/`: Route definitions.
