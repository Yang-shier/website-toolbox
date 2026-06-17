const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');
const readmePath = path.join(root, 'README.md');

assert.ok(html.includes('class="version-badge"'), 'page should show a visible version badge');
assert.ok(html.includes('class="update-summary"'), 'page should show a visible update summary');
assert.ok(html.includes('最近更新'), 'page should label recent changes for users');
assert.ok(html.includes('示例数据'), 'update summary should mention visible example data');
assert.ok(html.includes('安全清理'), 'update summary should mention HTML safety cleanup');

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
