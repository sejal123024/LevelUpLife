# Node.js Installation Guide

## ⚠️ Error: npm is not recognized

This error means Node.js is not installed or not in your system PATH.

---

## 🔧 Solution: Install Node.js

### Option 1: Download and Install (Recommended)

1. **Download Node.js**
   - Go to: https://nodejs.org/
   - Download the **LTS version** (Long Term Support)
   - Choose Windows Installer (.msi) - 64-bit

2. **Run the Installer**
   - Double-click the downloaded file
   - Click "Next" through the installation wizard
   - ✅ Make sure "Add to PATH" is checked
   - Click "Install"
   - Wait for installation to complete
   - Click "Finish"

3. **Verify Installation**
   - Open a **NEW** Command Prompt or PowerShell window
   - Run these commands:
   ```bash
   node --version
   # Should show: v18.x.x or higher
   
   npm --version
   # Should show: 9.x.x or higher
   ```

4. **If Still Not Working**
   - Restart your computer
   - Open a new terminal
   - Try the commands again

---

### Option 2: Using Chocolatey (Windows Package Manager)

If you have Chocolatey installed:

```bash
choco install nodejs-lts
```

---

### Option 3: Using Winget (Windows 10/11)

```bash
winget install OpenJS.NodeJS.LTS
```

---

## 🚀 After Installing Node.js

1. **Close ALL terminal windows**
2. **Open a NEW terminal** (Command Prompt or PowerShell)
3. **Navigate to project directory**:
   ```bash
   cd c:\xampp\htdocs\LevelUpLife
   ```

4. **Install project dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## ✅ Verification Checklist

Before running the project, verify:

- [ ] Node.js is installed (v18 or higher)
- [ ] npm is installed (v9 or higher)
- [ ] You've opened a NEW terminal after installation
- [ ] You're in the correct directory: `c:\xampp\htdocs\LevelUpLife`
- [ ] XAMPP is running (Apache + MySQL)
- [ ] Database is imported

---

## 🔍 Troubleshooting

### "npm is not recognized" after installation

**Solution**: 
1. Close ALL terminal windows
2. Restart your computer
3. Open a new terminal
4. Try again

### Node.js installed but still not working

**Check PATH manually**:
1. Press `Win + R`
2. Type `sysdm.cpl` and press Enter
3. Go to "Advanced" tab
4. Click "Environment Variables"
5. Under "System variables", find "Path"
6. Verify these paths exist:
   - `C:\Program Files\nodejs\`
   - `C:\Users\YourUsername\AppData\Roaming\npm`
7. If missing, add them manually
8. Click OK and restart terminal

### Permission errors during npm install

**Run as Administrator**:
1. Right-click on Command Prompt or PowerShell
2. Select "Run as administrator"
3. Navigate to project directory
4. Run `npm install`

---

## 📦 What npm install does

When you run `npm install`, it will install these packages:

### Core Dependencies
- react & react-dom (UI framework)
- react-router-dom (navigation)
- firebase (authentication)
- axios (API calls)
- framer-motion (animations)
- canvas-confetti (celebrations)
- lucide-react (icons)
- react-hot-toast (notifications)

### Development Tools
- vite (build tool)
- tailwindcss (styling)
- eslint (code quality)

**Total size**: ~300-500 MB  
**Installation time**: 2-5 minutes (depending on internet speed)

---

## 🎯 Quick Start After Installation

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
copy .env.example .env

# 3. Edit .env with your Firebase credentials

# 4. Start XAMPP (Apache + MySQL)

# 5. Import database/schema.sql

# 6. Start development server
npm run dev

# 7. Open browser
# http://localhost:3000
```

---

## 💡 Alternative: Use Pre-built Version

If you can't install Node.js, you can:

1. **Request a pre-built version**
   - The `dist` folder contains the built application
   - Can be served directly with Apache
   - No npm needed to run (only to build)

2. **Use Online Development Environment**
   - CodeSandbox.io
   - StackBlitz.com
   - Replit.com
   - Upload the project there

---

## 📞 Need More Help?

### Check Node.js Installation
```bash
where node
where npm
```

### Check Node.js Version
```bash
node -v
npm -v
```

### Clear npm Cache (if issues persist)
```bash
npm cache clean --force
```

### Reinstall npm packages
```bash
# Delete node_modules folder
rmdir /s node_modules

# Delete package-lock.json
del package-lock.json

# Reinstall
npm install
```

---

## ✨ Once Everything is Working

You should see:
```
  VITE v5.0.8  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

Then open http://localhost:3000 in your browser!

---

**Need help?** Check the troubleshooting section or review the error messages carefully.
