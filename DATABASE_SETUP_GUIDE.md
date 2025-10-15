# 🗄️ Database Setup Guide - Step by Step

## Complete MySQL Database Setup for Level Up Life

---

## 📋 Prerequisites

- ✅ XAMPP installed
- ✅ Apache and MySQL running in XAMPP Control Panel

---

## 🚀 Method 1: Quick Setup (Recommended)

### Step 1: Start XAMPP Services

1. Open **XAMPP Control Panel**
2. Click **Start** next to **Apache**
3. Click **Start** next to **MySQL**
4. Both should show **green** status

### Step 2: Access phpMyAdmin

1. Open your browser
2. Go to: **http://localhost/phpmyadmin**
3. You should see the phpMyAdmin interface

### Step 3: Import Database

1. Click **"Import"** tab at the top
2. Click **"Choose File"** button
3. Navigate to: `c:\xampp\htdocs\LevelUpLife\database\`
4. Select: **`schema_fixed.sql`** (use this one, not schema.sql)
5. Click **"Go"** button at the bottom
6. Wait for the success message ✅

### Step 4: Verify Installation

1. Click **"leveluplife"** database in the left sidebar
2. You should see **11 tables**:
   - achievements
   - admin_logs
   - motivational_quotes
   - rewards
   - task_categories
   - task_completions
   - tasks
   - user_achievements
   - user_rewards
   - user_settings
   - users

3. Click on **"task_categories"** table
4. Click **"Browse"** tab
5. You should see **5 categories** (Health, Study, Productivity, Personal Growth, Custom)

✅ **Success!** Your database is ready!

---

## 🔧 Method 2: Manual SQL Execution

### If Import Doesn't Work

1. **Open phpMyAdmin**: http://localhost/phpmyadmin

2. **Click "SQL" tab** at the top

3. **Copy and paste this code** (in order):

#### Step A: Create Database
```sql
CREATE DATABASE IF NOT EXISTS leveluplife CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE leveluplife;
```
Click **"Go"**

#### Step B: Create Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255) DEFAULT NULL,
    photo_url TEXT DEFAULT NULL,
    xp INT NOT NULL DEFAULT 0,
    level INT NOT NULL DEFAULT 1,
    coins INT NOT NULL DEFAULT 0,
    current_streak INT NOT NULL DEFAULT 0,
    longest_streak INT NOT NULL DEFAULT 0,
    last_activity_date DATE DEFAULT NULL,
    daily_xp_earned INT NOT NULL DEFAULT 0,
    daily_xp_limit INT NOT NULL DEFAULT 100,
    theme VARCHAR(50) NOT NULL DEFAULT 'light',
    selected_avatar VARCHAR(100) NOT NULL DEFAULT 'default',
    is_admin TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_firebase_uid (firebase_uid),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```
Click **"Go"**

#### Step C: Create Task Categories Table
```sql
CREATE TABLE task_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    description TEXT DEFAULT NULL,
    is_default TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO task_categories (name, icon, color, description) VALUES
('Health', '💪', '#00C851', 'Physical health and wellness activities'),
('Study', '📚', '#6C63FF', 'Learning and educational tasks'),
('Productivity', '⚙️', '#FFD43B', 'Work and productivity tasks'),
('Personal Growth', '🌱', '#A78BFA', 'Self-improvement and mindfulness'),
('Custom', '🧠', '#FF3B30', 'User-defined custom tasks');
```
Click **"Go"**

**Continue with remaining tables** from `schema_fixed.sql`

---

## 🔍 Method 3: Command Line (Advanced)

### For Advanced Users

1. **Open Command Prompt**

2. **Navigate to MySQL bin**:
```bash
cd c:\xampp\mysql\bin
```

3. **Login to MySQL**:
```bash
mysql -u root -p
```
(Press Enter when asked for password - XAMPP default has no password)

