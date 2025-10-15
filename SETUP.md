# Level Up Life - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **XAMPP** (Apache + MySQL) - [Download](https://www.apachefriends.org/)
- **Firebase Account** - [Create Account](https://firebase.google.com/)

## Step 1: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable **Authentication**:
   - Go to Authentication > Sign-in method
   - Enable **Email/Password** provider
   - Enable **Google** provider
4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click "Web" icon to add a web app
   - Copy the configuration values

## Step 2: Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_BASE_URL=http://localhost/LevelUpLife/api
   ```

## Step 3: Database Setup

1. Start XAMPP Control Panel
2. Start **Apache** and **MySQL** services
3. Open phpMyAdmin: http://localhost/phpmyadmin
4. Import the database:
   - Click "Import" tab
   - Choose file: `database/schema.sql`
   - Click "Go"
5. Verify the database `leveluplife` was created

## Step 4: PHP Backend Configuration

1. Edit `api/config/database.php` if needed (default settings work with XAMPP):
   ```php
   private $host = "localhost";
   private $db_name = "leveluplife";
   private $username = "root";
   private $password = "";
   ```

2. Ensure the `api` folder is accessible via:
   - http://localhost/LevelUpLife/api

## Step 5: Install Frontend Dependencies

Open terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- React & React Router
- Firebase SDK
- Framer Motion (animations)
- Canvas Confetti
- Axios (API calls)
- Tailwind CSS
- And more...

## Step 6: Run the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost/LevelUpLife/api

### Production Build

To create a production build:

```bash
npm run build
```

The build files will be in the `dist` folder.

## Step 7: Test the Application

1. Open http://localhost:3000 in your browser
2. Click "Sign Up" to create a new account
3. Use Email/Password or Google Sign-In
4. You'll be redirected to the Dashboard
5. Try the following features:
   - Create tasks in the Tasks page
   - Complete tasks to earn XP and coins
   - Purchase rewards in the Rewards page
   - View your profile and stats

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running in XAMPP
- Check database credentials in `api/config/database.php`
- Verify the database `leveluplife` exists

### Firebase Authentication Issues
- Double-check your Firebase configuration in `.env`
- Ensure Email/Password and Google providers are enabled in Firebase Console
- Check browser console for detailed error messages

### API Connection Issues
- Ensure Apache is running in XAMPP
- Check that the API URL in `.env` is correct
- Test API endpoint: http://localhost/LevelUpLife/api/quotes/random.php

### CORS Issues
- The PHP backend includes CORS headers
- If issues persist, check your browser console
- Ensure the API base URL matches your setup

### Port Already in Use
If port 3000 is already in use, Vite will prompt you to use a different port or you can specify one:
```bash
npm run dev -- --port 3001
```

## Default Test Data

The database includes:
- **5 Task Categories**: Health, Study, Productivity, Personal Growth, Custom
- **10 Rewards**: Badges, Avatars, Themes
- **10 Achievements**: Various milestones
- **20 Motivational Quotes**: Daily inspiration

## Admin Access

To make a user an admin:
1. Sign up/login with the account
2. Go to phpMyAdmin
3. Find the user in the `users` table
4. Set `is_admin = 1` for that user
5. Logout and login again
6. Access admin dashboard at: http://localhost:3000/admin

## Features Checklist

### User Features
- ✅ Email/Password Authentication
- ✅ Google Sign-In
- ✅ Dashboard with XP, Level, Coins, Streaks
- ✅ Task Management (Create, Complete, View)
- ✅ Rewards Store (Purchase, Unlock)
- ✅ Profile Management
- ✅ Lumo Avatar with Animations
- ✅ Level-up Confetti Effects
- ✅ Dark Mode Toggle
- ✅ Responsive Design
- ✅ Motivational Quotes

### Gamification
- ✅ XP System (100 XP per level)
- ✅ Coin System
- ✅ Streak Tracking (Current & Longest)
- ✅ Daily XP Limit (100 XP/day)
- ✅ Streak Bonuses (+10 XP after 5 days)
- ✅ Level-up Animations
- ✅ Task Categories with Icons

### Admin Features
- ✅ Admin Dashboard
- ✅ User Management (View users)
- ✅ Analytics Overview
- ✅ Role-based Access Control

## Next Steps

1. **Customize Rewards**: Add more rewards in the database
2. **Add Achievements**: Implement achievement unlocking logic
3. **Email Notifications**: Set up email reminders for streaks
4. **Leaderboard**: Create a competitive leaderboard
5. **Social Features**: Add friend system
6. **Mobile App**: Consider React Native version

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the console logs (browser and terminal)
3. Verify all prerequisites are installed
4. Ensure XAMPP services are running

## Security Notes

- Never commit `.env` file to version control
- Use environment variables for sensitive data
- In production, use proper Firebase Admin SDK for token verification
- Enable HTTPS in production
- Implement rate limiting on API endpoints
- Regularly update dependencies

---

**Enjoy leveling up your life! 🎮⭐**
