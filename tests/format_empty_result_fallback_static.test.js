const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.ok(
  html.includes('function buildPlainTextFallbackHTML'),
  'formatter should have a plain-text fallback for unexpectedly empty output'
);
assert.ok(
  /if \(!String\(result \|\| ''\)\.trim\(\)\)[\s\S]*?buildPlainTextFallbackHTML\(originalHTMLForFallback\)/.test(html),
  'formatter should use the fallback when post-processing leaves an empty result'
);
assert.ok(
  html.includes("completionToast = '\\u683c\\u5f0f\\u5316\\u7ed3\\u679c\\u4e3a\\u7a7a\\uff0c\\u5df2\\u4fdd\\u7559\\u7eaf\\u6587\\u672c';"),
  'formatter should not show a misleading success-only message after empty-result fallback'
);

console.log('format empty result fallback static checks passed');
