const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.ok(
  html.includes('function splitTopLevelBreaksToParagraphs'),
  'formatter should split top-level inline <br> content into paragraphs'
);

assert.ok(
  /splitTopLevelBreaksToParagraphs\(container\);\r?\n                wrapTopLevelInlineContentInParagraphs\(container\);\r?\n                cleanupStructure\(container\);/.test(html),
  'formatter should preserve pasted br line breaks before cleanup removes remaining br tags'
);

console.log('format br paragraph static checks passed');
