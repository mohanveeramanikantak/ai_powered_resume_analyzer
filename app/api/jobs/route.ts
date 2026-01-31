import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function POST(req: NextRequest) {
    try {
        const { resumeData } = await req.json();

        const prompt = `
      Act as a Career Coach using RAG (Retrieval Augmented Generation) logic.
      Based on the following resume data, search your internal knowledge base for 6 highly relevant, specific job roles and companies that would be a great fit.
      
      Resume Data:
      ${JSON.stringify(resumeData)}

      Return the result as a JSON object with a "jobs" array. Each job should look like:
      {
        "title": "Role Title",
        "company": "Company Name (real or realistic industry leaders)",
        "location": "City, Country (or Remote)",
        "type": "Full-time",
        "matchScore": 95,
        "reasonReason": "Why this is a good fit..."
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return NextResponse.json(JSON.parse(jsonStr));
    } catch (error) {
        console.error('Job Match Error:', error);
        return NextResponse.json({ jobs: [] });
    }
}
