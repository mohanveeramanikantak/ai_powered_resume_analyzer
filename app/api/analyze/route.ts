import { NextRequest, NextResponse } from 'next/server';
import { analyzeResume } from '@/lib/gemini';

export async function POST(req: NextRequest) {
    try {
        const { resumeData, jobDescription } = await req.json();

        if (!resumeData) {
            return NextResponse.json(
                { error: 'Resume data is required' },
                { status: 400 }
            );
        }

        // Convert resume object to a string representation for the AI
        const resumeText = JSON.stringify(resumeData, null, 2);

        // Use a default JD if none provided, just for general ATS check
        const jd = jobDescription || `
      General Software Engineer role. 
      Requirements: 
      - Experience with React, Node.js, TypeScript.
      - Understanding of modern web development.
      - Good communication skills.
    `;

        const analysis = await analyzeResume(resumeText, jd);

        return NextResponse.json(analysis);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
