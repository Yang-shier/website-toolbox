const assert = require('assert');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', '建站工具箱.html'), 'utf8');

assert.match(html, /id="optPunctuationCnToEn"/, 'formatter should offer a Chinese-to-English punctuation option');
assert.match(html, /id="optPunctuationEnToCn"/, 'formatter should offer an English-to-Chinese punctuation option');
assert.match(html, /convertPunctuationInTextNodes\(container, punctuationDirection\)/, 'formatter should convert punctuation through text nodes only');
assert.match(html, /if \(node\.parentNode && \/\^\(script\|style\)\$\/i\.test\(node\.parentNode\.tagName\)\) return;/, 'formatter should not alter script or style text');
