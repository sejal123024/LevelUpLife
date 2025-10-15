# MySQL Issues - Troubleshooting & Fixes

## 🔧 Common MySQL Issues & Solutions

---

## Issue 1: Database Import Errors

### Symptoms:
- Error importing schema.sql
- "Table already exists" errors
- Foreign key constraint errors
- Character encoding issues

### Solution:

#### Option A: Use the Fixed Schema (Recommended)

1. **Open phpMyAdmin**: http://localhost/phpmyadmin

2. **Delete old database** (if exists):
   - Click on `leveluplife` database (if it exists)
   - Click "Operations" tab
   - Scroll down to "Remove database"
   - Click "Drop the database (DROP)"
   - Confirm deletion

3. **Import the fixed schema**:
   - Click "Import" tab
   - Choose file: `database/schema_fixed.sql`
   - Click "Go"
   - ✅ Wait for success message

#### Option B: Manual Step-by-Step

1. **Create database manually**:
   ```sql
   CREATE DATABASE leveluplife CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **Select the database**:
   ```sql
   USE leveluplife;
   ```

3. **Import the schema**:
   - Use phpMyAdmin Import feature
   - Or run SQL file via command line

---

## Issue 2: XAMPP MySQL Won't Start

### Symptoms:
- MySQL button stays red in XAMPP
- Port 3306 already in use
- Error: "MySQL shutdown unexpectedly"

### Solutions:

#### Solution 1: Change MySQL Port

1. Open XAMPP Control Panel
2. Click "Config" next to MySQL
3. Select "my.ini"
4. Find line: `port=3306`
5. Change to: `port=3307`
6. Save file
7. Restart XAMPP
8. Update `api/config/database.php`:
   ```php
   $this->conn = new PDO(
       "mysql:host=localhost;port=3307;dbname=leveluplife",
       $this->username,
       $this->password
   );
   ```

#### Solution 2: Kill Process Using Port 3306

**Windows:**
```bash
# Find process using port 3306
netstat -ano | findstr :3306

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

#### Solution 3: Reinstall MySQL in XAMPP

