const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');
const defaultsPath = path.join(root, 'forbidden-words.json');

assert.ok(fs.existsSync(defaultsPath), 'forbidden-words.json should be published with the site');

const defaults = JSON.parse(fs.readFileSync(defaultsPath, 'utf8'));
assert.ok(Array.isArray(defaults), 'forbidden-words.json should contain an array');
defaults.forEach((item, index) => {
  assert.strictEqual(typeof item.word, 'string', `default item ${index} should have a string word`);
  assert.ok(Object.prototype.hasOwnProperty.call(item, 'replacement'), `default item ${index} should include replacement`);
  assert.strictEqual(typeof item.replacement, 'string', `default item ${index} replacement should be a string`);
});

assert.ok(html.includes('DEFAULT_FORBIDDEN_WORDS_URL'), 'page should load the default forbidden words URL');
assert.ok(html.includes('./src/toolbox-core.js'), 'page should load the shared core module');
assert.ok(html.includes('window.SiteToolboxCore.applyForbiddenWords'), 'formatter should delegate forbidden-word replacement to the shared core when available');
assert.ok(html.includes('window.SiteToolboxCore.formatHTMLSource'), 'formatter source output should delegate to the shared core when available');
assert.ok(html.includes('saveLocalJson'), 'forbidden word persistence should use guarded localStorage writes');
assert.ok(html.includes('loadDefaultForbiddenWords'), 'page should load defaults before local words are rendered');
assert.ok(html.includes('loadDefaultForbiddenWords();'), 'page should call the default forbidden words loader');
assert.ok(!html.includes('if (!replacement) {'), 'manual add should allow empty replacement');
assert.ok(!html.includes('word && replacement'), 'imports should allow empty replacement');
assert.ok(html.includes('replacement !== undefined'), 'JSON import should preserve empty replacement values');
assert.ok(html.includes('data-title-group="rule"'), 'format page should include subtitle detection rule buttons');
assert.ok(html.includes('data-title-group="output"'), 'format page should include subtitle output mode buttons');
assert.ok(html.includes('id="titleDetectRule"'), 'format page should keep subtitle detection rule state');
assert.ok(html.includes('id="titleOutputMode"'), 'format page should keep subtitle output mode state');
assert.ok(html.includes("document.getElementById('titleDetectRule').value"), 'formatter should read subtitle detection rule');
assert.ok(html.includes("document.getElementById('titleOutputMode').value"), 'formatter should read subtitle output mode');
assert.ok(html.includes('function autoDetectTitles(el, titleRule, titleOutputMode)'), 'auto title detection should accept rule and output mode');
assert.ok(html.includes('function unwrapBlockChildrenFromHeadings'), 'formatter should unwrap invalid heading wrappers around block content');
assert.ok(html.includes('unwrapBlockChildrenFromHeadings(container);'), 'formatter should unwrap invalid heading wrappers before heading conversion');
assert.ok(html.includes('function scoreTitleCandidate'), 'subtitle detection should use candidate scoring');
assert.ok(html.includes('function getNeighborBlockText'), 'subtitle detection should compare nearby content');
assert.ok(html.includes("titleRule === 'english'"), 'subtitle detection should support English content rule');
assert.ok(html.includes("if (titleOutputMode === 'h3')"), 'subtitle output mode should support h3 conversion');
assert.ok(html.includes('id="specifiedTitleWords"'), 'format page should include specified subtitle words input');
assert.ok(html.includes('id="specifiedBoldWords"'), 'format page should include specified text bold words input');
assert.ok(html.includes('id="specifiedClassWords"'), 'format page should include specified class words input');
assert.ok(html.includes('id="specifiedClassName"'), 'format page should include specified class name input');
assert.ok(html.includes('id="specifiedRulesToggle"'), 'format toolbar should expose a compact specified-rules toggle');
assert.ok(html.includes('id="specifiedRulesPanel"'), 'specified rule inputs should live in a separate advanced panel');
assert.ok(html.includes('function toggleSpecifiedRules()'), 'specified rules panel should be collapsible');
assert.ok(/class="[^"]*format-advanced-panel[^"]*hidden[^"]*"/.test(html), 'specified rule panel should start collapsed');
assert.ok(html.includes('applySpecifiedTitleBold(container'), 'formatter should apply specified subtitle bolding');
assert.ok(html.includes('applySpecifiedTextBold(container'), 'formatter should apply specified text bolding');
assert.ok(html.includes('applySpecifiedTextClass(container'), 'formatter should apply specified text class names');

console.log('forbidden word static checks passed');
