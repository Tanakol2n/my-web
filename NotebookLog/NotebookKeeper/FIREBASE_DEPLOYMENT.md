# Firebase Hosting Deployment Guide

This guide will help you deploy the Notebook Management System to Firebase Hosting.

## Prerequisites

1. **Node.js** (version 16 or higher)
2. **Firebase CLI**: Install globally with `npm install -g firebase-tools`
3. **Firebase Project**: Create a project at [Firebase Console](https://console.firebase.google.com/)

## Setup Steps

### 1. Initialize Firebase Project

```bash
# Login to Firebase
firebase login

# Update .firebaserc with your project ID
# Replace "your-project-id" in .firebaserc with your actual Firebase project ID
```

### 2. Install Dependencies

```bash
# Install main project dependencies
npm install

# Install Firebase Functions dependencies
cd functions
npm install
cd ..
```

### 3. Build the Project

```bash
# Build the React frontend
npm run build

# This creates optimized files in dist/public/

# Install Firebase Functions dependencies
cd functions
npm install
cd ..
```

### 4. Deploy to Firebase

```bash
# Deploy everything (hosting + functions)
firebase deploy

# Or deploy only hosting
firebase deploy --only hosting

# Or deploy only functions
firebase deploy --only functions
```

## Project Structure for Firebase

```
notebook-management-system/
├── dist/public/              # Built frontend files (auto-generated)
├── functions/               # Firebase Functions
│   ├── src/
│   │   ├── index.ts        # Main function entry point
│   │   ├── routes.ts       # API routes
│   │   ├── storage.ts      # Data storage logic
│   │   └── types.ts        # TypeScript types
│   ├── package.json        # Functions dependencies
│   └── tsconfig.json       # TypeScript config
├── firebase.json           # Firebase configuration
├── .firebaserc            # Firebase project settings
└── ...rest of your project
```

## Configuration Files Explained

### `firebase.json`
- **hosting.public**: Points to `dist/public` (built frontend)
- **hosting.rewrites**: Routes API calls to Firebase Functions
- **functions.source**: Points to `functions` directory

### `functions/src/index.ts`
- Express.js app wrapped as a Firebase Function
- Handles all `/api/*` routes
- Uses in-memory storage (can be upgraded to Firestore)

## Environment Variables (Optional)

If you need environment variables for production:

```bash
# Set Firebase function configuration
firebase functions:config:set app.environment="production"

# Deploy again to apply changes
firebase deploy --only functions
```

## Custom Domain (Optional)

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the DNS setup instructions

## Monitoring and Logs

```bash
# View function logs
firebase functions:log

# View hosting analytics in Firebase Console
```

## Upgrading to Database Storage

The current setup uses in-memory storage. To upgrade to persistent storage:

1. **Option A: Firestore** (Recommended for Firebase)
   ```bash
   # Enable Firestore in Firebase Console
   # Update functions/src/storage.ts to use Firestore
   ```

2. **Option B: External Database**
   ```bash
   # Set database connection in Firebase Functions config
   firebase functions:config:set db.url="your-database-url"
   ```

## Troubleshooting

### Build Issues
```bash
# Clear build cache
rm -rf dist/ node_modules/
npm install
npm run build
```

### Function Deployment Issues
```bash
# Check functions folder
cd functions
npm run build
cd ..

# Deploy with debug logging
firebase deploy --only functions --debug
```

### CORS Issues
The functions are configured with CORS enabled for all origins. For production, consider restricting to your domain.

## Cost Considerations

- **Hosting**: Free tier includes 10GB storage, 125GB/month transfer
- **Functions**: Free tier includes 125K invocations/month, 40K GB-seconds/month
- **Firestore** (if used): Free tier includes 1GB storage, 50K reads/day

## Security Best Practices

1. **Authentication**: Consider adding Firebase Auth for user management
2. **API Security**: Add rate limiting and input validation
3. **CORS**: Restrict origins in production
4. **Environment Variables**: Use Firebase Functions config for sensitive data

## Commands Summary

```bash
# Setup
firebase login
npm install && cd functions && npm install && cd ..

# Build and Deploy
npm run build
firebase deploy

# Monitor
firebase functions:log
```

Your application will be available at: `https://your-project-id.web.app`

## Next Steps

1. Replace "your-project-id" in `.firebaserc` with your actual Firebase project ID
2. Run the build and deploy commands
3. Test your deployed application
4. Consider upgrading to Firestore for persistent data storage
5. Add authentication if needed for user management