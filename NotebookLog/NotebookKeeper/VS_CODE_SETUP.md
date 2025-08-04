# VS Code Setup Instructions

This project was originally built for Replit but can be run locally in VS Code. Follow these steps:

## Prerequisites

1. **Install Node.js** (version 18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

2. **Install VS Code** 
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)

## Setup Steps

### 1. Extract and Open Project
```bash
# Extract the downloaded files to a folder
# Open the folder in VS Code
code /path/to/notebook-management-system
```

### 2. Install Dependencies
```bash
# Open terminal in VS Code (Ctrl+` or View > Terminal)
npm install
```

### 3. Start the Application

**Option A: Full Development Mode (Recommended)**
```bash
npm run dev
```
Then open `http://localhost:5000` in your browser.

**Option B: Separate Frontend/Backend (Alternative)**
```bash
# Terminal 1: Start backend server
npm run dev:server

# Terminal 2: Start frontend (in a new terminal)
npm run dev:client
```
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors**
   ```bash
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Port already in use**
   - Change port in `server/index.ts` (line ~8)
   - Or kill the process using the port:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID_NUMBER> /F
   
   # Mac/Linux  
   lsof -ti:5000 | xargs kill -9
   ```

3. **Vite build errors**
   ```bash
   # Use the local vite config
   npx vite --config vite.config.local.ts
   ```

4. **TypeScript errors**
   ```bash
   # Check types
   npm run check
   ```

### File Structure After Setup
```
notebook-management-system/
├── client/              # Frontend React app
├── server/              # Backend Express app  
├── shared/              # Shared types
├── node_modules/        # Dependencies
├── package.json         # Project config
├── README.md           # Main documentation
├── VS_CODE_SETUP.md    # This file
└── vite.config.local.ts # Local Vite config
```

## Development Tips

1. **Auto-restart**: The server automatically restarts when you make changes
2. **Hot reload**: The frontend updates instantly when you edit React components
3. **API testing**: Use `http://localhost:5000/api/notebooks` to test the API
4. **Database**: Currently uses in-memory storage (data resets on restart)

## VS Code Extensions (Recommended)

Install these extensions for better development experience:
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Need Help?

1. Check the browser console for errors (F12)
2. Check the VS Code terminal for server errors
3. Ensure all dependencies are installed
4. Try restarting VS Code and running `npm install` again

## Features Available

✅ Add/Edit/Delete notebooks
✅ Search and filter
✅ Export to Excel
✅ Status tracking with colors
✅ Pagination
✅ Responsive design
✅ Department text input
✅ Remark column with text wrapping