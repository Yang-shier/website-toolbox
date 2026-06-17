const assert = require('assert');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', '建站工具箱.html'), 'utf8');

assert.ok(html.includes('data-tab="imageReplace"'), 'header should include image replacement tab');
assert.ok(html.includes('id="imageReplacePage"'), 'page should include image replacement workspace');
assert.ok(html.includes('id="imageLinksInput"'), 'new image links input should exist');
assert.ok(html.includes('id="imageCodeInput"'), 'source code input should exist');
assert.ok(html.includes('id="imageReplaceOutput"'), 'replacement output should exist');
assert.ok(html.includes('name="imageReplaceMode"'), 'replacement mode controls should exist');
assert.ok(html.includes('function replaceImageLinks()'), 'replace action should be implemented');
assert.ok(html.includes("restoreLastClear('imageReplace')"), 'clear undo should be wired');
assert.ok(html.includes("clearDraftFields(['imageLinksInput', 'imageCodeInput']);"), 'draft cleanup should include image replacement inputs');

console.log('image link replacement static checks passed');
