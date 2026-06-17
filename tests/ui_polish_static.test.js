const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

[
  '.header-main',
  '.header-meta',
  '.tab-group::-webkit-scrollbar',
  'overflow-x: auto;',
  'padding: 18px 24px !important;',
  'padding: 12px 16px !important;',
  '.contact-actions-bar .btn',
].forEach((needle) => {
  assert.ok(html.includes(needle), `light UI polish should include ${needle}`);
});

assert.ok(html.includes('<div class="header-main">'), 'header should group brand and tabs together');
assert.ok(html.includes('<div class="header-meta">'), 'header should group update summary and workspace actions together');
assert.ok(html.includes('white-space: nowrap;'), 'compact controls should avoid awkward text wrapping');

console.log('ui polish static checks passed');
