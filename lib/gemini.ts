import { GoogleGenerativeAI } from '@google/generative-ai';

// Validate API key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }) : null;

export async function analyzeResume(resumeText: string, jobDescription: string) {
    if (!model || !apiKey) {
        throw new Error('Gemini API is not configured. Please add GEMINI_API_KEY to your environment variables.');
    }

    const prompt = `
    Act as a senior technical recruiter and resume expert. 
    Analyze the following resume against the provided job description.
    
    Resume Content:
    ${resumeText}

    Job Description:
    ${jobDescription}

    Provide the output ONLY as valid JSON with the following structure (no markdown, no additional text):
    {
      "matchScore": number (0-100),
      "analysis": "Short summary of the fit in 2-3 sentences",
      "missingKeywords": ["keyword1", "keyword2", "keyword3"],
      "improvements": ["suggestion1", "suggestion2", "suggestion3"],
      "strengths": ["strength1", "strength2", "strength3"]
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean up the response to extract JSON
        let jsonStr = text.trim();
        
        // Remove markdown code blocks
        jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        
        // Remove any leading/trailing whitespace
        jsonStr = jsonStr.trim();
        
        // Parse and validate the JSON
        const parsedData = JSON.parse(jsonStr);
        
        // Validate required fields
        if (!parsedData.matchScore || !parsedData.analysis) {
            throw new Error('Invalid response format from AI');
        }
        
        return {
            matchScore: parsedData.matchScore,
            analysis: parsedData.analysis,
            missingKeywords: parsedData.missingKeywords || [],
            improvements: parsedData.improvements || [],
            strengths: parsedData.strengths || []
        };
    } catch (error) {
        console.error('Error analyzing resume:', error);
        if (error instanceof SyntaxError) {
            throw new Error('Failed to parse AI response. Please try again.');
        }
        throw new Error('Failed to analyze resume. Please check your API key and try again.');
    }
}
