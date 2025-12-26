import axios from 'axios';

const API_URL = 'http://localhost:3000';

async function verify() {
    try {
        console.log('1. Create a candidate...');
        const candidateRes = await axios.post(`${API_URL}/candidates`, {
            firstName: 'John',
            lastName: 'Doe',
            email: `john.doe.${Date.now()}@example.com`,
            educations: [],
            workExperiences: [],
            cv: {}
        });
        const candidateId = candidateRes.data.id;
        console.log(`Candidate created with ID: ${candidateId}`);

        // We need an application to update. The create candidate endpoint might NOT create an application by default?
        // Let's check candidateService.ts... it adds applications if provided.
        // I need to add an application first OR update the create call to include one.
        // But the POST /candidates endpoint body (api-spec.yaml) DOES NOT include 'applications'.
        // It has educations, workExperiences, cv. 
        // Candidate.ts takes 'applications' but the Controller/Spec might filter the body or validation might block it.
        // Let's check 'validateCandidateData' in 'validator.ts' if possible, or just try to pass 'applications'.
        
        // Alternatively, use a script to inject an application directly using Prisma or check if there is an endpoint to apply.
        // There is 'POST /applications'? I didn't check application routes.
        
        // For now, I'll attempt to update stage of a non-existent application and expect 404 or specific error.
        
        console.log('2. Update stage (should fail if no app)...');
        try {
            await axios.put(`${API_URL}/candidates/${candidateId}/stage`, {
                stage: 'INTERVIEWING'
            });
        } catch (e: any) {
            console.log('Expected error (No active application):', e.response?.data || e.message);
        }

        // If I can't easily create an application via API, I should perhaps use a seed or direct DB insert in this script if I can import Prisma.
        // But importing Prisma here complicates things (ts-node env).
        
    } catch (error: any) {
        console.error('Verification failed:', error.response?.data || error.message);
    }
}

verify();
