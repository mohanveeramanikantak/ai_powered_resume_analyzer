#!/usr/bin/env node

/**
 * API Testing Script
 * Tests all endpoints to ensure they work correctly
 */

const API_BASE = process.env.API_BASE || 'http://localhost:3000';

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
};

const log = {
    success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
    info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
    warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
};

// Test data
const mockResumeData = {
    personalInfo: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        linkedin: 'linkedin.com/in/johndoe',
        portfolio: 'johndoe.com',
        summary: 'Experienced software engineer with 5 years of experience'
    },
    experience: [
        {
            id: '1',
            role: 'Senior Software Engineer',
            company: 'Tech Corp',
            startDate: 'Jan 2020',
            endDate: 'Present',
            description: 'Led development of microservices architecture'
        }
    ],
    education: [
        {
            id: '1',
            school: 'University of Technology',
            degree: 'B.S. Computer Science',
            year: '2019'
        }
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python'],
    projects: [
        {
            id: '1',
            title: 'E-commerce Platform',
            description: 'Built a scalable e-commerce platform',
            link: 'github.com/johndoe/project',
            technologies: 'React, Node.js, MongoDB'
        }
    ],
    templateSettings: {
        template: 'modern',
        fontFamily: 'Inter',
        primaryColor: '#6366f1'
    }
};

async function testEndpoint(name, path, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE}${path}`, options);
        const data = await response.json();

        if (response.ok) {
            log.success(`${name}: ${response.status}`);
            return { success: true, data };
        } else {
            log.error(`${name}: ${response.status} - ${data.error || 'Unknown error'}`);
            return { success: false, error: data.error };
        }
    } catch (error) {
        log.error(`${name}: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function runTests() {
    console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.blue}  AI Resume Analyzer - API Testing${colors.reset}`);
    console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    log.info(`Testing endpoints at: ${API_BASE}\n`);

    const results = {
        passed: 0,
        failed: 0,
    };

    // Test 1: Health Check
    console.log(`\n${colors.yellow}1. Health Check${colors.reset}`);
    const health = await testEndpoint('GET /api/health', '/api/health');
    health.success ? results.passed++ : results.failed++;
    if (health.data) {
        console.log(`   API Configured: ${health.data.geminiConfigured ? '✓' : '✗'}`);
    }

    // Test 2: Resume Analysis
    console.log(`\n${colors.yellow}2. Resume Analysis${colors.reset}`);
    const analyze = await testEndpoint(
        'POST /api/analyze',
        '/api/analyze',
        'POST',
        {
            resumeData: mockResumeData,
            jobDescription: 'Looking for a senior software engineer with React experience'
        }
    );
    analyze.success ? results.passed++ : results.failed++;
    if (analyze.data && analyze.data.matchScore) {
        console.log(`   Match Score: ${analyze.data.matchScore}%`);
    }

    // Test 3: Summary Generation
    console.log(`\n${colors.yellow}3. AI Summary Generation${colors.reset}`);
    const summary = await testEndpoint(
        'POST /api/generateSummary',
        '/api/generateSummary',
        'POST',
        { resumeData: mockResumeData }
    );
    summary.success ? results.passed++ : results.failed++;
    if (summary.data && summary.data.summary) {
        console.log(`   Generated: ${summary.data.summary.substring(0, 60)}...`);
    }

    // Test 4: Job Matching
    console.log(`\n${colors.yellow}4. Job Matching${colors.reset}`);
    const jobs = await testEndpoint(
        'POST /api/jobs',
        '/api/jobs',
        'POST',
        { resumeData: mockResumeData }
    );
    jobs.success ? results.passed++ : results.failed++;
    if (jobs.data && jobs.data.jobs) {
        console.log(`   Jobs Found: ${jobs.data.jobs.length}`);
    }

    // Test 5: Text Enhancement
    console.log(`\n${colors.yellow}5. Text Enhancement${colors.reset}`);
    const enhance = await testEndpoint(
        'POST /api/enhance',
        '/api/enhance',
        'POST',
        {
            text: 'Worked on various projects using React and Node.js',
            type: 'experience'
        }
    );
    enhance.success ? results.passed++ : results.failed++;

    // Test 6: Skill Suggestions
    console.log(`\n${colors.yellow}6. Skill Suggestions${colors.reset}`);
    const skills = await testEndpoint(
        'POST /api/suggestSkills',
        '/api/suggestSkills',
        'POST',
        { resumeData: mockResumeData }
    );
    skills.success ? results.passed++ : results.failed++;
    if (skills.data && skills.data.skills) {
        console.log(`   Suggestions: ${skills.data.skills.length}`);
    }

    // Summary
    console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.blue}  Test Results${colors.reset}`);
    console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    log.success(`Passed: ${results.passed}`);
    log.error(`Failed: ${results.failed}`);
    
    const total = results.passed + results.failed;
    const percentage = ((results.passed / total) * 100).toFixed(0);
    
    console.log(`\nOverall: ${percentage}% (${results.passed}/${total})\n`);

    if (results.failed === 0) {
        log.success('All tests passed! 🎉');
    } else {
        log.warn('Some tests failed. Check your configuration.');
    }

    process.exit(results.failed === 0 ? 0 : 1);
}

// Run tests
runTests().catch(console.error);
