import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const { resumeData } = await req.json();

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

        const prompt = `
      Based on the following resume data, generate a powerful, professional 2-3 sentence career summary.
      Focus on key achievements and skills. Keep it concise and impactful.
      
      Resume Data:
      Name: ${resumeData.personalInfo.fullName}
      Experience: ${JSON.stringify(resumeData.experience)}
      Education: ${JSON.stringify(resumeData.education)}
      Skills: ${resumeData.skills.join(', ')}
      
      Return ONLY the summary text. No other commentary.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ summary: text.trim() });
    } catch (error) {
        console.error('AI Generation Error:', error);
        return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
    }
}
