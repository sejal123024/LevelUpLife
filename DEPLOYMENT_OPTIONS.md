# 🚀 Deploy Level Up Life Online - Complete Guide

## 🎯 Deployment Architecture

Your app has two parts:
1. **Frontend:** React + Vite (Port 3000)
2. **Backend:** PHP + MySQL (Port 80)

You need to deploy both separately or together.

---

## 📋 Best Deployment Options

### **Option 1: Vercel (Frontend) + Railway (Backend)** ⭐ RECOMMENDED

**Best for:** Fast deployment, free tier, easy setup

**Frontend (Vercel):**
- Free hosting
- Automatic deployments from GitHub
- Custom domain support
- Fast CDN

**Backend (Railway):**
- Free $5/month credit
- MySQL database included
- PHP support
- Easy environment variables

---

### **Option 2: Netlify (Frontend) + Heroku (Backend)**

**Best for:** Alternative to Vercel, similar features

---

### **Option 3: Full Stack on Single Platform**

**Options:**
- **Render** - Full stack hosting
- **DigitalOcean App Platform** - $5/month
- **AWS Amplify** - AWS ecosystem
- **Hostinger** - Traditional hosting ($2-5/month)

---

## 🚀 RECOMMENDED: Vercel + Railway

### **Part 1: Deploy Frontend to Vercel**

#### **Step 1: Prepare Your Project**

