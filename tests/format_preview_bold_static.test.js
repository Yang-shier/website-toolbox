const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.ok(
  /onclick="togglePreviewBold\(\)"[\s\S]*?<strong>B<\/strong>/.test(html),
  'output toolbar should expose a bold toggle button'
);
assert.ok(
  /onmousedown="event\.preventDefault\(\)"[\s\S]*?onclick="togglePreviewBold\(\)"/.test(html),
  'bold toolbar button should preserve the preview selection while clicked'
);
assert.ok(html.includes('function togglePreviewBold()'), 'preview bold toggle function should exist');
assert.ok(
  /savedFormatPreviewRange[\s\S]*?selectionchange/.test(html),
  'preview should remember the last non-collapsed selection for toolbar actions'
);
assert.ok(
  /function restorePreviewSelection\(\)[\s\S]*?selection\.addRange/.test(html),
  'bold toggle should be able to restore the saved preview selection'
);
assert.ok(
  /function togglePreviewBold\(\)[\s\S]*?window\.getSelection\(\)/.test(html),
  'bold toggle should operate on the current selection'
);
assert.ok(
  /function togglePreviewBold\(\)[\s\S]*?document\.execCommand\('bold'/.test(html),
  'bold toggle should use the browser editing command for rich-text selections'
);
assert.ok(
  /function togglePreviewBold\(\)[\s\S]*?syncFormatPreviewToSource\(\)/.test(html),
  'bold toggle should keep output source synchronized after editing the preview'
);

console.log('format preview bold static checks passed');
