const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');
const updatesPath = path.join(root, 'docs', 'updates.html');
const readmePath = path.join(root, 'README.md');

assert.ok(html.includes('class="update-summary"'), 'page should show a visible update summary');
assert.ok(!html.includes('<span class="version-badge">v0.7</span>'), 'header should not show the old version badge');
assert.ok(html.includes('href="./docs/updates.html"'), 'header should link to the release notes page');
assert.ok(html.includes('版本更新说明'), 'header should label the release notes link');
assert.ok(!html.includes('最近更新'), 'header should not show the old recent update summary');

assert.ok(fs.existsSync(updatesPath), 'updates.html should exist');
const updates = fs.readFileSync(updatesPath, 'utf8');
[
  '2026-07-23',
  'HTML 格式化图片保留修复',
  '纯图片段',
  '当前功能',
  '基本使用',
  '更新记录',
  'HTML 格式化',
  '导航填充',
  '联系方式替换',
  '文本处理',
  '图片链接替换',
  '草稿和工作区',
  '无子级父级',
].forEach((needle) => {
  assert.ok(updates.includes(needle), `updates page should mention ${needle}`);
});

assert.ok(fs.existsSync(readmePath), 'README.md should exist');
const readme = fs.readFileSync(readmePath, 'utf8');
[
  '建站工具箱',
  '打开方式',
  'npm.cmd test',
  'HTML格式化',
  '导航填充',
  '联系方式替换',
  '文本处理',
  '填入示例',
].forEach((needle) => {
  assert.ok(readme.includes(needle), `README should mention ${needle}`);
});

console.log('docs visibility static checks passed');
