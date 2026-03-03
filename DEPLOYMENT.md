# Deployment Guide - Vercel

This portfolio is optimized for deployment on Vercel. Follow these steps to deploy:

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (free tier available at https://vercel.com)

## Deployment Steps

### 1. **Connect Your Repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `myPortfoliofile` repository

### 2. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `dist` (should be auto-detected)
   - **Install Command**: `npm install` (default)

### 3. **Environment Variables** (if needed)
   - No environment variables are required for this project currently
   - If you add any in the future, configure them in Vercel Project Settings

### 4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your project
   - Your portfolio will be available at a URL like `your-project.vercel.app`

## Automatic Deployments

After initial deployment:
- Every push to the `main` branch will automatically trigger a new deployment
- Preview deployments are created for pull requests
- View deployment status in your Vercel dashboard

## Build Optimizations Included

✅ Code minification with Terser
✅ Automatic chunk splitting for better performance
✅ Source maps disabled in production
✅ Console logs removed from production builds
✅ Vendor code splitting (React, animations, UI libraries)
✅ SPA routing configured with rewrites

## Performance Tips

1. Images are optimized using external CDN links
2. CSS is minified automatically
3. JavaScript is split into chunks for better caching
4. Lazy loading is implemented in carousel components

## Monitoring Deployments

- Check deployment status on Vercel Dashboard
- View build logs for any errors
- Monitor performance metrics in Vercel Analytics

## Redeploying

To redeploy your site:
1. Make changes to your code
2. Push to GitHub (`git push origin main`)
3. Vercel automatically redeploys within seconds

## Custom Domain (Optional)

To add a custom domain:
1. Go to Project Settings → Domains
2. Enter your custom domain
3. Follow DNS configuration instructions

## Support

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/
- React Docs: https://react.dev/
