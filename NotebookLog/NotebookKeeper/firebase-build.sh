#!/bin/bash

echo "🔥 Building project for Firebase deployment..."

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

# Build the React frontend
echo "📦 Building React frontend..."
if npm run build; then
    echo "✅ Frontend build completed"
else
    echo "❌ Frontend build failed"
    exit 1
fi

# Install Firebase Functions dependencies
echo "📦 Installing Firebase Functions dependencies..."
cd functions
if npm install; then
    echo "✅ Functions dependencies installed"
else
    echo "❌ Functions dependencies installation failed"
    exit 1
fi
cd ..

echo "🎉 Build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update .firebaserc with your Firebase project ID"
echo "2. Install Firebase CLI: npm install -g firebase-tools"
echo "3. Login to Firebase: firebase login"
echo "4. Deploy: firebase deploy"
echo ""
echo "📁 Files ready for deployment:"
echo "  - Frontend: dist/public/"
echo "  - Functions: functions/"
echo "  - Config: firebase.json, .firebaserc"