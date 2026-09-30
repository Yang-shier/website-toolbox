# 建站资料库 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `E:\ai\建站工具箱\常用网址及代码.xlsx` 整理为建站工具箱内可搜索、分类、查看、打开与复制的资料库工作区。

**Architecture:** 工作簿内容先转为独立的浏览器全局数据模块，再由纯逻辑模块提供搜索、过滤、路径还原和复制内容计算。主 HTML 只负责资料库 DOM、样式、状态切换和事件绑定，保持现有五个工具入口及格式化逻辑不变。

**Tech Stack:** 原生 HTML/CSS/JavaScript、Node.js 静态与行为测试、现有无打包器浏览器全局模块模式。

**Spec:** `docs/superpowers/specs/2026-09-29-resource-library-design.md`

## Global Constraints

- 第一版只提供查找、分类、打开外部网址和复制，不提供编辑、代码执行、收藏、历史记录或云同步。
- 代码和提示词只能以纯文本展示，禁止通过 `innerHTML` 注入或执行工作簿内容。
- 内网地址按公共前缀和相对路径存储，页面显示精简路径，复制时还原完整 UNC 路径；不伪装成浏览器可直接打开。
- 标题与规范化内容完全相同的条目合并；同名不同内容保留并标注版本。
- 隐藏“目录”页仅用于核对，不为缺少正文或真实链接的目录项虚构内容。
- 保留当前工作区所有无关未提交改动；只做增量编辑，不格式化或重写整个 `建站工具箱.html`、说明文档或更新页。
- 不引入新的线上依赖、打包器或框架，不发布、不推送。
- 静态测试、浏览器验收、本地提交、远程发布和线上访问分别报告，不能互相替代。

## Review Focus

- 搜索词包含大小写、前后空格或中文时，标题、别名、标签、说明及正文均可命中；由 Task 1 行为测试覆盖。
- 分类与搜索叠加、清空搜索但保留分类；由 Task 1 行为测试覆盖。
- 同名不同内容、相同完整路径、空内容和无效网址不会被误合并或生成可用操作；由 Task 1 数据测试覆盖。
- 包含 `<script>`、事件属性或 HTML 标签的代码只显示为文本且不执行；由 Task 2 静态测试和浏览器验收覆盖。
- 小于 760px 时分类条、列表、详情层和返回流程可用；由 Task 2 浏览器验收覆盖。

---

### Task 1: 资料数据与纯逻辑模块

**Files:**
- Create: `src/toolbox-resource-data.js`
- Create: `src/toolbox-resources.js`
- Create: `tests/resource_library_behavior.test.js`

**Interfaces:**
- Consumes: `E:\ai\建站工具箱\常用网址及代码.xlsx` 中的 `ai提示词`、`常用代码`、`共享地址`、`多语言内页banner代码样式`；`目录` 只作核对。
- Produces: `window.ToolboxResourceData = { categories, pathBases, entries }`。
- Produces: `window.ToolboxResources = { normalizeText, getFullPath, getCopyText, filterEntries, isValidHttpUrl }`；Node 测试环境通过 `module.exports` 暴露相同逻辑。
- `filterEntries(entries, query, category)` 返回同时满足分类与全文搜索的条目，分类值 `all` 表示不过滤分类。
- `getCopyText(entry, partKey)` 返回网址、完整 UNC 路径、单一内容或指定 `parts` 内容；`partKey === 'all'` 时按 HTML、CSS、JavaScript、H1、P 的现有顺序拼接非空部分。

- [ ] **Step 1: 写入失败的行为与数据约束测试**

在 `tests/resource_library_behavior.test.js` 中断言：全局导出存在、ID 唯一、分类合法、精确重复消失、同名不同内容仍存在、UNC 重组正确；搜索覆盖标题/别名/标签/说明/正文并忽略大小写和首尾空格；分类可与搜索叠加；URL/代码/提示词/路径和混合片段返回正确复制文本；空值与无效网址产生安全结果。

- [ ] **Step 2: 运行测试并确认因模块缺失而失败**

Run: `node tests/resource_library_behavior.test.js`

Expected: FAIL，原因是资料数据或逻辑模块尚不存在。

- [ ] **Step 3: 整理工作簿并实现数据模块**

将真实工作表内容整理到 `src/toolbox-resource-data.js`：分类固定为 `url`、`internal`、`html`、`css`、`javascript`、`mixed`、`quick-fix`、`prompt`、`banner`；每条包含稳定唯一 `id`、`title`、`category`，再按需包含 `tags`、`description`、`aliases`、`url`、`basePathKey`、`relativePath`、`content`、`parts`、`variantLabel`。不得把目录标题自动补成资料，不得改写原代码语义；示例数据依赖项在说明中标注“复制后请替换示例数据”。

