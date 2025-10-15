# Deployment Guide - Level Up Life

## 🌐 Production Deployment

### Option 1: Vercel (Frontend) + PHP Hosting (Backend)

#### Frontend Deployment (Vercel)

1. **Prepare the build**
   ```bash
   npm run build
   ```

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Deploy to Vercel**
   ```bash
   vercel
   ```

4. **Configure Environment Variables in Vercel**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env`:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - `VITE_API_BASE_URL` (your backend URL)

5. **Redeploy**
   ```bash
   vercel --prod
   ```

#### Backend Deployment (PHP Hosting)

**Recommended Hosts:**
- InfinityFree (Free)
- 000webhost (Free)
- Hostinger (Paid)
- SiteGround (Paid)
- DigitalOcean (VPS)

**Steps:**

1. **Upload Files**
   - Upload entire `api/` folder to your hosting
   - Upload `database/schema.sql`

2. **Create Database**
   - Access cPanel or hosting control panel
   - Create MySQL database
   - Import `schema.sql`
   - Note database credentials

3. **Update Database Config**
   - Edit `api/config/database.php`:
   ```php
   private $host = "your_host";
   private $db_name = "your_database_name";
   private $username = "your_username";
   private $password = "your_password";
   ```

4. **Test API**
   - Visit: `https://yourdomain.com/api/quotes/random.php`
   - Should return a JSON response

5. **Update Frontend**
   - Update `VITE_API_BASE_URL` in Vercel to your backend URL
   - Redeploy frontend

### Option 2: Netlify (Frontend) + PHP Hosting (Backend)

#### Frontend Deployment (Netlify)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

3. **Or use Netlify Dashboard**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables

#### Backend Deployment
Same as Option 1 backend deployment.

### Option 3: Full VPS Deployment (DigitalOcean/AWS/Linode)

#### Server Setup

1. **Create Ubuntu Server**
   - Ubuntu 22.04 LTS recommended
   - Minimum 1GB RAM

2. **Install LAMP Stack**
   ```bash
   sudo apt update
   sudo apt install apache2 mysql-server php php-mysql php-curl php-json
   ```

3. **Configure Apache**
   ```bash
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

4. **Upload Backend**
   ```bash
   # Upload api folder to /var/www/html/api
   sudo chown -R www-data:www-data /var/www/html/api
   sudo chmod -R 755 /var/www/html/api
   ```

5. **Setup Database**
   ```bash
   sudo mysql -u root -p
   CREATE DATABASE leveluplife;
   CREATE USER 'levelupuser'@'localhost' IDENTIFIED BY 'strong_password';
   GRANT ALL PRIVILEGES ON leveluplife.* TO 'levelupuser'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   
   # Import schema
   mysql -u levelupuser -p leveluplife < schema.sql
   ```

6. **Configure SSL (Let's Encrypt)**
   ```bash
   sudo apt install certbot python3-certbot-apache
   sudo certbot --apache -d yourdomain.com
   ```

7. **Deploy Frontend**
   - Build locally: `npm run build`
   - Upload `dist/` contents to `/var/www/html/`
   - Or use Vercel/Netlify pointing to your API

## 🔒 Security Checklist

### Before Going Live

- [ ] Change all default passwords
- [ ] Enable HTTPS/SSL
- [ ] Update CORS settings to allow only your domain
- [ ] Set strong database passwords
- [ ] Enable Firebase security rules
- [ ] Add rate limiting to API endpoints
- [ ] Remove debug/console logs
- [ ] Set up database backups
- [ ] Configure firewall rules
- [ ] Enable error logging (not displaying)
- [ ] Review and update `.htaccess` rules

### Firebase Security

1. **Enable App Check**
   - Go to Firebase Console → App Check
   - Enable for your web app

2. **Set Authentication Rules**
   - Limit sign-up methods if needed
   - Configure authorized domains

3. **Monitor Usage**
   - Set up billing alerts
   - Monitor authentication attempts

### Database Security

1. **Backup Strategy**
   ```bash
   # Daily backup cron job
   0 2 * * * mysqldump -u user -p'password' leveluplife > /backups/leveluplife_$(date +\%Y\%m\%d).sql
   ```

2. **User Permissions**
   - Create separate users for read/write operations
   - Limit privileges to necessary tables only

## 📊 Monitoring & Analytics

### Recommended Tools

1. **Frontend Monitoring**
   - Google Analytics
   - Vercel Analytics
   - Sentry (error tracking)

2. **Backend Monitoring**
   - New Relic
   - Datadog
   - Custom logging

3. **Uptime Monitoring**
   - UptimeRobot
   - Pingdom
   - StatusCake

### Setup Google Analytics

1. Create GA4 property
2. Add tracking code to `index.html`:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

## 🚀 Performance Optimization

### Frontend

1. **Enable Compression**
   - Vercel/Netlify handle this automatically
   - For Apache, enable gzip:
   ```apache
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
   </IfModule>
   ```

2. **CDN Setup**
   - Use Cloudflare for additional caching
   - Configure caching rules

3. **Image Optimization**
   - Use WebP format
   - Implement lazy loading
   - Use appropriate sizes

### Backend

1. **Enable OPcache**
   ```ini
   ; php.ini
   opcache.enable=1
   opcache.memory_consumption=128
   opcache.max_accelerated_files=10000
   ```

2. **Database Optimization**
   - Add indexes to frequently queried columns
   - Enable query caching
   - Optimize slow queries

3. **API Caching**
   - Cache static responses (quotes, categories)
   - Use Redis for session storage

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
      env:
        VITE_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
        VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
        VITE_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
        VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
        VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
        VITE_FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}
        VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 📱 Mobile Considerations

### PWA Setup

1. **Add manifest.json**
2. **Configure service worker**
3. **Add install prompt**
4. **Test on mobile devices**

### Responsive Testing

- Test on various screen sizes
- Verify touch interactions
- Check mobile navigation
- Optimize for slow connections

## 🆘 Rollback Plan

### Quick Rollback Steps

1. **Frontend (Vercel)**
   - Go to Deployments
   - Click on previous working deployment
   - Click "Promote to Production"

2. **Backend**
   - Keep previous version in backup folder
   - Switch Apache DocumentRoot
   - Restore database from backup if needed

3. **Database**
   ```bash
   mysql -u user -p leveluplife < backup_file.sql
   ```

## 📞 Support & Maintenance

### Regular Maintenance Tasks

- [ ] Weekly database backups
- [ ] Monthly dependency updates
- [ ] Quarterly security audits
- [ ] Monitor error logs daily
- [ ] Review analytics weekly
- [ ] Update content (quotes, rewards) monthly

### Emergency Contacts

- Hosting support
- Database administrator
- Firebase support
- Development team

---

**Deployment Checklist Complete! 🚀**

Remember to test thoroughly in a staging environment before deploying to production.
