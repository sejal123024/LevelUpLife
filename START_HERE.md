# 🎮 START HERE - Level Up Life Setup

## Welcome! Let's Get You Started 🚀

This is your **complete guide** to setting up Level Up Life. Follow these steps in order.

---

## 📋 What You Need

Before starting, make sure you have:

- [ ] **XAMPP** installed (Apache + MySQL)
- [ ] **Node.js** installed (v18 or higher)
- [ ] **Firebase account** created
- [ ] **Web browser** (Chrome, Firefox, Edge)
- [ ] **Text editor** (VS Code recommended)

---

## 🎯 Setup Steps (In Order)

### ✅ Step 1: Install Prerequisites

#### 1.1 Install XAMPP
- Download: https://www.apachefriends.org/
- Install with default settings
- ✅ Done when XAMPP Control Panel opens

#### 1.2 Install Node.js
- Download: https://nodejs.org/
- Choose **LTS version**
- ✅ Done when `node --version` works in terminal

**Having issues?** → See `INSTALL_NODEJS.md`

---

### ✅ Step 2: Setup Database

#### 2.1 Start XAMPP
1. Open **XAMPP Control Panel**
2. Click **Start** for **Apache**
3. Click **Start** for **MySQL**
4. Both should be **green** ✅

#### 2.2 Import Database
1. Open browser: **http://localhost/phpmyadmin**
2. Click **"Import"** tab
3. Choose file: `database/schema_fixed.sql`
4. Click **"Go"**
5. Wait for success message ✅

#### 2.3 Verify Database
- Click **"leveluplife"** in left sidebar
- Should see **11 tables** ✅

**Having issues?** → See `DATABASE_SETUP_GUIDE.md` or `MYSQL_FIX.md`

---

### ✅ Step 3: Configure Firebase

#### 3.1 Create Firebase Project
1. Go to: https://console.firebase.google.com/
2. Click **"Add project"**
3. Name it: **"LevelUpLife"**
4. Disable Analytics (optional)
5. Click **"Create project"**

#### 3.2 Enable Authentication
1. Click **"Authentication"** in sidebar
2. Click **"Get started"**
3. Click **"Sign-in method"** tab
4. Enable **"Email/Password"**:
   - Toggle ON
   - Click "Save"
5. Enable **"Google"**:
   - Toggle ON
   - Enter support email
   - Click "Save"

