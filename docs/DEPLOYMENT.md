# Deployment Guide

This guide covers deployment options and configurations for the Visitor Management System.

## Table of Contents

- [Overview](#overview)
- [Environment Setup](#environment-setup)
- [Build Process](#build-process)
- [Deployment Options](#deployment-options)
- [Production Configuration](#production-configuration)
- [Monitoring and Maintenance](#monitoring-and-maintenance)

## Overview

The Visitor Management System is a React-based single-page application that can be deployed to various hosting platforms. This guide covers the most common deployment scenarios.

## Environment Setup

### Environment Variables

Create production environment files:

```bash
# .env.production
VITE_APP_TITLE="Visitor Management System"
VITE_API_URL="https://api.your-domain.com"
VITE_APP_VERSION="1.0.0"
VITE_ANALYTICS_ENABLED=true
VITE_GOOGLE_ANALYTICS_ID="GA-XXXXXXXXX"
```

### Build Configuration

Ensure your `vite.config.ts` is optimized for production:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select']
        }
      }
    }
  }
})
```

## Build Process

### Local Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the build locally
npm run preview
```

### Build Optimization

The build process includes:
- Code splitting for optimal loading
- Tree shaking to remove unused code
- Asset optimization (images, fonts)
- CSS optimization and minification
- TypeScript compilation and type checking

## Deployment Options

### 1. Vercel (Recommended)

**Automatic Deployment:**

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. Set environment variables in Vercel dashboard
4. Deploy automatically on git push

**Manual Deployment:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 2. Netlify

**Automatic Deployment:**

1. Connect GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

**netlify.toml:**
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 3. AWS S3 + CloudFront

**Setup Process:**

1. Create S3 bucket with static website hosting
2. Configure CloudFront distribution
3. Set up Route 53 for custom domain

**AWS CLI Deployment:**

```bash
# Build the project
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

**Deployment Script (deploy.sh):**
```bash
#!/bin/bash
set -e

echo "Building application..."
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://your-vms-bucket --delete --cache-control max-age=31536000,public

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id E1234567890123 --paths "/*"

echo "Deployment complete!"
```

### 4. Firebase Hosting

**Setup:**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting
```

**firebase.json:**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

**Deploy:**
```bash
# Build and deploy
npm run build
firebase deploy --only hosting
```

### 5. Docker Deployment

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Referrer-Policy strict-origin-when-cross-origin;

        # Gzip compression
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    }
}
```

**Build and Deploy:**
```bash
# Build Docker image
docker build -t vms-app .

# Run container
docker run -p 80:80 vms-app

# Deploy to registry
docker tag vms-app your-registry/vms-app:latest
docker push your-registry/vms-app:latest
```

## Production Configuration

### Performance Optimization

1. **Code Splitting:**
   - Implemented via Vite's dynamic imports
   - Separate chunks for vendor libraries
   - Route-based code splitting

2. **Asset Optimization:**
   - Image compression and WebP format
   - Font loading optimization
   - CSS optimization

3. **Caching Strategy:**
   - Static assets: 1 year cache
   - HTML files: No cache
   - API responses: Appropriate cache headers

### Security Configuration

1. **Content Security Policy (CSP):**
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://www.google-analytics.com; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               connect-src 'self' https://api.your-domain.com;">
```

2. **Security Headers:**
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - X-XSS-Protection: 1; mode=block
   - Referrer-Policy: strict-origin-when-cross-origin

### Environment-Specific Configurations

**Development:**
```bash
VITE_DEBUG_MODE=true
VITE_API_URL=http://localhost:3001/api
VITE_LOG_LEVEL=debug
```

**Staging:**
```bash
VITE_DEBUG_MODE=false
VITE_API_URL=https://staging-api.your-domain.com/api
VITE_LOG_LEVEL=info
```

**Production:**
```bash
VITE_DEBUG_MODE=false
VITE_API_URL=https://api.your-domain.com/api
VITE_LOG_LEVEL=error
VITE_ANALYTICS_ENABLED=true
```

## Monitoring and Maintenance

### Performance Monitoring

1. **Web Vitals Tracking:**
   - Core Web Vitals monitoring
   - Performance API integration
   - Real User Monitoring (RUM)

2. **Error Tracking:**
   - JavaScript error monitoring
   - Network request monitoring
   - User session recording

3. **Analytics:**
   - Google Analytics integration
   - Custom event tracking
   - User behavior analysis

### Health Checks

**Basic Health Check Endpoint:**
```javascript
// public/health.json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-01-20T10:30:00Z"
}
```

### Backup and Recovery

1. **Data Backup:**
   - Regular database backups
   - Configuration backups
   - Asset backups

2. **Disaster Recovery:**
   - Multi-region deployment
   - Automated failover
   - Recovery procedures

### Maintenance Tasks

**Regular Maintenance:**
- Dependency updates
- Security patches
- Performance optimization
- Log rotation
- Cache clearing

**Automated Maintenance Script:**
```bash
#!/bin/bash
# maintenance.sh

echo "Starting maintenance tasks..."

# Update dependencies
npm audit fix

# Clear caches
npm run cache:clear

# Run tests
npm test

# Build and deploy
npm run build
npm run deploy

echo "Maintenance completed!"
```

## Troubleshooting

### Common Issues

1. **Build Failures:**
   - Check Node.js version compatibility
   - Verify environment variables
   - Clear node_modules and reinstall

2. **Routing Issues:**
   - Ensure proper SPA routing configuration
   - Check server-side redirects
   - Verify base URL configuration

3. **Performance Issues:**
   - Analyze bundle size
   - Check for memory leaks
   - Optimize images and assets

### Debug Commands

```bash
# Analyze bundle size
npm run build -- --analyze

# Run performance audit
npm run lighthouse

# Check for unused dependencies
npm run depcheck

# Security audit
npm audit
```

## Support and Resources

- **Documentation:** [Project Wiki](https://github.com/Saranshaga/visitor-management-system/wiki)
- **Issues:** [GitHub Issues](https://github.com/Saranshaga/visitor-management-system/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Saranshaga/visitor-management-system/discussions)
- **Support:** your.email@example.com

---

For additional deployment support or custom configurations, please refer to the project documentation or create an issue in the GitHub repository.