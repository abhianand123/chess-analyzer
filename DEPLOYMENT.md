# FreeChess Deployment Guide

## Best Option: Railway

### Prerequisites
1. GitHub account
2. Railway account (free at https://railway.app/)

### Deployment Steps

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Railway**
   - Go to https://railway.app/
   - Sign up with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Environment Variables**
   - In Railway dashboard, go to your project
   - Click on "Variables" tab
   - Add:
     ```
     PORT=3000
     RECAPTCHA_SECRET=<your-secret-if-needed>
     NODE_ENV=production
     ```

4. **Set Build Command**
   - Go to Settings
   - Build Command: `npm install && npm run build`
   - Start Command: `node dist/index.js`

5. **Deploy**
   - Railway will automatically deploy
   - Get your public URL from the dashboard

### Alternative: Render

#### Option 1: Using render.yaml (Recommended)

1. **Sign up** at https://render.com/
2. **New Web Service** → Connect GitHub repo
3. Render will automatically detect the `render.yaml` file and configure everything
4. **Optional: Add Environment Variables** (if needed):
   - Go to Environment tab
   - Add `RECAPTCHA_SECRET` (if you want CAPTCHA protection)
   - Note: `PORT` and `NODE_ENV` are auto-configured by render.yaml

#### Option 2: Manual Configuration

1. **Sign up** at https://render.com/
2. **New Web Service** → Connect GitHub repo
3. **Configure:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start` (or `node dist/index.js`)
   - Environment: `Node`
4. **Add Environment Variables:**
   - PORT (will be auto-set by Render, but your app defaults to 3000 if not set)
   - RECAPTCHA_SECRET (optional, only if needed)

### Notes
- Make sure `.env` file is NOT committed to GitHub (add to `.gitignore`)
- Railway and Render both handle SSL/HTTPS automatically
- Free tiers may have some limitations (sleeping after inactivity, etc.)

