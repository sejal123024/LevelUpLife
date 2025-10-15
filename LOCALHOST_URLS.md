# 🌐 Level Up Life - Localhost URLs

## 🚀 Quick Access Links

Copy and paste these URLs directly into your browser after starting the dev server.

**Port:** 3000 (Same for Admin and User pages)

---

## 📍 Main Application URLs

### **Authentication Pages:**

```
Sign In:
http://localhost:3000/signin

Sign Up:
http://localhost:3000/signup
```

---

### **User Pages:**

```
Dashboard (Home):
http://localhost:3000/dashboard
http://localhost:3000/

Quest Board:
http://localhost:3000/quests

Daily Challenges:
http://localhost:3000/challenges

Achievements:
http://localhost:3000/achievements

Rewards Store:
http://localhost:3000/rewards-store

User Profile:
http://localhost:3000/profile

Tasks:
http://localhost:3000/tasks
```

---

### **🛡️ Admin Pages (Admin Only):**

```
Admin Dashboard:
http://localhost:3000/admin

Admin Profile:
http://localhost:3000/admin/profile
```

---

## 🎯 Quick Copy-Paste

### **For Testing Admin Features:**

**Admin Dashboard:**
```
http://localhost:3000/admin
```

**Admin Profile:**
```
http://localhost:3000/admin/profile
```

---

### **For Testing User Features:**

**Dashboard:**
```
http://localhost:3000/dashboard
```

**Quest Board:**
```
http://localhost:3000/quests
```

**Rewards Store:**
```
http://localhost:3000/rewards-store
```

---

## 🔧 How to Start

### **Step 1: Start Development Server**

Open terminal in project folder and run:

```bash
npm run dev
```

### **Step 2: Wait for Server to Start**

You'll see output like:

```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### **Step 3: Open URLs**

Click any URL above or copy-paste into your browser.

---

## 📱 All Routes Map

```
┌─────────────────────────────────────────────────┐
│  Level Up Life - Complete URL Map               │
├─────────────────────────────────────────────────┤
│                                                  │
│  🔐 Authentication:                             │
│  ├─ /signin                                     │
│  └─ /signup                                     │
│                                                  │
│  👤 User Pages:                                 │
│  ├─ /                    → Dashboard            │
│  ├─ /dashboard           → Dashboard            │
│  ├─ /quests              → Quest Board          │
│  ├─ /challenges          → Daily Challenges     │
│  ├─ /achievements        → Achievements         │
│  ├─ /rewards-store       → Rewards Store        │
│  ├─ /profile             → User Profile         │
│  └─ /tasks               → Tasks                │
│                                                  │
│  🛡️ Admin Pages:                                │
│  ├─ /admin               → Admin Dashboard      │
│  └─ /admin/profile       → Admin Profile ⭐     │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Feature-Specific URLs

### **Gamification Features:**

| Feature | URL |
|---------|-----|
| **Quest Board** | http://localhost:3000/quests |
| **Rewards Store** | http://localhost:3000/rewards-store |
| **Achievements** | http://localhost:3000/achievements |
| **Daily Challenges** | http://localhost:3000/challenges |

### **Admin Features:**

| Feature | URL |
|---------|-----|
| **Admin Dashboard** | http://localhost:3000/admin |
| **Admin Profile** | http://localhost:3000/admin/profile |
| **System Monitoring** | http://localhost:3000/admin/profile |
| **Settings Management** | http://localhost:3000/admin/profile |

### **Profile Management:**

| Feature | URL |
|---------|-----|
| **User Profile** | http://localhost:3000/profile |
| **Admin Profile** | http://localhost:3000/admin/profile |

---

## 🔗 Direct Links (Click to Open)

After starting `npm run dev`, these links will work:

### **Most Used:**