1. Stop all XAMPP services
2. Backup `c:\xampp\mysql\data\` folder
3. Delete `c:\xampp\mysql\` folder
4. Reinstall XAMPP
5. Restore data folder

---

## Issue 3: Character Encoding Problems

### Symptoms:
- Emojis (💪, 📚, 🔥) not displaying correctly
- Strange characters in database
- "Incorrect string value" errors

### Solution:

1. **Check MySQL configuration**:
   - Open XAMPP Control Panel
   - Click "Config" → "my.ini"
   - Add these lines under `[mysqld]`:
   ```ini
   character-set-server=utf8mb4
   collation-server=utf8mb4_unicode_ci
   ```

2. **Restart MySQL**

3. **Verify encoding**:
   ```sql
   SHOW VARIABLES LIKE 'character_set%';
   SHOW VARIABLES LIKE 'collation%';
   ```

4. **Re-import database** using `schema_fixed.sql`

---

## Issue 4: Foreign Key Constraint Errors

### Symptoms:
- "Cannot add or update a child row"
- "Cannot delete or update a parent row"
- Foreign key constraint fails

### Solution:

1. **Disable foreign key checks temporarily**:
   ```sql
   SET FOREIGN_KEY_CHECKS = 0;
   ```

2. **Drop all tables**:
   ```sql
   DROP TABLE IF EXISTS user_settings;
   DROP TABLE IF EXISTS admin_logs;
   DROP TABLE IF EXISTS user_achievements;
   DROP TABLE IF EXISTS achievements;
   DROP TABLE IF EXISTS user_rewards;
   DROP TABLE IF EXISTS task_completions;
   DROP TABLE IF EXISTS tasks;
   DROP TABLE IF EXISTS task_categories;
   DROP TABLE IF EXISTS rewards;
   DROP TABLE IF EXISTS motivational_quotes;
   DROP TABLE IF EXISTS users;
   ```

3. **Re-enable foreign key checks**:
   ```sql
   SET FOREIGN_KEY_CHECKS = 1;
   ```

4. **Import schema_fixed.sql**

---

## Issue 5: Permission Denied Errors

### Symptoms:
- "Access denied for user 'root'@'localhost'"
- Cannot connect to MySQL
- Authentication errors

### Solutions:

#### Solution 1: Reset MySQL Root Password

1. Stop MySQL in XAMPP
2. Open Command Prompt as Administrator
3. Navigate to XAMPP MySQL bin:
   ```bash
   cd c:\xampp\mysql\bin
   ```
4. Start MySQL in safe mode:
   ```bash
   mysqld --skip-grant-tables
   ```
5. Open new Command Prompt
6. Connect to MySQL:
   ```bash
   mysql -u root
   ```
7. Reset password:
   ```sql
   FLUSH PRIVILEGES;
   ALTER USER 'root'@'localhost' IDENTIFIED BY '';
   FLUSH PRIVILEGES;
   EXIT;
   ```
8. Restart MySQL normally

#### Solution 2: Update Database Config

Edit `api/config/database.php`:
```php
private $host = "localhost";
private $db_name = "leveluplife";
private $username = "root";
private $password = ""; // Leave empty for XAMPP default
```

---

## Issue 6: Table Already Exists

### Symptoms:
- "Table 'users' already exists"
- Cannot create table errors

### Solution:

**Use the fixed schema** which includes DROP TABLE statements:

1. Import `database/schema_fixed.sql`
2. It will automatically drop existing tables
3. Then recreate them fresh

Or manually:
```sql
DROP DATABASE IF EXISTS leveluplife;
CREATE DATABASE leveluplife;
USE leveluplife;
-- Then import schema
```

---

## Issue 7: phpMyAdmin Not Accessible

### Symptoms:
- http://localhost/phpmyadmin not loading
- 404 Not Found error
- Blank page

### Solutions:

#### Solution 1: Check Apache

1. Ensure Apache is running in XAMPP
2. Green indicator next to Apache
3. Try: http://localhost first

#### Solution 2: Clear Browser Cache

1. Press Ctrl + Shift + Delete
2. Clear cache and cookies
3. Try again

#### Solution 3: Check phpMyAdmin Config

1. Open: `c:\xampp\phpMyAdmin\config.inc.php`
2. Verify:
   ```php
   $cfg['Servers'][$i]['host'] = 'localhost';
   $cfg['Servers'][$i]['port'] = '3306';
   $cfg['Servers'][$i]['user'] = 'root';
   $cfg['Servers'][$i]['password'] = '';
   ```

---

## Issue 8: Slow Database Performance

### Symptoms:
- Queries taking too long
- API responses slow
- Database timeouts

### Solutions:

1. **Add indexes** (already included in schema_fixed.sql)

2. **Optimize tables**:
   ```sql
   OPTIMIZE TABLE users;
   OPTIMIZE TABLE tasks;
   OPTIMIZE TABLE rewards;
   ```

3. **Increase MySQL memory**:
   - Edit `c:\xampp\mysql\bin\my.ini`
   - Increase these values:
   ```ini
   innodb_buffer_pool_size = 256M
   key_buffer_size = 64M
   max_connections = 100
   ```

---

## ✅ Verification Steps

After fixing issues, verify everything works:

### 1. Check MySQL is Running
- XAMPP Control Panel → MySQL should be green

### 2. Access phpMyAdmin
- Open: http://localhost/phpmyadmin
- Should load without errors

### 3. Verify Database Exists
```sql
SHOW DATABASES LIKE 'leveluplife';
```

### 4. Check All Tables
```sql
USE leveluplife;
SHOW TABLES;
```
Should show 11 tables.

### 5. Verify Data
```sql
SELECT COUNT(*) FROM task_categories; -- Should be 5
SELECT COUNT(*) FROM rewards; -- Should be 10
SELECT COUNT(*) FROM achievements; -- Should be 10
SELECT COUNT(*) FROM motivational_quotes; -- Should be 20
```

### 6. Test API Connection
Open browser:
```
http://localhost/LevelUpLife/api/quotes/random.php
```
Should return JSON with a quote.

---

## 🔍 Diagnostic Queries

Run these to diagnose issues:

### Check MySQL Version
```sql
SELECT VERSION();
```

### Check Character Set
```sql
SHOW VARIABLES LIKE 'character_set%';
```

### Check Table Status
```sql
SHOW TABLE STATUS FROM leveluplife;
```

### Check Foreign Keys
```sql
SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'leveluplife'
AND REFERENCED_TABLE_NAME IS NOT NULL;
```

### Check Indexes
```sql
SHOW INDEX FROM users;
SHOW INDEX FROM tasks;
```

---

## 📋 Quick Fix Checklist

- [ ] XAMPP MySQL is running (green in control panel)
- [ ] phpMyAdmin is accessible
- [ ] Database `leveluplife` exists
- [ ] All 11 tables are created
- [ ] Default data is inserted (categories, rewards, quotes)
- [ ] Character encoding is utf8mb4
- [ ] Foreign keys are working
- [ ] API endpoint returns data

---

## 🆘 Still Having Issues?

### Common Error Messages & Fixes

**"MySQL shutdown unexpectedly"**
→ Check error log: `c:\xampp\mysql\data\mysql_error.log`

**"Table doesn't exist"**
→ Re-import `schema_fixed.sql`

**"Access denied"**
→ Reset root password (see Issue 5)

**"Port 3306 in use"**
→ Change port or kill process (see Issue 2)

**"Character set error"**
→ Fix encoding (see Issue 3)

---

## 📞 Getting Help

1. Check XAMPP error logs:
   - `c:\xampp\mysql\data\mysql_error.log`
   - `c:\xampp\apache\logs\error.log`

2. Check PHP errors:
   - Enable error display in `php.ini`
   - Check browser console

3. Test each component:
   - MySQL: ✅ Running?
   - Apache: ✅ Running?
   - Database: ✅ Created?
   - Tables: ✅ Exist?
   - Data: ✅ Inserted?
   - API: ✅ Responding?

---

## ✨ Success!

Once everything is working, you should see:
- ✅ MySQL running in XAMPP
- ✅ phpMyAdmin accessible
- ✅ Database with 11 tables
- ✅ Sample data loaded
- ✅ API returning JSON responses

**Now you're ready to run the application!** 🚀
