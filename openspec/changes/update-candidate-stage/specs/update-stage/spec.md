## ADDED Requirements

### Requirement: Update Candidate Stage
The system MUST allow updating the status (stage) of a candidate's active application.

#### Scenario: Update candidate stage successfully
Given a candidate with an active application
When I send a PUT request to `/candidates/{id}/stage` with body `{ "stage": "INTERVIEWING" }`
Then the response status should be 200
And the candidate's application status should be updated to "INTERVIEWING"

#### Scenario: Update candidate stage with invalid value
Given a candidate exists
When I send a PUT request to `/candidates/{id}/stage` with body `{ "stage": "INVALID_STATUS" }`
Then the response status should be 400
And the error message should indicate invalid stage value

#### Scenario: Update stage for non-existent candidate
Given a candidate ID that does not exist
When I send a PUT request to `/candidates/{nonExistentId}/stage`
Then the response status should be 404