- [Dashboard](http://localhost:3000/dashboard)
- [Quest Board](http://localhost:3000/quests)
- [Rewards Store](http://localhost:3000/rewards-store)
- [Admin Dashboard](http://localhost:3000/admin)
- [Admin Profile](http://localhost:3000/admin/profile)

### **Authentication:**

- [Sign In](http://localhost:3000/signin)
- [Sign Up](http://localhost:3000/signup)

### **All Pages:**

- [Dashboard](http://localhost:3000/dashboard)
- [Quests](http://localhost:3000/quests)
- [Challenges](http://localhost:3000/challenges)
- [Achievements](http://localhost:3000/achievements)
- [Rewards Store](http://localhost:3000/rewards-store)
- [Profile](http://localhost:3000/profile)
- [Tasks](http://localhost:3000/tasks)
- [Admin Dashboard](http://localhost:3000/admin)
- [Admin Profile](http://localhost:3000/admin/profile)

---

## 📋 Testing Workflow

### **For Admin Testing:**

```
1. Start server:
   npm run dev

2. Login:
   http://localhost:3000/signin

3. Go to Admin Dashboard:
   http://localhost:3000/admin

4. Click "Admin Profile" button
   OR
   Go directly to:
   http://localhost:3000/admin/profile
```

### **For User Testing:**

```
1. Start server:
   npm run dev

2. Login:
   http://localhost:3000/signin

3. Test features:
   - Dashboard: http://localhost:3000/dashboard
   - Quests: http://localhost:3000/quests
   - Rewards: http://localhost:3000/rewards-store
   - Profile: http://localhost:3000/profile
```

---

## 🎯 Quick Access Bookmarks

### **Save These in Your Browser:**

**Development:**
- http://localhost:3000/

**Admin:**
- http://localhost:3000/admin
- http://localhost:3000/admin/profile

**User:**
- http://localhost:3000/dashboard
- http://localhost:3000/quests
- http://localhost:3000/rewards-store

---

## 🔍 URL Parameters (Future Use)

These routes are ready for future enhancements:

```
User Profile with ID:
http://localhost:3000/profile/:userId

Quest Details:
http://localhost:3000/quests/:questId

Reward Details:
http://localhost:3000/rewards/:rewardId
```

---

## 🌐 Network Access (Optional)

To access from other devices on your network:

```bash
# Start with host flag
npm run dev -- --host

# Then use your IP address:
http://192.168.1.XXX:3000/
```

Find your IP:
```bash
# Windows
ipconfig

# Look for IPv4 Address
```

---

## 📱 Mobile Testing

Use the same URLs on mobile devices connected to the same network:

```
http://YOUR_IP_ADDRESS:3000/admin
http://YOUR_IP_ADDRESS:3000/admin/profile
```

---

## ⚡ Port Information

**Default Port:** 3000 (Configured in vite.config.js)

**If Port is Busy:**
Vite will automatically use the next available port (3001, 3002, etc.)

Check terminal output for actual port:
```
➜  Local:   http://localhost:3001/  ← Use this port
```

---

## 🎊 Summary

### **Admin URLs (Your New Features):**

```
Admin Dashboard:
http://localhost:3000/admin

Admin Profile:
http://localhost:3000/admin/profile
```

### **To Access:**

1. Run: `npm run dev`
2. Login to your account
3. Copy-paste the URL above
4. Enjoy your admin interface! 🚀

### **Port Configuration:**

✅ **Port 3000** - Same for both Admin and User pages
✅ **Configured in:** `vite.config.js`
✅ **API Proxy:** Backend on port 80 (XAMPP)

---

## 📚 Related Files

- **Routes Configuration:** `src/App.jsx`
- **Admin Dashboard:** `src/pages/admin/AdminDashboard.jsx`
- **Admin Profile:** `src/pages/admin/AdminProfile.jsx`
- **Protected Routes:** `src/components/ProtectedRoute.jsx`

---

*Localhost URLs Guide v1.0*
*All URLs ready to use!*
*Just start the server and click!*
