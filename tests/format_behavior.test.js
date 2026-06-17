const assert = require('assert');

const core = require('../src/toolbox-core');

const unsafe = `
<div onclick="alert(1)">
  <script>alert('x')</script>
  <p><a href="javascript:alert(2)" onmouseover="alert(3)">链接</a></p>
  <iframe srcdoc="<script>alert(4)</script>"></iframe>
  <img src="javascript:alert(5)" onerror="alert(6)">
</div>
`;

const safe = core.sanitizeHTMLString(unsafe);

assert.ok(!/script/i.test(safe), 'sanitized HTML should remove script payloads');
assert.ok(!/iframe/i.test(safe), 'sanitized HTML should remove iframe payloads');
assert.ok(!/on(click|mouseover|error)=/i.test(safe), 'sanitized HTML should remove inline event handlers');
assert.ok(!/javascript:/i.test(safe), 'sanitized HTML should remove javascript URLs');
assert.ok(!/srcdoc=/i.test(safe), 'sanitized HTML should remove srcdoc attributes');
assert.ok(safe.includes('链接'), 'sanitized HTML should preserve normal text content');

assert.strictEqual(
  core.formatHTMLSource('<div><p>一</p><p>二</p></div>').trim(),
  '<div>\n<p>一</p>\n<p>二</p>\n</div>',
  'formatHTMLSource should place block tags on readable lines'
);

assert.strictEqual(
  core.formatHTMLSource('<p><img src="a.jpg"/>主卧转角衣柜</p>').trim(),
  '<p><img src="a.jpg"/></p>\n<p>主卧转角衣柜</p>',
  'formatHTMLSource should move text after an image into its own paragraph'
);

assert.strictEqual(
  core.splitImageTextParagraphHTML('<p style="text-align:center"><img src="a.jpg"/>洞洞板</p>').trim(),
  '<p style="text-align:center"><img src="a.jpg"/></p>\n<p style="text-align:center">洞洞板</p>',
  'splitImageTextParagraphHTML should split preview HTML before image width changes'
);

console.log('format behavior checks passed');
