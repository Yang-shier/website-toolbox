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
  core.formatHTMLSource('<p>eco\u2011friendly</p>').trim(),
  '<p>eco-friendly</p>',
  'formatHTMLSource should convert Word non-breaking hyphens to portable plain hyphens'
);

assert.strictEqual(
  core.splitImageTextParagraphHTML('<p style="text-align:center"><img src="a.jpg"/>洞洞板</p>').trim(),
  '<p style="text-align:center"><img src="a.jpg"/></p>\n<p style="text-align:center">洞洞板</p>',
  'splitImageTextParagraphHTML should split preview HTML before image width changes'
);

assert.deepStrictEqual(
  core.parseLineList('核心优势\n\n 产品参数 \n核心优势'),
  ['核心优势', '产品参数'],
  'parseLineList should trim blank lines and remove duplicates'
);

assert.strictEqual(
  core.applySpecifiedTitleBoldHTML('<p>核心优势</p><p>我们的核心优势包括...</p>', ['核心优势']),
  '<p><strong>核心优势</strong></p><p>我们的核心优势包括...</p>',
  'specified title bolding should exact-match block text only'
);

assert.strictEqual(
  core.applySpecifiedTextClassHTML('<p>产品参数</p>', ['产品参数'], 'section-title'),
  '<p class="section-title">产品参数</p>',
  'specified class should be added to matching block tags'
);

assert.strictEqual(
  core.applySpecifiedTextClassHTML('<p class="old">产品参数</p>', ['产品参数'], 'section-title'),
  '<p class="old section-title">产品参数</p>',
  'specified class should append without replacing existing classes'
);

assert.strictEqual(
  core.applySpecifiedTextClassHTML('<p class="old section-title">产品参数</p>', ['产品参数'], 'section-title'),
  '<p class="old section-title">产品参数</p>',
  'specified class should not be duplicated'
);

assert.strictEqual(
  core.applySpecifiedTextClassHTML('<p>产品参数</p>', [], 'section-title'),
  '<p>产品参数</p>',
  'empty specified words should leave HTML unchanged'
);

assert.strictEqual(
  core.applySpecifiedTitleBoldHTML('<div><p>核心优势</p></div>', ['核心优势']),
  '<div><p><strong>核心优势</strong></p></div>',
  'specified title bolding should target the leaf block, not the parent container'
);

assert.strictEqual(
  core.applySpecifiedTextClassHTML('<div><p>产品参数</p></div>', ['产品参数'], 'section-title'),
  '<div><p class="section-title">产品参数</p></div>',
  'specified class should target the leaf block that owns the text'
);

assert.strictEqual(
  core.applySpecifiedTitleBoldHTML('<h3>核心优势</h3>', ['核心优势']),
  '<h3>核心优势</h3>',
  'specified title bolding should not wrap an existing heading'
);

assert.strictEqual(
  core.applySpecifiedTextBoldHTML('<p>我们的核心优势包括稳定交付。</p>', ['核心优势']),
  '<p>我们的<strong>核心优势</strong>包括稳定交付。</p>',
  'specified text bolding should wrap matching text fragments inside a block'
);

assert.strictEqual(
  core.applySpecifiedTextBoldHTML('<p><strong>核心优势</strong>包括核心团队。</p>', ['核心优势', '核心团队']),
  '<p><strong>核心优势</strong>包括<strong>核心团队</strong>。</p>',
  'specified text bolding should skip text that is already bold'
);

assert.strictEqual(
  core.markdownToHTMLSource(
    '<span style="white-space: pre;"># 主流型号\nAC707N\nJL701N\n\n# 产品特点\n- 丰富的系统资源\n- 2.5D GPU</span>'
  ),
  '<p><strong>主流型号</strong></p>\n<p>AC707N</p>\n<p>JL701N</p>\n<p><strong>产品特点</strong></p>\n<p>&bull; 丰富的系统资源</p>\n<p>&bull; 2.5D GPU</p>',
  'markdownToHTMLSource should strip rich-copy wrappers and render headings as bold paragraphs'
);

console.log('format behavior checks passed');
