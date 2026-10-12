const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');
const analyzeBlock = html.match(/function analyzeBlock\(block\) \{([\s\S]*?)\n            \}/);

assert.ok(analyzeBlock, 'nav template block analyzer is present');
assert.match(
  analyzeBlock[1],
  /childItems\.length === 0[\s\S]*?UL[\s\S]*?OL[\s\S]*?childItems\s*=/,
  'nested ul/ol child lists should be recognized as second-level template items'
);
assert.match(
  analyzeBlock[1],
  /:scope > a\[href\]/,
  'nested list detection should only treat direct child links as second-level items'
);

console.log('nested list navigation template static checks passed');
