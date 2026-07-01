const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.ok(
  html.includes('function wrapTopLevelInlineContentInParagraphs'),
  'formatter should wrap pasted plain text or top-level inline content in paragraphs'
);

assert.ok(
  html.includes('wrapTopLevelInlineContentInParagraphs(container);\n                cleanupStructure(container);'),
  'formatter should create paragraphs before cleanup and paragraph indentation run'
);

assert.ok(
  !html.includes('if (!changed) return;\n                el.innerHTML = \'\';\n                el.appendChild(fragment);'),
  'formatter should append existing block nodes back after inspecting top-level inline content'
);

console.log('format plain text static checks passed');
