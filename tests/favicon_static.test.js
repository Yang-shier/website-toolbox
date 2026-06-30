const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const appHtmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const appHtml = fs.readFileSync(path.join(root, appHtmlFile), 'utf8');
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

assert.ok(fs.existsSync(path.join(root, 'favicon.ico')), 'root favicon.ico should exist for browser tabs');

for (const [name, html] of [
  ['index.html', indexHtml],
  [appHtmlFile, appHtml],
]) {
  assert.ok(
    html.includes('<link rel="icon" href="./favicon.ico" sizes="any">'),
    `${name} should reference the favicon`
  );
}

console.log('favicon static checks passed');
