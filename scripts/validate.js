#!/usr/bin/env node

/**
 * Pre-deployment validation script
 * Checks if the project is ready for deployment
 */

const fs = require('fs');
const path = require('path');

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    bold: '\x1b[1m',
};

const log = {
    success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
    info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
    warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
    section: (msg) => console.log(`\n${colors.bold}${colors.blue}${msg}${colors.reset}`),
};

let passed = 0;
let failed = 0;

function check(condition, successMsg, errorMsg) {
    if (condition) {
        log.success(successMsg);
        passed++;
        return true;
    } else {
        log.error(errorMsg);
        failed++;
        return false;
    }
}

function fileExists(filepath) {
    return fs.existsSync(path.join(process.cwd(), filepath));
}

function readFile(filepath) {
    try {
        return fs.readFileSync(path.join(process.cwd(), filepath), 'utf8');
    } catch {
        return null;
    }
}

async function validate() {
    console.log(`\n${colors.blue}${'='.repeat(50)}${colors.reset}`);
    console.log(`${colors.bold}${colors.blue}  AI Resume Analyzer - Deployment Validation${colors.reset}`);
    console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}\n`);

    // 1. Check Essential Files
    log.section('📁 Essential Files');
    check(fileExists('package.json'), 'package.json exists', 'package.json missing!');
    check(fileExists('next.config.ts'), 'next.config.ts exists', 'next.config.ts missing!');
    check(fileExists('tsconfig.json'), 'tsconfig.json exists', 'tsconfig.json missing!');
    check(fileExists('.gitignore'), '.gitignore exists', '.gitignore missing!');
    check(fileExists('.env.example'), '.env.example exists', '.env.example missing!');

    // 2. Check Documentation
    log.section('📚 Documentation');
    check(fileExists('README.md'), 'README.md exists', 'README.md missing!');
    check(fileExists('SETUP.md'), 'SETUP.md exists', 'SETUP.md missing!');
    check(fileExists('DEPLOYMENT.md'), 'DEPLOYMENT.md exists', 'DEPLOYMENT.md missing!');
    check(fileExists('FEATURES.md'), 'FEATURES.md exists', 'FEATURES.md missing!');

    // 3. Check API Routes
    log.section('🔌 API Routes');
    check(fileExists('app/api/analyze/route.ts'), 'analyze endpoint exists', 'analyze endpoint missing!');
    check(fileExists('app/api/generateSummary/route.ts'), 'generateSummary endpoint exists', 'generateSummary endpoint missing!');
    check(fileExists('app/api/jobs/route.ts'), 'jobs endpoint exists', 'jobs endpoint missing!');
    check(fileExists('app/api/enhance/route.ts'), 'enhance endpoint exists', 'enhance endpoint missing!');
    check(fileExists('app/api/suggestSkills/route.ts'), 'suggestSkills endpoint exists', 'suggestSkills endpoint missing!');
    check(fileExists('app/api/health/route.ts'), 'health endpoint exists', 'health endpoint missing!');

    // 4. Check Core Components
    log.section('⚛️ Core Components');
    check(fileExists('components/builder/ResumeForm.tsx'), 'ResumeForm exists', 'ResumeForm missing!');
    check(fileExists('components/builder/ResumePreview.tsx'), 'ResumePreview exists', 'ResumePreview missing!');
    check(fileExists('components/builder/AIAnalyzer.tsx'), 'AIAnalyzer exists', 'AIAnalyzer missing!');
    check(fileExists('components/layout/Navbar.tsx'), 'Navbar exists', 'Navbar missing!');
    check(fileExists('context/AuthContext.tsx'), 'AuthContext exists', 'AuthContext missing!');
    check(fileExists('context/ResumeContext.tsx'), 'ResumeContext exists', 'ResumeContext missing!');

    // 5. Check Pages
    log.section('📄 Pages');
    check(fileExists('app/page.tsx'), 'Homepage exists', 'Homepage missing!');
    check(fileExists('app/builder/page.tsx'), 'Builder page exists', 'Builder page missing!');
    check(fileExists('app/dashboard/page.tsx'), 'Dashboard page exists', 'Dashboard page missing!');
    check(fileExists('app/jobs/page.tsx'), 'Jobs page exists', 'Jobs page missing!');
    check(fileExists('app/login/page.tsx'), 'Login page exists', 'Login page missing!');
    check(fileExists('app/signup/page.tsx'), 'Signup page exists', 'Signup page missing!');

    // 6. Check Environment
    log.section('🔐 Environment');
    const envExists = fileExists('.env.local') || fileExists('.env');
    if (envExists) {
        log.warn('.env.local found (should not be committed to git)');
        const envContent = readFile('.env.local') || readFile('.env');
        if (envContent && envContent.includes('GEMINI_API_KEY')) {
            log.success('GEMINI_API_KEY configured in environment');
            passed++;
        } else {
            log.error('GEMINI_API_KEY not found in environment file!');
            failed++;
        }
    } else {
        log.warn('No .env.local file (needed for local development)');
        log.info('Make sure to set GEMINI_API_KEY in deployment platform');
    }

    // 7. Check Package.json
    log.section('📦 Dependencies');
    const pkg = JSON.parse(readFile('package.json'));
    check(pkg.dependencies['next'], 'Next.js installed', 'Next.js missing!');
    check(pkg.dependencies['react'], 'React installed', 'React missing!');
    check(pkg.dependencies['@google/generative-ai'], 'Gemini AI SDK installed', 'Gemini AI SDK missing!');
    check(pkg.scripts['build'], 'Build script exists', 'Build script missing!');
    check(pkg.scripts['start'], 'Start script exists', 'Start script missing!');

    // 8. Check Deployment Configs
    log.section('🚀 Deployment Configuration');
    check(fileExists('render.yaml'), 'Render config exists', 'Render config missing!');
    check(fileExists('vercel.json'), 'Vercel config exists', 'Vercel config missing!');

    // 9. Check Build
    log.section('🏗️ Build Test');
    const nextDir = fileExists('.next');
    if (nextDir) {
        log.info('Build artifacts found (.next directory exists)');
        log.info('Run "npm run build" to ensure fresh build before deployment');
    } else {
        log.warn('No build artifacts found');
        log.info('Run "npm run build" before deploying');
    }

    // Summary
    console.log(`\n${colors.blue}${'='.repeat(50)}${colors.reset}`);
    console.log(`${colors.bold}${colors.blue}  Validation Results${colors.reset}`);
    console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}\n`);
    
    log.success(`Passed: ${passed}`);
    if (failed > 0) {
        log.error(`Failed: ${failed}`);
    }
    
    const total = passed + failed;
    const percentage = ((passed / total) * 100).toFixed(0);
    
    console.log(`\n${colors.bold}Overall: ${percentage}% (${passed}/${total})${colors.reset}\n`);

    if (failed === 0) {
        log.success('✨ Project is ready for deployment! ✨');
        console.log('\nNext steps:');
        console.log('  1. Run: npm run build');
        console.log('  2. Test: npm start');
        console.log('  3. Deploy to your platform of choice');
        console.log('\nSee DEPLOYMENT.md for detailed deployment instructions.\n');
        process.exit(0);
    } else {
        log.error('⚠️  Please fix the issues above before deploying');
        console.log('\nCommon fixes:');
        console.log('  - Missing files: Check your git repository');
        console.log('  - Missing dependencies: Run npm install');
        console.log('  - Environment: Create .env.local with GEMINI_API_KEY\n');
        process.exit(1);
    }
}

// Run validation
validate().catch(error => {
    log.error(`Validation error: ${error.message}`);
    process.exit(1);
});
