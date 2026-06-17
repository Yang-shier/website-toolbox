const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.ok(html.includes('function sanitizeOutputHTML'), 'formatter should define an unsafe HTML cleanup step');
assert.ok(html.includes('sanitizeOutputHTML(container);'), 'formatter should sanitize before rendering preview HTML');
assert.ok(html.includes('window.SiteToolboxCore.sanitizeElement'), 'formatter sanitizer should delegate to the shared core when available');
assert.ok(html.includes('script, iframe, object, embed'), 'sanitizer should remove executable/embed tags');
assert.ok(html.includes("attr.name.toLowerCase().indexOf('on') === 0"), 'sanitizer should remove inline event handlers');
assert.ok(html.includes("attr.name.toLowerCase() === 'srcdoc'"), 'sanitizer should remove iframe srcdoc-style payloads');

console.log('security static checks passed');
