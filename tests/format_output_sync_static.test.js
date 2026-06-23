const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.ok(html.includes('function syncFormatSourceToPreview'), 'source output edits should have a preview sync helper');
assert.ok(html.includes('function syncFormatPreviewToSource'), 'preview edits should have a source sync helper');
assert.ok(
  /currentFormatOutputTab === 'source' && tab === 'preview'[\s\S]*?syncFormatSourceToPreview\(false\)/.test(html),
  'switching from output source to preview should refresh the preview HTML'
);
assert.ok(
  /getElementById\('fmtOutputSource'\)\.addEventListener\('input'[\s\S]*?syncFormatSourceToPreview\(true\)/.test(html),
  'typing in the output source textarea should update the backing preview without rewriting the textarea'
);
assert.ok(
  /function syncFormatSourceToPreview\(preserveSourceValue\)[\s\S]*?sanitizeOutputHTML\(container\)/.test(html),
  'source-to-preview sync should sanitize edited HTML before rendering it'
);

console.log('format output sync static checks passed');
