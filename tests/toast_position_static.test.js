const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs.readdirSync(root).find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.match(
  html,
  /\.toast\s*\{[\s\S]*?position:\s*fixed;[\s\S]*?bottom:\s*96px;/,
  'global toast should stay above every page bottom action bar'
);
assert.match(
  html,
  /\.toast\s*\{[\s\S]*?transform:\s*translateX\(-50%\)\s+translateY\(calc\(100%\s*\+\s*120px\)\);/,
  'hidden toast should clear both its own height and the elevated bottom offset'
);

console.log('toast position static checks passed');
