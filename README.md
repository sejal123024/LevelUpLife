# 🎮 Level Up Life - Gamified Habit Tracker

Transform your daily habits into an exciting RPG adventure! Level Up Life gamifies your productivity with XP, levels, coins, streaks, and rewards.

## ✨ Features

### User Features
- 🔐 **Authentication**: Email/Password & Google Sign-In via Firebase
- 📊 **Dashboard**: Track XP, Level, Coins, and Streaks with beautiful visualizations
- ✅ **Tasks**: Create, complete, and manage daily habits across multiple categories
- 🎁 **Rewards**: Unlock badges, avatars, themes, and vouchers with earned coins
- 🐧 **Lumo Avatar**: Interactive 3D mascot with animations (wave, dance, clap, sleep)
- 🎉 **Gamification**: Level-up confetti, streak bonuses, motivational quotes
- 🌓 **Dark Mode**: Beautiful light/dark theme toggle
- 📱 **Responsive**: Optimized for mobile, tablet, and desktop

### Admin Features
- 👥 **User Management**: View and manage all users, XP, levels, and progress
- 📋 **Task Management**: Create default tasks and categories
- 🎁 **Rewards Management**: Add/edit rewards, badges, and themes
- 📈 **Analytics**: User engagement reports and completion trends
- ⚙️ **Settings**: Configure app branding and notifications

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + Canvas Confetti
- **3D Avatar**: Spline (Lumo character)
- **Authentication**: Firebase Auth
- **Backend**: PHP 8+
- **Database**: MySQL
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- XAMPP (Apache + MySQL)
- Firebase account

### Installation

1. **Clone and install dependencies**
```bash
cd c:\xampp\htdocs\LevelUpLife
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your Firebase credentials
```

3. **Set up database**
- Start XAMPP (Apache + MySQL)
- Import `database/schema.sql` into MySQL
- Update database credentials in `api/config/database.php`

4. **Run development server**
```bash
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost/LevelUpLife/api

## 📁 Project Structure

```
LevelUpLife/
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   └── assets/            # Images, fonts, etc.
├── api/                   # PHP backend
│   ├── config/            # Database & config
│   ├── controllers/       # API controllers
│   ├── models/            # Data models
│   └── middleware/        # Auth middleware
├── database/              # SQL schemas
└── public/                # Static assets
```

## 🎨 Design System

### Colors
- **Primary**: `#6C63FF` (Purple-blue)
- **Secondary**: `#FFD43B` (Yellow)
- **Success**: `#00C851` (Green)
- **Background**: `#F9FAFB` (Light) / `#1C1C1E` (Dark)

### Typography
- **Headings**: Poppins (600-700)
- **Body**: Inter (400-500)

## 🎮 Gamification System

- **XP System**: Earn XP by completing tasks (daily limit: 100 XP)
- **Levels**: Level up every 100 XP
- **Coins**: Earn coins with each task completion
- **Streaks**: Maintain daily streaks for bonus XP (+10 XP after 5 days)
- **Rewards**: Spend coins on badges, themes, avatars, and vouchers

## 📝 Task Categories

- 💪 **Health**: Exercise, drink water, sleep well
- 📚 **Study**: Read, revise notes, learn new skills
- ⚙️ **Productivity**: Plan day, clean desk, organize
- 🌱 **Personal Growth**: Journal, gratitude, meditation
- 🧠 **Custom**: User-defined tasks

## 🔒 Security

- Firebase Authentication for secure user management
- PHP backend with prepared statements (SQL injection prevention)
- Environment variables for sensitive data
- Role-based access control for admin features

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for productivity and personal growth**
"# LevelUpLife" 
"# LevelUpLife" 
