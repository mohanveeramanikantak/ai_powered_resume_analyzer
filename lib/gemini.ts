import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function analyzeResume(resumeText: string, jobDescription: string) {
    const prompt = `
    Act as a senior technical recruiter and resume expert. 
    Analyze the following resume against the provided job description.
    
    Resume Content:
    ${resumeText}

    Job Description:
    ${jobDescription}

    Provide the output in JSON format with the following structure:
    {
      "matchScore": number (0-100),
      "analysis": "Short summary of the fit",
      "missingKeywords": ["keyword1", "keyword2"],
      "improvements": ["suggestion1", "suggestion2"],
      "strengths": ["strength1", "strength2"]
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Basic cleanup to ensure JSON is parsed if model returns markdown ticks
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('Error analyzing resume:', error);
        throw new Error('Failed to analyze resume');
    }
}
