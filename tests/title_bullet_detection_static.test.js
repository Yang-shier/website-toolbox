const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.ok(
  html.includes('function stripTitleBullet'),
  'auto title detection should strip leading bullet markers before scoring'
);

assert.ok(
  html.includes('var titleText = stripTitleBullet(text, bulletRe);'),
  'auto title detection should score the title text without its bullet marker'
);

assert.ok(
  !html.includes('if (bulletRe.test(text)) return false;'),
  'bullet-prefixed short headings should not be rejected before scoring'
);

console.log('title bullet detection static checks passed');