1. **Push to GitHub first** (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/LevelUpLife.git
   git push -u origin main
   ```

2. **Update `vite.config.js` for production:**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:80',
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

3. **Create `.env.production` file:**

```env
VITE_API_URL=https://your-backend-url.railway.app
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### **Step 2: Deploy to Vercel**

1. **Go to:** https://vercel.com
2. **Sign up** with GitHub
3. **Click "New Project"**
4. **Import** your GitHub repository
5. **Configure:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add all variables from `.env.production`

7. **Click "Deploy"**

8. **Done!** Your frontend is live at: `https://your-app.vercel.app`

---

### **Part 2: Deploy Backend to Railway**

#### **Step 1: Prepare Backend**

1. **Create `railway.json` in project root:**

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "php -S 0.0.0.0:$PORT -t api",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

2. **Create `Procfile` in project root:**

```
web: php -S 0.0.0.0:$PORT -t api
```

3. **Update `api/config/database.php` for Railway:**

```php
<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {
        // Use Railway environment variables or fallback to local
        $this->host = getenv('MYSQL_HOST') ?: 'localhost';
        $this->db_name = getenv('MYSQL_DATABASE') ?: 'leveluplife';
        $this->username = getenv('MYSQL_USER') ?: 'root';
        $this->password = getenv('MYSQL_PASSWORD') ?: '';
    }

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>
```

#### **Step 2: Deploy to Railway**

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Select your repository**

6. **Add MySQL Database:**
   - Click "New" → "Database" → "MySQL"
   - Railway will auto-create database

7. **Configure Environment Variables:**
   - Railway auto-sets MySQL variables
   - Add custom variables if needed

8. **Deploy!**

9. **Get your backend URL:** `https://your-app.railway.app`

#### **Step 3: Import Database**

1. **In Railway, click on MySQL service**
2. **Click "Connect"**
3. **Use provided credentials to connect via MySQL client**
4. **Import your schema:**

```bash
mysql -h your-host -u your-user -p your-database < database/schema.sql
```

Or use Railway's web interface to run SQL.

---

### **Part 3: Connect Frontend to Backend**

1. **Update Vercel Environment Variables:**
   - Go to Vercel project settings
   - Update `VITE_API_URL` to your Railway URL
   - Example: `https://your-backend.railway.app`

2. **Redeploy Vercel:**
   - Vercel will auto-redeploy
   - Or manually trigger deployment

3. **Test your app!**

---

## 🎯 Alternative: Deploy to Hostinger (Full Stack)

**Best for:** Traditional hosting, one platform for everything

### **Step 1: Get Hostinger Account**

1. Go to: https://www.hostinger.com
2. Choose plan (Premium or Business)
3. Cost: ~$2-5/month

### **Step 2: Upload Files**

1. **Build your React app:**
   ```bash
   npm run build
   ```

2. **Upload via FTP:**
   - Frontend: Upload `dist/` folder contents to `public_html/`
   - Backend: Upload `api/` folder to `public_html/api/`

3. **Create MySQL Database:**
   - Use Hostinger's cPanel
   - Create database and user
   - Import `database/schema.sql`

4. **Update database config:**
   - Edit `api/config/database.php`
   - Use Hostinger's database credentials

### **Step 3: Configure**

1. **Create `.htaccess` in `public_html/`:**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

2. **Update API URL in your app**

3. **Done!** Your app is live at: `https://yourdomain.com`

---

## 🚀 Quick Deploy: Netlify (Frontend Only)

If you want to deploy frontend quickly:

### **Step 1: Build**

```bash
npm run build
```

### **Step 2: Deploy to Netlify**

1. Go to: https://www.netlify.com
2. Sign up with GitHub
3. Drag & drop your `dist/` folder
4. Done! Instant deployment

**Or use Netlify CLI:**

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## 📋 Pre-Deployment Checklist

### **Frontend:**

- [ ] Build works locally (`npm run build`)
- [ ] Environment variables configured
- [ ] Firebase config uses env variables
- [ ] API URLs point to production backend
- [ ] No console.logs in production
- [ ] Error handling implemented

### **Backend:**

- [ ] Database connection uses env variables
- [ ] CORS configured for production domain
- [ ] API endpoints tested
- [ ] SQL injection prevention
- [ ] Authentication working
- [ ] Error logging implemented

### **Security:**

- [ ] `.env` not in repository
- [ ] API keys secured
- [ ] Database credentials secured
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Input validation on backend

---

## 🔧 Update `api/config/database.php` for Production

```php
<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {
        // Check if running on Railway/production
        if (getenv('RAILWAY_ENVIRONMENT')) {
            $this->host = getenv('MYSQL_HOST');
            $this->db_name = getenv('MYSQL_DATABASE');
            $this->username = getenv('MYSQL_USER');
            $this->password = getenv('MYSQL_PASSWORD');
        } else {
            // Local development
            $this->host = 'localhost';
            $this->db_name = 'leveluplife';
            $this->username = 'root';
            $this->password = '';
        }
    }

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
            throw new Exception("Database connection failed");
        }
        return $this->conn;
    }
}
?>
```

---

## 🔧 Add CORS Headers to Backend

Create `api/.htaccess`:

```apache
Header set Access-Control-Allow-Origin "https://your-frontend.vercel.app"
Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"
Header set Access-Control-Allow-Credentials "true"
```

Or in PHP files:

```php
<?php
header('Access-Control-Allow-Origin: https://your-frontend.vercel.app');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
```

---

## 📊 Deployment Comparison

| Platform | Frontend | Backend | Database | Cost | Difficulty |
|----------|----------|---------|----------|------|------------|
| **Vercel + Railway** | ✅ | ✅ | ✅ | Free tier | Easy |
| **Netlify + Heroku** | ✅ | ✅ | ✅ | Free tier | Easy |
| **Hostinger** | ✅ | ✅ | ✅ | $2-5/mo | Medium |
| **DigitalOcean** | ✅ | ✅ | ✅ | $5/mo | Medium |
| **AWS** | ✅ | ✅ | ✅ | Variable | Hard |

---

## 🎯 Recommended Path

### **For Beginners:**

1. **Deploy Frontend to Vercel** (5 minutes)
2. **Deploy Backend to Railway** (10 minutes)
3. **Connect them** (5 minutes)
4. **Total time:** ~20 minutes

### **For Production:**

1. **Use Hostinger or DigitalOcean**
2. **Custom domain**
3. **SSL certificate**
4. **Monitoring & backups**

---

## ✅ After Deployment

1. **Test all features:**
   - [ ] User registration
   - [ ] Login/logout
   - [ ] Quest creation
   - [ ] Rewards system
   - [ ] Admin dashboard
   - [ ] Admin profile

2. **Monitor:**
   - Check error logs
   - Monitor performance
   - Track user activity

3. **Optimize:**
   - Enable caching
   - Compress images
   - Minify code
   - Use CDN

---

## 🆘 Common Issues

### **Issue: CORS Error**

**Fix:** Add CORS headers to backend (see above)

### **Issue: API Not Found**

**Fix:** Check API URL in environment variables

### **Issue: Database Connection Failed**

**Fix:** Verify database credentials and import schema

### **Issue: Build Fails**

**Fix:** 
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

## 📚 Next Steps

1. **Custom Domain:**
   - Buy domain from Namecheap/GoDaddy
   - Point to Vercel/Railway
   - Add SSL certificate

2. **Monitoring:**
   - Set up error tracking (Sentry)
   - Add analytics (Google Analytics)
   - Monitor uptime

3. **Backups:**
   - Automated database backups
   - Code versioning (Git)
   - Regular exports

---

*Deployment Guide v1.0*
*Choose your platform and follow the steps!*
