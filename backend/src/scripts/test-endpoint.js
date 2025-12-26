const { PrismaClient } = require('@prisma/client');
const http = require('http');

const prisma = new PrismaClient();

async function runTest() {
    try {
        console.log('1. Setting up test data...');
        
        // Ensure we have a company and position
        const company = await prisma.company.upsert({
            where: { name: 'Test Company' },
            update: {},
            create: { name: 'Test Company' }
        });

        const interviewFlow = await prisma.interviewFlow.create({
            data: { description: 'Standard Flow' }
        });

        const position = await prisma.position.create({
            data: {
                title: 'Test Position',
                description: 'Test Desc',
                location: 'Remote',
                jobDescription: 'JD',
                employmentType: 'FULL_TIME',
                companyId: company.id,
                interviewFlowId: interviewFlow.id
            }
        });

        // Create Candidate
        const candidate = await prisma.candidate.create({
            data: {
                firstName: 'Test',
                lastName: 'User',
                email: `test.user.${Date.now()}@example.com`
            }
        });

        // Create Application
        const application = await prisma.application.create({
            data: {
                positionId: position.id,
                candidateId: candidate.id,
                applicationDate: new Date(),
                status: 'APPLIED'
            }
        });

        console.log(`Created Candidate ID: ${candidate.id}, Application ID: ${application.id}`);

        console.log('2. Calling PUT /candidates/:id/stage...');
        
        const postData = JSON.stringify({
            stage: 'INTERVIEWING'
        });

        const options = {
            hostname: 'localhost',
            port: 3010,
            path: `/candidates/${candidate.id}/stage`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', async () => {
                console.log(`Response Status: ${res.statusCode}`);
                console.log(`Response Body: ${data}`);

                console.log('3. Verifying database state...');
                const updatedApp = await prisma.application.findUnique({
                    where: { id: application.id }
                });
                
                console.log(`Updated Application Status: ${updatedApp?.status}`);
                
                let passed = false;
                if (updatedApp?.status === 'INTERVIEWING') {
                    console.log('✅ TEST PASSED');
                    passed = true;
                } else {
                    console.log('❌ TEST FAILED');
                }
                
                // Cleanup
                await prisma.application.delete({ where: { id: application.id } });
                await prisma.candidate.delete({ where: { id: candidate.id } });
                await prisma.position.delete({ where: { id: position.id } });
                await prisma.interviewFlow.delete({ where: { id: interviewFlow.id } });
                await prisma.company.delete({ where: { id: company.id } }); // Might fail if other employees exist, but safe to try.
                
                process.exit(passed ? 0 : 1);
            });
        });

        req.on('error', (e) => {
            console.error(`Request error: ${e.message}`);
            process.exit(1);
        });

        req.write(postData);
        req.end();

    } catch (error) {
        console.error('Test Error:', error);
        process.exit(1);
    }
}

runTest();
