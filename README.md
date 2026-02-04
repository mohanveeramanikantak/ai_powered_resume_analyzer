# 🚀 AI-Powered Resume Analyzer Platform

A modern, AI-powered resume building and analysis platform built with Next.js 14, TypeScript, and Google Gemini AI. Create professional resumes, get instant AI feedback, and discover personalized job matches.

## ✨ Features

### 🎨 Resume Builder
- **6 Professional Templates**: Classic, Modern, Minimal, Professional, Creative, and Executive
- **Real-time Preview**: See changes instantly with live preview
- **Auto-save**: Never lose your work with automatic saving every 10 seconds
- **PDF Export**: Download your resume as a professional PDF
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🤖 AI-Powered Features
- **Resume Analysis**: Get instant ATS compatibility scores and detailed feedback
- **Smart Summary Generation**: AI-generated professional summaries
- **Content Enhancement**: Improve job descriptions and project details with AI
- **Skill Suggestions**: Get AI-recommended skills based on your profile
- **Job Matching**: Find personalized job opportunities with RAG-powered matching

### 📊 Dashboard
- **Resume Management**: Save and manage multiple resumes
- **Credit System**: Track AI feature usage
- **Analytics**: View resume performance scores

### 🔒 Authentication
- Simple email-based authentication
- Secure session management
- Credit-based AI feature access

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **AI**: Google Gemini 1.5 Flash
- **Icons**: Lucide React
- **PDF Generation**: react-to-print

## 📋 Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai_powered_resume_analyzer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

**Important**: Replace `your_gemini_api_key_here` with your actual Gemini API key.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ai_powered_resume_analyzer/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── analyze/              # Resume analysis endpoint
│   │   ├── generateSummary/      # AI summary generation
│   │   ├── jobs/                 # Job matching endpoint
│   │   ├── enhance/              # Text enhancement endpoint
│   │   ├── suggestSkills/        # Skill suggestions
│   │   └── health/               # Health check endpoint
│   ├── builder/                  # Resume builder page
│   ├── dashboard/                # User dashboard
│   ├── jobs/                     # Job matching page
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   ├── profile/                  # User profile
│   └── samples/                  # Sample resumes
├── components/                   # React components
│   ├── auth/                     # Authentication components
│   ├── builder/                  # Resume builder components
│   ├── landing/                  # Landing page components
│   └── layout/                   # Layout components
├── context/                      # React context providers
│   ├── AuthContext.tsx           # Authentication context
│   └── ResumeContext.tsx         # Resume data context
├── lib/                          # Utility libraries
│   └── gemini.ts                 # Gemini AI integration
└── public/                       # Static assets
```

## 🔑 API Endpoints

### POST `/api/analyze`
Analyzes resume against job description
- **Body**: `{ resumeData, jobDescription }`
- **Returns**: Match score, strengths, improvements, missing keywords

### POST `/api/generateSummary`
Generates AI-powered professional summary
- **Body**: `{ resumeData }`
- **Returns**: Generated summary text

### POST `/api/jobs`
Finds matching job opportunities
- **Body**: `{ resumeData, searchQuery, location, jobType }`
- **Returns**: Array of matched jobs with scores

### POST `/api/enhance`
Enhances text content with AI
- **Body**: `{ text, type }`
- **Returns**: Improved text

### POST `/api/suggestSkills`
Suggests relevant skills
- **Body**: `{ resumeData }`
- **Returns**: Array of skill suggestions

### GET `/api/health`
Health check endpoint
- **Returns**: API status and configuration

## 🚢 Deployment

### Deploy on Render

1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your repository
4. Set environment variables:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `NODE_ENV`: production
5. Deploy!

### Deploy on Vercel

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard.

## 🧪 Testing API Endpoints

Test the health endpoint:
```bash
curl http://localhost:3000/api/health
```

Test resume analysis:
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"resumeData": {...}, "jobDescription": "..."}'
```

## 🎯 Features Roadmap

- [x] Resume Builder with 6 templates
- [x] AI Resume Analysis
- [x] AI Summary Generation
- [x] Job Matching with RAG
- [x] PDF Export
- [x] Auto-save functionality
- [x] Text Enhancement
- [x] Skill Suggestions
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real job board API integration
- [ ] Email notifications
- [ ] Resume version control
- [ ] Collaborative editing
- [ ] Interview preparation tips
- [ ] Cover letter generator

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check that your `GEMINI_API_KEY` is properly set
2. Ensure you're using Node.js 18+
3. Clear your browser cache and local storage
4. Check the console for error messages

For additional help, please open an issue on GitHub.

## 🙏 Acknowledgments

- Google Gemini AI for powerful AI capabilities
- Next.js team for the amazing framework
- Lucide for beautiful icons
- All contributors and users

---

Built with ❤️ using Next.js and Google Gemini AI
