@echo off
echo ========================================
echo   Push Level Up Life to GitHub
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo Git is installed. Proceeding...
echo.

REM Navigate to project directory
cd /d "%~dp0"

echo Current directory: %CD%
echo.

REM Check if already a git repository
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo.
)

REM Configure Git (if not configured)
git config user.name >nul 2>&1
if errorlevel 1 (
    echo.
    echo Git is not configured. Let's set it up!
    echo.
    set /p git_name="Enter your name: "
    set /p git_email="Enter your email: "
    
    git config --global user.name "!git_name!"
    git config --global user.email "!git_email!"
    
    echo.
    echo Git configured successfully!
    echo.
)

REM Show current status
echo Checking file status...
echo.
git status
echo.

REM Add all files
echo Adding all files to Git...
git add .
echo.

REM Get commit message
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Initial commit: Level Up Life - Gamified Productivity App

echo.
echo Committing changes...
git commit -m "%commit_msg%"
echo.

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ========================================
    echo   GitHub Repository Setup
    echo ========================================
    echo.
    echo Before continuing, please:
    echo 1. Go to https://github.com/new
    echo 2. Create a new repository named: LevelUpLife
    echo 3. Do NOT initialize with README
    echo 4. Copy the repository URL
    echo.
    echo Example URL: https://github.com/YOUR_USERNAME/LevelUpLife.git
    echo.
    set /p repo_url="Paste your GitHub repository URL here: "
    
    if not "!repo_url!"=="" (
        echo.
        echo Adding remote origin...
        git remote add origin !repo_url!
        echo Remote added successfully!
        echo.
    ) else (
        echo.
        echo No URL provided. You can add it later with:
        echo git remote add origin YOUR_REPO_URL
        echo.
        pause
        exit /b 0
    )
) else (
    echo Remote origin already exists.
    echo.
)

REM Rename branch to main
echo Renaming branch to main...
git branch -M main
echo.

REM Push to GitHub
echo ========================================
echo   Pushing to GitHub...
echo ========================================
echo.

git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo   Push Failed!
    echo ========================================
    echo.
    echo This might be because:
    echo 1. You need to authenticate with GitHub
    echo 2. The repository doesn't exist
    echo 3. You don't have permission
    echo.
    echo To authenticate, you may need a Personal Access Token:
    echo 1. Go to: https://github.com/settings/tokens
    echo 2. Generate new token (classic)
    echo 3. Select 'repo' scope
    echo 4. Use token as password when prompted
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS!
echo ========================================
echo.
echo Your project has been pushed to GitHub!
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Verify all files are there
echo 3. Deploy to Vercel from GitHub
echo.
pause
