const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

const actionsMatch = html.match(/<div class="contact-actions-bar textproc-actions">([\s\S]*?)<\/div>/);
assert.ok(actionsMatch, 'text processing page should have an action bar');
assert.ok(!actionsMatch[1].includes('btn-sm'), 'text processing action buttons should use the same size as other tool actions');

console.log('text processing button size static checks passed');
