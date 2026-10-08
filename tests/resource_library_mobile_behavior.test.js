const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const html = fs.readFileSync(path.join(__dirname, '..', '建站工具箱.html'), 'utf8');
const bindingMatch = html.match(/function bindResourceLibrary\(\) \{[\s\S]*?\r?\n            \}\r?\n\r?\n            bindResourceLibrary\(\);/);
assert.ok(bindingMatch, 'resource-library binding is present for interaction regression coverage');
const mobileCss = html.match(/@media \(max-width: 760px\) \{([\s\S]*?)\r?\n            \}\r?\n            @media \(max-width: 520px\)/);
assert.ok(mobileCss, 'resource-library has a dedicated 760px mobile CSS section');
assert.ok(mobileCss[1].includes('grid-template-rows: auto minmax(0, 1fr);'), 'mobile resource-library keeps category navigation compact instead of stretching its grid row');

class FakeClassList {
  constructor() { this.values = new Set(); }
  add(value) { this.values.add(value); }
  remove(value) { this.values.delete(value); }
  contains(value) { return this.values.has(value); }
  toggle(value, force) {
    const enabled = force === undefined ? !this.values.has(value) : !!force;
    if (enabled) this.values.add(value); else this.values.delete(value);
  }
}

class FakeElement {
  constructor(tagName) {
    this.tagName = tagName;
    this.children = [];
    this.classList = new FakeClassList();
    this.listeners = {};
    this.style = {};
    this.textContent = '';
    this.value = '';
  }
  appendChild(child) { this.children.push(child); return child; }
  replaceChildren(...children) { this.children = children; }
  addEventListener(type, handler) { this.listeners[type] = handler; }
  dispatch(type) { this.listeners[type]({}); }
  setAttribute(name, value) { this[name] = value; }
  focus() {}
  remove() {}
  select() {}
}

function findByText(element, text) {
  if (element.textContent === text) return element;
  for (const child of element.children) {
    const found = findByText(child, text);
    if (found) return found;
  }
  return null;
}

function createStorage(initial) {
  const values = { ...(initial || {}) };
  return {
    getItem(key) { return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : null; },
    setItem(key, value) { values[key] = String(value); },
    raw(key) { return values[key]; },
  };
}

function mount(entries, options) {
  const settings = options || {};
  const page = new FakeElement('div');
  const search = new FakeElement('input');
  const count = new FakeElement('span');
  const categories = new FakeElement('nav');
  const list = new FakeElement('div');
  const detail = new FakeElement('section');
  const back = new FakeElement('button');
  const open = new FakeElement('button');
  const byId = { resourceLibraryPage: page, resourceLibrarySearch: search };
  const bySelector = {
    '[data-resource-count]': count,
    '[data-resource-categories]': categories,
    '[data-resource-list]': list,
    '[data-resource-detail]': detail,
    '[data-resource-back]': back,
    '[data-open-resource-library]': open,
  };
  const document = {
    body: new FakeElement('body'),
    getElementById(id) { return byId[id] || null; },
    querySelector(selector) { return bySelector[selector] || null; },
    createElement(tagName) { return new FakeElement(tagName); },
    execCommand() { return settings.copyResult === undefined ? true : settings.copyResult; },
  };
  const context = {
    window: {
      ToolboxResourceData: { entries, pathBases: {} },
      ToolboxResources: {
        filterEntries(source, query, category) {
          const needle = String(query || '').trim().toLowerCase();
          return source.filter((entry) => (category === 'all' || entry.category === category)
            && (!needle || entry.title.toLowerCase().includes(needle)));
        },
        getFullPath() { return ''; },
        getCopyText(entry, partKey) {
          if (entry.parts) return partKey === 'all' ? '' : entry.parts[partKey] || '';
          return entry.content || '';
        },
        isValidHttpUrl() { return false; },
      },
      open() {},
      localStorage: settings.storage,
    },
    document,
    navigator: {},
    showToast() {},
    switchTab() {},
  };
  vm.runInNewContext(bindingMatch[0], context);
  return { page, search, categories, list, detail, open };
}

function categoryButton(state, label) {
  return state.categories.children.find((button) => button.children.some((child) => child.textContent === label));
}

const selected = { id: 'selected', title: 'Selected entry', category: 'html', content: '<p>selected</p>' };
const other = { id: 'other', title: 'Other entry', category: 'html', content: '<p>other</p>' };
const mobileState = mount([selected, other]);
mobileState.list.children[0].dispatch('click');
assert.ok(mobileState.page.classList.contains('resource-detail-open'), 'selecting a list item enters the mobile detail state');
mobileState.search.value = 'Other';
mobileState.search.dispatch('input');
assert.ok(!mobileState.page.classList.contains('resource-detail-open'), 'searching away from the selected item restores the mobile list state');
assert.strictEqual(mobileState.list.children.length, 1, 'the matching list remains available after the mobile detail state closes');