4. **Create database**:
```sql
CREATE DATABASE leveluplife CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

5. **Import schema**:
```bash
mysql -u root leveluplife < c:\xampp\htdocs\LevelUpLife\database\schema_fixed.sql
```

6. **Verify**:
```bash
mysql -u root -e "USE leveluplife; SHOW TABLES;"
```

---

## ✅ Verification Checklist

After setup, verify everything is correct:

### 1. Database Exists
```sql
SHOW DATABASES LIKE 'leveluplife';
```
✅ Should return: leveluplife

### 2. All Tables Created
```sql
USE leveluplife;
SHOW TABLES;
```
✅ Should show 11 tables

### 3. Sample Data Loaded

**Check Categories:**
```sql
SELECT * FROM task_categories;
```
✅ Should show 5 rows

**Check Rewards:**
```sql
SELECT * FROM rewards;
```
✅ Should show 10 rows

**Check Achievements:**
```sql
SELECT * FROM achievements;
```
✅ Should show 10 rows

**Check Quotes:**
```sql
SELECT COUNT(*) FROM motivational_quotes;
```
✅ Should show 20

### 4. Test API Connection

Open browser and visit:
```
http://localhost/LevelUpLife/api/quotes/random.php
```

✅ Should return JSON like:
```json
{
  "success": true,
  "quote": {
    "quote": "The secret of getting ahead is getting started.",
    "author": "Mark Twain"
  }
}
```

---

## 🐛 Common Issues & Quick Fixes

### Issue: "Database already exists"
**Fix:**
```sql
DROP DATABASE IF EXISTS leveluplife;
```
Then import again.

### Issue: "Table already exists"
**Fix:** Use `schema_fixed.sql` - it automatically drops tables first.

### Issue: Emojis not showing correctly
**Fix:**
1. Ensure you're using `schema_fixed.sql`
2. Check MySQL charset:
```sql
SHOW VARIABLES LIKE 'character_set%';
```
Should be utf8mb4.

### Issue: Foreign key errors
**Fix:**
```sql
SET FOREIGN_KEY_CHECKS = 0;
-- Drop tables
SET FOREIGN_KEY_CHECKS = 1;
-- Import schema
```

### Issue: phpMyAdmin not loading
**Fix:**
1. Ensure Apache is running
2. Try: http://localhost first
3. Clear browser cache

---

## 📊 Database Structure Overview

### Tables Created:

1. **users** - User accounts and progress
   - Stores: XP, level, coins, streaks, settings

2. **task_categories** - Task categories
   - 5 default categories with icons and colors

3. **tasks** - User tasks
   - User-created habits and tasks

4. **task_completions** - Completion history
   - Tracks when tasks were completed

5. **rewards** - Available rewards
   - Badges, avatars, themes, vouchers

6. **user_rewards** - Unlocked rewards
   - Tracks what users have purchased

7. **achievements** - Achievement definitions
   - Milestones and goals

8. **user_achievements** - Unlocked achievements
   - Tracks user progress

9. **motivational_quotes** - Daily quotes
   - 20 inspirational quotes

10. **admin_logs** - Admin activity
    - Tracks admin actions

11. **user_settings** - User preferences
    - Notifications, timezone, language

---

## 🎯 What's Next?

After database setup:

1. ✅ **Configure Firebase**
   - Copy `.env.example` to `.env`
   - Add Firebase credentials

2. ✅ **Install Node.js**
   - Download from nodejs.org
   - Install dependencies: `npm install`

3. ✅ **Run the Application**
   - Start dev server: `npm run dev`
   - Open: http://localhost:3000

---

## 🔒 Security Notes

### Default XAMPP Settings:
- Username: `root`
- Password: `` (empty)

### For Production:
1. Set a strong MySQL password
2. Update `api/config/database.php` with new credentials
3. Restrict database access
4. Enable SSL/TLS

---

## 📞 Need Help?

### Check These First:
1. Is MySQL running? (Green in XAMPP)
2. Can you access phpMyAdmin?
3. Does database `leveluplife` exist?
4. Are all 11 tables present?
5. Is sample data loaded?

### Still Having Issues?
See **MYSQL_FIX.md** for detailed troubleshooting.

---

## ✨ Success Indicators

You know setup is complete when:
- ✅ MySQL shows green in XAMPP
- ✅ phpMyAdmin is accessible
- ✅ Database `leveluplife` exists
- ✅ 11 tables are created
- ✅ Sample data is loaded (5 categories, 10 rewards, etc.)
- ✅ API endpoint returns JSON

**Congratulations! Your database is ready!** 🎉

---

## 📝 Quick Reference

### Database Credentials (XAMPP Default):
```
Host: localhost
Port: 3306
Database: leveluplife
Username: root
Password: (empty)
```

### Important URLs:
- phpMyAdmin: http://localhost/phpmyadmin
- Test API: http://localhost/LevelUpLife/api/quotes/random.php
- Frontend (after npm): http://localhost:3000

### Files:
- Schema: `database/schema_fixed.sql`
- Config: `api/config/database.php`
- Troubleshooting: `MYSQL_FIX.md`

---

**Your database is the foundation of Level Up Life. Once it's set up correctly, everything else will work smoothly!** 🚀
