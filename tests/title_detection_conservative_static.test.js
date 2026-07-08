const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.ok(
  html.includes('function hasTitleEvidence'),
  'subtitle detection should require explicit title evidence instead of short text alone'
);

assert.ok(
  html.includes('if (!hasTitleEvidence(context, titleRule)) return;'),
  'subtitle detection should skip candidates without title evidence'
);

console.log('title detection conservative static checks passed');
