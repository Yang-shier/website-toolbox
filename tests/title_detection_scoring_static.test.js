const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.ok(
  html.includes('function buildTitleContexts'),
  'auto title detection should collect title context in one pass'
);

assert.ok(
  html.includes('var TITLE_KEYWORD_GROUPS'),
  'auto title detection should use grouped title keyword scoring'
);

assert.ok(
  html.includes('function getRhythmScore'),
  'auto title detection should score repeated page title rhythm'
);

assert.ok(
  html.includes('scoreTitleCandidate(block, titleText, titleRule, endPunctuation, cjkRe, context, titleContexts)'),
  'auto title detection should score with context and rhythm data'
);

console.log('title detection scoring static checks passed');
