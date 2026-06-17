const assert = require('assert');

const core = require('../src/toolbox-core');

const contact = core.parseContactText(`
公司名称：星河科技
联系人：张三
手机：13800138000
座机：400-800-1234
电子邮箱：hello@example.com
办公地址：广东省深圳市南山区科技园
`);

assert.deepStrictEqual(contact.company, ['星河科技']);
assert.deepStrictEqual(contact.name, ['张三']);
assert.deepStrictEqual(contact.phone, ['13800138000']);
assert.deepStrictEqual(contact.landline, ['400-800-1234']);
assert.deepStrictEqual(contact.email, ['hello@example.com']);
assert.deepStrictEqual(contact.address, ['广东省深圳市南山区科技园']);

assert.strictEqual(
  core.applyForbiddenWords('这是违禁词和敏感词', [
    { word: '违禁词', replacement: '' },
    { word: '敏感词', replacement: '替换词' },
  ]),
  '这是和替换词'
);

assert.strictEqual(core.transformText('  A  B  ', 'trimSpaces'), 'A  B');
assert.strictEqual(core.transformText('A  B\tC', 'collapseSpaces'), 'A B C');
assert.strictEqual(core.transformText('b\na\nb\n', 'lineUnique'), 'b\na');

const nav = core.parseNavSource(`
<div class="basic_navbar">
  <div class="itemNav"><a href="/p1"><span class="pageLink">产品中心</span></a></div>
  <div class="navchildlist">
    <div class="level_2_content navchildLine"><a href="/c1"><span class="navchildLink">产品一</span></a></div>
    <div class="level_2_content navchildLine"><a href="/c2"><span class="navchildLink">产品二</span></a></div>
  </div>
</div>
`);

assert.deepStrictEqual(nav, [
  {
    title: '产品中心',
    link: '/p1',
    checked: true,
    children: [
      { title: '产品一', link: '/c1', checked: true },
      { title: '产品二', link: '/c2', checked: true },
    ],
  },
]);

assert.deepStrictEqual(core.getNavSourceDiagnostics(''), ['请先粘贴源导航代码']);
assert.deepStrictEqual(core.getNavSourceDiagnostics('<div></div>'), ['没有找到父级导航项 .itemNav']);
assert.deepStrictEqual(
  core.getNavSourceDiagnostics('<div class="itemNav"><a href="/a">栏目</a></div>'),
  ['没有找到子级导航容器 .navchildlist']
);

console.log('core behavior checks passed');
