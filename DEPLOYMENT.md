# 🚀 Deployment Guide for AI Resume Analyzer

This guide covers deploying the application to various platforms.

## Table of Contents
- [Render Deployment](#render-deployment)
- [Vercel Deployment](#vercel-deployment)
- [Railway Deployment](#railway-deployment)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

---

## 🔷 Render Deployment

### Prerequisites
- GitHub account with your code pushed
- Render account ([sign up here](https://render.com))
- Gemini API key

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Create Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: ai-resume-analyzer
     - **Environment**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Add Environment Variables**
   - In the Render dashboard, go to Environment tab
   - Add:
     ```
     GEMINI_API_KEY=your_actual_gemini_api_key
     NODE_ENV=production
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build and deployment (5-10 minutes)
   - Your app will be live at: `https://your-app-name.onrender.com`

### Render Configuration File
The project includes a `render.yaml` for automated deployments:

```yaml
services:
  - type: web
    name: ai-resume-analyzer
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: GEMINI_API_KEY
        sync: false
```

---

## 🔶 Vercel Deployment

### Prerequisites
- Vercel account ([sign up here](https://vercel.com))
- Vercel CLI (optional)

### Method 1: Vercel Dashboard

1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your Git repository

2. **Configure Project**
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

3. **Environment Variables**
   - Add:
     ```
     GEMINI_API_KEY=your_actual_gemini_api_key
     NODE_ENV=production
     ```

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at: `https://your-app-name.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add GEMINI_API_KEY
# Paste your API key when prompted

# Deploy to production
vercel --prod
```

---

## 🔷 Railway Deployment

### Prerequisites
- Railway account ([sign up here](https://railway.app))
- GitHub repository

### Steps

1. **Create New Project**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Configure**
   - Railway auto-detects Next.js
   - Go to Variables tab
   - Add:
     ```
     GEMINI_API_KEY=your_actual_gemini_api_key
     NODE_ENV=production
     ```

3. **Deploy**
   - Railway automatically builds and deploys
   - Get your URL from Settings → Domains

---

## 🔑 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSyC...` |
| `NODE_ENV` | Environment mode | `production` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Public app URL | Auto-detected |

### Getting Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key and keep it secure

---

## ✅ Post-Deployment Checklist

### 1. Test Health Endpoint
```bash
curl https://your-app-url.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "geminiConfigured": true,
  "timestamp": "...",
  "message": "Gemini API is properly configured"
}
```

### 2. Test Main Features
- ✅ Create a new resume
- ✅ Generate AI summary
- ✅ Run resume analysis
- ✅ Find job matches
- ✅ Export PDF
- ✅ Save and load resumes

### 3. Performance Optimization
- Enable caching in your platform settings
- Monitor API usage in Google AI Studio
- Check error logs regularly

### 4. Security
- ✅ API key is not exposed in client code
- ✅ Environment variables are properly set
- ✅ HTTPS is enabled (automatic on most platforms)
- ✅ CORS is properly configured

---

## 🐛 Troubleshooting

### "Gemini API is not configured"
**Solution**: Ensure `GEMINI_API_KEY` environment variable is set correctly in your deployment platform.

### Build Fails
**Solutions**:
1. Check Node.js version (should be 18+)
2. Verify all dependencies are in `package.json`
3. Clear build cache and redeploy

### API Requests Fail
**Solutions**:
1. Check API key quota in Google AI Studio
2. Verify API key has correct permissions
3. Check network/firewall settings

### Slow Performance
**Solutions**:
1. Upgrade to paid tier on deployment platform
2. Optimize images and assets
3. Enable caching
4. Consider using CDN

---

## 📊 Monitoring

### Render
- View logs: Dashboard → Logs
- Metrics: Dashboard → Metrics

### Vercel
- Analytics: Dashboard → Analytics
- Logs: Dashboard → Deployments → View Function Logs

### Railway
- Logs: Project → Deployments → View Logs
- Metrics: Project → Metrics

---

## 🔄 Continuous Deployment

All platforms support automatic deployments:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update features"
   git push origin main
   ```

2. **Automatic Build**
   - Platform detects push
   - Builds and deploys automatically
   - No manual intervention needed

---

## 💰 Cost Considerations

### Render Free Tier
- ✅ Free for basic apps
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ 750 hours/month limit

### Vercel Free Tier
- ✅ 100 GB bandwidth/month
- ✅ No sleep
- ⚠️ Build time limits

### Railway Free Tier
- ✅ $5 credit/month
- ⚠️ Pay-as-you-go after credit

### Gemini API
- ✅ Free tier: 15 requests/minute
- ✅ 1 million tokens/day free
- For production: Consider paid tier

---

## 🎯 Production Tips

1. **Rate Limiting**: Implement rate limiting for API endpoints
2. **Caching**: Cache AI responses for common queries
3. **Error Tracking**: Use Sentry or similar service
4. **Analytics**: Add Google Analytics or Plausible
5. **Backup**: Regular database backups (when implemented)
6. **Monitoring**: Set up uptime monitoring (e.g., UptimeRobot)

---

## 🆘 Support

If you encounter issues:
1. Check platform status pages
2. Review deployment logs
3. Test locally first: `npm run build && npm start`
4. Check GitHub issues
5. Contact platform support

---

**Happy Deploying! 🚀**
