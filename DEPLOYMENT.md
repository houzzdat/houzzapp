# SitePilot Deployment Guide

## Your Supabase Configuration

Based on your current setup, here are your Supabase details:

- **Project URL**: `https://sqzrhhcdbhbwslmwjdjb.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxenJoaGNkYmhid3NsbXdqZGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5Mjk4MjMsImV4cCI6MjA2NTUwNTgyM30.zi0dnA-z6vzWGrZHHIa74EZtxopTa7K9EHj0XRYHgls`

## Step 1: Create Environment File

Create a `.env` file in your project root with:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://sqzrhhcdbhbwslmwjdjb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxenJoaGNkYmhid3NsbXdqZGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5Mjk4MjMsImV4cCI6MjA2NTUwNTgyM30.zi0dnA-z6vzWGrZHHIa74EZtxopTa7K9EHj0XRYHgls

# Application Configuration
VITE_APP_NAME=SitePilot
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=production

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_TRACKING=false

# Development Settings
VITE_ENABLE_DEBUG_MODE=false
VITE_LOG_LEVEL=info
```

## Step 2: Build the Application

```bash
npm run build
```

This creates a `dist/` folder with your production files.

## Step 3: Deploy to Vercel (Recommended)

### Option A: Deploy via Vercel Dashboard

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `strata-track-pro-main/strata-track-pro-main` (if needed)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables:
   - `VITE_SUPABASE_URL`: `https://sqzrhhcdbhbwslmwjdjb.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxenJoaGNkYmhid3NsbXdqZGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5Mjk4MjMsImV4cCI6MjA2NTUwNTgyM30.zi0dnA-z6vzWGrZHHIa74EZtxopTa7K9EHj0XRYHgls`
5. Click **Deploy**

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts and add environment variables

## Step 4: Deploy to Netlify

1. Go to [https://app.netlify.com/](https://app.netlify.com/)
2. Click **"Add new site" > "Import an existing project"**
3. Connect your repository
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add Environment Variables in Site Settings > Environment Variables
6. Deploy

## Step 5: Test Your Deployment

1. Visit your deployed URL
2. Test the login functionality
3. Create a test project
4. Verify all features work correctly

## Troubleshooting

### If you need to find your Supabase keys again:

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings > API
4. Copy the Project URL and anon public key

### Common Issues:

- **CORS errors**: Make sure your Supabase project allows your domain
- **Build failures**: Check that all dependencies are installed
- **Environment variables**: Ensure they're set correctly in your deployment platform

## Next Steps

After deployment:
1. Set up a custom domain (optional)
2. Configure analytics/error tracking services
3. Set up monitoring and alerts
4. Create user documentation

Your app should now be live and ready for users! 