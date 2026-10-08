const assert = require('assert');

// These assertions should fail if the resource data or pure helper contracts are removed.
global.window = global;
const resources = require('../src/toolbox-resources.js');

const {
  normalizeText,
  getFullPath,
  getCopyText,
  filterEntries,
  isValidHttpUrl,
} = resources;

const expectedCategories = ['url', 'internal', 'html', 'css', 'javascript', 'mixed', 'quick-fix', 'prompt', 'banner'];

const sampleEntries = [
  { id: 'sample-url', title: 'Landing Kit', category: 'url', aliases: ['首页模板'], tags: ['marketing'], description: 'Reusable landing page', url: 'https://example.com/kit' },
  { id: 'sample-html', title: 'Card fragment', category: 'html', tags: ['component'], content: '<article>card</article>' },
  { id: 'sample-prompt', title: 'SEO prompt', category: 'prompt', description: 'Keyword research prompt', content: 'Find high-intent search terms.' },
];

assert.deepStrictEqual(filterEntries(sampleEntries, '  首页模板  ', 'all').map((entry) => entry.id), ['sample-url'], 'search trims whitespace and matches aliases');
assert.deepStrictEqual(filterEntries(sampleEntries, 'MARKETING', 'url').map((entry) => entry.id), ['sample-url'], 'search is case-insensitive and combines with category');
assert.deepStrictEqual(filterEntries(sampleEntries, 'card', 'html').map((entry) => entry.id), ['sample-html'], 'search covers content');
assert.deepStrictEqual(filterEntries(sampleEntries, 'keyword research', 'prompt').map((entry) => entry.id), ['sample-prompt'], 'search covers descriptions');

const pathEntry = { basePathKey: 'marketing', relativePath: 'images\\hero.png' };
assert.strictEqual(getFullPath(pathEntry, { marketing: '\\\\server\\share\\site' }), '\\\\server\\share\\site\\images\\hero.png', 'internal paths restore the full UNC path with backslashes');
assert.strictEqual(getFullPath({ basePathKey: 'unknown', relativePath: 'x' }, {}), '', 'unknown path bases produce an empty safe path');
assert.strictEqual(getCopyText({ url: 'https://example.com' }), 'https://example.com', 'URL entries copy their URL');
assert.strictEqual(getCopyText(pathEntry, undefined, { marketing: '\\\\server\\share\\site' }), '\\\\server\\share\\site\\images\\hero.png', 'internal entries copy their full UNC path');
assert.strictEqual(getCopyText({ content: '  body  ' }), '  body  ', 'single-content entries preserve their copy text');
assert.strictEqual(getCopyText({ parts: { CSS: '.card{}', HTML: '<div></div>', JavaScript: 'run()', H1: 'Heading', P: 'Description' } }, 'all'), '<div></div>\n\n.card{}\n\nrun()\n\nHeading\n\nDescription', 'mixed parts copy in HTML CSS JavaScript H1 P order');
assert.strictEqual(getCopyText({ parts: { HTML: '<div></div>' } }, 'CSS'), '', 'missing mixed parts return an empty safe value');
assert.strictEqual(getCopyText({}), '', 'empty resources return an empty safe copy value');

assert.strictEqual(isValidHttpUrl('https://example.com/a'), true, 'https URLs are valid');
assert.strictEqual(isValidHttpUrl('HTTP://example.com/a'), true, 'http URLs are valid case-insensitively');
assert.strictEqual(isValidHttpUrl('\\\\server\\share'), false, 'UNC paths are not treated as browser URLs');
assert.strictEqual(isValidHttpUrl('javascript:alert(1)'), false, 'script URLs are rejected');
assert.strictEqual(isValidHttpUrl('not a url'), false, 'invalid URLs are rejected');

require('../src/toolbox-resource-data.js');
const data = global.ToolboxResourceData;
assert.deepStrictEqual(data.categories, expectedCategories, 'resource categories expose the fixed public taxonomy');
assert.ok(Array.isArray(data.entries) && data.entries.length > 0, 'resource data exposes non-empty entries');
assert.strictEqual(new Set(data.entries.map((entry) => entry.id)).size, data.entries.length, 'each resource ID is stable and unique');
assert.ok(data.entries.every((entry) => expectedCategories.includes(entry.category)), 'every resource uses a supported category');

