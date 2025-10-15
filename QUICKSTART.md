# Quick Start Guide - Level Up Life

## 🚀 5-Minute Setup

### 1. Start XAMPP
- Open XAMPP Control Panel
- Start **Apache** and **MySQL**

### 2. Import Database
- Open http://localhost/phpmyadmin
- Click "Import" → Select `database/schema.sql` → Click "Go"

### 3. Configure Firebase
```bash
# Copy environment file
copy .env.example .env

# Edit .env and add your Firebase credentials
# Get them from: https://console.firebase.google.com/
```

### 4. Install & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 5. Access Application
- Open http://localhost:3000
- Sign up with email or Google
- Start completing tasks!

## 🎯 First Steps in the App

1. **Sign Up** - Create your account
2. **Dashboard** - View your stats (Level 1, 0 XP, 0 Coins)
3. **Tasks** - Create your first task
4. **Complete Task** - Earn XP and coins
5. **Rewards** - Spend coins on badges and themes
6. **Profile** - Track your progress

## 🐛 Common Issues

**Database error?**
- Ensure MySQL is running in XAMPP
- Check if database `leveluplife` exists

**Firebase error?**
- Verify `.env` has correct Firebase credentials
- Enable Email/Password in Firebase Console

**API not working?**
- Ensure Apache is running
- Test: http://localhost/LevelUpLife/api/quotes/random.php

## 📚 Full Documentation
See `SETUP.md` for detailed instructions.

---
**Happy leveling up! 🎮**
