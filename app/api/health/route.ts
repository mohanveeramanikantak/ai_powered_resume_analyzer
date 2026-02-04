import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const apiKey = process.env.GEMINI_API_KEY;

    return NextResponse.json({
        status: 'ok',
        geminiConfigured: !!apiKey,
        timestamp: new Date().toISOString(),
        message: apiKey 
            ? 'Gemini API is properly configured' 
            : 'Gemini API key is missing. Please set GEMINI_API_KEY environment variable.'
    });
}