const exactContentKey = (entry) => JSON.stringify({
  title: normalizeText(entry.title),
  content: normalizeText(entry.content),
  url: normalizeText(entry.url),
  basePathKey: normalizeText(entry.basePathKey),
  relativePath: normalizeText(entry.relativePath),
  parts: entry.parts || null,
});
assert.strictEqual(new Set(data.entries.map(exactContentKey)).size, data.entries.length, 'exactly duplicated source resources are removed');

const sameTitleEntries = data.entries.filter((entry, index, entries) => entries.some((other, otherIndex) => otherIndex !== index && other.title === entry.title));
assert.ok(sameTitleEntries.some((entry, index, entries) => entries.some((other, otherIndex) => otherIndex !== index && normalizeText(other.content) !== normalizeText(entry.content))), 'same-title resources with different content remain as variants');
assert.strictEqual(data.entries.length, 127, 'semantic multi-row modules merge their dependent source parts');
assert.strictEqual(data.entries.filter((entry) => entry.id.startsWith('path-')).length, 26, 'all shared-address source rows remain available');
for (const id of ['path-012', 'path-013', 'path-022', 'path-023']) {
  assert.ok(data.entries.some((entry) => entry.id === id), `${id} preserves its distinct UNC source path`);
}
assert.ok(sameTitleEntries.every((entry) => typeof entry.variantLabel === 'string' && entry.variantLabel), 'every same-title variant has a distinguishable version label');
for (const id of ['code-013', 'code-025', 'code-034', 'code-035', 'code-047', 'code-068', 'code-069']) {
  assert.ok(data.entries.find((entry) => entry.id === id).description.includes('复制后请替换示例数据'), `${id} identifies source-specific example data`);
}
assert.ok(filterEntries(data.entries, 'unsplash', 'all').some((entry) => entry.id === 'path-025'), 'search includes URL values');
assert.ok(filterEntries(data.entries, '172.16.0.4', 'all').some((entry) => entry.category === 'internal'), 'search includes reconstructed UNC paths');
assert.ok(filterEntries(data.entries, 'ps无法处理webp', 'all').some((entry) => entry.id === 'path-009'), 'search includes internal relative paths');

const amapEntries = data.entries.filter((entry) => entry.title === '高德地图英文');
assert.strictEqual(amapEntries.length, 1, 'A42:A44 is one high-amap-English module, not three variants');
assert.deepStrictEqual(Object.keys(amapEntries[0].parts), ['HTML', 'CSS', 'JavaScript'], 'high-amap-English preserves its HTML, CSS and JavaScript source order');
assert.ok(amapEntries[0].parts.HTML.includes('webapi.amap.com') && amapEntries[0].parts.CSS.includes('#gaode_ditu') && amapEntries[0].parts.JavaScript.includes('new AMap.Map'), 'high-amap-English combined parts retain every source segment');

const mixedEntries = data.entries.filter((entry) => entry.category === 'mixed');
assert.strictEqual(mixedEntries.length, 17, 'real mixed modules retain their semantic module count');
assert.ok(mixedEntries.every((entry) => entry.parts && Object.values(entry.parts).some(Boolean)), 'every real mixed module supplies non-empty copyable parts');
assert.ok(mixedEntries.every((entry) => getCopyText(entry, 'all').includes(getCopyText(entry, Object.keys(entry.parts)[0]))), 'copy-all uses the real mixed module parts');

const banners = data.entries.filter((entry) => entry.category === 'banner');
assert.strictEqual(banners.length, 9, 'all nine banner records remain available');
assert.deepStrictEqual(banners.map((entry) => entry.imageSrc), [
  './assets/resource-banners/banner-01.png', './assets/resource-banners/banner-02.png', './assets/resource-banners/banner-03.png',
  './assets/resource-banners/banner-04.png', './assets/resource-banners/banner-05.png', './assets/resource-banners/banner-06.png',
  './assets/resource-banners/banner-07.png', './assets/resource-banners/banner-08.png', './assets/resource-banners/banner-09.png',
], 'banner rows map deterministically to their extracted static PNG assets');

console.log('resource_library_behavior: all assertions passed');
