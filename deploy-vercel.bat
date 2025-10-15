@echo off
echo ========================================
echo   Deploy Level Up Life to Vercel
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed. Proceeding...
echo.

REM Navigate to project directory
cd /d "%~dp0"

echo Current directory: %CD%
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Building your app...
echo ========================================
echo.

REM Build the app
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Build successful!
echo ========================================
echo.

echo Your app is ready to deploy!
echo.
echo Next steps:
echo.
echo Option 1 - Deploy via Vercel Website:
echo   1. Go to https://vercel.com
echo   2. Sign up with GitHub
echo   3. Click "New Project"
echo   4. Import your GitHub repository
echo   5. Click "Deploy"
echo.
echo Option 2 - Deploy via Vercel CLI:
echo   1. Install Vercel CLI: npm install -g vercel
echo   2. Login: vercel login
echo   3. Deploy: vercel --prod
echo.
echo Option 3 - Drag and Drop:
echo   1. Go to https://vercel.com
echo   2. Drag your 'dist' folder to the upload area
echo.
echo Your 'dist' folder is ready at:
echo %CD%\dist
echo.

REM Ask if user wants to open Vercel
set /p open_vercel="Open Vercel website now? (Y/N): "
if /i "%open_vercel%"=="Y" (
    start https://vercel.com
)

echo.
pause
