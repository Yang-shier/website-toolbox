const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

[
  'function setSafeHTML(',
  'setSafeHTML(el, drafts[field.id]);',
  'setSafeHTML(el, value || \'\');',
  'setSafeHTML(rich, code.value);',
].forEach((needle) => {
  assert.ok(html.includes(needle), `HTML restore safety should include ${needle}`);
});

assert.ok(!html.includes("rich.innerHTML = code.value;"), 'switching source code into rich mode should not assign raw HTML');
assert.ok(!html.includes("el.innerHTML = drafts[field.id];"), 'draft restore should not assign raw HTML');
assert.ok(!html.includes("else el.innerHTML = value || '';"), 'undo restore should not assign raw HTML');

console.log('html restore safety static checks passed');
