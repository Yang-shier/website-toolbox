const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');
const updates = fs.readFileSync(path.join(root, 'docs', 'updates.html'), 'utf8');
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');

[
  'class="header-tools"',
  'onclick="exportWorkspaceDrafts()"',
  'onclick="document.getElementById(\'workspaceImportFile\').click()"',
  'id="workspaceImportFile"',
  'onchange="importWorkspaceDrafts(event)"',
  'function collectWorkspaceDrafts()',
  'function applyWorkspaceDrafts(',
  'function exportWorkspaceDrafts()',
  'function importWorkspaceDrafts(event)',
  'site-toolbox-workspace.json',
].forEach((needle) => {
  assert.ok(html.includes(needle), `workspace backup should include ${needle}`);
});

assert.ok(updates.includes('工作区备份'), 'release notes page should mention workspace backup');
assert.ok(readme.includes('工作区备份'), 'README should document workspace backup');
assert.ok(readme.includes('导出工作区'), 'README should mention exporting workspace data');
assert.ok(readme.includes('导入工作区'), 'README should mention importing workspace data');

console.log('workspace backup static checks passed');
