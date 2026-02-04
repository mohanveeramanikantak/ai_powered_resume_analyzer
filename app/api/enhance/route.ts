import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: NextRequest) {
    try {
        if (!genAI || !apiKey) {
            return NextResponse.json(
                { error: 'Gemini API is not configured' },
                { status: 500 }
            );
        }

        const { text, type } = await req.json();

        if (!text) {
            return NextResponse.json(
                { error: 'Text is required' },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        let prompt = '';
        
        if (type === 'experience') {
            prompt = `
Improve and enhance the following work experience description for a resume.
Make it more impactful, quantifiable, and ATS-friendly.
Use action verbs and focus on achievements.
Keep it professional and concise (3-5 bullet points).

Original text:
${text}

Return ONLY the improved text without any additional commentary or quotes.
Format as bullet points starting with •
`;
        } else if (type === 'summary') {
            prompt = `
Improve the following professional summary for a resume.
Make it more compelling, concise, and highlight key strengths.
Keep it to 2-3 sentences.

Original text:
${text}

Return ONLY the improved text without any additional commentary or quotes.
`;
        } else if (type === 'project') {
            prompt = `
Enhance the following project description for a resume.
Make it more technical, highlight the impact, and emphasize skills used.
Keep it professional and concise (2-3 sentences).

Original text:
${text}

Return ONLY the improved text without any additional commentary or quotes.
`;
        } else {
            return NextResponse.json(
                { error: 'Invalid type. Use: experience, summary, or project' },
                { status: 400 }
            );
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const improvedText = response.text().trim();

        return NextResponse.json({ improved: improvedText });
    } catch (error: any) {
        console.error('AI Enhancement Error:', error);
        return NextResponse.json(
            { error: 'Failed to enhance text' },
            { status: 500 }
        );
    }
}
