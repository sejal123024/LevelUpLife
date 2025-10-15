# Level Up Life - Project Summary

## 📋 Overview

**Level Up Life** is a gamified habit tracker that transforms daily tasks into an RPG-style adventure. Users earn XP, level up, collect coins, maintain streaks, and unlock rewards by completing their daily habits.

## 🎯 Key Features

### User Features
- **Authentication System**
  - Email/Password sign-up and login
  - Google OAuth integration
  - Password reset functionality
  - Secure Firebase authentication

- **Gamification System**
  - XP-based progression (100 XP per level)
  - Coin rewards for task completion
  - Streak tracking (current and longest)
  - Daily XP limit (100 XP/day)
  - Streak bonuses (+10 XP after 5 days)
  - Level-up confetti animations

- **Task Management**
  - Create custom tasks
  - 5 pre-defined categories (Health, Study, Productivity, Personal Growth, Custom)
  - Task completion tracking
  - XP and coin rewards per task
  - Daily task reset system

- **Rewards Store**
  - Badges, Avatars, Themes, Vouchers
  - Coin-based purchasing system
  - Level requirements for premium rewards
  - Unlock tracking

- **Dashboard**
  - Real-time XP and level progress
  - Current/longest streak display
  - Coin balance
  - Daily motivational quotes
  - Progress bars with smooth animations

- **Profile Management**
  - User stats overview
  - Achievement tracking
  - Profile editing
  - Account information

- **Lumo Avatar**
  - Interactive 3D mascot character
  - Multiple animations (idle, wave, dance, clap, sleep)
  - Reacts to user actions
  - Pixar-style design in purple-blue palette

- **UI/UX**
  - Dark/Light mode toggle
  - Fully responsive design (mobile, tablet, desktop)
  - Smooth animations with Framer Motion
  - Apple-inspired clean design
  - Gradient accents and modern cards

### Admin Features
- Admin dashboard with analytics
- User management capabilities
- Task and reward management
- Role-based access control
- Activity logging system

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animation library
- **Canvas Confetti** - Celebration effects
- **Lucide React** - Icon library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **PHP 8+** - Server-side language
- **MySQL** - Database
- **PDO** - Database abstraction

### Authentication
- **Firebase Authentication** - User management
- **JWT** - Token-based auth

### Deployment
- **XAMPP** - Local development (Apache + MySQL)
- **Vercel/Netlify** - Frontend hosting (production)
- **Any PHP hosting** - Backend hosting (production)

## 📁 Project Structure

```
LevelUpLife/
├── api/                          # PHP Backend
│   ├── config/
│   │   ├── database.php         # Database connection
│   │   └── firebase.php         # Firebase auth helper
│   ├── models/
│   │   ├── User.php             # User model
│   │   ├── Task.php             # Task model
│   │   └── Reward.php           # Reward model
│   ├── auth/
│   │   └── login.php            # Authentication endpoint
│   ├── users/
│   │   └── profile.php          # User profile endpoints
│   ├── tasks/
│   │   ├── index.php            # Task CRUD
│   │   ├── complete.php         # Task completion
│   │   └── categories.php       # Task categories
│   ├── rewards/
│   │   ├── index.php            # Rewards list
│   │   └── purchase.php         # Purchase rewards
│   └── quotes/
│       └── random.php           # Random quote API
│
├── src/                         # React Frontend
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── LumoAvatar.jsx       # 3D mascot character
│   │   └── ProtectedRoute.jsx   # Route guard
│   ├── pages/
│   │   ├── SignIn.jsx           # Login page
│   │   ├── SignUp.jsx           # Registration page
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── Tasks.jsx            # Task management
│   │   ├── Rewards.jsx          # Rewards store
│   │   ├── Profile.jsx          # User profile
│   │   └── admin/
│   │       └── AdminDashboard.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx      # Authentication state
│   │   └── ThemeContext.jsx     # Theme management
│   ├── services/
│   │   └── api.js               # API client
│   ├── utils/
│   │   └── confetti.js          # Confetti effects
│   ├── config/
│   │   └── firebase.js          # Firebase config
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
│
├── database/
│   └── schema.sql               # Database schema
│
├── public/
│   └── logo.svg                 # App logo
│
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── .env.example                # Environment template
├── README.md                    # Project documentation
├── SETUP.md                     # Setup instructions
├── QUICKSTART.md               # Quick start guide
└── start.bat                    # Windows start script
```

