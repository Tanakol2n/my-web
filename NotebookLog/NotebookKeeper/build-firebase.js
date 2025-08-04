const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔥 Building project for Firebase deployment...');

// 1. Build the React frontend
console.log('📦 Building React frontend...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Frontend build completed');
} catch (error) {
  console.error('❌ Frontend build failed:', error.message);
  process.exit(1);
}

// 2. Create functions directory structure if it doesn't exist
const functionsDir = path.join(__dirname, 'functions');
const functionsSrcDir = path.join(functionsDir, 'src');

if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir);
}
if (!fs.existsSync(functionsSrcDir)) {
  fs.mkdirSync(functionsSrcDir);
}

// 3. Copy server code to functions/src
console.log('📁 Copying server code to functions...');
const serverFiles = [
  { src: 'server/routes.ts', dest: 'functions/src/routes.ts' },
  { src: 'server/storage.ts', dest: 'functions/src/storage.ts' },
  { src: 'shared/schema.ts', dest: 'functions/src/types.ts' }
];

serverFiles.forEach(({ src, dest }) => {
  if (fs.existsSync(src)) {
    let content = fs.readFileSync(src, 'utf8');
    
    // Transform imports for Firebase Functions
    if (dest.includes('routes.ts')) {
      content = content.replace(
        'import { storage } from "./storage";',
        '// Storage is injected via parameter'
      );
      content = content.replace(
        'export async function registerRoutes(app: Express): Promise<http.Server> {',
        'export function registerApiRoutes(app: Express, storage: IStorage): void {'
      );
    }
    
    if (dest.includes('storage.ts')) {
      content = content.replace(
        'import { notebooks } from "@shared/schema";',
        '// Using simplified types for Firebase'
      );
    }
    
    fs.writeFileSync(dest, content);
    console.log(`✅ Copied ${src} to ${dest}`);
  }
});

console.log('🎉 Firebase build preparation completed!');
console.log('\n📋 Next steps:');
console.log('1. Update .firebaserc with your Firebase project ID');
console.log('2. Install Firebase CLI: npm install -g firebase-tools');
console.log('3. Login to Firebase: firebase login');
console.log('4. Deploy: firebase deploy');