// Link Validation Script
// Checks that all relative Markdown links resolve to existing files
// No external dependencies required

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EXCLUDE_DIRS = ['node_modules', 'hive-ad', 'assets/promo', '.git'];

let errors = 0;
let checked = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(entry.name)) walk(full);
    } else if (entry.name.endsWith('.md')) {
      checkLinks(full);
    }
  }
}

function checkLinks(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const fileDir = path.dirname(filePath);
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const link = match[2];
    // Skip absolute URLs, fragments, mailto
    if (link.startsWith('http://') || link.startsWith('https://') ||
        link.startsWith('mailto:') || link.startsWith('#')) continue;

    // Resolve relative to the file's directory
    const resolved = path.resolve(fileDir, link);
    checked++;
    if (!fs.existsSync(resolved)) {
      const rel = path.relative(ROOT, filePath);
      console.error(`BROKEN: ${rel} -> ${link} (not found)`);
      errors++;
    }
  }
}

console.log('Validating Markdown links...\n');
walk(ROOT);
console.log(`\nChecked ${checked} links, ${errors} broken`);
process.exit(errors > 0 ? 1 : 0);
