const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

[
  '服务热线',
  '咨询热线',
  '办公地址',
  'box_lianxi',
  'detectContactCandidates',
  'scoreBlockType',
  'findColonTextNode',
  'replaceTextPreservingLabel',
  'getContactReplacementValues',
].forEach((needle) => {
  assert.ok(html.includes(needle), `contact replacement should include ${needle}`);
});

assert.ok(html.includes('window.SiteToolboxCore.parseContactText'), 'contact parsing should delegate to the shared core when available');
assert.ok(html.includes('writeClipboardText'), 'copy actions should use guarded clipboard writes');
assert.ok(html.includes("links[i].setAttribute('href', 'tel:' + newValue)"), 'telephone hrefs should use tel:');
assert.ok(html.includes("links[i].setAttribute('href', 'mailto:' + newValue)"), 'email hrefs should use mailto:');
assert.ok(html.includes("type === 'landline' && contactData.phone"), 'landline templates should fall back to phone data');
assert.ok(html.includes("type === 'phone' && contactData.landline"), 'phone templates should fall back to landline data');
assert.ok(html.includes('[class*="neirong"]'), '71360 value spans should be treated as replaceable value nodes');
assert.ok(html.includes('img, svg'), 'image and SVG icons should participate in contact type detection');

console.log('contact replacement static checks passed');
