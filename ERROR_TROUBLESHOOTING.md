# 🔧 Error Troubleshooting Guide

## Common Errors & Solutions

### **Error 1: "Cannot find module" or Import Error**

**Symptoms:**
- App won't start
- Console shows module not found
- Import errors in browser

**Solution:**
```bash
# Install missing dependencies
npm install

# If still issues, clean install:
rm -rf node_modules package-lock.json
npm install
```

---

### **Error 2: Admin Routes Not Working**

**Symptoms:**
- `/admin` or `/admin/profile` shows 404
- Redirects to dashboard
- "Page not found" error

**Solution:**

1. **Check if you're logged in as admin:**
   - Regular users cannot access admin routes
   - Need admin privileges

2. **Verify ProtectedRoute component:**
```jsx
// In src/components/ProtectedRoute.jsx
// Make sure adminOnly prop is handled
```

3. **Temporary Fix - Remove admin check:**
```jsx
// In src/App.jsx - FOR TESTING ONLY
<Route path="/admin/profile" element={
  <ProtectedRoute>  {/* Remove adminOnly temporarily */}
    <AdminProfile />
  </ProtectedRoute>
} />
```

---

### **Error 3: Component Not Rendering**

**Symptoms:**
- Blank page
- Console shows component error
- React error boundary

**Solution:**

1. **Check browser console** (F12)
2. **Look for specific error message**
3. **Common fixes:**

```bash
# Clear cache and restart
Ctrl + Shift + R (hard refresh)

# Restart dev server
Ctrl + C (stop server)
npm run dev (restart)
```

---

### **Error 4: Styling Issues**

**Symptoms:**
- Layout broken
- Colors not showing
- Responsive design not working

**Solution:**

1. **Check Tailwind CSS is working:**
```bash
# Verify tailwind.config.js exists
# Check if index.css imports Tailwind
```

2. **Verify class names:**
```jsx
// Make sure using correct Tailwind classes
className="btn-primary"  // ✓ Correct
className="button-primary"  // ✗ Wrong
```

---

### **Error 5: "userData is undefined"**

**Symptoms:**
- Cannot read property of undefined
- User data not loading
- Profile shows "User" instead of name

**Solution:**

1. **Check AuthContext:**
```jsx
// Make sure you're wrapped in AuthProvider
// In App.jsx:
<AuthProvider>
  <Router>
    {/* routes */}
  </Router>
</AuthProvider>
```

2. **Use optional chaining:**
```jsx
// Always use ?. for userData
{userData?.display_name || 'Admin'}  // ✓ Safe
{userData.display_name}  // ✗ Can crash
```

---

### **Error 6: Framer Motion Errors**

**Symptoms:**
- Animation errors
- "motion is not defined"
- Component won't animate

**Solution:**

```bash
# Install framer-motion
npm install framer-motion

# Verify import
import { motion } from 'framer-motion'
```

---

### **Error 7: React Router Errors**

**Symptoms:**
- "useNavigate must be used within Router"
- "useLocation must be used within Router"
- Navigation not working

**Solution:**

1. **Check Router wrapper:**
```jsx
// In App.jsx
<Router>
  <Routes>
    {/* All routes here */}
  </Routes>
</Router>
```

2. **Use correct imports:**
```jsx
import { Link, useNavigate } from 'react-router-dom'
```

---

## 🔍 How to Debug

### **Step 1: Check Browser Console**

1. Open browser (Chrome/Firefox/Edge)
2. Press **F12** to open DevTools
3. Click **Console** tab
4. Look for red error messages
5. Read the error carefully

### **Step 2: Check Terminal Output**

1. Look at terminal where `npm run dev` is running
2. Check for compilation errors
3. Look for warnings
4. Note any failed imports

### **Step 3: Verify File Structure**

```
src/
├── pages/
│   └── admin/
│       ├── AdminDashboard.jsx  ✓ Must exist
│       └── AdminProfile.jsx    ✓ Must exist
├── components/
│   ├── Navbar.jsx              ✓ Must exist
│   └── ProtectedRoute.jsx      ✓ Must exist
├── contexts/
│   └── AuthContext.jsx         ✓ Must exist
└── App.jsx                     ✓ Must exist
```

### **Step 4: Test Individual Components**

1. **Test AdminDashboard first:**
```
http://localhost:5173/admin
```

2. **Then test AdminProfile:**
```
http://localhost:5173/admin/profile
```

3. **Check if both load**

---

## 🚨 Quick Fixes

### **Fix 1: Restart Everything**

```bash
# Stop dev server (Ctrl + C)
# Clear node modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Restart
npm run dev
```

### **Fix 2: Hard Refresh Browser**

```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

### **Fix 3: Check Port**

```bash
# If port 5173 is busy, Vite will use another port
# Check terminal output for actual port
# Example: "Local: http://localhost:5174"
```

### **Fix 4: Clear Browser Cache**

```
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"
```

---

## 📋 Checklist

Before asking for help, verify:

- [ ] `npm install` completed successfully
- [ ] `npm run dev` is running without errors
- [ ] Browser console shows no errors
- [ ] You're logged in to the app
- [ ] You're using correct URL
- [ ] Files exist in correct locations
- [ ] All imports are correct
- [ ] No typos in file names

---

## 🆘 Still Having Issues?

### **Provide This Information:**

1. **Exact error message** from console
2. **Which page** is not working
3. **What you tried** already
4. **Terminal output** from npm run dev
5. **Browser** you're using

### **Example Error Report:**

```
Error: Cannot find module 'AdminProfile'
Page: /admin/profile
Tried: Restarted server, cleared cache
Terminal: Shows "Module not found"
Browser: Chrome
```

---

## ✅ Common Solutions Summary

| Problem | Quick Fix |
|---------|-----------|
| Module not found | `npm install` |
| Page not loading | Hard refresh (Ctrl+Shift+R) |
| Styling broken | Check Tailwind config |
| userData undefined | Use optional chaining `?.` |
| Animation not working | Install framer-motion |
| Routes not working | Check Router wrapper |
| Admin access denied | Check user role/permissions |

---

## 🎯 Specific Error Messages

### **"Failed to fetch dynamically imported module"**

**Fix:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### **"Unexpected token '<'"**

**Fix:**
- Check for HTML in JS files
- Verify all imports are correct
- Clear browser cache

### **"Cannot read properties of undefined"**

**Fix:**
```jsx
// Use optional chaining everywhere
userData?.display_name
currentUser?.email
```

---

*Troubleshooting Guide v1.0*
*Last Updated: 2025-10-10*
