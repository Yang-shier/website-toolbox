const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlFile = fs
  .readdirSync(root)
  .find((name) => name.endsWith('.html') && name !== 'index.html');
const html = fs.readFileSync(path.join(root, htmlFile), 'utf8');

assert.ok(html.includes('id="optAiTitle"'), 'format page should include an AI subtitle detection toggle');
assert.ok(html.includes('id="aiTitleConfigModal"'), 'format page should include local AI endpoint configuration');
assert.ok(html.includes("var AI_TITLE_CONFIG_KEY = 'site_toolbox_ai_title_config';"), 'AI endpoint config should be stored locally');
assert.ok(html.includes("var DEFAULT_AI_TITLE_ENDPOINT = 'https://site-toolbox-title-ai.yangzhen1031.workers.dev';"), 'AI title detection should default to the deployed Worker endpoint');
assert.ok(html.includes('async function requestAiTitleIndexes'), 'formatter should call the AI title worker');
assert.ok(html.includes('aiTitleApplied = await applyAiTitleDetection(container, titleOutputMode);'), 'one-click formatting should run AI title detection automatically');
assert.ok(html.includes("showToast('AI识别失败，已使用本地规则', true);"), 'formatter should fall back to local title detection on AI failure');

console.log('ai title frontend static checks passed');
