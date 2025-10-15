# ✅ Port 3000 Configuration - Complete!

## 🎯 Configuration Summary

Your application is now configured to run on **localhost:3000** for both Admin and User pages.

---

## ⚙️ Configuration File

**File:** `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // ✅ Configured to use port 3000
    proxy: {
      '/api': {
        target: 'http://localhost:80',  // XAMPP backend
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
})
```

---

## 🌐 All URLs on Port 3000

### **Admin Pages:**

```
Admin Dashboard:
http://localhost:3000/admin

Admin Profile:
http://localhost:3000/admin/profile
```

### **User Pages:**

```
Dashboard:
http://localhost:3000/dashboard

Quest Board:
http://localhost:3000/quests

Rewards Store:
http://localhost:3000/rewards-store

Profile:
http://localhost:3000/profile

Achievements:
http://localhost:3000/achievements

Challenges:
http://localhost:3000/challenges
```

### **Authentication:**

```
Sign In:
http://localhost:3000/signin

Sign Up:
http://localhost:3000/signup
```

---

## 🚀 How to Start

```bash
# Navigate to project
cd c:\xampp\htdocs\LevelUpLife

# Install dependencies (if not done)
npm install

# Start development server on port 3000
npm run dev
```

**Expected Output:**

```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## ✅ Benefits

### **Same Port for Everything:**

✅ **Admin pages** - http://localhost:3000/admin
✅ **User pages** - http://localhost:3000/dashboard
✅ **No confusion** - One port for entire app
✅ **Easy to remember** - Just use port 3000
✅ **API proxy** - Backend calls go to XAMPP (port 80)

---

## 🔧 Port Architecture

```
┌─────────────────────────────────────────┐
│  Frontend (React + Vite)                │
│  Port: 3000                             │
│                                         │
│  ├─ User Pages                          │
│  │  ├─ /dashboard                       │
│  │  ├─ /quests                          │
│  │  ├─ /rewards-store                   │
│  │  └─ /profile                         │
│  │                                      │
│  └─ Admin Pages                         │
│     ├─ /admin                           │
│     └─ /admin/profile                   │
│                                         │
└─────────────────────────────────────────┘
              ↓ API Calls (/api/*)
┌─────────────────────────────────────────┐
│  Backend (PHP + MySQL)                  │
│  Port: 80 (XAMPP)                       │
│                                         │
│  ├─ /api/auth/login.php                 │
│  ├─ /api/auth/register.php              │
│  ├─ /api/users/profile.php              │
│  └─ /api/admin/*                        │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎯 Testing Checklist

### **Step 1: Start Server**

```bash
npm run dev
```

✅ Check terminal shows: `http://localhost:3000/`

### **Step 2: Test User Pages**

- [ ] http://localhost:3000/dashboard
- [ ] http://localhost:3000/quests
- [ ] http://localhost:3000/rewards-store
- [ ] http://localhost:3000/profile

### **Step 3: Test Admin Pages**

- [ ] http://localhost:3000/admin
- [ ] http://localhost:3000/admin/profile

### **Step 4: Verify Navigation**

- [ ] Click links in navbar
- [ ] Navigate between pages
- [ ] All routes work on port 3000

---

## 🔍 Troubleshooting

### **Issue: Port 3000 Already in Use**

**Error Message:**
```
Port 3000 is in use, trying another one...
```

**Solution:**

**Option 1: Stop other process using port 3000**
```bash
# Find process on port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Option 2: Use different port**

Edit `vite.config.js`:
```javascript
server: {
  port: 3001,  // Use 3001 instead
  // ...
}
```

---

### **Issue: Cannot Access Admin Pages**

**Possible Causes:**

1. **Not logged in**
   - Solution: Login at http://localhost:3000/signin

2. **Not admin user**
   - Solution: Check user role in database

3. **Protected route issue**
   - Solution: Check `src/components/ProtectedRoute.jsx`

---

## 📱 Mobile/Network Access

### **Access from Other Devices:**

1. **Start with host flag:**
   ```bash
   npm run dev -- --host
   ```

2. **Find your IP address:**
   ```bash
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

3. **Access from mobile/tablet:**
   ```
   http://192.168.1.100:3000/admin
   http://192.168.1.100:3000/dashboard
   ```

---

## 🎨 Environment Variables

If you need to change the port dynamically:

**Create `.env` file:**

```env
VITE_PORT=3000
VITE_API_URL=http://localhost:80
```

**Update `vite.config.js`:**

```javascript
export default defineConfig({
  server: {
    port: process.env.VITE_PORT || 3000,
    // ...
  }
})
```

---

## ✅ Verification

### **Quick Test:**

```bash
# 1. Start server
npm run dev

# 2. Open browser and test these URLs:
http://localhost:3000/
http://localhost:3000/admin
http://localhost:3000/admin/profile

# All should work on port 3000! ✓
```

---

## 🎊 Summary

**Status:** ✅ **CONFIGURED AND READY**

**Port:** 3000 (Same for Admin and User)

**Configuration:** `vite.config.js`

**Admin URLs:**
- http://localhost:3000/admin
- http://localhost:3000/admin/profile

**User URLs:**
- http://localhost:3000/dashboard
- http://localhost:3000/quests
- http://localhost:3000/rewards-store

**Backend:** http://localhost:80 (XAMPP)

**Everything runs on the same localhost with port 3000!** 🚀

---

*Port 3000 Setup Guide v1.0*
*Last Updated: 2025-10-10*
