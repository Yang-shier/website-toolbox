const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

[
  '.header-main',
  '.header-meta',
  '.tab-group::-webkit-scrollbar',
  'overflow-x: auto;',
  'padding: 18px 24px !important;',
  'padding: 12px 16px !important;',
  '.contact-actions-bar .btn',
].forEach((needle) => {
  assert.ok(html.includes(needle), `light UI polish should include ${needle}`);
});

assert.ok(html.includes('<div class="header-main">'), 'header should group brand and tabs together');
assert.ok(html.includes('<div class="header-meta">'), 'header should group update summary and workspace actions together');
assert.ok(html.includes('white-space: nowrap;'), 'compact controls should avoid awkward text wrapping');
assert.ok(html.includes('class="format-workbench"'), 'format page should use a dedicated workbench layout');
assert.ok(html.includes('class="format-inspector"'), 'format page should include a left settings inspector');
assert.ok(html.includes('class="format-editor-grid"'), 'format page should keep input and output as the main workspace');
assert.ok(html.includes('class="format-command-bar"'), 'format page should use a focused bottom command bar');
assert.ok(html.includes('data-format-input-tab'), 'format input tabs should be scoped to the new editor pane');
assert.ok(html.includes('data-format-output-tab'), 'format output tabs should be scoped to the new editor pane');
assert.ok(html.includes('--format-warm-bg'), 'format page should use warm refined 1C visual tokens');
assert.ok(html.includes('class="format-empty-mark"'), 'format editors should include a refined empty-state mark');
assert.ok(html.includes('class="format-command-shell"'), 'format command bar should use a 1C-style command shell');
assert.ok(html.includes('class="format-inspector-card"'), 'format settings should live inside a rounded inspector card');
assert.ok(/class="[^"]*format-setting-card[^"]*open[^"]*"/.test(html), 'format inspector should use grouped expandable setting cards');
assert.ok(/class="[^"]*format-setting-card(?![^"]*open)[^"]*"/.test(html), 'format inspector should include collapsed setting cards');
assert.ok(html.includes('class="format-editor-area"'), 'editor area should be separated from the bottom command shell');
assert.ok(html.includes('gap: 18px;'), 'format workspace should leave visible breathing room between editor and command shell');
assert.ok(html.includes('function toggleFormatSidebar()'), 'format sidebar collapse button should be wired to real behavior');
assert.ok(html.includes('format-sidebar-collapsed'), 'format workbench should have a collapsed sidebar state');
assert.ok(html.includes('class="format-sidebar-open-btn"'), 'collapsed sidebar should expose a way to reopen settings');
assert.ok(html.includes('grid-template-columns: 52px minmax(0, 1fr);'), 'collapsed sidebar should keep a slim rail instead of overlaying the editor');
assert.ok(html.includes('transition: grid-template-columns 0.24s ease;'), 'format sidebar collapse should animate softly');
assert.ok(html.includes('visibility: hidden;'), 'collapsed sidebar content should not flash out over the editor');
assert.ok(html.includes('justify-content: flex-start;'), 'format collapse button should align icon and text cleanly');
assert.ok(/class="format-collapse-btn"[\s\S]*?<svg/.test(html), 'format collapse button should use an SVG icon for reliable alignment');
assert.ok(/class="format-sidebar-open-btn"[\s\S]*?<svg/.test(html), 'format sidebar reopen button should use an SVG icon');
assert.ok(html.includes('.format-inspector-card .format-advanced-desc'), 'specified-rule helper text should have inspector-specific layout');
assert.ok(html.includes('white-space: nowrap;'), 'specified-rule helper text should stay on one line');
assert.ok(/<div class="format-empty-icon">[\s\S]*?<svg/.test(html), 'format empty-state icons should use SVG instead of fragile glyphs');
assert.ok(html.includes('position: sticky;'), 'format inspector header should stay visible while the settings card scrolls');
assert.ok(html.includes('scroll-padding-top: 64px;'), 'format inspector scroll should preserve top breathing room');

console.log('ui polish static checks passed');
