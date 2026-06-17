const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');
const storagePath = path.join(root, 'src', 'toolbox-storage.js');

assert.ok(fs.existsSync(storagePath), 'storage module should exist');
assert.ok(html.includes('./src/toolbox-storage.js'), 'page should load the storage module');
assert.ok(html.includes('window.SiteToolboxStorage'), 'page should use the storage module when available');

const storage = require('../src/toolbox-storage');
[
  'loadDrafts',
  'saveDraftField',
  'clearDraftFields',
  'collectWorkspaceDrafts',
  'applyWorkspaceDrafts',
].forEach((key) => {
  assert.strictEqual(typeof storage[key], 'function', `${key} should be exported`);
});

const fields = [{ id: 'a', type: 'value' }, { id: 'b', type: 'html' }];
const fakeDom = {
  a: { value: 'alpha' },
  b: { innerHTML: '<p>beta</p>' },
};
const workspace = storage.collectWorkspaceDrafts(fields, (id) => fakeDom[id]);
assert.deepStrictEqual(workspace.fields, { a: 'alpha', b: '<p>beta</p>' });

console.log('storage module static checks passed');
