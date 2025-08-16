#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

console.log('🔧 Fixing Tailwind CSS v4 setup...\n');

try {
  // Step 1: Install required dependencies
  console.log('📦 Installing Tailwind CSS v4 dependencies...');
  execSync('npm install -D tailwindcss@4.0.0-alpha.26 @tailwindcss/postcss@4.0.0-alpha.26 autoprefixer@^10.4.16 postcss@^8.4.31', { 
    stdio: 'inherit' 
  });

  // Step 2: Remove conflicting config files
  console.log('\n🗑️  Removing conflicting config files...');
  const configFiles = ['tailwind.config.ts', 'tailwind.config.js'];
  
  configFiles.forEach(file => {
    if (existsSync(file)) {
      unlinkSync(file);
      console.log(`   ✅ Removed ${file}`);
    }
  });

  // Step 3: Clear caches
  console.log('\n🧹 Clearing caches...');
  try {
    execSync('rm -rf .vite dist', { stdio: 'inherit' });
    console.log('   ✅ Cleared Vite cache');
  } catch (error) {
    console.log('   ⚠️  Could not clear cache (this is okay)');
  }

  console.log('\n✅ Tailwind CSS v4 setup complete!');
  console.log('\n🚀 Next steps:');
  console.log('   1. Restart your development server: npm run dev');
  console.log('   2. If you still get errors, run: rm -rf node_modules package-lock.json && npm install');
  console.log('   3. Check that your postcss.config.js uses "@tailwindcss/postcss"');

} catch (error) {
  console.error('❌ Error fixing Tailwind setup:', error.message);
  console.log('\n🔍 Manual steps:');
  console.log('   1. Run: npm install -D tailwindcss@4.0.0-alpha.26 @tailwindcss/postcss@4.0.0-alpha.26 autoprefixer');
  console.log('   2. Remove: tailwind.config.ts (if it exists)');
  console.log('   3. Verify: postcss.config.js uses correct plugins');
  console.log('   4. Restart: npm run dev');
  process.exit(1);
}