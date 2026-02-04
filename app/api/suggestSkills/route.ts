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

        const { resumeData } = await req.json();

        if (!resumeData) {
            return NextResponse.json(
                { error: 'Resume data is required' },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const skills = resumeData.skills?.join(', ') || 'your skills';
        const experience = resumeData.experience?.[0]?.role || 'your experience';

        const prompt = `
Generate a list of 10 relevant technical skills and tools that would complement this professional profile.
Consider current industry trends and in-demand technologies.

Current Profile:
- Experience: ${experience}
- Current Skills: ${skills}

Return ONLY a JSON array of strings (skill names), no additional text or markdown.
Example format: ["React", "Node.js", "Docker", ...]
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().trim();

        // Clean up response
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        try {
            const suggestions = JSON.parse(text);
            
            if (!Array.isArray(suggestions)) {
                throw new Error('Invalid response format');
            }

            return NextResponse.json({ skills: suggestions });
        } catch (parseError) {
            console.error('Failed to parse AI response:', parseError);
            return NextResponse.json({
                skills: ['JavaScript', 'Python', 'Cloud Computing', 'DevOps', 'Git']
            });
        }
    } catch (error: any) {
        console.error('Skill Suggestion Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate skill suggestions' },
            { status: 500 }
        );
    }
}
