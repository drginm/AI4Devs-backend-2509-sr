---
description: Create a new backend endpoint (OpenSpec + Clean Architecture implementation)
---

**Guardrails**
- Ensure strict adherence to Clean Architecture layers (Domain -> Application -> Infrastructure).
- Update the OpenAPI specification (`api-spec.yaml` or similar) *before* writing code.
- Write tests for the new endpoint (Unit tests for use cases, integration tests for routes).
- Use `openspec` if relevant for tracking major changes, but this workflow focuses on the implementation details.

**Steps**
1. **Define Interface (OpenAPI)**
   - Locate the OpenAPI spec file (check `backend/api-spec.yaml` or similar in `backend/`).
   - Add the new path, method, request/response schemas.
   - Run any necessary generation scripts (e.g., `npm run prisma:generate` or specific openapi generators if configured).

2. **Domain Layer Implementation**
   - Create or update Domain Models in `backend/src/domain/models/`.
   - Define Repository Interfaces in `backend/src/domain/repositories/` (if data access is needed).
   - Ensure these are pure TypeScript interfaces/classes with no external dependencies.

3. **Application Layer Implementation**
   - Create a Use Case service in `backend/src/application/services/`.
   - The Use Case should implement the business logic and rely on the Repository Interface.
   - Inject dependencies via constructor or robust DI pattern.

4. **Infrastructure Layer Implementation**
   - Create the Controller in `backend/src/presentation/controllers/`.
   - The Controller should handle the HTTP request, invoke the Use Case, and map the result to an HTTP response.
   - Implement the Repository (Prisma) in `backend/src/infrastructure/repositories/` (if it doesn't exist).

5. **Route Registration**
   - Register the new route in `backend/src/routes/`.
   - Ensure the route uses the correct HTTP method and path as defined in Step 1.
   - Wire up the Controller and dependencies.

6. **Verification**
   - Write Unit Tests for the Use Case in `backend/tests/unit/`.
   - Write Integration Tests for the Route in `backend/tests/integration/` (or `backend/src/tests`).
   - Run `npm test` to verify.
   - (Optional) Verify manually using Swagger UI if available (`npm run start` and navigate to docs).
