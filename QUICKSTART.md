# 🚀 Quick Start Guide

Get your AI Resume Analyzer running in 5 minutes!

## ⚡ Super Fast Setup

### 1. Prerequisites Check

```bash
# Check Node.js version (need 18+)
node --version

# Check npm version
npm --version
```

If you don't have Node.js 18+, [download it here](https://nodejs.org).

### 2. Clone & Install (2 minutes)

```bash
# Clone the repository
git clone <your-repo-url>
cd ai_powered_resume_analyzer

# Install dependencies
npm install
```

### 3. Get Your API Key (1 minute)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

### 4. Setup Environment (1 minute)

```bash
# Create environment file
cp .env.example .env.local
```

Edit `.env.local` and paste your API key:

```env
GEMINI_API_KEY=your_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 5. Launch! (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## ✅ Quick Validation

Test if everything works:

```bash
# In a new terminal, run:
npm run test:api
```

You should see all tests passing ✓

---

## 🎯 First Steps

1. **Create Account**: Click "Sign Up" and create a test account
2. **Build Resume**: Go to "Build Resume"
3. **Choose Template**: Select your favorite template
4. **Add Info**: Fill in your details
5. **Try AI**: Click "Generate with AI" for the summary
6. **Analyze**: Scroll down and click "Run AI Audit"
7. **Export**: Click "Download PDF" when done

---

## 🐛 Troubleshooting

### "GEMINI_API_KEY is not set"
- Make sure `.env.local` exists in the root folder
- Restart the dev server after creating `.env.local`

### "Port 3000 already in use"
```bash
# Use different port
PORT=3001 npm run dev
```

### Module errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Next Steps

- Read [SETUP.md](SETUP.md) for detailed setup
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guide
- See [FEATURES.md](FEATURES.md) for all features

---

## 🆘 Need Help?

- Check the [README.md](README.md)
- Open an issue on GitHub
- Review error messages in console

---

**You're all set! Happy building! 🚀**
