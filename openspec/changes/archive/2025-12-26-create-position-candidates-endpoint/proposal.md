# Proposal: Create Position Candidates Endpoint

## Goal
Implement a new backend endpoint `GET /positions/:id/candidates` to retrieve all candidates for a specific position, including their current status and average interview score.

## Context
Recruiters need a way to view all candidates associated with a specific job position to manage the hiring process effectively. This endpoint aggregates data from `Candidate`, `Application`, and `Interview` tables.

## Requirements
- Endpoint: `GET /positions/:id/candidates`
- Response List of:
  - Candidate Full Name
  - Current Interview Step (from Application)
  - Average Score (calculated from Interviews)

## Non-Goals
- Frontend implementation.
- Pagination (for now, unless specified).
- Filtering/Sorting (beyond position ID).
