const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');
const cleanupStructure = html.match(
  /function cleanupStructure\(el\) \{[\s\S]*?function splitListItemIntoParagraphs/
);

assert.ok(cleanupStructure, 'cleanupStructure should exist');
assert.ok(
  cleanupStructure[0].includes("partContainer.querySelector('img, table')"),
  'br-separated image-only parts should be preserved during cleanup'
);

console.log('format image br static checks passed');