## 🗄️ Database Schema

### Tables
1. **users** - User accounts and progress
2. **task_categories** - Task categories
3. **tasks** - User tasks
4. **task_completions** - Task completion history
5. **rewards** - Available rewards
6. **user_rewards** - Unlocked rewards
7. **achievements** - Achievement definitions
8. **user_achievements** - Unlocked achievements
9. **motivational_quotes** - Daily quotes
10. **admin_logs** - Admin activity logs
11. **user_settings** - User preferences

## 🎨 Design System

### Colors
- **Primary**: `#6C63FF` (Purple-blue) - XP bars, buttons
- **Secondary**: `#FFD43B` (Yellow) - Coins, highlights
- **Success**: `#00C851` (Green) - Task completion
- **Error**: `#FF3B30` (Red) - Alerts, streaks
- **Background Light**: `#F9FAFB`
- **Background Dark**: `#1C1C1E`

### Typography
- **Headings**: Poppins (600-700 weight)
- **Body**: Inter (400-500 weight)

### Components
- Rounded cards (20px border-radius)
- Soft shadows (0 4px 20px rgba(0,0,0,0.05))
- Gradient buttons and progress bars
- Smooth transitions (200ms)

## 🔐 Security Features

- Firebase JWT token verification
- SQL injection prevention (PDO prepared statements)
- CORS headers configured
- Environment variables for sensitive data
- Role-based access control
- Secure password hashing (Firebase)

## 📊 Gamification Logic

### XP System
- Each task awards 10-50 XP (customizable)
- 100 XP required per level
- Daily XP limit: 100 XP
- Streak bonus: +10 XP after 5 consecutive days

### Coin System
- Each task awards 5-25 coins (customizable)
- Coins used to purchase rewards
- No daily limit on coins

### Streak System
- Increments daily when tasks are completed
- Resets if a day is missed
- Tracks current and longest streak
- Bonus XP for maintaining streaks

### Level System
- Level = floor(Total XP / 100) + 1
- Level-up triggers confetti animation
- Higher levels unlock premium rewards

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/login.php` - User login/registration

### Users
- `GET /api/users/profile.php` - Get user profile
- `PUT /api/users/profile.php` - Update profile

### Tasks
- `GET /api/tasks/index.php` - Get user tasks
- `POST /api/tasks/index.php` - Create task
- `POST /api/tasks/complete.php` - Complete task
- `GET /api/tasks/categories.php` - Get categories

### Rewards
- `GET /api/rewards/index.php` - Get all rewards
- `POST /api/rewards/purchase.php` - Purchase reward

### Quotes
- `GET /api/quotes/random.php` - Get random quote

## 🎯 Future Enhancements

1. **Social Features**
   - Friend system
   - Leaderboards
   - Challenge friends
   - Share achievements

2. **Advanced Gamification**
   - Daily challenges
   - Weekly quests
   - Special events
   - Seasonal rewards

3. **Analytics**
   - Progress charts
   - Habit insights
   - Productivity reports
   - Goal tracking

4. **Notifications**
   - Email reminders
   - Push notifications
   - Streak alerts
   - Level-up notifications

5. **Mobile App**
   - React Native version
   - Offline support
   - Native notifications

6. **Integrations**
   - Calendar sync
   - Fitness tracker integration
   - Habit tracking APIs

## 📈 Performance Optimizations

- Code splitting with React Router
- Lazy loading for components
- Image optimization
- API response caching
- Database indexing
- Minified production builds

## 🧪 Testing Recommendations

1. **Unit Tests**
   - Component testing with Jest
   - API endpoint testing
   - Utility function testing

2. **Integration Tests**
   - User flow testing
   - API integration testing
   - Database operations

3. **E2E Tests**
   - Playwright/Cypress for user journeys
   - Authentication flows
   - Task completion flows

## 📝 License

Proprietary - All rights reserved

## 👥 Credits

- **Design Inspiration**: Apple UI, Duolingo gamification, Habitica
- **Avatar Design**: Inspired by Pengu app mascot
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Poppins, Inter)

---

**Version**: 1.0.0  
**Last Updated**: 2025-10-09  
**Status**: Production Ready ✅
