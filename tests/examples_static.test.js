const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

[
  'fillNavExample',
  'fillContactExample',
  'fillTextprocExample',
  'fillFormatExample',
].forEach((name) => {
  assert.ok(html.includes(`function ${name}()`), `${name} should be implemented`);
  assert.ok(html.includes(`onclick="${name}()"`), `${name} should be wired to a visible button`);
});

assert.ok((html.match(/填入示例/g) || []).length >= 4, 'each major tool should expose a visible example-fill action');
assert.ok(html.includes('.contact-actions-bar') && html.includes('flex-wrap: wrap;'), 'action bars should wrap after adding more visible actions');
assert.ok(html.includes('extractNav();'), 'nav example should immediately extract sample navigation data');
assert.ok(html.includes('extractContact();'), 'contact example should immediately extract sample contact data');
assert.ok(html.includes("switchFormatInputTab('code');"), 'format example should use source-code mode so unsafe demo HTML is not executed');
assert.ok(html.includes("document.getElementById('codeInput').value = window.SiteToolboxExamples.formatHtml"), 'format example should place demo HTML in the source textarea');
assert.ok(!html.includes("document.getElementById('richInput').innerHTML = window.SiteToolboxExamples.formatHtml"), 'format example should not render unsafe demo HTML directly');

console.log('example static checks passed');
