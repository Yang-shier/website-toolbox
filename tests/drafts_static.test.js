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
  'TOOLBOX_DRAFT_KEY',
  'function getDraftFields()',
  'function loadDrafts()',
  'function saveDraftField(',
  'function restoreDrafts()',
  'function bindDraftAutosave()',
  'function clearDraftFields(',
  'restoreDrafts();',
  'bindDraftAutosave();',
].forEach((needle) => {
  assert.ok(html.includes(needle), `draft autosave should include ${needle}`);
});

[
  'sourceInput',
  'templateInput',
  'contactInput',
  'contactCodeInput',
  'textprocInput',
  'richInput',
  'codeInput',
  'specifiedTitleWords',
  'specifiedBoldWords',
  'specifiedClassWords',
  'specifiedClassName',
].forEach((id) => {
  assert.ok(html.includes(`id: '${id}'`), `${id} should be included in draft autosave`);
});

assert.ok(html.includes('自动保存'), 'visible update summary should mention autosave');
assert.ok(readme.includes('自动保存草稿'), 'README should document autosave');

console.log('draft static checks passed');
