# 🔧 Development Setup Guide

Complete guide for setting up your local development environment.

## Prerequisites

### Required Software
- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org))
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com))
- A code editor (VS Code recommended)

### Required API Keys
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd ai_powered_resume_analyzer
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 16.1.6
- React 19.2.3
- TypeScript 5.x
- Google Generative AI SDK
- Lucide React (icons)
- react-to-print
- And more...

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Copy from example
cp .env.example .env.local
```

Edit `.env.local` and add your actual API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

**Important**: 
- Never commit `.env.local` to version control
- Keep your API keys secure
- Don't share API keys publicly

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure Explained

```
ai_powered_resume_analyzer/
│
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes (Backend)
│   │   ├── analyze/          # Resume analysis endpoint
│   │   ├── generateSummary/  # AI summary generation
│   │   ├── jobs/             # Job matching
│   │   ├── enhance/          # Text enhancement
│   │   ├── suggestSkills/    # Skill suggestions
│   │   └── health/           # Health check
│   │
│   ├── builder/              # Resume builder page
│   ├── dashboard/            # User dashboard
│   ├── jobs/                 # Job matching page
│   ├── login/                # Authentication
│   ├── signup/               # Registration
│   ├── profile/              # User profile
│   ├── samples/              # Sample resumes
│   │
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   ├── loading.tsx           # Loading state
│   ├── error.tsx             # Error handling
│   └── not-found.tsx         # 404 page
│
├── components/               # React Components
│   ├── auth/                 # Auth components
│   ├── builder/              # Resume builder components
│   │   ├── AIAnalyzer.tsx    # AI analysis component
│   │   ├── ResumeForm.tsx    # Form inputs
│   │   ├── ResumePreview.tsx # Live preview
│   │   └── TemplateSelector.tsx # Template chooser
│   ├── landing/              # Landing page sections
│   └── layout/               # Layout components
│       └── Navbar.tsx        # Navigation bar
│
├── context/                  # React Context (State Management)
│   ├── AuthContext.tsx       # User authentication state
│   └── ResumeContext.tsx     # Resume data state
│
├── lib/                      # Utility Libraries
│   └── gemini.ts             # Gemini AI integration
│
├── public/                   # Static assets
│
├── scripts/                  # Build scripts
│   └── dev.js                # Development script
│
├── .env.local                # Environment variables (YOU CREATE THIS)
├── .env.example              # Example env file
├── .gitignore                # Git ignore rules
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies
├── README.md                 # Project overview
├── DEPLOYMENT.md             # Deployment guide
└── SETUP.md                  # This file
```

---

## 🔧 Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev

# Runs on http://localhost:3000
```

### Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Linting

```bash
# Check code quality
npm run lint
```

---

## 🧪 Testing the Application

### 1. Test Health Endpoint

Open a new terminal and run:

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "geminiConfigured": true,
  "timestamp": "2026-02-04T...",
  "message": "Gemini API is properly configured"
}
```

### 2. Test Resume Analysis

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "resumeData": {
      "personalInfo": {"fullName": "Test User"},
      "skills": ["JavaScript", "React"],
      "experience": [],
      "education": []
    },
    "jobDescription": "Looking for a React developer"
  }'
```

### 3. Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Can navigate to /builder
- [ ] Can create a new resume
- [ ] Resume preview updates in real-time
- [ ] Can add/remove experience entries
- [ ] Can add/remove skills
- [ ] AI summary generation works
- [ ] Resume analysis works
- [ ] Job matching works
- [ ] Can change templates
- [ ] Can export PDF
- [ ] Auto-save works
- [ ] Login/Signup works

---

## 🐛 Common Issues & Solutions

### Issue: "Module not found"

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 3000 already in use"

**Solution**:
```bash
# Use a different port
PORT=3001 npm run dev
```

Or kill the process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Issue: "GEMINI_API_KEY is not set"

**Solution**:
1. Ensure `.env.local` file exists
2. Check file has correct variable name
3. Restart development server
4. Verify API key is valid

### Issue: TypeScript errors

**Solution**:
```bash
# Regenerate types
npx next telemetry disable
rm -rf .next
npm run dev
```

### Issue: Build fails

**Solution**:
```bash
# Check TypeScript
npx tsc --noEmit

# Check Next.js config
npm run build -- --debug
```

---

## 🎨 Customization Guide

### Changing Colors

Edit `app/globals.css`:

```css
:root {
  --primary: #6366f1;      /* Main brand color */
  --secondary: #ec4899;     /* Accent color */
  --background: #050505;    /* Background */
}
```

### Adding New Templates

1. Create template component in `components/builder/templates/`
2. Add to `ResumePreview.tsx`
3. Update template selector

### Adding New Features

1. Create API route in `app/api/<feature>/route.ts`
2. Create UI component in `components/`
3. Update context if needed
4. Test thoroughly

---

## 📚 Key Technologies

### Next.js 14 (App Router)
- Server-side rendering
- API routes
- File-based routing
- Automatic code splitting

### TypeScript
- Type safety
- Better IDE support
- Fewer runtime errors

### Google Gemini AI
- Resume analysis
- Content generation
- Job matching
- Text enhancement

### CSS Modules
- Scoped styles
- No conflicts
- Better maintainability

---

## 🔐 Security Best Practices

1. **Never commit API keys**
   - Use `.env.local` for secrets
   - Add to `.gitignore`

2. **Validate all inputs**
   - Sanitize user data
   - Check API responses

3. **Rate limiting**
   - Implement in production
   - Protect API endpoints

4. **HTTPS only**
   - Required in production
   - Automatic on Vercel/Render

---

## 📝 Code Style Guidelines

### TypeScript

```typescript
// Use interfaces for objects
interface ResumeData {
    personalInfo: PersonalInfo;
    skills: string[];
}

// Use type for unions/primitives
type Status = 'loading' | 'success' | 'error';

// Always type function parameters
function analyzeResume(data: ResumeData): Promise<Analysis> {
    // ...
}
```

### React Components

```typescript
// Use functional components
export default function MyComponent() {
    // Hooks at top
    const [state, setState] = useState();
    
    // Early returns
    if (!data) return <Loading />;
    
    // Main render
    return <div>...</div>;
}
```

### CSS Modules

```typescript
// Import styles
import styles from './Component.module.css';

// Use with className
<div className={styles.container}>
```

---

## 🚀 Performance Tips

1. **Use React.memo** for expensive components
2. **Lazy load** heavy components
3. **Optimize images** (use Next.js Image)
4. **Code splitting** (automatic with Next.js)
5. **Cache API responses** when possible

---

## 🆘 Getting Help

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Gemini AI Documentation](https://ai.google.dev/docs)

### Community
- Stack Overflow
- GitHub Issues
- Discord/Slack communities

---

## ✅ Pre-Development Checklist

Before starting development:

- [ ] Node.js 18+ installed
- [ ] Git configured
- [ ] Code editor setup (VS Code recommended)
- [ ] Gemini API key obtained
- [ ] `.env.local` file created
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm run dev`)
- [ ] Health endpoint returns success
- [ ] Familiar with project structure

---

**Happy Coding! 💻**
