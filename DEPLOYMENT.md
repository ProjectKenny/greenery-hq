# GreeneryHQ Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Database Setup (5 minutes)

**Option A: Automatic Setup (Recommended)**
```bash
# Run the database setup script
node scripts/create-tables.js
node scripts/insert-sample-data.js
```

**Option B: Manual Setup**
1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Click "Run" to execute the SQL

### 2. GitHub Repository Setup (2 minutes)

1. Go to GitHub: https://github.com/new
2. Repository name: `greenery-hq`
3. Description: `GreeneryHQ - Directory of Green Tech Companies`
4. Set to Public
5. Don't initialize with README (we already have one)
6. Click "Create repository"

7. Push your code:
```bash
git remote add origin https://github.com/ProjectKenny/greenery-hq.git
git branch -M main
git push -u origin main
```

### 3. Vercel Deployment (3 minutes)

1. Go to Vercel: https://vercel.com/new
2. Import your GitHub repository `ProjectKenny/greenery-hq`
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://swpulyoiilxmyqbzzyay.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cHVseW9paWx4bXlxYnp6eWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MTQxMjQsImV4cCI6MjA2NjQ5MDEyNH0.KJzrhOUUzj5Do1IegWI7_1s9vEbcRNfLLziPFqlrRfQ
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cHVseW9paWx4bXlxYnp6eWF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDkxNDEyNCwiZXhwIjoyMDY2NDkwMTI0fQ.EI2obHX8MJzJk_-I1OgbXOoZ9ptraABQPX5sSl9k87Y
   NEXT_PUBLIC_APP_NAME=GreeneryHQ
   NEXT_PUBLIC_APP_DESCRIPTION=Directory of Green, Climate & Renewable Tech Companies
   ```

5. Click "Deploy"

### 4. Post-Deployment Verification (2 minutes)

1. Visit your deployed site (Vercel will provide the URL)
2. Test the homepage
3. Navigate to `/companies` to see the directory
4. Verify responsive design on mobile

## 🔧 Troubleshooting

### Database Issues
- If tables aren't created, manually run the SQL schema in Supabase
- Check RLS policies are enabled
- Verify environment variables are correct

### Deployment Issues
- Ensure all environment variables are set in Vercel
- Check build logs for any errors
- Verify GitHub repository is public or Vercel has access

### Data Issues
- Run `node scripts/insert-sample-data.js` to add sample companies
- Check Supabase dashboard for data verification

## 📊 Expected Results

After successful deployment:
- **Homepage**: Modern landing page with green tech branding
- **Directory**: `/companies` page showing sample companies
- **Categories**: 12 green tech categories
- **Sample Data**: 8+ sample companies across different categories
- **Mobile Ready**: Responsive design works on all devices
- **SEO Ready**: Proper meta tags and structured data

## 🎯 Next Development Steps

1. **Authentication**: Add user login/registration
2. **Company Submission**: Form for adding new companies
3. **Search**: Implement full-text search functionality
4. **Admin Panel**: Moderation tools for company approval
5. **Enhanced UI**: More visual elements and animations

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify environment variables
3. Test database connection
4. Review Vercel deployment logs

Your GreeneryHQ application is now ready for production! 🌱