const emptyPartsState = mount([{ id: 'empty-parts', title: 'Empty parts', category: 'banner', parts: {} }]);
emptyPartsState.list.children[0].dispatch('click');
const copyCurrent = findByText(emptyPartsState.detail, '复制当前部分');
const copyAll = findByText(emptyPartsState.detail, '复制全部');
assert.ok(copyCurrent && copyCurrent.disabled, 'empty parts keep a disabled current-part copy action');
assert.ok(copyAll && copyAll.disabled, 'empty parts keep a disabled copy-all action');
assert.ok(findByText(emptyPartsState.detail, '此资料没有可用的代码部分。'), 'empty parts explain the missing content');

const bannerState = mount([{ id: 'banner-preview', title: 'Banner preview', category: 'banner', imageSrc: './assets/resource-banners/banner-01.png', parts: { CSS: '.hero{}' } }]);
bannerState.list.children[0].dispatch('click');
assert.ok(bannerState.detail.children.some((child) => child.tagName === 'img' && child.src === './assets/resource-banners/banner-01.png'), 'banner detail creates an image from its fixed mapped static asset');

const entryState = mount([selected]);
entryState.open.dispatch('click');
assert.strictEqual(entryState.open['aria-pressed'], 'true', 'opening the resource library presses the entry control');

const successfulCopyStorage = createStorage();
const successfulCopyState = mount([selected, other], { storage: successfulCopyStorage });
assert.ok(categoryButton(successfulCopyState, '常用'), 'resource categories include 常用 immediately after 全部');
assert.strictEqual(successfulCopyState.categories.children[1], categoryButton(successfulCopyState, '常用'), '常用 follows 全部 in category order');
assert.strictEqual(categoryButton(successfulCopyState, '常用').children[1].textContent, '0', '常用 starts at zero before any successful copy');
successfulCopyState.list.children[0].dispatch('click');
findByText(successfulCopyState.detail, '复制代码').dispatch('click');
assert.deepStrictEqual(JSON.parse(successfulCopyStorage.raw('site_toolbox_resource_favorites_v1')), {
  selected: { count: 1, lastUsedAt: JSON.parse(successfulCopyStorage.raw('site_toolbox_resource_favorites_v1')).selected.lastUsedAt },
}, 'only a successful copy records the entry locally');
assert.strictEqual(categoryButton(successfulCopyState, '常用').children[1].textContent, '1', 'a successful copy immediately refreshes the 常用 category count');
categoryButton(successfulCopyState, '常用').dispatch('click');
assert.strictEqual(successfulCopyState.list.children.length, 1, '常用 only shows successfully copied resources');
assert.strictEqual(successfulCopyState.list.children[0].children[0].textContent, 'Selected entry', '常用 shows the copied resource');
findByText(successfulCopyState.detail, '复制代码').dispatch('click');
assert.strictEqual(successfulCopyState.list.children[0].children[0].textContent, 'Selected entry', 'a successful copy while viewing 常用 keeps the visible ranked entry');

const failedCopyStorage = createStorage();
const failedCopyState = mount([selected], { storage: failedCopyStorage, copyResult: false });
failedCopyState.list.children[0].dispatch('click');
findByText(failedCopyState.detail, '复制代码').dispatch('click');
assert.strictEqual(failedCopyStorage.raw('site_toolbox_resource_favorites_v1'), undefined, 'failed copies do not update 常用 storage');
assert.strictEqual(categoryButton(failedCopyState, '常用').children[1].textContent, '0', 'failed copies do not refresh the 常用 count');

const rankedEntries = Array.from({ length: 13 }, (_, index) => ({ id: `rank-${index}`, title: `Rank ${index}`, category: 'html', content: String(index) }));
const rankedStorage = createStorage({
  site_toolbox_resource_favorites_v1: JSON.stringify(Object.fromEntries(rankedEntries.map((entry, index) => [entry.id, { count: index < 2 ? 9 : 1, lastUsedAt: index }])))
});
const rankedState = mount(rankedEntries, { storage: rankedStorage });
categoryButton(rankedState, '常用').dispatch('click');
assert.strictEqual(rankedState.list.children.length, 12, '常用 limits the ranked list to 12 entries');
assert.strictEqual(rankedState.list.children[0].children[0].textContent, 'Rank 1', '常用 breaks equal copy-count ties by most recent success');

const corruptStorageState = mount([selected], { storage: createStorage({ site_toolbox_resource_favorites_v1: '{broken' }) });
assert.doesNotThrow(() => categoryButton(corruptStorageState, '常用').dispatch('click'), 'corrupt local usage data degrades to an empty 常用 list');

console.log('resource library mobile behavior checks passed');
