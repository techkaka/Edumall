#!/usr/bin/env node

/**
 * Check for versioned imports in UI components
 * This script helps identify import issues that could break the build
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '..', 'components', 'ui');

const checkVersionedImports = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const issues = [];

    lines.forEach((line, index) => {
      // Check for versioned imports (e.g., @radix-ui/react-something@1.2.3)
      const versionedImportMatch = line.match(/from\s+["']([^"']+@\d+\.\d+\.\d+)["']/);
      if (versionedImportMatch) {
        issues.push({
          line: index + 1,
          content: line.trim(),
          package: versionedImportMatch[1],
          fix: line.replace(/@\d+\.\d+\.\d+/, '')
        });
      }
    });

    return issues;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
};

const main = () => {
  console.log('🔍 Checking for versioned imports in UI components...\n');

  let totalIssues = 0;
  const files = fs.readdirSync(COMPONENTS_DIR)
    .filter(file => file.endsWith('.tsx'))
    .sort();

  files.forEach(file => {
    const filePath = path.join(COMPONENTS_DIR, file);
    const issues = checkVersionedImports(filePath);

    if (issues.length > 0) {
      console.log(`❌ ${file}:`);
      issues.forEach(issue => {
        console.log(`  Line ${issue.line}: ${issue.content}`);
        console.log(`  Package: ${issue.package}`);
        console.log(`  Fix: ${issue.fix.trim()}`);
        console.log('');
      });
      totalIssues += issues.length;
    } else {
      console.log(`✅ ${file}: No issues found`);
    }
  });

  console.log('\n' + '='.repeat(60));
  if (totalIssues === 0) {
    console.log('🎉 All components are clean! No versioned imports found.');
  } else {
    console.log(`⚠️ Found ${totalIssues} versioned import(s) that need fixing.`);
    console.log('\nTo fix these issues:');
    console.log('1. Remove the version number from the import statement');
    console.log('2. Example: "@radix-ui/react-dialog@1.0.5" → "@radix-ui/react-dialog"');
    console.log('3. Save the file and re-run this check');
  }
  console.log('='.repeat(60));

  process.exit(totalIssues > 0 ? 1 : 0);
};

// Run the check if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = { checkVersionedImports, main };