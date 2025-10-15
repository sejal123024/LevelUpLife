# MySQL Port 3307 Configuration

## ✅ Configuration Updated

Your Level Up Life application is now configured to use **MySQL port 3307** instead of the default 3306.

---

## 🔧 What Was Changed

### File Updated:
- **`api/config/database.php`**
  - Added: `private $port = "3307";`
  - Updated PDO connection string to include port

### Connection String:
```php
"mysql:host=localhost;port=3307;dbname=leveluplife"
```

---

## 📋 Setup Steps for Port 3307

### Step 1: Configure XAMPP MySQL to Use Port 3307

1. **Open XAMPP Control Panel**

2. **Stop MySQL** (if running)

3. **Click "Config" button** next to MySQL

4. **Select "my.ini"**

5. **Find and change the port**:
   ```ini
   [mysqld]
   port=3307
   
   [client]
   port=3307
   ```

6. **Save the file**

7. **Start MySQL** in XAMPP

### Step 2: Update phpMyAdmin Configuration

1. **Open file**: `c:\xampp\phpMyAdmin\config.inc.php`

2. **Find the server configuration section**:
   ```php
   $cfg['Servers'][$i]['host'] = 'localhost';
   $cfg['Servers'][$i]['port'] = '3307';  // Change from 3306 to 3307
   ```

3. **Save the file**

4. **Restart Apache** in XAMPP

### Step 3: Verify Connection

1. **Access phpMyAdmin**: http://localhost/phpmyadmin
   - Should connect successfully

2. **Test API endpoint**: http://localhost/LevelUpLife/api/quotes/random.php
   - Should return JSON response

---

## ✅ Verification Checklist

- [x] `api/config/database.php` updated with port 3307
- [ ] XAMPP `my.ini` configured for port 3307
- [ ] phpMyAdmin `config.inc.php` updated
- [ ] MySQL running on port 3307 in XAMPP
- [ ] phpMyAdmin accessible
- [ ] API endpoints responding correctly

---

## 🔍 Testing the Connection

### Test 1: Check MySQL Port
Open Command Prompt and run:
```bash
netstat -ano | findstr :3307
```
Should show MySQL process listening on port 3307.

### Test 2: Connect via Command Line
```bash
cd c:\xampp\mysql\bin
mysql -u root -P 3307 -h localhost
```
Should connect successfully.

### Test 3: Test API
Open browser:
```
http://localhost/LevelUpLife/api/quotes/random.php
```
Should return:
```json
{
  "success": true,
  "quote": {
    "quote": "...",
    "author": "..."
  }
}
```

---

## 🐛 Troubleshooting

### Issue: "Connection refused" or "Can't connect"

**Solution 1: Verify MySQL is running on 3307**
```bash
netstat -ano | findstr :3307
```

**Solution 2: Check my.ini configuration**
- Ensure both `[mysqld]` and `[client]` sections have `port=3307`

**Solution 3: Restart XAMPP services**
1. Stop MySQL
2. Stop Apache
3. Start MySQL
4. Start Apache

### Issue: phpMyAdmin not connecting

**Solution**: Update `c:\xampp\phpMyAdmin\config.inc.php`:
```php
$cfg['Servers'][$i]['port'] = '3307';
```

### Issue: API returning "Database connection failed"

**Check**:
1. Is MySQL running in XAMPP? (Should be green)
2. Is it running on port 3307?
3. Is `api/config/database.php` updated? ✅ (Already done)

---

## 📝 Why Port 3307?

Common reasons for using port 3307:
- ✅ Port 3306 is already in use by another MySQL instance
- ✅ Another application is using port 3306
- ✅ Security through non-standard port
- ✅ Running multiple MySQL instances

---

## 🔄 Reverting to Port 3306

If you need to switch back to default port 3306:

### 1. Update database.php:
```php
private $port = "3306";
```

### 2. Update XAMPP my.ini:
```ini
[mysqld]
port=3306

[client]
port=3306
```

### 3. Update phpMyAdmin config.inc.php:
```php
$cfg['Servers'][$i]['port'] = '3306';
```

### 4. Restart services

---

## 📊 Current Configuration

### Database Connection:
```
Host: localhost
Port: 3307
Database: leveluplife
Username: root
Password: (empty)
```

### Connection String:
```
mysql:host=localhost;port=3307;dbname=leveluplife
```

### Files Configured:
- ✅ `api/config/database.php` - Port 3307
- ⚠️ `c:\xampp\mysql\bin\my.ini` - Update manually
- ⚠️ `c:\xampp\phpMyAdmin\config.inc.php` - Update manually

---

## 🚀 Next Steps

1. **Configure XAMPP** (see Step 1 above)
2. **Update phpMyAdmin** (see Step 2 above)
3. **Restart services**
4. **Import database**: Use phpMyAdmin to import `database/schema_fixed.sql`
5. **Test API**: Visit http://localhost/LevelUpLife/api/quotes/random.php
6. **Run application**: `npm run dev`

---

## ✨ All Set!

Your application is now configured for MySQL port 3307. Just complete the XAMPP configuration steps above and you're ready to go!

**Remember**: Both XAMPP and your application need to use the same port (3307).

---

## 📞 Quick Reference

### Check if MySQL is running on 3307:
```bash
netstat -ano | findstr :3307
```

### Connect to MySQL on 3307:
```bash
mysql -u root -P 3307 -h localhost
```

### Test API:
```
http://localhost/LevelUpLife/api/quotes/random.php
```

### Important Files:
- Application config: `api/config/database.php` ✅
- XAMPP config: `c:\xampp\mysql\bin\my.ini`
- phpMyAdmin config: `c:\xampp\phpMyAdmin\config.inc.php`

---

**Your database configuration is updated! Complete the XAMPP setup and you're ready to level up!** 🎮⭐
