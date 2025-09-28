# 🚀 Vercel Deployment Guide

## Prerequisites
1. Install Vercel CLI: `npm install -g vercel`
2. Create a Vercel account at https://vercel.com
3. Set up MongoDB Atlas (cloud database)

## Step 1: Setup MongoDB Atlas
1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Get your connection string
4. Whitelist all IPs (0.0.0.0/0) for demo purposes

## Step 2: Deploy to Vercel
1. Open terminal in project root
2. Run: `vercel login`
3. Run: `vercel`
4. Follow the prompts:
   - Link to existing project? No
   - Project name: school-clubs-platform
   - Directory: ./
   - Override settings? No

## Step 3: Set Environment Variables
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure secret key
   - `NODE_ENV`: production

## Step 4: Deploy
Run: `vercel --prod`

Your app will be live at: https://your-project-name.vercel.app