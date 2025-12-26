# Design: Update Candidate Stage

## Problem
The system tracks candidates via `Application` entities which have a `status` (ApplicationStatus). There is a need to expose an API to modify this status. The term "stage" is used in the requirement ("Update candidate stage").

## Solution
We will map "stage" to the `ApplicationStatus` enum in the database.

### API Design
`PUT /candidates/:id/stage`
Body: `{ "stage": "INTERVIEWING" }`

### Logic
1. Find the candidate by `id`.
2. Find the *active* application for this candidate (where status is not closed/final if possible, or just the most recent one).
   - *Assumption*: For this iteration, we will assume a candidate has one relevant application or we pick the latest one.
3. Update specific `Application.status` to the provided `stage`.

### Trade-offs
- **Stage vs InterviewStep**: The current `prismaPositionRepository` maps `currentInterviewStep` to `ApplicationStatus`. To maintain consistency, we will stick to `ApplicationStatus` as "stage". Future iterations can introduce more granular `InterviewStep` updates if needed.
