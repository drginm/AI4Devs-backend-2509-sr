# Position Candidates Spec

## ADDED Requirements

### Requirement: View Candidates for a Position
The system MUST allow retrieving a list of candidates applied to a specific position, including status and score.

#### Scenario: Retrieve candidates for a position
Given a position exists with ID `1`
And there are candidates who applied to this position
When I send a GET request to `/positions/1/candidates`
Then the response status should be 200
And the response body should be a list of candidates
And each item should contain "fullName", "currentInterviewStep", and "averageScore"

#### Scenario: Retrieve candidates for position with no applications
Given a position exists with ID `2`
And no candidates have applied
When I send a GET request to `/positions/2/candidates`
Then the response status should be 200
And the response body should be an empty list

### Requirement: Handle Invalid Input
The system MUST handle invalid position identifiers gracefully.

#### Scenario: Invalid Position ID format
Given I send a GET request to `/positions/abc/candidates`
Then the response status should be 400
And the error message should indicate invalid ID format
