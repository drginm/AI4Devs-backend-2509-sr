# Update Candidate Stage

## Context
Recruiters need to move candidates through different stages of the hiring process (e.g., from Screening to Interviewing, or to Hired/Rejected). Currently, there is no exposed endpoint to explicitly update the stage (status) of a candidate's application.

## Goal
Implement a `PUT /candidates/:id/stage` endpoint that allows updating the current stage of a candidate.

## Scope
- New Endpoint: `PUT /candidates/:id/stage`
- functionality: Updates the `status` of the candidate's *active* application.
- validation: Ensure valid `ApplicationStatus`.
