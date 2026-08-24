const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs.readdirSync(root).find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.match(
  html,
  /id="multiBoldModeButton"[\s\S]*?onclick="togglePreviewMultiBoldMode\(\)"/,
  'preview toolbar should expose a multi-select bold mode button'
);
assert.ok(html.includes('function togglePreviewMultiBoldMode()'), 'multi-select mode should have a toggle handler');
assert.ok(html.includes('function rememberPreviewMultiBoldRange()'), 'each selected preview range should be remembered');
assert.ok(html.includes('function applyPreviewMultiBold()'), 'remembered selections should be applied in one action');
assert.ok(html.includes('function updatePreviewMultiBoldLayout()'), 'multi-select mode should manage the editor layout');
assert.match(
  html,
  /\.format-editor-grid\.multi-bold-active[\s\S]*?grid-template-columns:\s*minmax\(0,\s*2fr\)\s+minmax\(0,\s*3fr\)/,
  'multi-select mode should widen the preview to a 40/60 editor split'
);
assert.match(html, /transition:\s*grid-template-columns\s+0\.24s\s+ease/, 'the editor split should transition smoothly');
assert.match(
  html,
  /@media\s*\(max-width:\s*720px\)\s*\{[\s\S]*?\.format-editor-grid\.multi-bold-active\s*\{[\s\S]*?grid-template-columns:\s*1fr;/,
  'only genuinely narrow screens should disable the two-column width change'
);
assert.match(
  html,
  /\.multi-bold-action-bar\s*\{[\s\S]*?display:\s*flex;[\s\S]*?height:\s*0;[\s\S]*?opacity:\s*0;[\s\S]*?transition:/,
  'the batch action footer should animate instead of appearing with display:none'
);
assert.match(
  html,
  /\.format-editor-grid\.multi-bold-active\s+\.multi-bold-action-bar\s*\{[\s\S]*?height:\s*52px;[\s\S]*?opacity:\s*1;/,
  'the active batch footer should expand and fade in'
);
assert.match(html, /<div class="format-editor-pane format-input-pane">\s*<div class="contact-panel-header">\s*<span>输入<\/span>/, 'the left pane should remain the input pane');
assert.match(html, /<div class="format-editor-pane format-output-pane">\s*<div class="contact-panel-header">\s*<span>输出<\/span>/, 'the widened right pane should remain the output pane');
assert.match(
  html,
  /function togglePreviewMultiBoldMode\(\)[\s\S]*?updatePreviewMultiBoldLayout\(\)/,
  'entering or leaving multi-select mode should update the editor layout'
);
assert.match(
  html,
  /function applyPreviewMultiBold\(\)[\s\S]*?updatePreviewMultiBoldLayout\(\)/,
  'applying multi-select bolding should restore the normal editor layout'
);
assert.match(
  html,
  /id="undoMultiBoldSelectionButton"[\s\S]*?onclick="undoPreviewMultiBoldSelection\(\)"/,
  'multi-select mode should expose an undo button for the most recent selection'
);
assert.match(
  html,
  /id="multiBoldActionBar"[\s\S]*?id="undoMultiBoldSelectionButton"[\s\S]*?id="applyMultiBoldButton"/,
  'multi-select actions should live together in a dedicated preview footer'
);
assert.match(
  html,
  /function undoPreviewMultiBoldSelection\(\)[\s\S]*?multiBoldRanges\.pop\(\)[\s\S]*?renderPreviewMultiBoldHighlights\(\)/,
  'undo should remove only the most recent pending range and refresh its highlight'
);
assert.match(
  html,
  /multiBoldRanges\.push\(range\.cloneRange\(\)\)/,
  'each non-contiguous selection should be retained as an independent range'
);
assert.match(
  html,
  /applyPreviewMultiBold\(\)[\s\S]*?syncFormatPreviewToSource\(\)/,
  'batch bolding should synchronize the generated source'
);

console.log('format multi-select bold static checks passed');
