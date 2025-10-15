@echo off
echo ========================================
echo   Level Up Life - Push to GitHub
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
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

REM Show status
echo Checking file status...
git status
echo.

REM Prompt for commit message
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update: Level Up Life project

echo.
echo Adding files to Git...
git add .

echo.
echo Committing changes...
git commit -m "%commit_msg%"

echo.
echo ========================================
echo   Ready to push to GitHub!
echo ========================================
echo.
echo Before pushing, make sure you have:
echo 1. Created a repository on GitHub
echo 2. Copied the repository URL
echo.
set /p repo_url="Enter your GitHub repository URL (or press Enter to skip): "

if not "%repo_url%"=="" (
    echo.
    echo Adding remote origin...
    git remote remove origin 2>nul
    git remote add origin %repo_url%
    
    echo.
    echo Renaming branch to main...
    git branch -M main
    
    echo.
    echo Pushing to GitHub...
    git push -u origin main
    
    echo.
    echo ========================================
    echo   SUCCESS! Project pushed to GitHub!
    echo ========================================
) else (
    echo.
    echo Skipped pushing. To push manually, run:
    echo   git remote add origin YOUR_REPO_URL
    echo   git branch -M main
    echo   git push -u origin main
)

echo.
pause
