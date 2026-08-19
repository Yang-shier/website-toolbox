const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.ok(
  html.includes('var source = output || input;'),
  'the next text-processing action should start from the previous result'
);
assert.ok(
  html.includes('function resetTextprocChain()'),
  'editing source text should reset the text-processing chain'
);

console.log('text processing chain static checks passed');
