# Manual Setup Without npm (Alternative Method)

## 🎯 If You Cannot Install Node.js

This guide helps you set up the backend API and database without the React frontend.

---

## ✅ What You Can Do Without Node.js

You can still:
- ✅ Set up the database
- ✅ Configure the PHP backend API
- ✅ Test API endpoints
- ✅ Use the backend with any frontend

You cannot:
- ❌ Run the React development server
- ❌ Build the React frontend
- ❌ Use the full application UI

---

## 🗄️ Step 1: Database Setup

### 1.1 Start XAMPP
1. Open XAMPP Control Panel
2. Click "Start" for **Apache**
3. Click "Start" for **MySQL**

### 1.2 Import Database
1. Open browser: http://localhost/phpmyadmin
2. Click "New" to create database
3. Database name: `leveluplife`
4. Collation: `utf8mb4_unicode_ci`
5. Click "Create"
6. Select the `leveluplife` database
7. Click "Import" tab
8. Choose file: `c:\xampp\htdocs\LevelUpLife\database\schema.sql`
9. Click "Go"
10. ✅ Success! Database created with all tables

### 1.3 Verify Database
Check these tables exist:
- users
- task_categories
- tasks
- task_completions
- rewards
- user_rewards
- achievements
- user_achievements
- motivational_quotes
- admin_logs
- user_settings

---

## 🔧 Step 2: Backend API Configuration

### 2.1 Verify PHP Backend Location
Your API should be at:
```
c:\xampp\htdocs\LevelUpLife\api\
```

### 2.2 Test API Endpoint
Open browser and visit:
```
http://localhost/LevelUpLife/api/quotes/random.php
```

You should see JSON response like:
```json
{
  "success": true,
  "quote": {
    "quote": "The secret of getting ahead is getting started.",
    "author": "Mark Twain"
  }
}
```

✅ If you see this, your backend is working!

### 2.3 Test Other Endpoints

**Categories:**
```
http://localhost/LevelUpLife/api/tasks/categories.php
```

Should return 5 task categories.

---

## 🔥 Step 3: Firebase Setup (Required for Authentication)

### 3.1 Create Firebase Project
1. Go to: https://console.firebase.google.com/
2. Click "Add project"
3. Enter project name: "LevelUpLife"
4. Disable Google Analytics (optional)
5. Click "Create project"

### 3.2 Enable Authentication
1. In Firebase Console, click "Authentication"
2. Click "Get started"
3. Click "Sign-in method" tab
4. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"
5. Enable **Google**:
   - Click on "Google"
   - Toggle "Enable"
   - Enter support email
   - Click "Save"

### 3.3 Get Firebase Credentials
1. Click the gear icon ⚙️ → "Project settings"
2. Scroll to "Your apps"
3. Click the web icon `</>`
4. Register app name: "LevelUpLife"
5. Copy the configuration values:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "project.firebaseapp.com",
     projectId: "project-id",
     storageBucket: "project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

### 3.4 Save Credentials
Create a file: `c:\xampp\htdocs\LevelUpLife\FIREBASE_CREDENTIALS.txt`

Paste your credentials there for later use.

---

## 🌐 Step 4: Alternative Frontend Options

Since you can't run the React dev server, here are alternatives:

### Option A: Use a CDN Build (Simplest)

Create `c:\xampp\htdocs\LevelUpLife\simple-frontend.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Level Up Life - Simple Frontend</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto p-8">
        <h1 class="text-4xl font-bold text-purple-600 mb-8">Level Up Life</h1>
        
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 class="text-2xl font-bold mb-4">Backend Status</h2>
            <button onclick="testAPI()" class="bg-purple-600 text-white px-6 py-2 rounded">
                Test API Connection
            </button>
            <div id="result" class="mt-4"></div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Next Steps</h2>
            <ol class="list-decimal list-inside space-y-2">
                <li>Install Node.js from <a href="https://nodejs.org" class="text-purple-600 underline">nodejs.org</a></li>
                <li>Run: <code class="bg-gray-100 px-2 py-1">npm install</code></li>
                <li>Run: <code class="bg-gray-100 px-2 py-1">npm run dev</code></li>
                <li>Access full application at http://localhost:3000</li>
            </ol>
        </div>
    </div>

    <script>
        async function testAPI() {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<p class="text-gray-600">Testing API...</p>';
            
            try {
                const response = await fetch('http://localhost/LevelUpLife/api/quotes/random.php');
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = `
                        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            <p class="font-bold">✅ API is working!</p>
                            <p class="mt-2 italic">"${data.quote.quote}"</p>
                            <p class="text-sm">— ${data.quote.author}</p>
                        </div>
                    `;
                } else {
                    throw new Error('API returned error');
                }
            } catch (error) {
                resultDiv.innerHTML = `
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p class="font-bold">❌ API Error</p>
                        <p class="text-sm mt-2">Make sure XAMPP is running and database is imported.</p>
                    </div>
                `;
            }
        }
    </script>
</body>
</html>
```

Access it at: http://localhost/LevelUpLife/simple-frontend.html

### Option B: Use Online IDE

1. **CodeSandbox** (https://codesandbox.io)
   - Upload your project
   - It will auto-install dependencies
   - Run in the cloud

2. **StackBlitz** (https://stackblitz.com)
   - Import from GitHub
   - Instant development environment

3. **Replit** (https://replit.com)
   - Create new Repl
   - Upload files
   - Run online

### Option C: Ask Someone to Build It

If you have a friend with Node.js:
1. Send them the project folder
2. They run: `npm install && npm run build`
3. They send you the `dist` folder
4. You copy `dist` contents to `c:\xampp\htdocs\LevelUpLife\`
5. Access at: http://localhost/LevelUpLife/

---

## 📊 What's Working Without Node.js

### ✅ Working:
- Database (MySQL)
- Backend API (PHP)
- All API endpoints
- Data storage
- User management (backend)

### ❌ Not Working:
- React frontend
- User interface
- Interactive features
- Animations
- Full user experience

---

## 🎯 Recommended Path Forward

**Best Solution**: Install Node.js
- Download: https://nodejs.org/
- Install LTS version
- Restart computer
- Run: `npm install`
- Run: `npm run dev`

**Why?** The React frontend provides:
- Beautiful user interface
- Smooth animations
- Interactive dashboard
- Task management UI
- Rewards store
- Profile page
- Complete user experience

---

## 🆘 Testing Backend API

You can test all endpoints using:

### Browser (GET requests only)
```
http://localhost/LevelUpLife/api/quotes/random.php
http://localhost/LevelUpLife/api/tasks/categories.php
```

### Postman or Insomnia (All requests)
Download Postman: https://www.postman.com/downloads/

Test endpoints:
- POST http://localhost/LevelUpLife/api/auth/login.php
- GET http://localhost/LevelUpLife/api/users/profile.php
- POST http://localhost/LevelUpLife/api/tasks/index.php
- etc.

---

## 📝 Summary

**Current Status:**
- ✅ Database ready
- ✅ Backend API ready
- ❌ Frontend needs Node.js

**To Complete Setup:**
1. Install Node.js (REQUIRED)
2. Run `npm install`
3. Configure Firebase in `.env`
4. Run `npm run dev`
5. Access http://localhost:3000

**Alternative:**
- Use simple-frontend.html for basic testing
- Use online IDE (CodeSandbox, StackBlitz)
- Get pre-built version from someone with Node.js

---

**The backend is ready! Install Node.js to complete the setup.** 🚀
