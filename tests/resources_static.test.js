const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');
const scriptMatches = Array.from(html.matchAll(/<script\s+src=["'](.+?)["']><\/script>/g));

assert.ok(scriptMatches.length > 0, 'page should declare external scripts explicitly');

scriptMatches.forEach((match) => {
  const src = match[1];
  assert.ok(!/^https?:\/\//i.test(src), `external network scripts should not be required: ${src}`);
  const scriptPath = path.resolve(root, src.replace(/^\.\//, ''));
  assert.ok(fs.existsSync(scriptPath), `script should exist: ${src}`);
});

const core = require('../src/toolbox-core');
const storage = require('../src/toolbox-storage');
assert.strictEqual(typeof core.parseNavSource, 'function', 'core should export parseNavSource');
assert.strictEqual(typeof core.getNavSourceDiagnostics, 'function', 'core should export getNavSourceDiagnostics');
assert.strictEqual(typeof core.parseContactText, 'function', 'core should export parseContactText');
assert.strictEqual(typeof core.applyForbiddenWords, 'function', 'core should export applyForbiddenWords');
assert.strictEqual(typeof core.transformText, 'function', 'core should export transformText');
assert.strictEqual(typeof core.sanitizeElement, 'function', 'core should export sanitizeElement');
assert.strictEqual(typeof core.sanitizeHTMLString, 'function', 'core should export sanitizeHTMLString');
assert.strictEqual(typeof core.formatHTMLSource, 'function', 'core should export formatHTMLSource');
assert.strictEqual(typeof core.splitImageTextParagraphHTML, 'function', 'core should export splitImageTextParagraphHTML');
assert.strictEqual(typeof storage.loadDrafts, 'function', 'storage should export loadDrafts');
assert.strictEqual(typeof storage.collectWorkspaceDrafts, 'function', 'storage should export collectWorkspaceDrafts');

console.log('resource static checks passed');
