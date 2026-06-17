const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');
const examplesPath = path.join(root, 'src', 'toolbox-examples.js');

assert.ok(fs.existsSync(examplesPath), 'examples module should exist');
assert.ok(html.includes('./src/toolbox-examples.js'), 'page should load the examples module');
assert.ok(html.includes('window.SiteToolboxExamples'), 'page should read examples from the examples module');

const examples = require('../src/toolbox-examples');
[
  'navSource',
  'navTemplate',
  'contactText',
  'contactTemplate',
  'textprocText',
  'formatHtml',
].forEach((key) => {
  assert.strictEqual(typeof examples[key], 'string', `${key} should be exported as a string`);
  assert.ok(examples[key].trim().length > 0, `${key} should not be empty`);
});

console.log('examples module static checks passed');
