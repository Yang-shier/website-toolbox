const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, '建站工具箱.html'), 'utf8');
const docs = fs.readFileSync(path.join(root, 'docs', '建站工具箱使用说明.md'), 'utf8');
const updates = fs.readFileSync(path.join(root, 'docs', 'updates.html'), 'utf8');

const mustInclude = (source, text, message) => assert.ok(source.includes(text), message || `missing ${text}`);

mustInclude(html, 'data-open-resource-library', 'header has the resource-library entry button');
mustInclude(html, '>资料库<', 'resource-library entry has visible text');
['resourceLibraryPage', 'resourceLibrarySearch', 'data-resource-count', 'data-resource-categories', 'data-resource-list', 'data-resource-detail', 'data-resource-back'].forEach((hook) => {
  mustInclude(html, hook, `resource-library declares ${hook}`);
});
mustInclude(html, '搜索网址、路径、代码、提示词……', 'search placeholder remains exact');
mustInclude(html, '@media (max-width: 760px)', 'resource-library has the required mobile breakpoint');
assert.ok(/\.resource-library-shell\s*\{\s*width:\s*100%;/.test(html), 'resource-library shell fills the available desktop width without a max-width cap');
['all', 'url', 'internal', 'html', 'css', 'javascript', 'mixed', 'quick-fix', 'prompt', 'banner'].forEach((category) => {
  mustInclude(html, `category: '${category}'`, `category ${category} is declared in UI order`);
});
['全部', '常用网址', '内网共享', 'HTML 模块', 'CSS 样式', 'JavaScript', 'HTML + CSS + JavaScript', '快速修复', 'AI 提示词', 'Banner 样式'].forEach((label) => {
  mustInclude(html, label, `category label ${label} is visible`);
});
['navPage', 'contactPage', 'textprocPage', 'formatPage', 'imageReplacePage'].forEach((pageId) => {
  mustInclude(html, pageId, `original tool page ${pageId} remains`);
});
assert.ok(!/fetch\([^)]*常用网址及代码\.xlsx/.test(html), 'source workbook is not fetched at runtime');
assert.ok(!/resource[^\n]{0,120}\.innerHTML\s*=/.test(html), 'resource rendering avoids data-driven innerHTML');
mustInclude(html, '打开网址', 'URL detail exposes open action');
mustInclude(html, '复制网址', 'URL detail exposes copy action');
mustInclude(html, '复制完整路径', 'UNC detail exposes copy action');
mustInclude(html, '复制当前部分', 'mixed detail exposes per-part copy action');
mustInclude(html, '复制全部', 'mixed detail exposes all-parts copy action');
mustInclude(html, 'navigator.clipboard', 'copy action tries Clipboard API');
mustInclude(html, "execCommand('copy')", 'copy action has compatible fallback');
mustInclude(html, 'variantLabel', 'list metadata displays a distinguishable variant label');
mustInclude(html, 'resource-banner-thumbnail', 'banner details render a static PNG thumbnail');
mustInclude(html, 'imageSrc', 'banner details read only mapped static image sources');
mustInclude(html, 'aria-pressed', 'resource-library entry exposes its pressed state');
mustInclude(html, '[data-open-resource-library].active', 'resource-library entry has a visible active style');

const dataScript = html.indexOf('./src/toolbox-resource-data.js');
const helperScript = html.indexOf('./src/toolbox-resources.js');
const binding = html.indexOf('bindResourceLibrary');
assert.ok(dataScript >= 0 && helperScript > dataScript && binding > helperScript, 'data script loads before helpers and resource-library binding');

mustInclude(docs, '资料库', 'usage documentation explains the resource library');
mustInclude(docs, '内网', 'usage documentation explains UNC handling');
mustInclude(updates, '2026-09-30', 'updates page records the resource library release');

console.log('resource_library_static: all assertions passed');
