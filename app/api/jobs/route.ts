import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: NextRequest) {
    try {
        if (!genAI || !apiKey) {
            return NextResponse.json({
                error: 'Gemini API is not configured',
                jobs: []
            }, { status: 500 });
        }

        const { resumeData, searchQuery, location, jobType } = await req.json();

        if (!resumeData) {
            return NextResponse.json({
                error: 'Resume data is required',
                jobs: []
            }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Build context from resume
        const skills = resumeData.skills?.join(', ') || 'General skills';
        const experience = resumeData.experience?.map((exp: any) => 
            `${exp.role} at ${exp.company}`
        ).join(', ') || 'Entry level';
        const education = resumeData.education?.map((edu: any) => 
            `${edu.degree} from ${edu.school}`
        ).join(', ') || 'Education not specified';

        const prompt = `
      Act as a Career Coach and Job Matching AI using RAG (Retrieval Augmented Generation) logic.
      Based on the following resume data and search criteria, generate 6 highly relevant job opportunities.
      
      Resume Profile:
      - Skills: ${skills}
      - Experience: ${experience}
      - Education: ${education}
      ${searchQuery ? `- Job Search Query: ${searchQuery}` : ''}
      ${location ? `- Preferred Location: ${location}` : ''}
      ${jobType && jobType !== 'all' ? `- Job Type: ${jobType}` : ''}

      Generate realistic job opportunities from real or well-known companies in the relevant industries.
      Return ONLY a valid JSON object (no markdown, no extra text) with this exact structure:
      {
        "jobs": [
          {
            "title": "Specific Role Title",
            "company": "Real Company Name",
            "location": "City, Country or Remote",
            "type": "Full-time",
            "matchScore": 95,
            "reason": "Detailed explanation of why this is an excellent fit based on skills and experience",
            "salary": "$XX,XXX - $YY,YYY",
            "posted": "2 days ago",
            "skills": ["skill1", "skill2", "skill3"]
          }
        ]
      }
      
      Generate exactly 6 diverse job opportunities with match scores ranging from 75-98.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up response
        text = text.trim()
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        try {
            const parsedData = JSON.parse(text);
            
            // Validate and ensure we have jobs array
            if (!parsedData.jobs || !Array.isArray(parsedData.jobs)) {
                throw new Error('Invalid response format');
            }

            // Ensure all jobs have required fields
            const validatedJobs = parsedData.jobs.map((job: any) => ({
                title: job.title || 'Position Available',
                company: job.company || 'Company',
                location: job.location || 'Location TBD',
                type: job.type || 'Full-time',
                matchScore: job.matchScore || 75,
                reason: job.reason || job.reasonReason || 'Good match based on your profile',
                salary: job.salary || null,
                posted: job.posted || 'Recently',
                skills: job.skills || []
            }));

            return NextResponse.json({ jobs: validatedJobs });
        } catch (parseError) {
            console.error('Failed to parse AI response:', parseError);
            // Return empty array rather than failing completely
            return NextResponse.json({ jobs: [] });
        }
    } catch (error) {
        console.error('Job Match Error:', error);
        return NextResponse.json({
            error: 'Failed to fetch job matches',
            jobs: []
        }, { status: 500 });
    }
}
