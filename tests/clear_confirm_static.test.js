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
  'function rememberClearSnapshot(',
  'function restoreLastClear(',
  'rememberClearSnapshot(\'nav\'',
  'rememberClearSnapshot(\'contact\'',
  'rememberClearSnapshot(\'format\'',
  'rememberClearSnapshot(\'textproc\'',
  'rememberForbiddenWordsSnapshot()',
  'onclick="restoreLastClear(\'nav\')"',
  'onclick="restoreLastClear(\'contact\')"',
  'onclick="restoreLastClear(\'format\')"',
  'onclick="restoreLastClear(\'textproc\')"',
  'onclick="restoreForbiddenWords()"',
].forEach((needle) => {
  assert.ok(html.includes(needle), `clear undo should include ${needle}`);
});

assert.ok(!html.includes('function confirmClearIfNeeded('), 'clear actions should not require confirmation anymore');
assert.ok(!html.includes('confirm(message)'), 'clear actions should not call confirm anymore');
assert.ok(!html.includes("confirm('确定清空全部禁词？')"), 'forbidden word clearing should not require confirmation anymore');
assert.ok(html.includes('撤回'), 'clear action bars should expose undo buttons');
assert.ok(readme.includes('撤回'), 'README should document clear undo');

console.log('clear undo static checks passed');