- [ ] **Step 4: 实现纯逻辑模块**

在 `src/toolbox-resources.js` 实现已定义接口。所有函数只处理数据，不读写 DOM；搜索索引不得修改原条目；路径连接须保留 UNC 反斜杠；模块同时支持浏览器全局和 Node 测试。

- [ ] **Step 5: 运行聚焦测试和全量测试**

Run: `node tests/resource_library_behavior.test.js`

Expected: PASS。

Run: `npm.cmd test`

Expected: 所有测试文件 PASS，原 39 个测试文件无回归。

- [ ] **Step 6: 提交 Task 1**

```powershell
git add src/toolbox-resource-data.js src/toolbox-resources.js tests/resource_library_behavior.test.js
git commit -m "feat: add resource library data and search"
```

### Task 2: 页面工作区、文档和真实交互验收

**Files:**
- Modify: `建站工具箱.html`
- Create: `tests/resource_library_static.test.js`
- Modify: `docs/建站工具箱使用说明.md`
- Modify: `docs/updates.html`

**Interfaces:**
- Consumes: Task 1 的 `window.ToolboxResourceData` 与 `window.ToolboxResources`。
- Produces: 页头次级操作区 `data-open-resource-library` 入口；`#resourceLibraryPage` 工作区；搜索、分类、列表和详情 DOM；桌面三栏与小于 760px 的移动详情层。
- 原有五个工具页 ID、现有工具切换、草稿和格式化行为保持不变；进入任意现有工具页时退出资料库但保留资料库搜索词和分类状态。

- [ ] **Step 1: 写入失败的页面结构测试**

在 `tests/resource_library_static.test.js` 中断言：资料库入口、`#resourceLibraryPage`、搜索框、结果计数、分类区、列表、详情区和移动返回按钮存在；`toolbox-resource-data.js` 在 `toolbox-resources.js` 之前且两者在资料库绑定代码之前加载；原五个工具入口与页面 ID 仍存在；无工作簿内容通过 `innerHTML` 渲染；使用说明和更新记录都包含资料库说明。

- [ ] **Step 2: 运行静态测试并确认因页面尚未接入而失败**

Run: `node tests/resource_library_static.test.js`

Expected: FAIL，原因是资料库 DOM 或脚本引用尚不存在。

- [ ] **Step 3: 增量接入资料库页面与样式**

在现有次级操作区增加“资料库”按钮；增加 `#resourceLibraryPage`，桌面为分类/结果/详情三栏，顶部搜索提示为“搜索网址、路径、代码、提示词……”。小于 760px 时分类变为横向条，列表全宽，详情为全宽层并带“返回列表”。只在相关位置追加样式与结构，不重排现有主文件。

- [ ] **Step 4: 接入交互、复制与打开行为**

使用 Task 1 纯逻辑模块完成搜索、分类、结果计数、选择、详情分段和操作按钮。网址仅在 `isValidHttpUrl` 为真时允许 `window.open`；UNC 仅提供“复制完整路径”；复制优先 Clipboard API、失败时使用兼容回退，并调用现有 toast。标题、说明、路径、代码和提示词全部通过 `textContent` 或等价安全文本节点渲染。

- [ ] **Step 5: 同步用户文档**

在 `docs/建站工具箱使用说明.md` 增加入口位置、分类、搜索、网址打开、代码/提示词复制、内网路径复制及浏览器限制说明；在 `docs/updates.html` 增加 2026-09-30 资料库更新记录。保留两个文件已有未提交修改。

- [ ] **Step 6: 运行静态测试和全量测试**

Run: `node tests/resource_library_static.test.js`

Expected: PASS。

Run: `npm.cmd test`

Expected: 全部测试 PASS，且 Task 1 和原 39 个测试文件无回归。

- [ ] **Step 7: 浏览器验收**

启动静态页面并在真实浏览器验证：桌面进入资料库、搜索、分类、查看详情、打开有效网址、复制代码、复制完整 UNC；无结果与空内容状态；代码文本不执行；窄屏分类横向切换、详情打开和返回。保存桌面与窄屏截图或在报告中写明可复现操作与观察结果。

- [ ] **Step 8: 提交 Task 2**

```powershell
git add 建站工具箱.html tests/resource_library_static.test.js docs/建站工具箱使用说明.md docs/updates.html
git commit -m "feat: add in-page resource library"
```
