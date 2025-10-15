# 🎮 Gamification Features Setup Guide

## Overview
This guide will help you set up the enhanced gamification features for LevelUpLife, including Daily Challenges, Power-Ups, Achievements, and the revamped Quest system.

## 🚀 New Features

### 1. **Quest Board (Enhanced Tasks)**
- **Game-like UI** with combo system
- **Visual rewards** with animated feedback
- **Filter system** (All, Active, Completed)
- **Real-time stats** tracking
- **Gradient borders** and hover effects

### 2. **Daily Challenges**
- **Time-limited challenges** that reset every 24 hours
- **Difficulty levels**: Easy, Medium, Hard
- **Bonus multipliers** for extra rewards
- **Progress tracking** with visual indicators
- **Countdown timer** showing time remaining

### 3. **Achievements System**
- **Rarity tiers**: Common, Rare, Epic, Legendary
- **Progress bars** for locked achievements
- **Visual effects** based on rarity
- **Coin rewards** for unlocking achievements
- **Completion tracking**

### 4. **Power-Ups Store**
- **XP Boosters**: Multiply XP earnings
- **Coin Magnets**: Increase coin rewards
- **Streak Shields**: Protect your streak
- **Time-limited effects** with expiration tracking

### 5. **Enhanced Dashboard**
- **Interactive quick action cards**
- **Animated hover effects**
- **Direct navigation** to all features
- **Modern gradient designs**

## 📦 Installation Steps

### Step 1: Database Setup

Run the gamification enhancement SQL script:

```bash
# Navigate to your MySQL/phpMyAdmin
# Import the following file:
database/gamification_enhancement.sql
```

Or via command line:
```bash
mysql -u root -p leveluplife < database/gamification_enhancement.sql
```

This will create:
- `daily_challenges` table
- `user_daily_challenges` table
- `power_ups` table
- `user_power_ups` table
- `quests` table
- `user_quests` table
- `leaderboard` table
- Enhanced `tasks` table with difficulty and tags

### Step 2: Verify Database Changes

Check that all tables were created successfully:

```sql
USE leveluplife;
SHOW TABLES;

-- You should see these new tables:
-- daily_challenges
-- user_daily_challenges
-- power_ups
-- user_power_ups
-- quests
-- user_quests
-- leaderboard
```

### Step 3: Backend API Files

The following API files have been created:

**Models:**
- `api/models/DailyChallenge.php` - Daily challenges logic
- `api/models/PowerUp.php` - Power-ups management

**Endpoints:**
- `api/challenges/get.php` - Get today's challenges
- `api/powerups/get.php` - Get available power-ups
- `api/powerups/purchase.php` - Purchase and activate power-ups

### Step 4: Frontend Pages

New pages have been created:

1. **Achievements Page** (`src/pages/Achievements.jsx`)
   - Route: `/achievements`
   - Displays all achievements with progress
   - Shows rarity-based visual effects

2. **Daily Challenges Page** (`src/pages/DailyChallenges.jsx`)
   - Route: `/challenges`
   - Shows daily challenges with countdown
   - Tracks progress and completion

3. **Enhanced Tasks Page** (`src/pages/Tasks.jsx`)
   - Route: `/tasks`
   - Game-like quest board interface
   - Combo system and enhanced animations

### Step 5: Navigation Updates

The navbar has been updated with new menu items:
- 🏠 Dashboard
- ⚔️ Quests (formerly Tasks)
- ⚡ Challenges (NEW)
- 🏆 Achievements (NEW)
- 🎁 Rewards
- 👤 Profile

## 🎨 UI/UX Enhancements

### Color Schemes
- **Quests**: Purple/Pink/Blue gradients
- **Challenges**: Cyan/Blue/Indigo gradients
- **Achievements**: Yellow/Orange/Red gradients
- **Dashboard**: Multi-color gradient backgrounds

### Animations
- **Hover effects**: Scale and lift animations
- **Combo counter**: Rotating entrance animation
- **Progress bars**: Smooth fill animations
- **Confetti**: Celebration effects on completion

### Visual Feedback
- **Toast notifications**: Gradient backgrounds with custom styling
- **Completion overlays**: Semi-transparent success indicators
- **Rarity glows**: Shadow effects based on achievement rarity
- **Difficulty badges**: Color-coded challenge difficulty

## 🔧 Configuration

### Environment Variables
Make sure your `.env` file is properly configured:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# API Configuration
VITE_API_BASE_URL=http://localhost/LevelUpLife/api

# Database Configuration (for PHP backend)
DB_HOST=localhost
DB_NAME=leveluplife
DB_USER=root
DB_PASS=
```

## 🚦 Testing the Features

### 1. Test Quest Board
1. Navigate to `/tasks`
2. Create a new quest
3. Complete a quest and watch the combo counter
4. Test the filter tabs (All, Active, Completed)

### 2. Test Daily Challenges
1. Navigate to `/challenges`
2. View the countdown timer
3. Check challenge progress
4. Complete a challenge (when integrated with backend)

### 3. Test Achievements
1. Navigate to `/achievements`
2. View locked and unlocked achievements
3. Check progress bars for locked achievements
4. Filter by All, Unlocked, Locked

### 4. Test Dashboard
1. Navigate to `/dashboard`
2. Click on quick action cards
3. Verify navigation to each section
4. Check stat displays

## 📱 Responsive Design

All new features are fully responsive:
- **Mobile**: Single column layout with touch-friendly buttons
- **Tablet**: 2-column grid layouts
- **Desktop**: 3-4 column grid layouts with hover effects

## 🎯 Game Mechanics

### XP System
- Base XP from tasks: 10-50 XP
- Challenge bonuses: 1.2x - 2.0x multipliers
- Streak bonuses: Additional XP for consecutive days
- Power-up multipliers: Up to 2x XP boost

### Coin Economy
- Task rewards: 5-25 coins
- Challenge rewards: 10-50 coins
- Achievement rewards: 10-500 coins
- Power-up costs: 50-150 coins

### Level Progression
- Level = floor(Total XP / 100) + 1
- Each level requires 100 XP
- Level-based unlocks for rewards and power-ups

### Streak System
- Daily login streak tracking
- Streak bonuses for task completion
- Streak shield power-up to protect streaks

## 🔄 Future Enhancements

Planned features for future updates:
- **Leaderboards**: Compete with other users
- **Social features**: Share achievements
- **Custom avatars**: Unlock unique Lumo skins
- **Quest chains**: Multi-step quest sequences
- **Boss battles**: Special weekly challenges
- **Guild system**: Team-based competitions

## 🐛 Troubleshooting

### Issue: Database tables not created
**Solution**: Check MySQL user permissions and re-run the SQL script

### Issue: API endpoints returning 404
**Solution**: Verify Apache/XAMPP is running and .htaccess is configured

### Issue: Firebase authentication errors
**Solution**: Check `.env` file and ensure Firebase config is correct

### Issue: Animations not working
**Solution**: Clear browser cache and ensure framer-motion is installed

### Issue: Styles not applying
**Solution**: Run `npm run dev` to rebuild Tailwind CSS

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify all dependencies are installed: `npm install`
3. Ensure database is properly configured
4. Check that XAMPP/Apache is running

## 🎉 Enjoy Your Gamified Experience!

Your LevelUpLife app is now transformed into an engaging, game-like experience that will motivate users to complete tasks and build better habits!

---

**Version**: 2.0.0  
**Last Updated**: 2025-10-10  
**Author**: LevelUpLife Development Team
