const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');

[
  'function hasClearableContent(',
  'function confirmClearIfNeeded(',
  'confirmClearIfNeeded([\'sourceInput\', \'templateInput\', \'outputArea\']',
  'confirmClearIfNeeded([\'contactInput\', \'contactCodeInput\', \'contactOutput\']',
  'confirmClearIfNeeded([\'richInput\', \'codeInput\', \'fmtPreview\', \'fmtOutputSource\']',
  'confirmClearIfNeeded([\'textprocInput\', \'textprocOutput\']',
  'confirm(message)',
].forEach((needle) => {
  assert.ok(html.includes(needle), `clear confirmation should include ${needle}`);
});

assert.ok(html.includes('防误清空'), 'visible update summary should mention guarded clearing');
assert.ok(readme.includes('防误清空'), 'README should document guarded clearing');

console.log('clear confirmation static checks passed');
