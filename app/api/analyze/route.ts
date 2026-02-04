import { NextRequest, NextResponse } from 'next/server';
import { analyzeResume } from '@/lib/gemini';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { resumeData, jobDescription } = body;

        if (!resumeData) {
            return NextResponse.json(
                { error: 'Resume data is required' },
                { status: 400 }
            );
        }

        // Convert resume object to a comprehensive text representation
        const resumeText = formatResumeForAnalysis(resumeData);

        // Use a default JD if none provided
        const jd = jobDescription?.trim() || `
      General Software Engineer / Technical Professional role.
      Requirements: 
      - Strong technical skills and relevant experience
      - Understanding of modern development practices
      - Good communication and problem-solving abilities
      - Ability to work in a team environment
    `;

        const analysis = await analyzeResume(resumeText, jd);

        return NextResponse.json(analysis);
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { 
                error: error.message || 'Failed to process request',
                details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
            },
            { status: 500 }
        );
    }
}

function formatResumeForAnalysis(resumeData: any): string {
    let text = '';
    
    // Personal Info
    if (resumeData.personalInfo) {
        const pi = resumeData.personalInfo;
        text += `Name: ${pi.fullName || 'Not specified'}\n`;
        text += `Email: ${pi.email || 'Not specified'}\n`;
        text += `Phone: ${pi.phone || 'Not specified'}\n`;
        if (pi.linkedin) text += `LinkedIn: ${pi.linkedin}\n`;
        if (pi.portfolio) text += `Portfolio: ${pi.portfolio}\n`;
        if (pi.summary) text += `\nSummary:\n${pi.summary}\n`;
    }
    
    // Experience
    if (resumeData.experience?.length > 0) {
        text += '\n\nPROFESSIONAL EXPERIENCE:\n';
        resumeData.experience.forEach((exp: any) => {
            text += `\n${exp.role || 'Role'} at ${exp.company || 'Company'}\n`;
            text += `${exp.startDate || 'Start'} - ${exp.endDate || 'End'}\n`;
            if (exp.description) text += `${exp.description}\n`;
        });
    }
    
    // Education
    if (resumeData.education?.length > 0) {
        text += '\n\nEDUCATION:\n';
        resumeData.education.forEach((edu: any) => {
            text += `${edu.degree || 'Degree'} - ${edu.school || 'School'} (${edu.year || 'Year'})\n`;
        });
    }
    
    // Skills
    if (resumeData.skills?.length > 0) {
        text += '\n\nSKILLS:\n';
        text += resumeData.skills.join(', ') + '\n';
    }
    
    // Projects
    if (resumeData.projects?.length > 0) {
        text += '\n\nPROJECTS:\n';
        resumeData.projects.forEach((proj: any) => {
            text += `\n${proj.title || 'Project'}\n`;
            if (proj.description) text += `${proj.description}\n`;
            if (proj.technologies) text += `Technologies: ${proj.technologies}\n`;
        });
    }
    
    return text;
}
