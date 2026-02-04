import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: Request) {
    try {
        if (!genAI || !apiKey) {
            return NextResponse.json(
                { error: 'Gemini API is not configured. Please add GEMINI_API_KEY to environment variables.' },
                { status: 500 }
            );
        }

        const { resumeData } = await req.json();

        if (!resumeData || !resumeData.personalInfo) {
            return NextResponse.json(
                { error: 'Invalid resume data' },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const experienceText = resumeData.experience
            ?.map((exp: any) => `${exp.role} at ${exp.company}`)
            .join(', ') || 'No experience listed';

        const educationText = resumeData.education
            ?.map((edu: any) => `${edu.degree} from ${edu.school}`)
            .join(', ') || 'No education listed';

        const skillsText = resumeData.skills?.join(', ') || 'No skills listed';

        const prompt = `
      Based on the following resume data, generate a powerful, professional 2-3 sentence career summary.
      Focus on key achievements and skills. Keep it concise and impactful.
      
      Resume Data:
      Name: ${resumeData.personalInfo.fullName || 'Professional'}
      Experience: ${experienceText}
      Education: ${educationText}
      Skills: ${skillsText}
      
      Return ONLY the summary text. No quotes, no markdown, no additional commentary.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ summary: text.trim() });
    } catch (error) {
        console.error('AI Generation Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate summary. Please try again.' },
            { status: 500 }
        );
    }
}
