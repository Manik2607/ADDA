# Deployment Guide for ADDA

## Deploying to Vercel (Recommended - Free Tier)

Vercel offers excellent Next.js support with automatic deployments and free SSL certificates.

### Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Code pushed to a GitHub repository

### Method 1: Vercel Dashboard (Easiest)

1. **Prepare Your Repository**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**

   - Go to https://vercel.com/dashboard
   - Click "New Project"
   - Click "Import Git Repository"
   - Select your ADDA repository
   - Click "Import"

3. **Configure Environment Variables**

   Add these environment variables in Vercel:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_value
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value
   NEXT_PUBLIC_FIREBASE_APP_ID=your_value
   NEXT_PUBLIC_ADMIN_EMAILS=your_admin_emails
   ```

4. **Deploy**

   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - Get your deployment URL (e.g., adda.vercel.app)

5. **Post-Deployment Configuration**

   a. **Update Firebase Authorized Domains**

   - Go to Firebase Console
   - Navigate to Authentication > Settings > Authorized domains
   - Add your Vercel domain (e.g., adda.vercel.app)

   b. **Update Your Code**

   - Edit `app/sitemap.ts` - replace `yourdomain.com` with your Vercel URL
   - Edit `public/robots.txt` - update sitemap URL
   - Commit and push changes:

   ```bash
   git add .
   git commit -m "Update domain"
   git push
   ```

   Vercel will automatically redeploy.

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name? adda
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# Repeat for all environment variables

# Deploy to production
vercel --prod
```

## Deploying to Netlify (Alternative)

1. **Prepare Build**

   Create `netlify.toml`:

   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy**
   - Go to https://netlify.com
   - Click "Add new site" > "Import an existing project"
   - Connect GitHub and select repository
   - Add environment variables
   - Click "Deploy site"

## Custom Domain Setup

### On Vercel

1. **Add Domain**

   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **DNS Configuration** (at your domain registrar)

   For root domain (example.com):

   ```
   A Record: @ → 76.76.21.21
   ```

   For www subdomain:

   ```
   CNAME: www → cname.vercel-dns.com
   ```

3. **SSL Certificate**

   - Vercel automatically provisions SSL
   - Waits for DNS propagation (5 mins - 48 hours)

4. **Update Firebase**
   - Add custom domain to Firebase Authorized domains

## Environment-Specific Configurations

### Development

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=dev_key
NEXT_PUBLIC_ADMIN_EMAILS=dev@example.com
```

### Production

```bash
# Set in Vercel dashboard
NEXT_PUBLIC_FIREBASE_API_KEY=prod_key
NEXT_PUBLIC_ADMIN_EMAILS=admin@yourdomain.com
```

## Continuous Deployment

Vercel/Netlify automatically deploy when you push to main branch:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Automatic deployment triggered
# Check deployment status in Vercel/Netlify dashboard
```

## Performance Optimization

1. **Enable Image Optimization**

   - Already configured in `next.config.js`
   - Vercel handles this automatically

2. **Caching Strategy**

   - Static assets cached automatically
   - API routes have proper cache headers

3. **Analytics** (Optional)
   - Enable Vercel Analytics in dashboard
   - Monitor performance and user behavior

## Monitoring

### Vercel Dashboard

- Real-time deployment logs
- Function invocation logs
- Performance metrics

### Firebase Console

- Authentication logs
- Firestore usage
- Storage metrics
- Set up budget alerts

## Troubleshooting Deployment

**Build Fails**

```bash
# Check build logs in Vercel dashboard
# Common fixes:
# 1. Ensure all environment variables are set
# 2. Check Node.js version (18+)
# 3. Clear build cache and redeploy
```

**Environment Variables Not Working**

- Ensure they start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new variables
- Check for typos in variable names

**Firebase Permission Errors**

- Add deployment domain to Firebase Authorized domains
- Wait a few minutes for changes to propagate
- Check Firebase rules are deployed

**404 Errors on Routes**

- Ensure using App Router (not Pages Router)
- Check `app/` directory structure
- Verify dynamic routes are correct

## Rollback Deployment

### On Vercel

1. Go to Deployments tab
2. Find previous working deployment
3. Click three dots menu
4. Click "Promote to Production"

### Using Git

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard COMMIT_HASH
git push origin main --force
```

## Backup Strategy

1. **Firestore Backup**

   - Use Firebase Console > Firestore > Import/Export
   - Or use Cloud Scheduler for automated backups

2. **Code Backup**

   - Code is in GitHub (version controlled)
   - Download deployments from Vercel dashboard

3. **Storage Backup**
   - No built-in backup for Firebase Storage on free tier
   - Consider periodic manual downloads of important media

## Cost Monitoring

### Free Tier Limits

**Vercel (Hobby Plan)**

- 100 GB bandwidth/month
- 100 hours build time/month
- Unlimited deployments

**Firebase (Spark Plan)**

- Firestore: 1GB storage, 50K reads/day
- Storage: 5GB total, 1GB downloads/day
- Authentication: Unlimited

**Monitoring Usage**

- Check Vercel dashboard for bandwidth
- Check Firebase Console for database/storage usage
- Set up Firebase budget alerts

## Security Checklist Post-Deployment

- [ ] All environment variables set in Vercel
- [ ] `.env.local` NOT committed to Git
- [ ] Firebase rules deployed and tested
- [ ] Only admin emails can access dashboard
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Domain added to Firebase Authorized domains
- [ ] Security headers configured (automatic with Vercel)

---

Your ADDA application is now live! 🎉
