const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.ok(html.includes('id="navExampleTrigger"'), 'source nav header should include an example hover trigger');
assert.ok(html.includes('window.SiteToolboxCore.parseNavSource'), 'nav parsing should delegate to the shared core when available');
assert.ok(html.includes('window.SiteToolboxCore.getNavSourceDiagnostics'), 'nav extraction failures should use shared diagnostics');
assert.ok(html.includes('class="nav-example-popover"'), 'source nav header should include an example popover');
assert.ok(html.includes('class="contact-panel nav-source-panel"'), 'source nav panel should allow the hover example to overflow');
assert.ok(html.includes('.nav-source-panel'), 'source nav panel should have dedicated overflow styling');
assert.ok(html.includes('overflow: visible;'), 'source nav hover example should not be clipped by the panel');
assert.ok(html.includes('&lt;div class=&quot;basic_navbar'), 'example popover should show copying from the full basic_navbar element');
assert.ok(html.includes('&lt;div class=&quot;navContent&quot;&gt;'), 'example popover should show the navContent block inside basic_navbar');
assert.ok(html.includes('&lt;div class=&quot;childrenData'), 'example popover should show the childrenData block inside basic_navbar');

assert.ok(html.includes('id="childProductLimit"'), 'nav fill page should include a child product limit input');
assert.ok(html.includes('type="number"'), 'child product limit should be a numeric input');
assert.ok(html.includes('min="1"'), 'child product limit should prevent values below 1 in the UI');
assert.ok(html.includes('value="4"'), 'child product limit should default to 4');

assert.ok(html.includes('function getChildProductLimit()'), 'generation should read child product limit through a helper');
assert.ok(html.includes('childrenToUse.length > childLimit + 1'), 'overflow threshold should be based on the configured limit');
assert.ok(html.includes('childrenToUse.slice(0, childLimit)'), 'rendered children should be capped by the configured limit');
assert.ok(!html.includes('childrenToUse.length > 5'), 'hard-coded child product overflow threshold should be removed');
assert.ok(!html.includes('childrenToUse.slice(0, 4)'), 'hard-coded child product cap should be removed');

console.log('nav fill static checks passed');
