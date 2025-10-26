# 🚀 Deployment Guide - NYC Builder 2025

## Quick Deploy Options

### Option 1: GitHub Pages (Recommended for Public Projects)

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: NYC Builder 2025"
   git branch -M main
   git remote add origin https://github.com/yourusername/nyc-builder-2025.git
   git push -u origin main
   ```

2. **Update `vite.config.ts` for GitHub Pages**
   Add the base URL:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/nyc-builder-2025/', // Your repo name
   })
   ```

3. **Build and deploy**
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Save

Your game will be live at: `https://yourusername.github.io/nyc-builder-2025/`

### Option 2: Netlify (Easiest, Free Tier)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Visit [netlify.com](https://www.netlify.com/)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repo for automatic deployments

Build settings if using Git:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 3: Vercel (Great for React)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts** - Vercel will auto-detect Vite settings

### Option 4: Render (Good for Full-Stack Apps)

1. Create a `render.yaml` in your project:
   ```yaml
   services:
     - type: web
       name: nyc-builder-2025
       env: static
       buildCommand: npm install && npm run build
       staticPublishPath: dist
   ```

2. Connect your GitHub repo to Render
3. Deploy automatically

## Environment Variables

This project currently has no environment variables, but if you add any:

1. Create `.env.local` for local development
2. Add to hosting platform's environment settings
3. Never commit `.env` files (already in `.gitignore`)

## Custom Domain Setup

### For GitHub Pages:
1. Go to Settings → Pages
2. Enter custom domain
3. Add CNAME record in your DNS:
   ```
   CNAME yourdomain.com username.github.io
   ```

### For Netlify/Vercel:
1. Go to domain settings in dashboard
2. Add your custom domain
3. Follow DNS configuration instructions

## Pre-Deployment Checklist

- [ ] Test all three game modes
- [ ] Check responsive scaling
- [ ] Update README with live URL
- [ ] Add screenshots/GIFs to README
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Verify mobile compatibility
- [ ] Check console for errors
- [ ] Update social meta tags (optional)

## Adding Social Media Meta Tags

Add to `index.html` for better sharing:

```html
<head>
  <!-- Existing tags -->
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yourdomain.com/">
  <meta property="og:title" content="NYC Builder 2025">
  <meta property="og:description" content="A browser game about NYC housing laws">
  <meta property="og:image" content="https://yourdomain.com/preview.png">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://yourdomain.com/">
  <meta property="twitter:title" content="NYC Builder 2025">
  <meta property="twitter:description" content="A browser game about NYC housing laws">
  <meta property="twitter:image" content="https://yourdomain.com/preview.png">
</head>
```

## Performance Optimization

Before deploying to production:

1. **Optimize bundle size**
   ```bash
   npm run build
   # Check dist folder size
   ```

2. **Analyze bundle** (optional)
   ```bash
   npm install -D rollup-plugin-visualizer
   ```

3. **Enable gzip compression** (most hosts do this automatically)

## Troubleshooting Deployment

### Build fails on hosting platform
- Check Node version (use Node 18+)
- Ensure all dependencies are in `package.json`
- Check build logs for specific errors

### Game loads but scenes don't work
- Check browser console for errors
- Verify all scene files are imported correctly
- Check that Phaser 4 beta is installed

### Assets not loading
- Ensure assets are in `public` folder
- Check asset paths are relative
- Verify base URL is set correctly

### Blank screen on deployed site
- Check console for errors
- Verify build completed successfully
- Check that `dist` folder has content
- Ensure correct publish directory is configured

## Continuous Deployment

Once connected to GitHub:

1. **GitHub Actions** (for GitHub Pages)
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Auto-deploy on push** (Netlify/Vercel)
   - Just push to main branch
   - Automatic builds and deploys

## Post-Deployment

1. Share your game URL
2. Monitor analytics (optional)
3. Gather feedback
4. Iterate and improve

## License & Rights

This project uses MIT License. You have:
- ✅ Full rights to modify
- ✅ Full rights to distribute
- ✅ Full rights to use commercially
- ✅ Full rights to use privately

Both you and Maximum New York have unlimited rights to use this codebase.

---

**Need help?** Check the main README or create an issue on GitHub.

