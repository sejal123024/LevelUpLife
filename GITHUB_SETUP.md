# 🚀 Push LevelUpLife to GitHub - Step by Step Guide

## Prerequisites
- Git installed on your computer
- GitHub account created
- Terminal/Command Prompt access

## Step 1: Initialize Git Repository (if not already done)

Open PowerShell in your project directory and run:

```powershell
cd c:\Users\rishi\Documents\LevelUpLife\LevelUpLife
git init
```

## Step 2: Configure Git (First Time Only)

Set your Git username and email:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Create .gitignore (Already Done ✅)

Your `.gitignore` file is already set up to exclude:
- `node_modules/`
- `.env` files (keeps your secrets safe!)
- Build outputs
- IDE files

## Step 4: Stage All Files

Add all files to Git:

```powershell
git add .
```

## Step 5: Create Initial Commit

```powershell
git commit -m "Initial commit: LevelUpLife - Gamified Habit Tracker with React, PHP, MySQL"
```

## Step 6: Create GitHub Repository

1. Go to https://github.com
2. Click the **+** icon (top right) → **New repository**
3. Fill in:
   - **Repository name**: `LevelUpLife` or `leveluplife-habit-tracker`
   - **Description**: "🎮 Gamified habit tracker with XP, levels, coins, and rewards. Built with React, PHP, and MySQL."
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** initialize with README (we already have one)
4. Click **Create repository**

## Step 7: Connect Local Repo to GitHub

Copy the commands from GitHub (they'll look like this):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/LevelUpLife.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 8: Push Your Code

```powershell
git push -u origin main
```

You may be prompted to log in to GitHub. Follow the authentication steps.

## Step 9: Verify Upload

1. Go to your GitHub repository URL
2. You should see all your files uploaded!
3. Check that the README.md displays nicely

## 🔐 IMPORTANT: Security Checklist

Before pushing, make sure:

- ✅ `.env` file is in `.gitignore` (already done)
- ✅ No Firebase API keys are hardcoded in source files
- ✅ No database passwords in committed files
- ✅ `.env.example` exists (template without real credentials)

## 📝 Future Updates

When you make changes, use these commands:

```powershell
# Stage changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

## 🌿 Create a .env.example File

Make sure you have a `.env.example` file (template for others):

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# API Configuration
VITE_API_BASE_URL=http://localhost/LevelUpLife/api
```

## 🎉 Success!

Your project is now on GitHub! Share the link with others:
```
https://github.com/YOUR_USERNAME/LevelUpLife
```

## 📊 Optional: Add GitHub Topics

On your GitHub repo page:
1. Click **⚙️ Settings** (or the gear icon near "About")
2. Add topics: `react`, `gamification`, `habit-tracker`, `php`, `mysql`, `tailwindcss`, `firebase`
3. This helps others discover your project!

## 🌟 Optional: Add a License

If you want to make it open source:
1. Go to your repo on GitHub
2. Click **Add file** → **Create new file**
3. Name it `LICENSE`
4. Click **Choose a license template**
5. Select MIT, Apache 2.0, or GPL (MIT is most permissive)

---

**Need Help?**
- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com
