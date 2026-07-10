const assert = require('assert');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', '建站工具箱.html'), 'utf8');

assert.ok(
  !html.includes('while (node.firstChild) current.push(node.firstChild);'),
  'list item formatter must move nested paragraph/div children instead of looping on the same firstChild'
);

assert.ok(
  html.includes('while (node.firstChild) current.push(node.removeChild(node.firstChild));'),
  'nested paragraph/div children inside list items should be removed from their wrapper before flushing'
);

console.log('format list item hang static checks passed');
