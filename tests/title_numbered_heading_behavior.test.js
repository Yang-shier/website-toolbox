const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const html = fs.readFileSync(path.join(__dirname, '..', '建站工具箱.html'), 'utf8');
const start = html.indexOf('var TITLE_KEYWORD_GROUPS = [');
const end = html.indexOf('function addParagraphIndent(', start);
assert.ok(start >= 0 && end > start);

function element(tagName) {
  return {
    tagName: tagName.toUpperCase(),
    childNodes: [],
    get firstChild() { return this.childNodes[0] || null; },
    get textContent() { return this.childNodes.map((node) => node.textContent).join(''); },
    appendChild(node) {
      if (node.parentNode) {
        const siblings = node.parentNode.childNodes;
        siblings.splice(siblings.indexOf(node), 1);
      }
      this.childNodes.push(node);
      node.parentNode = this;
    },
    closest() { return null; },
    querySelector() { return null; },
  };
}

function paragraph(text) {
  const p = element('p');
  p.appendChild({ nodeType: 3, textContent: text, parentNode: null });
  return p;
}

const context = { document: { createElement: element } };
vm.runInNewContext(html.slice(start, end), context);
const paragraphs = [
  '我司化工泵适配化工厂工况的核心优势：',
  '1. 全介质耐腐蚀，适配化工复杂工况',
  '全系可选氟塑料、316L、304、2205双相钢、衬四氟材质，可从容应对各种强腐蚀介质。',
  '2. 无泄漏、高安全，符合化工防爆规范',
  '磁力泵全无泄漏结构，无轴封渗漏风险，特别适合易燃易爆、易挥发、高毒化工介质。',
  '3. 24小时连续运行，稳定耐用',
  '优化水力模型、加固泵体结构、升级耐磨配件，适配化工全年不间断连续生产。',
  '4. 适配智能化工自控系统',
  '可变频调速、可匹配PLC中控、流量联动调节，支持恒压、恒流、变量输送。',
  '5. 低运维、综合成本低',
  '结构简洁、拆装方便、配件通用、不易堵塞。',
  '产品特点：',
  '1．泵管无泄漏设计，不需要使用机械密封，降低维修成本。',
  '2．电机配有过热保护装置，防止马达因过载而烧毁电机',
  '3．电动或气动驱动，满足不同动力源。',
].map(paragraph);

context.autoDetectTitles({ querySelectorAll: () => paragraphs }, 'general', 'bold');
for (const index of [0, 1, 3, 5, 7, 9, 11]) {
  assert.strictEqual(paragraphs[index].firstChild.tagName, 'STRONG', `${paragraphs[index].textContent} should be bold`);
}
for (const index of [12, 13, 14]) {
  assert.notStrictEqual(paragraphs[index].firstChild.tagName, 'STRONG', `${paragraphs[index].textContent} should remain regular text`);
}

console.log('numbered heading behavior checks passed');
