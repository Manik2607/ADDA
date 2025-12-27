# MongoDB Migration Guide

## Overview

The ADDA application has been migrated from Firebase Firestore to MongoDB for data storage, while retaining Firebase Authentication for user management.

## What Changed

### ✅ Kept (Firebase)

- **Authentication**: Firebase Auth for admin login
- User email/password authentication
- Admin role checking

### ✅ Changed (MongoDB)

- **Database**: Firestore → MongoDB
- Post storage and retrieval
- CRUD operations via REST API

### ✅ Changed (Cloudinary)

- **Storage**: Firebase Storage → Cloudinary
- Image and video uploads
- Media hosting

## Setup Steps

### 1. Get MongoDB Connection String

You need a MongoDB Atlas (free tier) account:

1. **Create Account**:

   - Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
   - Sign up with your email

2. **Create Free Cluster**:

   - Click "Build a Database"
   - Choose **FREE** (M0 Sandbox)
   - Select a cloud provider and region (closest to you)
   - Click "Create Cluster"

3. **Create Database User**:

   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `adda_admin`
   - Password: (generate a strong password - SAVE IT!)
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

4. **Whitelist IP Address**:

   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**:
   - Click "Database" in left sidebar
   - Click "Connect" on your cluster
   - Click "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://adda_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual database user password

### 2. Update .env.local

Open `.env.local` and update:

```env
# Replace with your actual MongoDB connection string
MONGODB_URI=mongodb+srv://adda_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=adda
```

### 3. Verify Cloudinary Setup

Make sure you've created the upload preset in Cloudinary:

1. Go to [https://console.cloudinary.com/settings/upload](https://console.cloudinary.com/settings/upload)
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Name: `adda_uploads`
5. Signing Mode: **Unsigned**
6. Folder: `adda` (optional)
7. Click "Save"

## New Architecture

### Data Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ├── Authentication ──→ Firebase Auth
       │
       ├── Media Upload ───→ Cloudinary
       │
       └── Data Storage ───→ MongoDB (via API Routes)
                              └─→ /api/posts (GET, POST)
                              └─→ /api/posts/[id] (DELETE)
```

### API Routes

The app now uses Next.js API routes instead of direct database access:

1. **GET /api/posts** - Fetch all posts (sorted by newest first)
2. **POST /api/posts** - Create new post
   ```json
   {
     "title": "Post Title",
     "description": "Post description",
     "mediaUrl": "https://res.cloudinary.com/...",
     "mediaType": "image"
   }
   ```
3. **DELETE /api/posts/[id]** - Delete post by ID

### Database Schema

MongoDB `posts` collection:

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  mediaUrl: String,
  mediaType: "image" | "video",
  createdAt: Date,
  updatedAt: Date
}
```

## Testing the Migration

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Test Flow

1. **Login**: Go to `/login` and sign in with `maniksharma2607@gmail.com`
2. **Upload**:
   - Click "Click to upload image or video"
   - Select a file from your computer
   - Add title and description
   - Click "Upload Post"
3. **Verify**: Check console logs for MongoDB confirmation
4. **View**: Go to homepage `/` to see the post
5. **Delete**: In admin dashboard, click "Delete" on a post

### Expected Console Logs

#### On Upload:

```
=== UPLOAD STARTED ===
Media URL: https://res.cloudinary.com/...
Saving post data to MongoDB...
✅ Post saved to MongoDB with ID: 64a1b2c3d4e5f6a7b8c9d0e1
Refreshing posts list...
Fetching posts from MongoDB...
✅ Posts fetched: 1
=== UPLOAD COMPLETE ===
```

#### On Homepage Load:

```
Fetching posts from /api/posts...
✅ Posts loaded: 1
```

## Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoServerError: bad auth`

- **Solution**: Double-check your username and password in MONGODB_URI

**Error**: `MongoServerSelectionError`

- **Solution**: Make sure you whitelisted your IP address (0.0.0.0/0 for development)

**Error**: `ECONNREFUSED`

- **Solution**: Check your internet connection and MongoDB Atlas status

### API Route Issues

**Error**: `Failed to fetch posts`

- **Solution**: Check browser console and terminal for error details
- Make sure MongoDB connection string is correct

**Error**: `500 Internal Server Error`

- **Solution**: Check Next.js terminal logs for MongoDB connection errors

### Cloudinary Upload Issues

**Error**: `Upload preset not found`

- **Solution**: Create upload preset named `adda_uploads` in Cloudinary console

## Removing Firebase Firestore (Optional)

If you want to completely remove Firestore dependencies:

```bash
npm uninstall firebase
npm install firebase@latest --save
```

Then update `package.json` to only include firebase auth:

```json
{
  "dependencies": {
    "firebase": "^10.x.x" // Keeps auth but you won't use firestore/storage
  }
}
```

## Files Modified

- ✅ `app/admin/page.tsx` - Now uses /api/posts
- ✅ `app/page.tsx` - Now fetches from /api/posts
- ✅ `lib/firebase.ts` - Removed db and storage exports
- ✅ `lib/mongodb.ts` - New MongoDB connection handler
- ✅ `models/Post.ts` - New Mongoose schema
- ✅ `app/api/posts/route.ts` - New API endpoints
- ✅ `app/api/posts/[id]/route.ts` - New delete endpoint
- ✅ `.env.local` - Added MongoDB variables

## Next Steps

1. ✅ Provide MongoDB connection string
2. ✅ Create Cloudinary upload preset
3. ✅ Test complete upload flow
4. ⏳ Deploy to Vercel (update NEXT_PUBLIC_BASE_URL to production URL)

## Benefits of This Migration

✅ **Cleaner Architecture**: API routes provide separation between frontend and backend
✅ **Better Performance**: MongoDB queries are optimized for document storage
✅ **Easier Deployment**: MongoDB Atlas handles scaling automatically
✅ **Cost Effective**: Free tier supports up to 512MB storage
✅ **Flexible Schema**: Easy to add new fields to posts in the future
