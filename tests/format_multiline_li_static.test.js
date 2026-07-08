const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.ok(
  html.includes('function splitListItemIntoParagraphs'),
  'formatter should split multi-line list items before unwrapping lists'
);

assert.ok(
  html.includes('splitListItemIntoParagraphs(li);'),
  'list item cleanup should call the multi-line splitter'
);

console.log('format multiline list item static checks passed');
