# PowerShell script to push LevelUpLife to GitHub
# Run this script: .\push-to-github.ps1

Write-Host "🚀 LevelUpLife - GitHub Push Script" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

# Check if Git is installed
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit
}

Write-Host "✅ Git is installed`n" -ForegroundColor Green

# Check if .env file exists (should not be committed)
if (Test-Path ".env") {
    Write-Host "✅ .env file exists (will be ignored by Git)`n" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: .env file not found. You'll need to create it after cloning.`n" -ForegroundColor Yellow
}

# Initialize Git if not already done
if (!(Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git repository initialized`n" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already initialized`n" -ForegroundColor Green
}

# Check Git configuration
$gitUser = git config user.name
$gitEmail = git config user.email

if (!$gitUser -or !$gitEmail) {
    Write-Host "⚙️  Git user not configured. Please enter your details:`n" -ForegroundColor Yellow
    $name = Read-Host "Enter your name"
    $email = Read-Host "Enter your email"
    
    git config --global user.name "$name"
    git config --global user.email "$email"
    Write-Host "`n✅ Git user configured`n" -ForegroundColor Green
} else {
    Write-Host "✅ Git user: $gitUser <$gitEmail>`n" -ForegroundColor Green
}

# Stage all files
Write-Host "📝 Staging all files..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files staged`n" -ForegroundColor Green

# Create commit
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if (!$commitMessage) {
    $commitMessage = "Initial commit: LevelUpLife - Gamified Habit Tracker"
}

Write-Host "`n💾 Creating commit..." -ForegroundColor Yellow
git commit -m "$commitMessage"
Write-Host "✅ Commit created`n" -ForegroundColor Green

# Check if remote exists
$remoteUrl = git remote get-url origin 2>$null

if (!$remoteUrl) {
    Write-Host "🔗 No remote repository configured.`n" -ForegroundColor Yellow
    Write-Host "Please follow these steps:" -ForegroundColor Cyan
    Write-Host "1. Go to https://github.com/new" -ForegroundColor White
    Write-Host "2. Create a new repository named 'LevelUpLife'" -ForegroundColor White
    Write-Host "3. DO NOT initialize with README" -ForegroundColor White
    Write-Host "`n4. Copy the repository URL (e.g., https://github.com/username/LevelUpLife.git)" -ForegroundColor White
    
    $repoUrl = Read-Host "`nEnter your GitHub repository URL"
    
    if ($repoUrl) {
        git remote add origin $repoUrl
        git branch -M main
        Write-Host "`n✅ Remote repository configured`n" -ForegroundColor Green
    } else {
        Write-Host "`n❌ No URL provided. Exiting." -ForegroundColor Red
        exit
    }
} else {
    Write-Host "✅ Remote repository: $remoteUrl`n" -ForegroundColor Green
}

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully pushed to GitHub! 🎉`n" -ForegroundColor Green
    Write-Host "Your repository is now live at:" -ForegroundColor Cyan
    Write-Host "$remoteUrl`n" -ForegroundColor White
} else {
    Write-Host "`n❌ Push failed. Please check the error above.`n" -ForegroundColor Red
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "- Authentication required (use GitHub Personal Access Token)" -ForegroundColor White
    Write-Host "- Repository doesn't exist on GitHub" -ForegroundColor White
    Write-Host "- Network connection issues`n" -ForegroundColor White
}

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
