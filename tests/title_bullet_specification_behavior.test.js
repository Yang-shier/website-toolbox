const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const html = fs.readFileSync(path.join(__dirname, '..', '建站工具箱.html'), 'utf8');
const start = html.indexOf('var TITLE_KEYWORD_GROUPS = [');
const end = html.indexOf('function addParagraphIndent(', start);
assert.ok(start >= 0 && end > start, 'title detection functions should be present');

function makeElement(tagName) {
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
      return node;
    },
    closest() { return null; },
    querySelector() { return null; },
  };
}

function makeParagraph(text) {
  const paragraph = makeElement('p');
  paragraph.appendChild({ nodeType: 3, textContent: text, parentNode: null });
  return paragraph;
}

const context = { document: { createElement: makeElement } };
vm.runInNewContext(html.slice(start, end), context);

const paragraphs = [
  '产品详情：',
  '电磁隔膜计量泵的工作原理是电磁线圈驱动推杆带动PTFE等复合隔膜做往复运动，泵腔容积交替变化，配合双球止回阀完成介质吸入与排出。',
  '技术数据：',
  '•环境温度：-10℃～70℃',
  '•介质粘度：≤800mPa•s',
  '•过流材质：PVC，PVDF，SS304，SS316可选',
  '•膜片材质：PTFE+复合橡胶',
  '•驱动方式：电磁铁驱动',
  '•调节方式：冲程长度在20%~100%范围内连续调节',
  '•冲程频率（范围1-180次/分钟）可调节',
  '•计量精度：±1%',
  '•防护等级：IP65',
  '•产品优势',
  '流量调节方便，适合多种药剂的定量投加。',
].map(makeParagraph);

context.autoDetectTitles({ querySelectorAll: () => paragraphs }, 'general', 'bold');

function isBold(index) {
  return paragraphs[index].firstChild.tagName === 'STRONG';
}

assert.ok(isBold(0), '产品详情 should remain a heading');
assert.ok(isBold(2), '技术数据 should remain a heading');
for (let index = 3; index <= 11; index++) {
  assert.ok(!isBold(index), `${paragraphs[index].textContent} should remain a parameter row`);
}
assert.ok(isBold(12), 'a bullet heading without a value should remain eligible');

const numberedParagraphs = [
  '详情：',
  'HD插桶泵是一款便携式浸入式桶装输送泵，专为200L标准油桶、化工桶液体抽取、转料、分装设计，广泛应用于化工、油品、食品、制药、涂料等行业。',
  '该泵分为电动调速、防爆电动、气动、高扬程等多款机型，适配不同工况需求。泵管配备铝合金、不锈钢、PP、PVDF、PTFE等多种材质。',
  '产品特点：',
  '1．泵管无泄漏设计，不需要使用机械密封，降低维修成本，适合腐蚀性，易燃易爆的液体输送。',
  '2．电机配有过热保护装置，防止马达因过载而烧毁电机',
  '3．电动或气动驱动，满足不同动力源。',
].map(makeParagraph);

context.autoDetectTitles({ querySelectorAll: () => numberedParagraphs }, 'general', 'bold');
assert.strictEqual(numberedParagraphs[0].firstChild.tagName, 'STRONG', '详情 should remain a heading');
assert.strictEqual(numberedParagraphs[3].firstChild.tagName, 'STRONG', '产品特点 should remain a heading');
for (let index = 4; index <= 6; index++) {
  assert.notStrictEqual(numberedParagraphs[index].firstChild.tagName, 'STRONG', `${numberedParagraphs[index].textContent} should remain a list item`);
}

const numberedHeading = [
  '1．安装步骤',
  '安装前先检查泵管和驱动电机，确认连接牢固后再开始输送。',
].map(makeParagraph);
context.autoDetectTitles({ querySelectorAll: () => numberedHeading }, 'general', 'bold');
assert.strictEqual(numberedHeading[0].firstChild.tagName, 'STRONG', 'a short numbered heading should remain eligible');

console.log('title bullet specification behavior checks passed');
