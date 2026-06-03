const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, '建站工具箱.html'), 'utf8');
const defaultsPath = path.join(root, 'forbidden-words.json');

assert.ok(fs.existsSync(defaultsPath), 'forbidden-words.json should be published with the site');

const defaults = JSON.parse(fs.readFileSync(defaultsPath, 'utf8'));
assert.ok(Array.isArray(defaults), 'forbidden-words.json should contain an array');
defaults.forEach((item, index) => {
  assert.strictEqual(typeof item.word, 'string', `default item ${index} should have a string word`);
  assert.ok(Object.prototype.hasOwnProperty.call(item, 'replacement'), `default item ${index} should include replacement`);
  assert.strictEqual(typeof item.replacement, 'string', `default item ${index} replacement should be a string`);
});

assert.ok(html.includes('DEFAULT_FORBIDDEN_WORDS_URL'), 'page should load the default forbidden words URL');
assert.ok(html.includes('loadDefaultForbiddenWords'), 'page should load defaults before local words are rendered');
assert.ok(html.includes('loadDefaultForbiddenWords();'), 'page should call the default forbidden words loader');
assert.ok(!html.includes('if (!replacement) {'), 'manual add should allow empty replacement');
assert.ok(!html.includes('word && replacement'), 'imports should allow empty replacement');
assert.ok(html.includes('replacement !== undefined'), 'JSON import should preserve empty replacement values');

console.log('forbidden word static checks passed');