#### 3.3 Get Configuration
1. Click ⚙️ icon → **"Project settings"**
2. Scroll to **"Your apps"**
3. Click web icon **`</>`**
4. Register app: **"LevelUpLife"**
5. **Copy the config values** (you'll need these next)

#### 3.4 Configure Environment
1. In project folder, copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Open `.env` in text editor

3. Paste your Firebase values:
   ```env
   VITE_FIREBASE_API_KEY=AIza...your_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   VITE_API_BASE_URL=http://localhost/LevelUpLife/api
   ```

4. Save the file ✅

---

### ✅ Step 4: Install Dependencies

1. **Open terminal** (Command Prompt or PowerShell)

2. **Navigate to project**:
   ```bash
   cd c:\xampp\htdocs\LevelUpLife
   ```

3. **Install packages**:
   ```bash
   npm install
   ```
   
   This will take 2-5 minutes. You'll see packages being installed.

4. **Wait for completion** ✅

**Having issues?** → See `INSTALL_NODEJS.md`

---

### ✅ Step 5: Run the Application

1. **Make sure XAMPP is running** (Apache + MySQL green)

2. **Start development server**:
   ```bash
   npm run dev
   ```
   
   Or double-click: **`start.bat`**

3. **Open browser**:
   ```
   http://localhost:3000
   ```

4. **You should see** the Level Up Life login page! 🎉

---

## 🎮 First Use

### Create Your Account
1. Click **"Sign Up"**
2. Enter email and password
3. Or click **"Sign in with Google"**
4. You'll be redirected to the Dashboard

### Your First Task
1. Go to **"Tasks"** page
2. Click **"Add Task"**
3. Create a task:
   - Title: "Drink 8 glasses of water"
   - Category: Health 💪
   - XP: 10, Coins: 5
4. Click **"Create Task"**

### Complete Your Task
1. Click the ✅ button
2. Watch Lumo celebrate! 🐧
3. See your XP and coins increase!

### Explore Features
- **Dashboard**: View your stats and progress
- **Tasks**: Manage your daily habits
- **Rewards**: Spend coins on badges and themes
- **Profile**: Track your journey

---

## 📚 Documentation Guide

### Quick Start
- **START_HERE.md** ← You are here!
- **GET_STARTED.md** - User-friendly walkthrough
- **QUICKSTART.md** - 5-minute setup

### Detailed Setup
- **SETUP.md** - Complete installation guide
- **DATABASE_SETUP_GUIDE.md** - Database setup
- **INSTALL_NODEJS.md** - Node.js installation

### Troubleshooting
- **MYSQL_FIX.md** - MySQL issues and fixes
- **MANUAL_SETUP.md** - Alternative setup methods

### Reference
- **README.md** - Project overview
- **PROJECT_SUMMARY.md** - Technical details
- **DEPLOYMENT.md** - Production deployment
- **CHECKLIST.md** - Feature completeness

---

## 🐛 Common Issues

### "npm is not recognized"
→ Node.js not installed. See `INSTALL_NODEJS.md`

### "Database connection failed"
→ MySQL not running. Start it in XAMPP.

### "Firebase error"
→ Check `.env` file has correct credentials.

### "Port 3000 already in use"
→ Run: `npm run dev -- --port 3001`

### "API not responding"
→ Ensure Apache is running in XAMPP.

---

## ✅ Success Checklist

You're ready when:
- [x] XAMPP running (Apache + MySQL green)
- [x] Database `leveluplife` created with 11 tables
- [x] Firebase project created and configured
- [x] `.env` file created with Firebase credentials
- [x] `npm install` completed successfully
- [x] `npm run dev` starts without errors
- [x] http://localhost:3000 shows login page
- [x] Can create account and login
- [x] Can create and complete tasks

---

## 🎯 What's Next?

### Customize Your Experience
1. **Create Custom Tasks** - Add your own habits
2. **Earn Rewards** - Complete tasks to get coins
3. **Level Up** - Reach new levels
4. **Build Streaks** - Maintain daily consistency
5. **Unlock Achievements** - Hit milestones

### Explore Features
- **Dark Mode** - Toggle theme in navbar
- **Profile** - Edit your display name
- **Rewards Store** - Browse and purchase items
- **Streaks** - Build daily habits
- **Lumo Avatar** - Watch your mascot react

### Advanced
- **Admin Panel** - Set `is_admin = 1` in database
- **Custom Rewards** - Add your own in database
- **API Integration** - Use the REST API
- **Deployment** - See `DEPLOYMENT.md`

---

## 🆘 Need Help?

### Step-by-Step Guides
1. **Node.js issues** → `INSTALL_NODEJS.md`
2. **Database issues** → `DATABASE_SETUP_GUIDE.md` or `MYSQL_FIX.md`
3. **Firebase issues** → Check `.env` configuration
4. **General setup** → `SETUP.md`

### Quick Diagnostics

**Check XAMPP:**
```
✅ Apache: Green
✅ MySQL: Green
```

**Check Node.js:**
```bash
node --version  # Should show v18+
npm --version   # Should show v9+
```

**Check Database:**
```
Open: http://localhost/phpmyadmin
Database: leveluplife
Tables: 11
```

**Check API:**
```
Open: http://localhost/LevelUpLife/api/quotes/random.php
Should return: JSON with a quote
```

**Check Frontend:**
```
Terminal: npm run dev
Browser: http://localhost:3000
Should show: Login page
```

---

## 🎊 You're All Set!

Once everything is running:
1. ✅ Create your account
2. ✅ Set up your first tasks
3. ✅ Start earning XP and coins
4. ✅ Level up your life!

---

## 📞 Quick Reference

### URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost/LevelUpLife/api
- **phpMyAdmin**: http://localhost/phpmyadmin

### Commands
```bash
# Start development server
npm run dev

# Install dependencies
npm install

# Build for production
npm run build
```

### Database
```
Host: localhost
Database: leveluplife
User: root
Password: (empty)
```

### Files
- Config: `.env`
- Database: `database/schema_fixed.sql`
- Start script: `start.bat`

---

## 🌟 Welcome to Level Up Life!

Transform your daily habits into an exciting RPG adventure!

**Every task completed is a step toward a better you.**

**Let's level up! 🎮⭐**

---

**Questions?** Check the documentation files listed above.  
**Issues?** See the troubleshooting guides.  
**Ready?** Run `npm run dev` and start your journey!

🚀 **Happy Leveling Up!** 🚀
