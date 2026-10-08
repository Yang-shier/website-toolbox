/* Readable, reviewed resource data. Workbook content is data only and is never executed. */
(function (root) {
  'use strict';
  const resourceData = {
  "categories": [
    "url",
    "internal",
    "html",
    "css",
    "javascript",
    "mixed",
    "quick-fix",
    "prompt",
    "banner"
  ],
  "pathBases": {
    "internal-172-16-0-4": "\\\\172.16.0.4\\无锡研发",
    "internal-172-16-0-5": "\\\\172.16.0.5\\无锡研发"
  },
  "entries": [
    {
      "id": "prompt-002",
      "title": "pdf内容提取",
      "category": "prompt",
      "content": "将这张图按照HTML格式输出，不需要排版，去掉英文部分的内容，代码只包括table,p，不要th，换成td  小标题的部分用strong标签加粗"
    },
    {
      "id": "prompt-003",
      "title": "联系方式替换",
      "category": "prompt",
      "content": "【联系内容】将以上内容提取替换到下方代码中【联系方式代码】"
    },
    {
      "id": "prompt-004",
      "title": "页面生成",
      "category": "prompt",
      "content": "建议先简单描述，再使用下方提示词做限制，例如：公司简介使用css帮我排版以下，然后第一版出来之后，再采用以下内容做限制",
      "variantLabel": "版本 1"
    },
    {
      "id": "prompt-005",
      "title": "页面生成",
      "category": "prompt",
      "content": "帮我用css排版下，主题色 #xxx，类名以 xxx-xxx 开头，纯 CSS 动画，不用 JS，无需头部尾部，不用 section，统一用 <div>，不用重置样式，不要使用特殊字体，无需头部尾部，字体不小于14px，涉及到图标使用https://sitecdn.71360.com/static/txys-001/css/font-awesome/css/font-awesome.min.css\n",
      "variantLabel": "版本 2"
    },
    {
      "id": "prompt-006",
      "title": "页面生成",
      "category": "prompt",
      "content": "帮我做一个网站中间模块，纯 CSS 动画，类名以 XXX 开头，全部用 div，不用 section/header/footer，不要重置样式，不要特殊字体，字体不小于 14px，图标用 https://sitecdn.71360.com/static/txys-001/css/font-awesome/css/font-awesome.min.css，主题色是 #xxx，是嵌入到已有页面用的，已经有头部尾部和 banner，只做中间内容区，文字内容一个字都不要少，排版要干净大方，不要花哨，适合企业官网风格，以下是原文——",
      "variantLabel": "版本 3"
    },
    {
      "id": "prompt-007",
      "title": "页面生成",
      "category": "prompt",
      "content": "帮我用css排版下，主题色使用#d20000【色值】，类名以YTDM888【用户名】开头，不要改变原来的文章涵义，禁止胡编乱造，不要使用section标签，无需重置body和*，无需头部尾部，字体不小于14px，",
      "variantLabel": "版本 4"
    },
    {
      "id": "prompt-008",
      "title": "发展历程",
      "category": "prompt",
      "content": "【发展历史内容】将以上内容提取按照倒序的方式替换到下方代码中【发展历程代码】"
    },
    {
      "id": "prompt-009",
      "title": "发展历程图片",
      "category": "prompt",
      "content": "【发展图片】提取图片中的内容，将提取的内容按照倒序的方式替换到下方代码中【发展历程代码】"
    },
    {
      "id": "prompt-010",
      "title": "荣誉资质",
      "category": "prompt",
      "content": "【所有图片链接】将以上图片链接按照顺序替换到下方代码中【荣誉资质代码】"
    },
    {
      "id": "prompt-011",
      "title": "公司优势提取",
      "category": "prompt",
      "content": "【公司简介】不要改变原来的文章涵义，禁止胡编乱造，按照以下代码的格式化来提取合适内容填充到下方代码中【模块代码】"
    },
    {
      "id": "prompt-012",
      "title": "公司优势提取【进阶】",
      "category": "prompt",
      "content": "【图片】按照图片的优势模块格式，从以下原文提以下内容拆分对应板块，仅整理各板块图文文案，不输出 HTML"
    },
    {
      "id": "prompt-013",
      "title": "建站工具箱",
      "category": "prompt",
      "content": "https://yang-shier.github.io/website-toolbox/  "
    },
    {
      "id": "prompt-014",
      "title": "分类提取",
      "category": "prompt",
      "content": "提取分类，并以markdown代码形式输出给我，不同层级用#区分【代码】"
    },
    {
      "id": "prompt-015",
      "title": "数据提取",
      "category": "prompt",
      "content": "【公司简介】把这段文字里的关键数据提取出来，替换到下方 HTML 代码里，标签文字可以根据原文内容合理修改适配【代码】"
    },
    {
      "id": "prompt-016",
      "title": "图片类模块还原提示词",
      "category": "prompt",
      "content": "请根据我提供的截图/描述，编写对应前端模块（HTML + CSS），遵循以下全部规则：\n\n\n1.标签选择：不用 section 标签，统一用 <div> 或语义化标签（如 <ul>、<li>、<a>、<blockquote>）\n2.不要重置：不写 * { margin:0; padding:0; } 和 body 样式重置\n3.类名命名：所有类名以我指定的前缀开头，采用 BEM 命名风格（如 模块名__元素名、模块名_元素名-修饰）\n4.CSS 变量：不写在 :root 上，写在模块根元素的类上；变量名必须带上模块前缀（如 --模块名-颜色名）\n5.图标方案：用 Font Awesome 4.x，引入地址为：\nhttps://sitecdn.71360.com/static/txys-001/css/font-awesome/css/font-awesome.min.css\n图标用 <i class=\"fa fa-xxx\"></i>，不使用内联 SVG\n6.输出格式：直接输出完整的 <style> + <div> 结构，不需要 <!DOCTYPE> 等完整页面骨架\n7.响应式：小屏（768px 以下）需做适配，通常是纵向堆叠\n8.交互细节：hover 状态用 transition 做过渡，包括颜色变化、位移等\n9.视觉还原：颜色、字号、间距、边框等尽量贴近截图，不确定的用合理值\n\n请等我提供具体截图或需求后再开始编写。"
    },
    {
      "id": "prompt-017",
      "title": "根据内容写模块",
      "category": "prompt",
      "content": "1.只输出一个 <div> 容器，不写 <html><head><body><section> 等外层标签\n2.不要写 *body 等全局重置样式\n3.不要引入外部字体，字体继承页面默认\n4.容器本身不写 max-widthwidth，宽度由我页面控制\n5.所有 class 统一加前缀，避免与页面现有样式冲突（这次用前缀：xxx）\n6.样式用 <style> 标签跟在 HTML 后面，不用外链 CSS\n7.可以有入场动画和 hover 交互\n8.主题色：#1d2733\n9.图标方案：用 Font Awesome 4.x，引入地址为：https://sitecdn.71360.com/static/txys-001/css/font-awesome/css/font-awesome.min.css\n\n模块内容如下："
    },
    {
      "id": "prompt-018",
      "title": "workbuddy整理资料--后续通过产品资料整理工具",
      "category": "prompt",
      "content": "整理【建站资料包】产品素材。\n源目录：<C:\\Users\\PC\\Desktop\\...\\产品>\\建站资料包 产品部分1、建站资料包 产品部分2\n\n1. 去掉每个文件夹名称的前缀标签（一级分类名称：/二级分类名称：/产品N，名称：），只保留真实名称\n2. 新建输出文件夹「<产品整理输出>」，原始文件夹保持不动、不做任何修改\n3. 抽选 <30> 个产品：先每个二级分类下各取 1 个，再从第一个分类开始循环补齐\n4. 输出层级：一级分类/二级分类/产品名\n5. 每个产品文件夹内生成一份 <产品详情.docx>\n6. Word 里只放一张图片，不要任何文字\n7. 取图：优先含「详情+尺寸」的那张（详情 尺寸.jpg / 详情页 尺寸.jpg），没有「详情」字样就取尺寸图\n8. 这张图从产品文件夹里删掉，其余文件（主图、轮播、未入选详情图、视频）保留\n9. 输出一份整理报告，逐条列出每个产品用了哪张图",
      "description": "复制后请替换示例数据"
    },
    {
      "id": "code-002",
      "title": "工具",
      "category": "url",
      "url": "https://yang-shier.github.io/website-toolbox/"
    },
    {
      "id": "code-003",
      "title": "详情页代码",
      "category": "mixed",
      "variantLabel": "版本 1",
      "parts": {
        "HTML": "<div style=\"height:10px\"></div>",
        "CSS": "<style>\n.news_detail_content p {margin:15px 0px;line-height:1.8;}\n.detail_specfic_panel p  {line-height:1.8; margin:15px 0px;}\n.detail_specfic_panel_item table{width: 100%;border-spacing: 0;border-collapse: collapse;margin:auto}\n.detail_content{line-height: 25px;}\n</style>"
      }
    },
    {
      "id": "code-004",
      "title": "左地图右留言",
      "category": "css",
      "content": "<style>\n@media screen and (min-width:768px) and (max-width:1366px){\n.pc_pattern .basic_map .map_wrap_line{\n    padding-bottom: 93.4% !important\n}\n}\n</style>"
    },
    {
      "id": "code-005",
      "title": "表格代码",
      "category": "css",
      "content": "<style>\n    .detail_specfic_panel table td p {\n        line-height: 1;\n        margin: 5px 0px;\n    }\n    table {\n        width: 100%;\n        border-spacing: 0px;\n    }\n</style>",
      "variantLabel": "版本 1"
    },
    {
      "id": "code-006",
      "title": "表格代码",
      "category": "css",
      "content": "<style>\n    table {\n        width: 100%;\n        border-spacing: 0px;\n    }\n    table tr:first-child td {\n        color: #ffffff;\n        font-size: 16px;\n        font-weight: bold;\n        letter-spacing: 1.53px;\n        background-color: #a60000;\n        position: relative;\n        padding: 20px 15px 20px 15px;\n        text-align: center;\n    }\n    table tr:first-child td:after {\n        display: none;\n    }\n    table tr td:first-child {\n        text-align: center;\n    }\n    table td {\n        color: #424242;\n        font-size: 14px;\n        letter-spacing: 1.02px;\n        background-color: #ffffff;\n        padding: 0px !important;\n        position: relative;\n        font-weight: lighter;\n        padding: 6px 15px 6px 6px;\n        border: 0px solid #ddd !important;\n    }\n    .detail_specfic_panel table td p {\n        margin: 10px 0px;\n    }\n\n    table td:after {\n        position: absolute;\n        left: 0;\n        bottom: 0;\n        content: '';\n        width: 100%;\n        height: 1px;\n        background-color: #d0d0d0;\n    }\n    table tr:first-child td::before {\n        position: absolute;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        margin: auto;\n        content: '';\n        background-color: #f7f7f7;\n        width: 1px;\n        height: 34px;\n    }\n    table tr:first-child td:last-child::before {\n        display: none;\n    }\n    table tr:first-child td:after {\n        display: none;\n    }\n</style>\n",
      "variantLabel": "版本 2"
    },
    {
      "id": "code-007",
      "title": "表格滚轮",
      "category": "mixed",
      "parts": {
        "HTML": "<div style=\"overflow:auto;\">\n</div>",
        "JavaScript": "$('table').wrap(\"<div style='overflow:auto'></div>\")"
      }
    },
    {
      "id": "code-008",
      "title": "媒体查询文字大小",
      "category": "css",
      "content": "<style>\n@media screen and (min-width:768px) and (max-width:1366px){\n.yz span{\nfont-size:12px !important\n}}\n</style>（备注：自己要把对应类名写上去）\nclass=\"yz\""
    },
    {
      "id": "code-009",
      "title": "左图片右文字图片垂直居中",
      "category": "quick-fix",
      "content": "style=\"vertical-align: middle;\""
    },
    {
      "id": "code-010",
      "title": "字体图标",
      "category": "url",
      "url": "https://www.thinkcmf.com/font/font_awesome/icons.html"
    },
    {
      "id": "code-011",
      "title": "英文转行",
      "category": "css",
      "content": "<style>\n*{\n word-break:keep-all!important\n}\n</style>"
    },
    {
      "id": "code-012",
      "title": "新闻样式不正常",
      "category": "css",
      "content": "<style>\n#u602604 .u-list{\npadding-top:10px\n}\n.pc_pattern #u602604 .basic-article-list-box .news_list_item_inner{\npadding: 10px;\n}\n</style>（找到对应的id然后修改）"
    },
    {
      "id": "code-013",
      "title": "4.0外贸加谷歌地图",
      "category": "html",
      "content": "插入代码，有使用方法\n<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.331105678864!2d120.50305031547724!3d31.62478354914239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b39547fe9fe003%3A0x75186ec5aa0453d5!2zQmFpZmEgUG93ZXIg77yIV3V4ae-8iSBDby4sIEx0ZC4!5e0!3m2!1sen!2shk!4v1591077334833!5m2!1sen!2shk\" width=\"100%\" height=\"460\" frameborder=\"0\" style=\"border:0;\" allowfullscreen=\"\" aria-hidden=\"false\" tabindex=\"0\"></iframe>\n\n<!-- 使用方法：（需翻墙）\n\t预览页点击：view larger map\n\t搜索地址，点击share -> embed a map\n\t复制iframe地址替换上方代码\n\t宽高可自己调整\n-->",
      "description": "复制后请替换示例数据"
    },
    {
      "id": "code-014",
      "title": "4.0导航边距修改1366",
      "category": "css",
      "content": "<style>\n@media screen and (min-width:768px) and (max-width:1366px){\n.pc_pattern  .basic_navbar .navContent .pageLine{\nmargin-right: 0px !important\n}\n}\n</style>"
    },
    {
      "id": "code-015",
      "title": "4.0产品分类一排5个",
      "category": "css",
      "content": "<style>\n.basic_classification .view_pattern_pc .content_detail_style5 .level_1>li{\nwidth: 20%;\n}\n</style>"
    },
    {
      "id": "code-016",
      "title": "4.0给表格加overflow:auto",
      "category": "mixed",
      "parts": {
        "HTML": "<p style=\"min-height:10px;\">  </p>",
        "JavaScript": "<script src=\"/static/txys-001/js/jquery-1.11.3.min.js\"></script>\n\n<script src=\"/static/txys-001/js/jquery.lazyload.min.js\"></script>\n\n<script>\n$('table').wrap(\"<div style='overflow:auto'></div>\")\n</script>"
      }
    },
    {
      "id": "code-017",
      "title": "3.0留言表单 隐私保护 更换颜色",
      "category": "css",
      "content": ".privacy_preservation_protocol{\n    color: #fff !important;\n}\n.privacy_preservation_protocol a{\n    color: #fff !important;\n}"
    },
    {
      "id": "code-018",
      "title": "数字滚动",
      "category": "javascript",
      "content": "$(\".numc span:first-child\").addClass(\"count\");\n$('.count').each(function () {\n          $(this).prop('Counter',0).animate({\n            Counter: $(this).text()\n        }, {\n            duration: 8000,\n            easing: 'swing',\n            step: function (now) {\n                $(this).text(Math.ceil(now));\n            }\n          });\n        });"
    },
    {
      "id": "code-019",
      "title": "3.0隐私保护，位置调整",
      "category": "css",
      "content": ".privacy_preservation_protocol{\n    margin-bottom: 0px;\n    position: absolute;\n    top: 41px;\n    left: -95px;\n    font-size: 12px;\n    padding-top: 2px;\n}\n\n.privacy_preservation_protocol input[type=checkbox]{\n      margin: 2px 0 0;\n}\n"
    },
    {
      "id": "code-020",
      "title": "内贸导航透明代码（压住内页banner）",
      "category": "css",
      "content": "<style>.pc_pattern .layout_header{background-color: rgb(255 255 255 / 0%)!important;position: absolute;z-index: 10;}\n.full_screen_banner .edit_tool_banner .edit_tool_wrap{margin-top: 80px!important;}</style>"
    },
    {
      "id": "code-021",
      "title": "3.0视频循环播放 去除控制条",
      "category": "javascript",
      "content": "$(\".full_screen_banner_video\").removeAttr(\"controls\");\n$(\".full_screen_banner_video\").attr(\"loop\",\"loop\");"
    },
    {
      "id": "code-022",
      "title": "浏览次数左侧加小图标",
      "category": "css",
      "content": "<style>\n.news_detail_info_item:nth-of-type(3){\n    position: relative;\n    padding-left: 15px;\n}\n.news_detail_info_item:nth-of-type(3):before {\n    content: '\\f06e';\n    font-family: 'FontAwesome';\n    position: absolute;\n    left: -2px;\n}\n</style>"
    },
    {
      "id": "code-023",
      "title": "手机端导航强制换行",
      "category": "quick-fix",
      "content": "white-space: pre-wrap;line-height: 30px;"
    },
    {
      "id": "code-024",
      "title": "强制文字需要的行数超出则隐藏",
      "category": "quick-fix",
      "content": "display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;"
    },
    {
      "id": "code-025",
      "title": "打开是pdf",
      "category": "html",
      "content": "<p>\n    <iframe src=\"https://img01.71360.com/file/read/www/M00/FB/1A/wKj0iWHC6tGAEhE1AAjbDtfZVNo312.pdf\" style=\"width:100%;height:100%;\" frameborder=\"0\"></iframe>\n</p>",
      "description": "复制后请替换示例数据"
    },
    {
      "id": "code-026",
      "title": "flex布局左侧布局变形",
      "category": "quick-fix",
      "content": "在变形的元素上加flex-shrink: 0 "
    },
    {
      "id": "code-027",
      "title": "t-talk控制点击按钮出现聊天框",
      "category": "javascript",
      "content": "$(\"#u511345 #links_a li\").eq(0).click(function(){ $(\".set-suspend-item-ttalk\").click(); }) "
    },
    {
      "id": "code-028",
      "title": "产品详情表格居左 不要双框线",
      "category": "css",
      "content": "<style>.detail_specfic_panel_item table{width: 100%;border-spacing: 0;border-collapse: collapse;}</style>"
    },
    {
      "id": "code-029",
      "title": "图片变灰",
      "category": "quick-fix",
      "content": "filter: grayscale(80%);/*fire*/\n-webkit-filter:grayscale(80%);/*chrome*/"
    },
    {
      "id": "code-030",
      "title": "英文站点图文轮播标题英文不断词",
      "category": "javascript",
      "content": "<script>\n    $('.icon-combination-title').each(function () {\n        let replaceHtml = $(this).html().replaceAll('&nbsp;', ' ');\n        $(this).html(replaceHtml);\n    });\n</script>"
    },
    {
      "id": "code-031",
      "title": "英文导航首字母大写",
      "category": "css",
      "content": "<style>\n.childrenData{\ntext-transform: capitalize;\n}\n</style>"
    },
    {
      "id": "code-032",
      "title": "分类组件点击展开",
      "category": "javascript",
      "content": "if (document.location.href.indexOf('product.html') > -1 ) {\n\n $(\".level_1 li\").each(function(){\n  $(this).find(\".level_2\").show();\n  $(this).find(\".img_content_1\").find(\"img\").addClass(\"open\");\n\n})\n\n\n$(function(){\n$(\".level_1 li\").eq(0).find(\".img_content_1\").find(\"img\").addClass(\"open\")\n})\n\n\n\n}"
    },
    {
      "id": "code-033",
      "title": "150%左侧分类不正常显示",
      "category": "css",
      "content": "<style>\n@media screen and (min-width:768px) and (max-width:1366px){\n.pc_pattern #u482303 .view_pattern_pc .lineHeightStyle{\n    width: 100% !important;\n}\n.basic_classification .img_content_1, .basic_classification .img_content_2{\n    display: none;\n}\n}\n</style>"
    },
    {
      "id": "code-034",
      "title": "whatsapp链接",
      "category": "html",
      "content": "<a href=\"https://api.whatsapp.com/send?phone=8618678820990\" style=\"font-size:15px;color:#808285;\">+86-18678820990</a>",
      "description": "复制后请替换示例数据"
    },
    {
      "id": "code-035",
      "title": "单页面样式1",
      "category": "mixed",
      "variantLabel": "版本 1",
      "description": "复制后请替换示例数据",
      "parts": {
        "HTML": "<div class=\"yangzhen-box\">\n    <p class=\"yangzhen-title\">技术研发与生产实力</p>\n    <p>\n        欣兴工具拥有国内领先的刀具研发团队，建立了专业的省级企业研究院和省级企业技术中心，是一家真正技术驱动型的刀具生产企业。\n        我们拥有现代化的生产线，包含国际知名的加工中心、全自动CNC机床、热处理生产线，拥有强大的生产能力，严格按照质量管理体系生产。我们还拥有优秀的检测仪器，对原料、热处理、刀具参数进行一系列检测。\n        技术项目：截止至2022年12月31日，拥有专利90余项； 研发中心被认定为“省级高新技术研究开发中心” 国家制造业单项冠军 “浙江制造”认证证书\n        浙江省创新型示范企业 企业研究院被认定为省级企业研究院 浙江省首批隐形冠军企业 对于您而言意味着：可靠的产品供应和产品质量稳定的保障。\n    </p>\n    <p class=\"yangzhen-title1\">生产|研发</p>\n    <p>\n        让切削更高效,是欣兴人始终不变的目标。\n        因此，欣兴的现代化工厂装备了国际先进的科研设备,组建起一支全专家阵容的研发团队。我们以创新为驱动,以高标准为基准不断进化,不断强化研发智造能力,致力于创造更多出色的高效高精密切削工具。\n    </p>\n</div>",
        "CSS": "<style>\n    .yangzhen-box .yangzhen-title {\n        background: #f8f7f5;\n        border-left: 3px #ec6800 solid;\n        line-height: 40px !important;\n        padding-left: 20px;\n        font-size: 20px;\n        color: #252525;\n        margin: 10px 0;\n        font-weight: bold;\n    }\n\n    .yangzhen-box .yangzhen-title1 {\n        background: #f8f7f5;\n        line-height: 40px !important;\n        padding-left: 20px;\n        font-size: 18px;\n        color: #252525;\n        font-weight: 600;\n        margin: 10px 0;\n    }\n\n    .yangzhen-box p {\n        line-height: 30px !important;\n        font-size: 16px;\n        font-weight: lighter;\n        color: #222;\n    }\n</style>"
      }
    },
    {
      "id": "code-036",
      "title": "单页面样式2",
      "category": "mixed",
      "description": "复制后请替换示例数据",
      "parts": {
        "HTML": "<div class=\"yangzhen-box\">\n    <p class=\"yangzhen-title\">技术研发与生产实力</p>\n    <p>\n        欣兴工具拥有国内领先的刀具研发团队，建立了专业的省级企业研究院和省级企业技术中心，是一家真正技术驱动型的刀具生产企业。\n        我们拥有现代化的生产线，包含国际知名的加工中心、全自动CNC机床、热处理生产线，拥有强大的生产能力，严格按照质量管理体系生产。我们还拥有优秀的检测仪器，对原料、热处理、刀具参数进行一系列检测。\n        技术项目：截止至2022年12月31日，拥有专利90余项； 研发中心被认定为“省级高新技术研究开发中心” 国家制造业单项冠军 “浙江制造”认证证书\n        浙江省创新型示范企业 企业研究院被认定为省级企业研究院 浙江省首批隐形冠军企业 对于您而言意味着：可靠的产品供应和产品质量稳定的保障。\n    </p>\n    <p class=\"yangzhen-title1\">生产|研发</p>\n    <p>\n        让切削更高效,是欣兴人始终不变的目标。\n        因此，欣兴的现代化工厂装备了国际先进的科研设备,组建起一支全专家阵容的研发团队。我们以创新为驱动,以高标准为基准不断进化,不断强化研发智造能力,致力于创造更多出色的高效高精密切削工具。\n    </p>\n</div>",
        "CSS": "<style>\n    .yangzhen-box .yangzhen-title {\n        border: 1px #f0f0f0 solid;\n        border-left: 3px #157ee9 solid;\n        padding: 10px;\n        margin-top: 15px;\n        color: #333;\n        font-size: 20px;\n    }\n    .yangzhen-box .yangzhen-title1 {\n        font-size: 16px;\n        line-height: 1.8;\n        color: #666;\n        margin-left: 7px;\n        position: relative;\n        padding-left: 15px;\n\t\tfont-weight: bold;\n    }\n    .yangzhen-box .yangzhen-title1::after {\n        content: '';\n        position: absolute;\n        left: 0;\n        top: 50%;\n        margin-top: -2px;\n        width: 8px;\n        height: 4px;\n        background-color: #157ee9;\n    }\n    .yangzhen-box .yangzhen-title2 {\n        background: #f8f7f5;\n        line-height: 40px !important;\n        padding-left: 20px;\n        font-size: 14px;\n        color: #252525;\n        font-weight: 600;\n    }\n    .yangzhen-box p {\n        line-height: 30px !important;\n        font-size: 15px;\n        font-weight: lighter;\n        color: #222;\n        margin: 10px 0;\n    }\n</style>"
      }
    },
    {
      "id": "code-037",
      "title": "详情页代码",
      "category": "mixed",
      "variantLabel": "版本 2",
      "parts": {
        "HTML": "<div style=\"height:10px\"></div>",
        "CSS": "<style>\n.news_detail_content p {margin:15px 0px;line-height:1.8;}\n.detail_specfic_panel p {line-height:1.8; margin:15px 0px;}\n.detail_specfic_panel_item table{width: 100%;border-spacing: 0;border-collapse: collapse;margin:auto}\n</style>"
      }
    },
    {
      "id": "code-039",
      "title": "表格代码",
      "category": "css",
      "content": "<style>\ntable,\ntable td {\ntext-align: center;\nborder: 1px solid #000;\nborder-collapse: separate;\n}\ntable {\nmargin: 15px 0 auto 0;\nborder-collapse: collapse;\nborder: 1px solid #aaa;\nwidth: 100%;\n}\ntable th {\nvertical-align: baseline;\npadding: 5px 15px 5px 6px;\nbackground-color: #3f3f3f;\nborder: 1px solid #3f3f3f;\ntext-align: left;\ncolor: #fff;\n}\ntable td {\npadding: 6px 15px 6px 6px;\nborder: 1px solid #aaa;\n}\ntable tr:nth-child(odd) {\nbackground-color: #f8f9f9;\n}\ntable tr:nth-child(even) {\nbackground-color: #e9eef4;\n}\ntable tr:first-child {\nbackground-color: #0a92bc;\ncolor: #fff !important;\nfont-weight: bold !important;\n}\n.detail_specfic_panel table td p {\nline-height: 1;\nmargin: 5px 0px;\n}\n</style> ",
      "variantLabel": "版本 3"
    },
    {
      "id": "code-042",
      "title": "高德地图英文",
      "category": "mixed",
      "variantLabel": "版本 1",
      "parts": {
        "HTML": "<script src=\"http://webapi.amap.com/maps?v=1.3&key=bb5b2e9b0e21f98edd0ddbddc2aafb2f\"></script>\n<script type=\"text/javascript\" src=\"http://cache.amap.com/lbs/static/addToolbar.js\"></script>\n<div id=\"gaode_ditu\"></div>",
        "CSS": "#gaode_ditu { width: 1111px; overflow: hidden; height: 308px; }\n.amap-copyright {display:none !important;}\n.amap-logo {display:none !important;}",
        "JavaScript": "var map = new AMap.Map('gaode_ditu', {\nresizeEnable: true,\ncenter: [121.452231,31.299574],\nzoom: 13\n});\nvar marker = new AMap.Marker({\nposition: map.getCenter(),\ndraggable: true,\ncursor: 'move'\n});\nmarker.setMap(map);\n// 设置点标记的动画效果，此处为弹跳效果\nmarker.setAnimation('AMAP_ANIMATION_BOUNCE');\n// 英文版本地图标注\nmap.setLang(\"en\");"
      },
      "description": "同一模块的 HTML、CSS 与 JavaScript 续写已合并。"
    },
    {
      "id": "code-045",
      "title": "4.0产品详情更换文字",
      "category": "javascript",
      "content": "<script>\n$(document).ready(function(){\n$(\".detail_specific_tab\").text(\"项目详情\")\n})\n</script>"
    },
    {
      "id": "code-047",
      "title": "谷歌地图",
      "category": "html",
      "content": "插入代码，有使用方法\n<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.331105678864!2d120.50305031547724!3d31.62478354914239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b39547fe9fe003%3A0x75186ec5aa0453d5!2zQmFpZmEgUG93ZXIg77yIV3V4ae-8iSBDby4sIEx0ZC4!5e0!3m2!1sen!2shk!4v1591077334833!5m2!1sen!2shk\" width=\"100%\" height=\"460\" frameborder=\"0\" style=\"border:0;\" allowfullscreen=\"\" aria-hidden=\"false\" tabindex=\"0\"></iframe>\n\n<!-- 使用方法：（需翻墙）\n预览页点击：view larger map\n搜索地址，点击share -> embed a map\n复制iframe地址替换上方代码\n宽高可自己调整\n-->",
      "description": "复制后请替换示例数据"
    },
    {
      "id": "code-048",
      "title": "分类一排5个",
      "category": "css",
      "content": "<style>\n.basic_classification .view_pattern_pc .content_detail_style5 .level_1>li{\nwidth: 20%;\n}\n</style>"
    },
    {
      "id": "code-050",
      "title": "3.0数字滚动",
      "category": "javascript",
      "content": "$(\".numc span:first-child\").addClass(\"count\");\n$('.count').each(function () {\n$(this).prop('Counter',0).animate({\nCounter: $(this).text()\n}, {\nduration: 8000,\neasing: 'swing',\nstep: function (now) {\n$(this).text(Math.ceil(now));\n}\n});\n});"
    },
    {
      "id": "code-060",
      "title": "图片变白",
      "category": "quick-fix",
      "content": "filter: brightness(0) invert(1);"
    },
    {
      "id": "code-067",
      "title": "分类挂件右侧图标隐藏",
      "category": "css",
      "content": ".basic_classification .img_content_1, .basic_classification .img_content_2{display: none;}"
    },
    {
      "id": "code-068",
      "title": "悬浮按钮",
      "category": "mixed",
      "description": "复制后请替换示例数据",
      "parts": {
        "HTML": "<div class=\"ZhiyueButton\">\n<a href=\"https://eismega.firecloudtech.com/\" target=\"_blank\">\nEIS Mega\n<br />\n软件进入\n</a>\n</div>",
        "CSS": "<style>\n.ZhiyueButton {\nposition: fixed;\nleft: 15px;\nbottom: 25%;\nwidth: 70px;\nheight: 70px;\nbackground-color: #ae2285;\ndisplay: none;\nalign-items: center;\njustify-content: center;\npadding: 5px;\nbox-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);\nborder-radius: 50%;\nz-index: 10000;\n}\n.ZhiyueButton a {\nfont-size: 12px;\ncolor: #fff;\ntext-align: center;\nfont-weight: bold;\n}\n.mb_pattern .ZhiyueButton {\ndisplay: flex !important;\n}\n</style>"
      }
    },
    {
      "id": "code-069",
      "title": "并列按钮",
      "category": "mixed",
      "description": "复制后请替换示例数据",
      "parts": {
        "HTML": "<div class=\"ZhiyueBanner\">\n<a href=\"https://eismega.firecloudtech.com/download.html\" target=\"_blank\">下载客户端</a>\n<a href=\"javascripts:;\" target=\"_blank\">\n在线使用\n<span>敬请期待</span>\n</a>\n</div>",
        "CSS": "<style>\n.ZhiyueBanner {\ndisplay: flex;\nalign-items: center;\njustify-content: space-between;\npadding: 5px;\nbox-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);\ntransition: 0.5s;\n}\n.ZhiyueBanner a {\ndisplay: block;\nbackground-color: #fff;\nborder-radius: 10px;\nwidth: 220px;\nheight: 60px;\nfont-size: 19px;\ncolor: #222;\ntext-align: center;\nfont-weight: lighter;\nline-height: 60px;\ntransition: 0.5s;\nbox-shadow: 0 0 10px 0 rgba(0, 0, 0, 0);\n}\n.ZhiyueBanner a > span {\nfont-size: 12px;\n}\n.ZhiyueBanner a:hover {\ncolor: #ae2285;\nbox-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.6);\n}\n</style>"
      }
    },
    {
      "id": "code-070",
      "title": "图标弹出二维码",
      "category": "mixed",
      "description": "复制后请替换示例数据",
      "parts": {
        "HTML": "<div class=\"media-tubiao\">\n<div class=\"media-tubiao-box\">\n<div class=\"Tanchu\">\n<img src=\"https://img01.71360.com/w3/0q89n3/20240729/b7b3a3770a0096846f4fcd8b89395467.jpg\" alt=\"\" width=\"150\" />\n</div>\n<div class=\"tubiao\">\n<a href=\"javascripts:;\"><img src=\"https://img01.71360.com/w3/0q89n3/20240729/1a3c115376d834996f93d2a3aaa097f7.png\" alt=\"\" /></a>\n</div>\n</div>\n<div class=\"media-tubiao-box\">\n<div class=\"Tanchu\">\n<img src=\"https://img01.71360.com/w3/0q89n3/20240729/dd5409cc7b7110ba05ccdd25ee82fab4.png\" alt=\"\" width=\"150\" />\n</div>\n<div class=\"tubiao\">\n<a href=\"javascripts:;\"><img src=\"https://img01.71360.com/w3/0q89n3/20240729/c6704314e597c71bbcaf72e3a20e901b.png\" alt=\"\" /></a>\n</div>\n</div>\n<div class=\"media-tubiao-box\">\n<div class=\"tubiao\">\n<a href=\"https://space.bilibili.com/3546695893781129?spm_id_from=333.1189.0.0\" target=\"_blank\">\n<img src=\"https://img01.71360.com/w3/0q89n3/20240729/cabe2a5474f1a8f813f4ca01ae898185.png\" alt=\"\" />\n</a>\n</div>\n</div>\n<div class=\"media-tubiao-box\">\n<div class=\"tubiao\">\n<a href=\"https://www.youtube.com/channel/UCqJaZHFaMFVfr3UsWaQsZTg \" target=\"_blank\">\n<img src=\"https://img01.71360.com/w3/0q89n3/20240729/ac4039ca808c629100607284ad6a887f.png\" alt=\"\" />\n</a>\n</div>\n</div>\n<div class=\"media-tubiao-box\">\n<div class=\"tubiao\">\n<a href=\"https://www.facebook.com/profile.php?id=61562478507403\" target=\"_blank\">\n<img src=\"https://img01.71360.com/w3/0q89n3/20240729/8e3accbbc434cbe3ce296ed458e8a6c2.png\" alt=\"\" />\n</a>\n</div>\n</div>\n<div class=\"media-tubiao-box\">\n<div class=\"tubiao\">\n<a href=\"https://x.com/TuruiRobotics\" target=\"_blank\">\n<img src=\"https://img01.71360.com/w3/0q89n3/20240729/0408775b5aedff77a1027dd332c9044e.png\" alt=\"\" />\n</a>\n</div>\n</div>\n</div>",
        "CSS": "<style>\n#u448204 div {\noverflow: visible !important;\n}\n.media-tubiao {\nposition: relative;\ntransition: 0.5s;\ndisplay: flex;\njustify-content: space-between;\n}\n.media-tubiao-box {\nposition: relative;\ntransition: 0.5s;\n}\n.Tanchu {\nposition: absolute;\nwidth: 150px;\nheight: 150px;\ntop: -160px;\nleft: 0;\ndisplay: none;\n}\n.tubiao a {\ndisplay: flex;\nalign-items: center;\njustify-content: center;\nwidth: 30px;\nheight: 30px;\nborder-radius: 50%;\nbackground-color: #666;\n}\n.tubiao img {\nwidth: 20px;\n}\n.media-tubiao-box:hover .tubiao a {\nbackground-color: #b62727;\ntransform: translateY(-6px);\ntransition: 0.5s;\n}\n.media-tubiao-box:hover .Tanchu {\ndisplay: block;\ntransition: 0.5s;\n}\n</style>"
      }
    },
    {
      "id": "code-071",
      "title": "语言栏下拉",
      "category": "mixed",
      "description": "复制后请替换示例数据",
      "parts": {
        "HTML": "<div class=\"language\">\n<a href=\"\"> <img src=\"https://img01.71360.com/w3/k1x9xg/20240902/53330f97f9a78755e37cb08f7dd34155.png\" class=\"icon1\" /> 网站语言 </a> \n<div class=\"drop\">\n<div>\n<a href=\"\" target=\"_blank\">英文</a> \n</div>\n<div>\n<a href=\"\" target=\"_blank\">中文</a> \n</div>\n</div>\n</div>\n<!-- 语言切换 -->",
        "CSS": "<style type=\"text/css\">\n#u254009 #detail_content_word_wrap > div {\noverflow: initial !important;\n}\n#u254008 .basic_rich_text .content_detail {\noverflow: initial;\n}\n.language {\ntext-align: center;\ndisplay: inline-block;\nfont-size: 16px;\nposition: relative;\n}\n.language .icon1 {\nwidth: 25px;\nheight: 25px;\nvertical-align: middle;\nmargin-right: 10px;\n}\n.language > a {\nwidth: 160px;\ncolor: #04dbcc;\ndisplay: flex;\nalign-items: center;\njustify-content: center;\nline-height: 80px;\nposition: relative;\n}\n.language > a:after {\ncontent: '';\ndisplay: inline-block;\nwidth: 5px;\nheight: 5px;\nborder-right: 1px #04dbcc solid;\nborder-bottom: 1px #04dbcc solid;\nmargin-left: 10px;\ntransform: rotate(45deg) translateY(-3px);\n}\n.language .drop {\ndisplay: none;\nborder-bottom-left-radius: 5px;\nborder-bottom-right-radius: 5px;\noverflow: hidden;\nwidth: 100%;\nline-height: 60px;\nbox-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1);\nbackground-color: rgba(255, 255, 255, 0.3);\nposition: absolute;\nz-index: 9;\ntop: 100%;\nleft: 50%;\ntransform: translateX(-50%);\n}\n.language:hover a {\nborder-bottom-left-radius: 0;\nborder-bottom-right-radius: 0;\n}\n.language:hover .drop {\ndisplay: block;\n}\n.language .drop a {\ndisplay: block;\ncolor: #04dbcc;\n}\n.language .drop a:hover {\nbackground-color: #04dbcc;\ncolor: #fff;\n}\n</style>"
      }
    },
    {
      "id": "code-072",
      "title": "ul li无序列表加点",
      "category": "css",
      "content": "<style>\n.news_detail_content ol {\nmargin-inline-start: 20px !important;\n}\n.detail_specfic_panel_item ol {\nmargin-inline-start: 20px !important;\n}\n.news_detail_content ul {\nmargin-inline-start: 20px !important;\n}\n.detail_specfic_panel_item ul {\nmargin-inline-start: 20px !important;\n}\n</style>"
    },
    {
      "id": "code-073",
      "title": "底部留言按钮",
      "category": "mixed",
      "description": "复制后请替换示例数据",
      "parts": {
        "HTML": "<!-- 底部留言按钮 -->\n<div class=\"Bihu_message\">\n<a href=\"\">获取仓配服务报价</a>\n</div>",
        "CSS": "<style>\n.Bihu_message {\nposition: fixed;\nbottom: 0;\nleft: 50%;\nmargin-left: -180px;\nz-index: 1999;\nwidth: 359px;\nheight: 40px;\n}\n.Bihu_message a {\nposition: relative;\ndisplay: flex;\ncolor: #ffffff;\nfont-size: 18px;\nfont-weight: bold;\nmargin: auto 0;\nalign-items: center;\njustify-content: center;\npadding-right: 25px;\n}\n\n.Bihu_message a::after {\ncontent: '';\nposition: absolute;\ntop: auto;\nleft: 0;\nwidth: 359px;\nheight: 55px;\nbackground-image: url(https://img01.71360.com/w3/2vm2pg/20240904/a886eb9101392de1f3ac8eaca3febcea.png);\nbackground-size: contain;\nz-index: -1;\n}\n.Bihu_message a:hover::after {\nopacity: 0.9;\n}\n</style>"
      }
    },
    {
      "id": "code-074",
      "title": "版权",
      "category": "html",
      "content": "<div style=\"display: flex; align-items: center; justify-content: center\">\n<a\ntarget=\"_blank\"\nhref=\"http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011402010662\"\nstyle=\"display: flex; align-items: center; justify-content: center; text-decoration: none\"\n>\n<img src=\"https://img01.71360.com/w3/ogjez8/20240904/2707957e906193d67a3cf3ef3af856aa.png\" width=\"16\" />\n<span style=\"font-size: 14px; color: #fff; margin-left: 10px\">沪公网安备 31011402010662号</span>\n</a>\n</div>\n",
      "description": "复制后请替换示例数据"
    },
    {
      "id": "code-075",
      "title": "滚动模板banner上加个向下的符号",
      "category": "css",
      "content": "<style>\n.full_screen_banner .banner_frame::after {\ncontent: '';\nposition: absolute;\nz-index: 100;\nbottom: 50px;\nleft: 50%;\nmargin-left: -15px;\nwidth: 30px;\nheight: 30px;\nbackground: url(https://img01.71360.com/w3/wew89n/20241030/01a9dc0dc9034e98449fa77b340f8db0.png) no-repeat center center;\nopacity: 0.5;\nanimation: 1.7s floatAnimation ease infinite;\nbackground-size: contain;\n}\n.mb_pattern .full_screen_banner .banner_frame::after {\ndisplay: none;\n}\n@keyframes floatAnimation {\n0%,\n100% {\ntransform: translateY(0);\n}\n\n50% {\ntransform: translateY(-10px);\n}\n}\n</style>",
      "description": "复制后请替换示例数据"
    },
    {
      "id": "code-076",
      "title": "使用密码访问ifram",
      "category": "mixed",
      "parts": {
        "HTML": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>密码输入示例</title>\n\n</head>\n<body>\n<div class=\"container\" id=\"password-container\">\n<h1>请输入密码</h1>\n<input type=\"password\" id=\"password\" placeholder=\"请输入密码\" required>\n<input type=\"button\" value=\"提交\" onclick=\"checkPassword()\">\n</div>\n\n<div id=\"iframe-container\" class=\"hidden\">\n<iframe id=\"target-iframe\" src=\"\"></iframe>\n</div>\n\n\n</body>\n</html>",
        "CSS": "<style>\n/* 全局样式 */\nbody {\nmargin: 0;\npadding: 0;\nfont-family: Arial, sans-serif;\nheight: 100vh; /* 视口高度 */\nbackground-color: #f4f4f4;\njustify-content: center; /* 水平居中 */\nalign-items: center; /* 垂直居中 */\n}\n\n.container {\nbackground: #fff;\npadding: 30px;\nborder-radius: 8px;\nbox-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\ntext-align: center;\nwidth: 300px; /* 固定宽度 */\nmargin: auto; /* 使用 auto 实现水平居中 */\nmargin-top: 30px; /* 上方间距 */ \nmargin-bottom: 30px; /* 下方间距 */\n}\n/* 标题样式 */\nh1 {\nmargin-bottom: 20px;\nfont-size: 24px;\ncolor: #333;\n}\n\n/* 输入框样式 */\ninput[type=\"password\"], input[type=\"button\"] {\nwidth: 100%;\npadding: 10px;\nmargin: 10px 0;\nfont-size: 16px;\nborder: 1px solid #ccc;\nborder-radius: 4px;\n}\n\ninput[type=\"password\"]:focus {\nborder-color: #007bff;\noutline: none;\nbox-shadow: 0 0 5px rgba(0, 123, 255, 0.5);\n}\n\n/* 按钮样式 */\ninput[type=\"button\"] {\nbackground-color: #007bff;\ncolor: white;\ncursor: pointer;\nfont-weight: bold;\n}\n\ninput[type=\"button\"]:hover {\nbackground-color: #0056b3;\n}\n\n/* 隐藏容器 */\n.hidden {\ndisplay: none;\n}\n\n/* iframe 样式 */\niframe {\nwidth: 100%;\nheight: 100vh; /* 使iframe填满视口 */\nborder: none;\n}\n</style>",
        "JavaScript": "<script>\n// 正确密码\nconst correctPassword = \"123456\";\n\nfunction checkPassword() {\nconst inputPassword = document.getElementById(\"password\").value;\n\nif (inputPassword === correctPassword) {\n// 隐藏密码输入框容器\ndocument.getElementById(\"password-container\").classList.add(\"hidden\");\n\n// 显示 iframe 容器并加载目标网页\nconst iframeContainer = document.getElementById(\"iframe-container\");\niframeContainer.classList.remove(\"hidden\");\ndocument.getElementById(\"target-iframe\").src = \"https://app.powerbi.com/view?r=eyJrIjoiODY0NTUyNGItMTgyZi00Y2E2LWFlYjAtMjU5MmY4NDhlNTY0IiwidCI6ImZhZDU2OTgxLTYwMDgtNDgwZi1hMGVkLTFhOTVkYjg0MDg4NyIsImMiOjEwfQ%3D%3D\"; // 嵌入的目标网站\n} else {\nalert(\"密码错误，请重试。\");\n}\n}\n</script>"
      }
    },
    {
      "id": "code-077",
      "title": "代码样式1",
      "category": "mixed",
      "description": "复制后请替换示例数据",
      "parts": {
        "HTML": "<div class=\"SZSWQKJ20250109-service\">\n<div class=\"SZSWQKJ20250109-service-img\">\n<img src=\"https://img03.71360.com/w3/2vg5kg/20250219/7d408a96d71af8fa8c10631f6b13fca1.jpg\" alt=\"\" />\n</div>\n<div class=\"SZSWQKJ20250109-service-content\">\n<p class=\"SZSWQKJ20250109-service-content1\">售前咨询</p>\n<p class=\"SZSWQKJ20250109-service-content2\">——</p>\n<p class=\"SZSWQKJ20250109-service-content3\">电话沟通或登门拜访，了解您的具体需求</p>\n</div>\n<div class=\"SZSWQKJ20250109-service-number\">01</div>\n</div>",
        "CSS": "<style>\n.SZSWQKJ20250109-service {\ndisplay: flex;\nborder: 1px solid #f7f7f7;\ntransition: 0.5s;\nposition: relative;\nalign-items: center;\n}\n.SZSWQKJ20250109-service:hover {\ntransform: translateY(-5px);\nbox-shadow: 0px 3px 12px 0px rgba(197, 197, 197, 0.23);\ntransition: 0.5s;\n}\n.SZSWQKJ20250109-service-number {\nwidth: 15%;\nfont-size: 102px;\ncolor: #fff4f4;\ntext-align: left;\nfont-weight: bold;\n}\n.SZSWQKJ20250109-service-img {\nwidth: 30%;\nheight: 200px;\n}\n.SZSWQKJ20250109-service-img img {\nobject-fit: cover;\nwidth: 100%;\nheight: 100%;\n}\n.SZSWQKJ20250109-service-content {\ndisplay: flex;\nflex-direction: column;\njustify-content: center;\npadding: 20px 60px;\nflex: 1;\n}\n.SZSWQKJ20250109-service-content1 {\nfont-size: 24px;\nfont-weight: bold;\ncolor: #333333;\nline-height: 1.5;\n}\n.SZSWQKJ20250109-service-content2 {\nfont-size: 20px;\nfont-weight: bold;\ncolor: #b5282d;\nline-height: 1.5;\n}\n.SZSWQKJ20250109-service-content3 {\nfont-size: 16px;\ncolor: #999;\nline-height: 1.75;\n}\n.mb_pattern .SZSWQKJ20250109-service-content {\npadding: 10px;\nflex: 1;\n}\n.mb_pattern .SZSWQKJ20250109-service-number {\ndisplay: none;\n}\n</style>"
      }
    },
    {
      "id": "code-078",
      "title": "产品二级分类点击展开",
      "category": "javascript",
      "content": "<script>\n$(function () {\n$('.level_2, .level_3').hide();\n$('.leve_1_content .selected').next().css('display', 'block');\n});\n</script> "
    },
    {
      "id": "code-079",
      "title": "手机端弹出框关闭按钮添加关闭时间",
      "category": "javascript",
      "content": "<script>\n$(function(){ \n$('#basic_floating_frame_box .close-icon').on('click', function(){\n$(this).parent().hide()\n})\n})\n</script>"
    },
    {
      "id": "code-080",
      "title": "js替换分类组件a标签链接",
      "category": "javascript",
      "content": "<script>\n$('.level_1>li:nth-of-type(1) .level_1_content>div>a').attr('href', '/product-200039.html');\n\n</script> "
    },
    {
      "id": "code-081",
      "title": "js替换分类组件img标签链接",
      "category": "javascript",
      "content": "<script>\n// 若img在a标签内部（常见嵌套结构），选择器调整为：\n$('.navchildlist:nth-of-type(6) .child_list:first-of-type .level_2_icon').attr(\n'src',\n'https://img03.71360.com/w3/5p3560/20251117/fdeeae4ea977f720ae0d9924de87851c.jpg'\n);\n</script>",
      "description": "复制后请替换示例数据"
    },
    {
      "id": "code-082",
      "title": "单页面样式1",
      "category": "mixed",
      "variantLabel": "版本 2",
      "description": "复制后请替换示例数据",
      "parts": {
        "HTML": "<div class=\"Fuqiang1-box\">\n<p class=\"Fuqiang1-title\">技术研发与生产实力</p>\n<p>\n欣兴工具拥有国内领先的刀具研发团队，建立了专业的省级企业研究院和省级企业技术中心，是一家真正技术驱动型的刀具生产企业。\n我们拥有现代化的生产线，包含国际知名的加工中心、全自动CNC机床、热处理生产线，拥有强大的生产能力，严格按照质量管理体系生产。我们还拥有优秀的检测仪器，对原料、热处理、刀具参数进行一系列检测。\n技术项目：截止至2022年12月31日，拥有专利90余项； 研发中心被认定为“省级高新技术研究开发中心” 国家制造业单项冠军 “浙江制造”认证证书\n浙江省创新型示范企业 企业研究院被认定为省级企业研究院 浙江省首批隐形冠军企业 对于您而言意味着：可靠的产品供应和产品质量稳定的保障。\n</p>\n<p class=\"Fuqiang1-title1\">生产|研发</p>\n<p>\n让切削更高效,是欣兴人始终不变的目标。\n因此，欣兴的现代化工厂装备了国际先进的科研设备,组建起一支全专家阵容的研发团队。我们以创新为驱动,以高标准为基准不断进化,不断强化研发智造能力,致力于创造更多出色的高效高精密切削工具。\n</p>\n</div>",
        "CSS": "<style>\n.Fuqiang1-box .Fuqiang1-title {\nbackground: #f8f7f5;\nborder-left: 3px #ec6800 solid;\nline-height: 40px !important;\npadding-left: 20px;\nfont-size: 20px;\ncolor: #252525;\nmargin: 10px 0;\nfont-weight: bold;\n}\n\n.Fuqiang1-box .Fuqiang1-title1 {\nbackground: #f8f7f5;\nline-height: 40px !important;\npadding-left: 20px;\nfont-size: 18px;\ncolor: #252525;\nfont-weight: 600;\nmargin: 10px 0;\n}\n\n.Fuqiang1-box p {\nline-height: 30px !important;\nfont-size: 16px;\nfont-weight: lighter;\ncolor: #222;\n}\n</style>"
      }
    },
    {
      "id": "code-083",
      "title": "按钮",
      "category": "mixed",
      "parts": {
        "HTML": "<p>\n<a href=\"/case-item-14.html\" target=\"_blank\"><button class=\"cssbuttons-io-button\">点击查看案例\n<div class=\"icon\">\n<svg height=\"24\" width=\"24\" viewbox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n<path d=\"M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z\" fill=\"currentColor\"></path>\n</svg>\n</div></button></a>\n</p>",
        "CSS": "<style>\n.cssbuttons-io-button {\nbackground: #b38d54;\ncolor: white;\nfont-family: inherit;\npadding: 0.35em;\npadding-left: 1.2em;\nfont-size: 17px;\nfont-weight: 500;\nborder-radius: 0.9em;\nborder: none;\nletter-spacing: 0.05em;\ndisplay: flex;\nalign-items: center;\nbox-shadow: inset 0 0 1.6em -0.6em #b38d54;\noverflow: hidden;\nposition: relative;\nheight: 2.8em;\npadding-right: 3.3em;\ncursor: pointer;\n}\n\n.cssbuttons-io-button .icon {\nbackground: white;\nmargin-left: 1em;\nposition: absolute;\ndisplay: flex;\nalign-items: center;\njustify-content: center;\nheight: 2.2em;\nwidth: 2.2em;\nborder-radius: 0.7em;\nbox-shadow: 0.1em 0.1em 0.6em 0.2em #b38d54;\nright: 0.3em;\ntransition: all 0.3s;\n}\n\n.cssbuttons-io-button:hover .icon {\nwidth: calc(100% - 0.6em);\n}\n\n.cssbuttons-io-button .icon svg {\nwidth: 1.1em;\ntransition: transform 0.3s;\ncolor: #b38d54;\n}\n\n.cssbuttons-io-button:hover .icon svg {\ntransform: translateX(0.1em);\n}\n\n.cssbuttons-io-button:active .icon {\ntransform: scale(0.95);\n}\n</style>"
      }
    },
    {
      "id": "code-085",
      "title": "详情标题样式1",
      "category": "css",
      "content": "<style>\n.yangzhen-title {\nborder: 1px #f0f0f0 solid;\nborder-left: 3px #014e91 solid;\npadding: 8px 12px;\ncolor: #333;\nfont-size: 18px;\nfont-weight: bold;\n}\n.yangzhen-title1 {\nfont-size: 16px;\nline-height: 1.8;\ncolor: #666;\nmargin-left: 7px;\nposition: relative;\npadding-left: 15px;\nfont-weight: bold;\n}\n.yangzhen-title1::after {\ncontent: '';\nposition: absolute;\nleft: 0;\ntop: 50%;\nmargin-top: -2px;\nwidth: 8px;\nheight: 4px;\nbackground-color: #157ee9;\n}\n.yangzhen-title2 {\nbackground: #f8f7f5;\nline-height: 40px !important;\npadding-left: 20px;\nfont-size: 14px;\ncolor: #252525;\nfont-weight: 600;\n}\n</style> "
    },
    {
      "id": "code-086",
      "title": "详情标题样式2",
      "category": "css",
      "content": "<style>\n.yangzhen-title {\nbackground: #f8f7f5;\nborder-left: 3px #3db45e solid;\nline-height: 40px !important;\npadding-left: 20px;\nfont-size: 18px;\ncolor: #252525;\n}\n.yangzhen-title1 {\nbackground: #f8f7f5;\nline-height: 40px !important;\npadding-left: 20px;\nfont-size: 14px;\ncolor: #252525;\nfont-weight: 600;\n}\n</style> "
    },
    {
      "id": "code-087",
      "title": "详情标题样式3",
      "category": "css",
      "content": "<style>\n.fushit-title {\npadding: 8px 12px;\nfont-size: 18px;\nfont-weight: bold;\ndisplay: inline-block;\nbackground: #0a5ea3;\ncolor: #fff;\nborder-radius: 0px 10px 10px 0px;\nmargin: 0 !important;\n}\n.fushit-title1 {\nfont-size: 16px;\nline-height: 1.8;\ncolor: #666;\nmargin-left: 7px;\nposition: relative;\npadding-left: 15px;\nfont-weight: bold;\n}\n.fushit-title1::after {\ncontent: '';\nposition: absolute;\nleft: 0;\ntop: 50%;\nmargin-top: -2px;\nwidth: 6px;\nheight: 6px;\nbackground-color: #28a15d;\ntransform: rotate(45deg);\nmargin-left: 2px;\n}\n.fushit-title2 {\nbackground: #f8f7f5;\nline-height: 40px !important;\npadding-left: 20px;\nfont-size: 14px;\ncolor: #252525;\nfont-weight: 600;\n}\n</style>\n<style>\n.detail_specfic_panel table td p {\nline-height: 1;\nmargin: 5px 0px;\n}\n.detail_specfic_panel table {\nwidth: 100%;\nborder-spacing: 0px;\nmargin-bottom: 20px !important;\n}\n</style> "
    },
    {
      "id": "code-088",
      "title": "视频样式",
      "category": "css",
      "content": "<style>\n.basic_product_display_index .list_one .list_one_wrap {\nborder: 1px solid #f7f7f7;\n}\n.product_summary_wrap {\ndisplay: none;\n}\n.product_name {\ntext-align: center !important;\nfont-size: 20px !important;\nfont-weight: lighter;\n}\n.product_name_wrap {\nmargin-top: 30px !important;\n}\n</style>",
      "variantLabel": "版本 1"
    },
    {
      "id": "code-089",
      "title": "视频样式",
      "category": "css",
      "content": "<style>\n.video-top {\nflex-direction: column;\n}\n.video-detail {\nmargin: 20px 0 !important;\n}\n.video-border {\npadding-bottom: 36% !important;\n}\n.video-center {\nwidth: 100% !important;\n}\n.video-title {\nfont-size: 20px;\nline-height: 40px;\ncolor: #333;\nmargin-bottom: 5px !important;\n}\n.video-desc {\nline-height: 30px !important;\nfont-size: 16px;\nfont-weight: lighter;\ncolor: #222;\nmargin-bottom: 10px !important;\n}.basic_video_detail_index.video-detail-container .pc-detail-content .video-top .video-detail{ width: 100%;}\n</style> ",
      "variantLabel": "版本 2"
    },
    {
      "id": "code-090",
      "title": "产品图片尺寸不一致，但是均保持垂直居中",
      "category": "css",
      "content": "<style>\n#u806207 .list_one .list_img > img:after {\ncontent: '';\ndisplay: block;\npadding-bottom: 100%;\n}\n#u806207 .list_one .list_img > img {\nposition: absolute;\ntop: 0;\nbottom: 0;\nleft: 0;\nright: 0;\nmax-width: 100%;\nmax-height: 100%;\ndisplay: block;\nvertical-align: middle;\ntext-align: center;\nmargin: auto;\nobject-fit: contain !important;\nopacity: inherit !important;\n}\n#u806207 .list_one .list_img {\nbackground-image: none !important;\n}\n</style> ",
      "description": "复制后请替换示例数据"
    },
    {
      "id": "code-091",
      "title": "放大镜",
      "category": "mixed",
      "parts": {
        "HTML": "<div style=\"height: 10px\"></div>",
        "CSS": "<style>\n/* 放大镜效果专用样式 */\n.detail_big_pic {\nposition: relative;\ncursor: crosshair;\nmax-width: 100%;\ndisplay: block;\n}\n\n/* 放大镜镜头 */\n.magnifier-lens {\nposition: absolute;\nwidth: 150px;\nheight: 150px;\nborder: 2px solid #fff;\nborder-radius: 50%;\nbackground-color: rgba(255, 255, 255, 0.3);\nbox-shadow: 0 0 10px rgba(0, 0, 0, 0.3);\npointer-events: none;\ndisplay: none;\nz-index: 100;\n}\n\n/* 右侧放大区域 */\n.magnifier-preview {\nposition: absolute;\nleft: calc(100% + 20px);\ntop: 0;\nwidth: 400px;\nheight: 400px;\nborder: 1px solid #ddd;\nbackground: #fff;\nbox-shadow: 0 0 20px rgba(0, 0, 0, 0.1);\noverflow: hidden;\ndisplay: none;\nz-index: 99999;\n}\n\n.magnifier-preview img {\nposition: absolute;\nmax-width: none;\n}\n.basic_product_detail.basic_product_detail\n.view_pattern_pc\n.moduleStyle0\n.product_detail_wrap\n.product_detail_left_content\n.detail_inner_wrap\n.detail_big_pic_content {\nz-index: 2;\n}\n</style>",
        "JavaScript": "<script>\ndocument.addEventListener('DOMContentLoaded', function () {\nconst img = document.querySelector('.detail_big_pic');\n\n// 创建放大镜元素\nconst lens = document.createElement('div');\nlens.className = 'magnifier-lens';\nimg.parentNode.insertBefore(lens, img.nextSibling);\n\n// 创建放大区域\nconst preview = document.createElement('div');\npreview.className = 'magnifier-preview';\nconst previewImg = document.createElement('img');\npreviewImg.src = img.src;\npreview.appendChild(previewImg);\nimg.parentNode.insertBefore(preview, lens.nextSibling);\n\n// 放大倍数\nconst zoom = 2;\n\n// 鼠标移动事件\nimg.addEventListener('mousemove', function (e) {\nif (!lens.style.display || lens.style.display === 'none') {\nlens.style.display = 'block';\npreview.style.display = 'block';\n}\n\n// 计算位置\nconst rect = img.getBoundingClientRect();\nlet x = e.pageX - rect.left - window.pageXOffset - lens.offsetWidth / 2;\nlet y = e.pageY - rect.top - window.pageYOffset - lens.offsetHeight / 2;\n\n// 边界检查\nconst maxX = img.offsetWidth - lens.offsetWidth;\nconst maxY = img.offsetHeight - lens.offsetHeight;\n\nx = Math.max(0, Math.min(x, maxX));\ny = Math.max(0, Math.min(y, maxY));\n\n// 设置放大镜位置\nlens.style.left = x + 'px';\nlens.style.top = y + 'px';\n\n// 计算放大图位置\nconst previewX = -x * zoom + preview.offsetWidth / 2;\nconst previewY = -y * zoom + preview.offsetHeight / 2;\n\n// 设置放大图\npreviewImg.style.left = previewX + 'px';\npreviewImg.style.top = previewY + 'px';\npreviewImg.style.width = img.offsetWidth * zoom + 'px';\npreviewImg.style.height = img.offsetHeight * zoom + 'px';\n});\n\n// 鼠标离开事件\nimg.addEventListener('mouseleave', function () {\nlens.style.display = 'none';\npreview.style.display = 'none';\n});\n});\n</script>"
      }
    },
    {
      "id": "code-092",
      "title": "表格样式",
      "category": "css",
      "content": "<style>\n    /* 双线核心：分离边框+间距 */\n    .detail_specfic_panel_item table {\n        border-collapse: separate !important; /* 关键：让单元格边框独立，不合并 */\n        border-spacing: 2px !important; /* 单元格之间的间隙（双线的空白部分），可调整 */\n        width: 100%;\n        max-width: 1000px;\n        margin: 20px auto;\n        font-family: '思源黑体' !important;\n        font-size: 16px;\n    }\n    .detail_specfic_panel_item table p {\n        font-family: '思源黑体' !important;\n    }\n    .detail_specfic_panel_item table tr:first-of-type {\n        background-color: #006db2;\n        color: #fff !important;\n    }\n    /* 每个TD都有独立边框（核心样式） */\n    .detail_specfic_panel_item table td {\n        border: 1px solid #006db2; /* 每个单元格的独立边框 */\n        padding: 10px 12px;\n        text-align: left;\n        vertical-align: middle;\n    }\n\n    /* 左边分类列样式：统一宽度+背景色，增强区分度 */\n    .detail_specfic_panel_item table .category {\n        background-color: #f5f5f5;\n        font-weight: bold;\n        min-width: 120px; /* 固定宽度，避免分类名挤压 */\n        white-space: nowrap; /* 分类名不换行 */\n    }\n\n    /* 清除段落默认边距，避免内容拥挤 */\n    .detail_specfic_panel_item table p {\n        line-height: 1;\n        margin: 5px 0px;\n    }\n\n    /* 响应式适配小屏幕 */\n    @media (max-width: 768px) {\n        .detail_specfic_panel_item table {\n            font-size: 13px;\n        }\n        .detail_specfic_panel_item table td {\n            padding: 8px 10px;\n        }\n        .detail_specfic_panel_item table .category {\n            min-width: 100px;\n        }\n    }\n</style>\n"
    },
    {
      "id": "code-093",
      "title": "二维码并列",
      "category": "html",
      "content": "<div style=\"display:flex;justify-content: space-between;\">\n<div style=\"width: 30%;\">\n<img src=\"https://img03.71360.com/w3/pj7x4k/20240923/57242a3840230a2a0126d6466e7de980.jpg\" alt=\"\" />\n<p style=\"font-size: 1rem; color: #fff;line-height: 2rem;text-align: center;\">关注我们</p> \n</div>\n<div style=\"width: 30%;\">\n<img src=\"https://img03.71360.com/w3/pj7x4k/20251204/91ba083abf56b8be47693116abfb5c78.jpg\" alt=\"\" />\n<p style=\"font-size: 1rem; color: #fff;line-height: 2rem;text-align: center;\">姜老师</p>\n</div>\n<div style=\"width: 30%;\">\n<img src=\"https://img03.71360.com/w3/pj7x4k/20251204/25d9ab4cbbfffcbd86b75fba1735d613.jpg\" alt=\"\" />\n<p style=\"font-size: 1rem; color: #fff;line-height: 2rem;text-align: center;\">徐老师</p>\n</div>\n</div>\n",
      "description": "复制后请替换示例数据"
    },
    {
      "id": "code-094",
      "title": "指定文字批量加上类名",
      "category": "javascript",
      "content": "<script>\n/**\n* 按p标签文字精确匹配，添加类名\n* @param {Array} targetTexts - 要匹配的文字数组\n* @param {string} className - 要添加的类名\n*/\nfunction addClassToPByText(targetTexts, className) {\n// 遍历所有p标签\ndocument.querySelectorAll('p').forEach(p => {\n// 去除p标签内文本的所有空格/换行（仅保留纯文字）\nconst pText = p.textContent.trim().replace(/\\s+/g, '');\n// 检查是否精确匹配目标文字\nif (targetTexts.includes(pText)) {\nif (!p.classList.contains(className)) {\np.classList.add(className);\nconsole.log(`已给文字为「${pText}」的p标签添加类名：${className}`);\n}\n}\n});\n}\n\n// DOM加载完成后执行\ndocument.addEventListener('DOMContentLoaded', function() {\naddClassToPByText(\n['展会介绍', '参展范围', '展会概况', '展位价格', '市场介绍'],\n'chable888-title' // 纯类名，不带.\n);\n});\n</script>"
    },
    {
      "id": "code-095",
      "title": "批量替换图片",
      "category": "javascript",
      "content": "<script>\n    // 专门替换元素背景图片的函数\n    function replaceBgImageBySelector(selector, newImgUrl) {\n        // 1. 查找所有匹配的元素\n        const targetElements = document.querySelectorAll(selector);\n\n        // 2. 判断是否找到元素\n        if (targetElements.length === 0) {\n            console.error(`未找到匹配选择器 \"${selector}\" 的元素`);\n            return;\n        }\n\n        // 3. 遍历所有元素，修改背景图片\n        targetElements.forEach((element, index) => {\n            console.log(`为第${index + 1}个元素替换背景图片：${newImgUrl}`);\n\n            // 关键：设置 CSS background-image 属性，必须用 url() 包裹图片地址\n            element.style.backgroundImage = `url(${newImgUrl})`;\n\n            // 可选：补充背景图常用样式（防止背景图不显示，可根据你的需求调整）\n            element.style.backgroundRepeat = 'no-repeat'; // 不重复\n            element.style.backgroundPosition = 'center'; // 居中\n            element.style.backgroundSize = 'contain'; // 适配元素大小\n        });\n    }\n\n    // 确保 DOM 加载完成后再执行（解决找不到元素的问题）\n    document.addEventListener('DOMContentLoaded', function () {\n        // 调用函数：替换 .sy_lj > span 的背景图片\n        replaceBgImageBySelector('.sy_lj > span', 'https://img03.71360.com/w3/9epm79/20251231/6e3aadef89921d96c271d5c9a826945a.png');\n\n        // 原有的 img 标签替换逻辑保持不变（可继续使用原函数）\n        replaceImagesBySelector('.zz-title> img:first-of-type', 'https://img03.71360.com/w3/9epm79/20251231/63d1fd52d9c75a688a71c97bdf0bec8a.png');\n        replaceImagesBySelector('.zz-title > img:last-of-type', 'https://img03.71360.com/w3/9epm79/20251231/16024f51edcd225543174658b1ec8cdf.png');\n    });\n\n    // 保留你原有的 img 标签替换函数（不影响原有功能）\n    function replaceImagesBySelector(selector, newSrc) {\n        const targetImgs = document.querySelectorAll(selector);\n        if (targetImgs.length === 0) {\n            console.error(`未找到匹配选择器 \"${selector}\" 的图片`);\n            return;\n        }\n        targetImgs.forEach((img, index) => {\n            const oldSrc = img.src;\n            console.log(`替换第${index + 1}张图片：${oldSrc} → ${newSrc}`);\n            img.src = newSrc;\n            img.onerror = () => {\n                console.error(`新图片加载失败，恢复原路径：${oldSrc}`);\n                img.src = oldSrc;\n            };\n        });\n    }\n</script>\n",
      "description": "复制后请替换示例数据"
    },
    {
      "id": "code-096",
      "title": "批量颜色替换【底部新增通栏-插件代码-头部】",
      "category": "javascript",
      "content": "<script>\n    (function () {\n        // ====================== 仅需修改这里的色值配置 ======================\n        const colorMappings = [\n            { old: '#194297', new: '#db692d' },\n            // 如需添加更多色值，直接复制这行即可\n            // { old: '#其他颜色', new: '#目标颜色' }\n        ];\n\n        // ====================== 工具函数 ======================\n        const parseColor = color => {\n            if (!color) return null;\n            color = color.trim().toLowerCase();\n            let r,\n                g,\n                b,\n                a = null;\n\n            if (color.startsWith('#')) {\n                let hex = color.slice(1);\n                if (hex.length === 3)\n                    hex = hex\n                        .split('')\n                        .map(c => c + c)\n                        .join('');\n                if (hex.length === 4) {\n                    a = parseInt(hex.slice(3, 4).repeat(2), 16) / 255;\n                    hex = hex\n                        .slice(0, 3)\n                        .split('')\n                        .map(c => c + c)\n                        .join('');\n                }\n                if (hex.length === 8) {\n                    a = parseInt(hex.slice(6, 8), 16) / 255;\n                    hex = hex.slice(0, 6);\n                }\n                if (hex.length === 6) {\n                    r = parseInt(hex.slice(0, 2), 16);\n                    g = parseInt(hex.slice(2, 4), 16);\n                    b = parseInt(hex.slice(4, 6), 16);\n                    return { r, g, b, a };\n                }\n            }\n\n            const rgbaMatch = color.match(/rgba?\\(\\s*(\\d+)\\s*[,\\s]\\s*(\\d+)\\s*[,\\s]\\s*(\\d+)\\s*(?:[,\\s\\/]\\s*([\\d.]+%?))?\\s*\\)/i);\n            if (rgbaMatch) {\n                r = parseInt(rgbaMatch[1]);\n                g = parseInt(rgbaMatch[2]);\n                b = parseInt(rgbaMatch[3]);\n                if (rgbaMatch[4]) {\n                    const alphaStr = rgbaMatch[4];\n                    a = alphaStr.endsWith('%') ? parseInt(alphaStr) / 100 : parseFloat(alphaStr);\n                }\n                return { r, g, b, a };\n            }\n            return null;\n        };\n\n        const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');\n\n        const combineColor = (newRgb, originalAlpha) => {\n            const { r, g, b } = newRgb;\n            return originalAlpha != null && originalAlpha !== 1 ? `rgba(${r}, ${g}, ${b}, ${originalAlpha})` : rgbToHex(r, g, b);\n        };\n\n        // 预解析色值\n        const parsedMappings = colorMappings\n            .map(item => {\n                const old = parseColor(item.old);\n                const new_ = parseColor(item.new);\n                return old && new_ ? { oldRgb: { r: old.r, g: old.g, b: old.b }, newRgb: { r: new_.r, g: new_.g, b: new_.b } } : null;\n            })\n            .filter(Boolean);\n\n        if (parsedMappings.length === 0) return;\n\n        // 核心替换\n        const replaceColorInStr = str => {\n            if (!str) return str;\n            const colorRegex = /#(?:[0-9a-f]{3,4}){1,2}|rgba?\\(\\s*\\d+\\s*[,\\s]\\s*\\d+\\s*[,\\s]\\s*\\d+\\s*(?:[,\\s\\/]\\s*[\\d.]+%?)?\\s*\\)/gi;\n            return str.replace(colorRegex, match => {\n                const parsed = parseColor(match);\n                if (!parsed) return match;\n                for (const mapping of parsedMappings) {\n                    if (parsed.r === mapping.oldRgb.r && parsed.g === mapping.oldRgb.g && parsed.b === mapping.oldRgb.b) {\n                        return combineColor(mapping.newRgb, parsed.a);\n                    }\n                }\n                return match;\n            });\n        };\n\n        // 处理样式表\n        const processStyleSheet = sheet => {\n            if (!sheet) return;\n            try {\n                const rules = sheet.cssRules || sheet.rules;\n                if (!rules) return;\n                for (let i = 0; i < rules.length; i++) {\n                    const rule = rules[i];\n                    if (rule.style) {\n                        rule.style.cssText = replaceColorInStr(rule.style.cssText);\n                        for (let j = 0; j < rule.style.length; j++) {\n                            const prop = rule.style[j];\n                            const value = rule.style.getPropertyValue(prop);\n                            const newValue = replaceColorInStr(value);\n                            if (newValue !== value) {\n                                rule.style.setProperty(prop, newValue, rule.style.getPropertyPriority(prop));\n                            }\n                        }\n                    }\n                    if (rule.cssRules) processStyleSheet({ cssRules: rule.cssRules });\n                }\n            } catch (e) {}\n        };\n\n        // 处理元素\n        const processElement = el => {\n            if (!el || el.nodeType !== 1) return;\n            if (el.style) {\n                el.style.cssText = replaceColorInStr(el.style.cssText);\n                for (let j = 0; j < el.style.length; j++) {\n                    const prop = el.style[j];\n                    const value = el.style.getPropertyValue(prop);\n                    const newValue = replaceColorInStr(value);\n                    if (newValue !== value) {\n                        el.style.setProperty(prop, newValue, el.style.getPropertyPriority(prop));\n                    }\n                }\n            }\n        };\n\n        // 监听样式表\n        const headObserver = new MutationObserver(mutations => {\n            mutations.forEach(mutation => {\n                mutation.addedNodes.forEach(node => {\n                    if (node.nodeType === 1) {\n                        if (node.tagName === 'STYLE') {\n                            setTimeout(() => node.sheet && processStyleSheet(node.sheet), 0);\n                        } else if (node.tagName === 'LINK' && node.rel === 'stylesheet') {\n                            node.addEventListener('load', () => node.sheet && processStyleSheet(node.sheet));\n                        }\n                    }\n                });\n            });\n        });\n        headObserver.observe(document.head, { childList: true, subtree: true });\n\n        // 监听DOM\n        const domObserver = new MutationObserver(mutations => {\n            mutations.forEach(mutation => {\n                mutation.addedNodes.forEach(node => {\n                    if (node.nodeType === 1) {\n                        processElement(node);\n                        node.querySelectorAll('*').forEach(processElement);\n                    }\n                });\n            });\n        });\n        domObserver.observe(document.documentElement, { childList: true, subtree: true });\n\n        // 立即执行\n        const processAllExisting = () => {\n            Array.from(document.styleSheets).forEach(processStyleSheet);\n            document.querySelectorAll('*').forEach(processElement);\n        };\n\n        processAllExisting();\n        setTimeout(processAllExisting, 0);\n        setTimeout(processAllExisting, 50);\n    })();\n</script>\n"
    },
    {
      "id": "code-097",
      "title": "外贸修改字体",
      "category": "css",
      "content": "*:not(.fa, .iconfont, [class*='el-icon']) {\nfont-family: \"Montserrat-Regular\", sans-serif!important\n}\n\n/* 表单项字体 */\n.my_nleavemessage .form_item .title_text{\nfont-family:\"Poppins\",sans-serif!important;\n}\n\n/* 表单按钮字体 */\n.my_form .form_submit{\nfont-family:\"Poppins\",sans-serif!important;\n}\n\n/* 表单间距 */\n.form_warp .my_form{padding:0!important;}\n\n/* 表单提醒文字 */\n.my_nleavemessage .input_style::placeholder{\nfont-family: \"Open Sans\", sans-serif!important;\n}\n.my_nleavemessage .textarea_style::placeholder{\nfont-family: \"Open Sans\", sans-serif!important;\n}"
    },
    {
      "id": "code-098",
      "title": "列表图片点击放大",
      "category": "javascript",
      "content": "<script>\n    const imgNum = 0 //请将0改为你的图片总数，用于判断所有节点是否已渲染完成，否则可能会有部分图片无效果\n    const getBgUrl = (el) => {\n        const bg = getComputedStyle(el).backgroundImage;\n        const match = bg.match(/url\\([\"']?([^\"')]+)[\"']?\\)/);\n        return match ? match[1] : null;\n    };\n\n    function createViewerLayer() {\n    if(document.getElementById(\"imgPreviewMask\")) return;\n\n    const mask = document.createElement(\"div\");\n    mask.id = \"imgPreviewMask\";\n    mask.style.cssText = `\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100vw;\n        height: 100vh;\n        background: rgba(0,0,0,0.85);\n        z-index: 9999;\n        display: none;\n        align-items: center;\n        justify-content: center;\n        cursor: zoom-out;\n    `;\n\n    const previewImg = document.createElement(\"img\");\n    previewImg.id = \"previewImage\";\n    previewImg.style.cssText = `\n        max-width: 90%;\n        max-height: 90vh;\n        object-fit: contain;\n    `;\n\n    mask.appendChild(previewImg);\n    document.body.appendChild(mask);\n\n    mask.addEventListener(\"click\", ()=>{\n        mask.style.display = \"none\";\n    })\n\n    document.addEventListener(\"keydown\", e=>{\n        if(e.key === \"Escape\") mask.style.display = \"none\";\n    })\n    }\n\n    function openImagePreview(imgSrc){\n    const mask = document.getElementById(\"imgPreviewMask\");\n    const previewImg = document.getElementById(\"previewImage\");\n    previewImg.src = imgSrc;\n    mask.style.display = \"flex\";\n    }\n\n    function waitListRender() {\n    const timer = setInterval(() => {\n        const listItems = document.querySelectorAll('.list_one');\n        if(listItems.length >= imgNum){\n        clearInterval(timer);\n        createViewerLayer();\n        console.log(\"列表渲染完成，绑定图片预览\");\n\n        listItems.forEach(item => {\n            const imgBox = item.querySelector('.animationImg');\n            if (!imgBox) return;\n            // 防止重复绑定事件\n            if(imgBox.dataset.bindPreview === \"1\") return;\n\n            const imgUrl = getBgUrl(imgBox);\n            if (!imgUrl) return;\n\n            imgBox.dataset.bindPreview = \"1\";\n            imgBox.style.cursor = \"zoom-in\";\n            imgBox.addEventListener(\"click\", ()=>{\n            openImagePreview(imgUrl);\n            })\n        })\n        }\n    }, 300);\n    }\n\n    waitListRender();\n</script>"
    },
    {
      "id": "code-099",
      "title": "隐藏手机端的分类容器",
      "category": "css",
      "content": "\n    .mb_pattern .layout_column:has(.basic_classification) {\n        display: none;\n    }"
    },
    {
      "id": "path-002",
      "title": "新人视频",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "T云交付\\交付\\资料编辑组\\新人培训\\建站视频-推荐"
    },
    {
      "id": "path-003",
      "title": "挂件部分疑难问题视频",
      "category": "internal",
      "basePathKey": "internal-172-16-0-5",
      "relativePath": "建站组\\建站\\建站视频"
    },
    {
      "id": "path-004",
      "title": "Snipaste",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "T云交付\\交付\\资料编辑组\\各类工具以及日常使用表\\工具"
    },
    {
      "id": "path-005",
      "title": "Ftp",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "T云交付\\交付\\资料编辑组\\各类工具以及日常使用表\\工具"
    },
    {
      "id": "path-006",
      "title": "vscode",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "T云交付\\交付\\资料编辑组\\各类工具以及日常使用表\\工具"
    },
    {
      "id": "path-007",
      "title": "产品边框",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "T云交付\\交付\\资料编辑组\\各类工具以及日常使用表\\工具\\产品边框"
    },
    {
      "id": "path-008",
      "title": "一键排版",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "T云交付\\交付\\资料编辑组\\各类工具以及日常使用表\\工具"
    },
    {
      "id": "path-009",
      "title": "ps",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "T云交付\\交付\\资料编辑组\\各类工具以及日常使用表\\工具\\ps无法处理webp解决方式"
    },
    {
      "id": "path-010",
      "title": "建站操作常用视频",
      "category": "internal",
      "basePathKey": "internal-172-16-0-5",
      "relativePath": "建站组\\建站\\建站视频"
    },
    {
      "id": "path-011",
      "title": "图片",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "T云交付\\交付\\设计组\\背景图",
      "variantLabel": "版本 1"
    },
    {
      "id": "path-012",
      "title": "图片",
      "category": "internal",
      "basePathKey": "internal-172-16-0-5",
      "relativePath": "建站组\\免商素材",
      "variantLabel": "版本 2"
    },
    {
      "id": "path-013",
      "title": "图片",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "风险项目替换\\【1】免商图片及溯源截图\\mj生成",
      "variantLabel": "版本 3"
    },
    {
      "id": "path-014",
      "title": "模板部分样式【源文件】",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "无锡研发\\【T云交付-项目】\\模板部分样式【源文件】"
    },
    {
      "id": "path-015",
      "title": "模板焕新图片溯源",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "T云开发\\模板修改-yz"
    },
    {
      "id": "path-016",
      "title": "内贸项目地址",
      "category": "internal",
      "basePathKey": "internal-172-16-0-5",
      "relativePath": "建站组\\【1】内贸客户项目\\2026"
    },
    {
      "id": "path-017",
      "title": "外贸项目地址",
      "category": "internal",
      "basePathKey": "internal-172-16-0-5",
      "relativePath": "建站组\\【2】海外项目\\2026"
    },
    {
      "id": "path-018",
      "title": "内页地址",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "无锡研发\\【T云】设计专用\\【1】内页"
    },
    {
      "id": "path-019",
      "title": "公司素材库",
      "category": "url",
      "url": "http://sucaipic.021team.com/login/index"
    },
    {
      "id": "path-020",
      "title": "老模板图片查找溯源地址",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "T云开发\\图片溯源\\4.0原始模板路径"
    },
    {
      "id": "path-021",
      "title": "免商图片",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "T云交付\\交付\\设计组\\免商图片-已记录来源",
      "variantLabel": "版本 1"
    },
    {
      "id": "path-022",
      "title": "免商图片",
      "category": "internal",
      "basePathKey": "internal-172-16-0-5",
      "relativePath": "建站组\\免商素材",
      "variantLabel": "版本 2"
    },
    {
      "id": "path-023",
      "title": "免商图片",
      "category": "internal",
      "basePathKey": "internal-172-16-0-4",
      "relativePath": "风险项目替换\\【1】免商图片及溯源截图\\mj生成",
      "variantLabel": "版本 3"
    },
    {
      "id": "path-024",
      "title": "免商图片",
      "category": "url",
      "url": "https://pixabay.com/",
      "variantLabel": "版本 4"
    },
    {
      "id": "path-025",
      "title": "免商图片",
      "category": "url",
      "url": "https://unsplash.com/",
      "variantLabel": "版本 5"
    },
    {
      "id": "path-026",
      "title": "免商图片",
      "category": "url",
      "url": "https://iconpark.oceanengine.com/official【小图标】",
      "variantLabel": "版本 6"
    },
    {
      "id": "path-027",
      "title": "免商图片",
      "category": "url",
      "url": "https://www.pexels.com/zh-cn/",
      "variantLabel": "版本 7"
    },
    {
      "id": "banner-003",
      "title": "样式1",
      "category": "banner",
      "parts": {
        "H1": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div class=\"nyBannerWord\">\n            <div style=\"display: inline-block\">\n                <h1>Products</h1>\n                <div class=\"xhx\"></div>\n            </div>\n        </div>\n    </div>\n</div>",
        "P": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div class=\"nyBannerWord\">\n            <div style=\"display: inline-block\">\n                <p>Products</p>\n                <div class=\"xhx\"></div>\n            </div>\n        </div>\n    </div>\n</div>",
        "CSS": "<style>\n    /* 公共基础样式 */\n    .nyBannerTyunContainer {\n        margin: 0 20%;\n        padding: 7% 0;\n    }\n    .nyBannerWord,\n    .nyBannerWord .xhx {\n        position: relative;\n    }\n    .nyBannerWord p,\n    .nyBannerWord h1 {\n        filter: drop-shadow(2px 2px 2px #333);\n        line-height: 1;\n        font-size: 52px;\n        font-weight: 700;\n        color: #fff;\n        margin-bottom: 10px;\n    }\n    .nyBannerWord .xhx {\n        width: calc(100% - 10px);\n        height: 1px;\n        display: inline-block;\n        background: linear-gradient(to right, #0000, #fff);\n    }\n    .nyBannerWord .xhx:after {\n        content: '';\n        width: 9px;\n        height: 9px;\n        position: absolute;\n        right: -10.5px;\n        bottom: -4px;\n        border: 1px solid #fff;\n        border-radius: 50px;\n    }\n\n    /* 手机端适配 */\n    .mb_pattern .nyBannerTyunContainer {\n        margin: 0 5%;\n        padding: 12.5% 0;\n    }\n    .mb_pattern .nyBannerWord p,\n    .mb_pattern .nyBannerWord h1 {\n        height: 26px;\n        font-size: 26px;\n        margin-bottom: 0px;\n    }\n</style>\n"
      },
      "imageSrc": "./assets/resource-banners/banner-01.png"
    },
    {
      "id": "banner-004",
      "title": "样式2",
      "category": "banner",
      "parts": {
        "H1": "<div class=\"nyBannerTyun\">\n    <div style=\"display: flex\" class=\"nyBannerTyunContainer\">\n        <div class=\"nyBannerhx\"></div>\n        <div class=\"nyBannerWord\">\n            <h1>\n                <span>about us</span>\n            </h1>\n        </div>\n    </div>\n</div>\n",
        "P": "<div class=\"nyBannerTyun\">\n    <div style=\"display: flex\" class=\"nyBannerTyunContainer\">\n        <div class=\"nyBannerhx\"></div>\n        <div class=\"nyBannerWord\">\n            <p>\n                <span>PRODUCT</span>\n            </p>\n        </div>\n    </div>\n</div>\n",
        "CSS": "<style>\n    /* 公共基础样式 */\n    .nyBannerTyunContainer {\n        margin: 0 10% 0 20%;\n        padding: 8% 0;\n    }\n    .nyBannerWord {\n        position: relative;\n    }\n    .nyBannerhx {\n        width: 23px;\n        height: 3px;\n        background: #1d2733;\n    }\n    .nyBannerWord h1,\n    .nyBannerWord p {\n        padding-left: 8px;\n        height: 40px;\n        font-size: 0;\n        text-transform: uppercase;\n    }\n    .nyBannerWord h1 span,\n    .nyBannerWord p span {\n        line-height: 1;\n        font-size: 36px;\n        font-family: Oswald-Regular;\n        font-weight: 700;\n        color: #fff;\n    }\n\n    /* 移动端统一适配 */\n    .mb_pattern .nyBannerTyunContainer {\n        margin: 0 5%;\n        padding: 15% 0;\n    }\n    .mb_pattern .nyBannerWord h1,\n    .mb_pattern .nyBannerWord p {\n        height: 30px;\n    }\n    .mb_pattern .nyBannerWord h1 span,\n    .mb_pattern .nyBannerWord p span {\n        font-size: 28px;\n    }\n</style>"
      },
      "imageSrc": "./assets/resource-banners/banner-02.png"
    },
    {
      "id": "banner-005",
      "title": "样式3",
      "category": "banner",
      "parts": {
        "H1": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div style=\"display: inline-block\" class=\"nyBannerWord\">\n            <h1>\n                <span>PRODUCT</span>\n            </h1>\n            <div class=\"nyBannerhx\"></div>\n        </div>\n    </div>\n</div>",
        "P": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div style=\"display: inline-block\" class=\"nyBannerWord\">\n            <p>\n                <span>PRODUCT</span>\n            </p>\n            <div class=\"nyBannerhx\"></div>\n        </div>\n    </div>\n</div>",
        "CSS": "<style>\n    .nyBannerTyunContainer {\n        margin: 0 10% 0 20%;\n        padding: 8% 0;\n    }\n    .nyBannerWord {\n        position: relative;\n    }\n    .nyBannerhx {\n        margin-top: 10px;\n        width: 35%;\n        height: 2px;\n        background: #fff;\n    }\n    .nyBannerWord h1 {\n        height: 40px;\n        font-size: 0;\n        text-transform: uppercase;\n    }\n    .nyBannerWord h1 span {\n        line-height: 1;\n        font-size: 36px;\n        font-weight: 700;\n        color: #fff;\n    }\n    .mb_pattern .nyBannerTyunContainer {\n        margin: 0 5%;\n        padding: 15% 0;\n    }\n    .mb_pattern .nyBannerWord h1 {\n        height: 30px;\n    }\n    .mb_pattern .nyBannerWord h1 span {\n        font-size: 28px;\n    }\n    .nyBannerWord p {\n        height: 40px;\n        font-size: 0;\n        text-transform: uppercase;\n    }\n    .nyBannerWord p span {\n        line-height: 1;\n        font-size: 36px;\n        font-weight: 700;\n        color: #fff;\n    }\n</style>\n"
      },
      "imageSrc": "./assets/resource-banners/banner-03.png"
    },
    {
      "id": "banner-006",
      "title": "样式4",
      "category": "banner",
      "parts": {
        "H1": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div style=\"display: flex; flex-direction: column; align-items: center\" class=\"nyBannerWord\">\n            <div class=\"nyBannersk\"></div>\n            <h1>\n                <span>about us</span>\n            </h1>\n            <div class=\"nyBannerxk\"></div>\n        </div>\n    </div>\n</div>",
        "P": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div style=\"display: flex; flex-direction: column; align-items: center\" class=\"nyBannerWord\">\n            <div class=\"nyBannersk\"></div>\n            <p>\n                <span>PRODUCT CENTER</span>\n            </p>\n            <div class=\"nyBannerxk\"></div>\n        </div>\n    </div>\n</div>",
        "CSS": "<style>\n    /* 公共通用样式 */\n    .nyBannerTyunContainer {\n        margin: 0 20% 0 20%;\n        padding: 6% 0;\n    }\n    .nyBannerWord {\n        position: relative;\n    }\n    .nyBannersk {\n        width: 120px;\n        height: 30px;\n        border: 1px solid #0073cd;\n        border-bottom: none;\n    }\n    .nyBannerxk {\n        width: 120px;\n        height: 30px;\n        border: 1px solid #0073cd;\n        border-top: none;\n    }\n    .mb_pattern .nyBannerTyunContainer {\n        margin: 0 5%;\n        padding: 14% 0;\n    }\n    .mb_pattern .nyBannersk,\n    .mb_pattern .nyBannerxk {\n        display: none;\n    }\n\n    /* p标签专属样式 */\n    .nyBannerWord p {\n        padding: 24px 0;\n        font-size: 0;\n        text-transform: uppercase;\n    }\n    .nyBannerWord p span {\n        line-height: 1;\n        font-size: 30px;\n        font-weight: 500;\n        color: #0073cd;\n    }\n    .mb_pattern .nyBannerWord p {\n        height: 30px;\n        padding: 0px;\n    }\n    .mb_pattern .nyBannerWord p span {\n        font-size: 28px;\n    }\n\n    /* h1标签专属样式 */\n    .nyBannerWord h1 {\n        padding: 24px 0;\n        font-size: 0;\n        text-transform: uppercase;\n    }\n    .nyBannerWord h1 span {\n        line-height: 1;\n        font-size: 30px;\n        font-weight: 500;\n        color: #0073cd;\n    }\n    .mb_pattern .nyBannerWord h1 {\n        height: 30px;\n        padding: 0px;\n    }\n    .mb_pattern .nyBannerWord h1 span {\n        font-size: 28px;\n    }\n</style>\n"
      },
      "imageSrc": "./assets/resource-banners/banner-04.png"
    },
    {
      "id": "banner-007",
      "title": "样式5",
      "category": "banner",
      "parts": {
        "H1": "<div class=\"nyBannerTyun\">\n\t<div style=\"display:flex;align-items:baseline;\" class=\"nyBannerTyunContainer\">\n\t\t<div class=\"nyBannerhx\">\n\t\t\t<p>\n\t\t\t\t<span> // <span></span> </span> \n\t\t\t</p>\n\t\t</div>\n\t\t<div class=\"nyBannerWord\">\n\t\t\t<h1>\n\t\t\t\t<span>about us</span> \n\t\t\t</h1>\n\t\t</div>\n\t</div>\n</div>",
        "P": "<div class=\"nyBannerTyun\">\n    <div style=\"display: flex; align-items: baseline\" class=\"nyBannerTyunContainer\">\n        <div class=\"nyBannerhx\">\n            <p>\n                <span>\n                    //\n                    <span></span>\n                </span>\n            </p>\n        </div>\n        <div class=\"nyBannerWord\">\n            <p>\n                <span>PRODUCT CENTER</span>\n            </p>\n        </div>\n    </div>\n</div>",
        "CSS": "<style>\n    .nyBannerTyunContainer {\n        margin: 0 10% 0 20%;\n         padding: 8% 0;\n    }\n    .nyBannerWord {\n        position: relative;\n    }\n    .nyBannerhx {\n        color: #fff;\n        font-size: 16px;\n        font-weight: 300;\n    }\n    .nyBannerWord h1 {\n        padding-left: 8px;\n        height: 40px;\n        font-size: 0;\n        text-transform: uppercase;\n    }\n    .nyBannerWord h1 span {\n        line-height: 1;\n        font-size: 36px;\n        letter-spacing: 1px;\n        font-weight: 300;\n        color: #fff;\n    }\n    .nyBannerWord p {\n        padding-left: 8px;\n        height: 40px;\n        font-size: 0;\n        text-transform: uppercase;\n    }\n    .nyBannerWord p span {\n        line-height: 1;\n        font-size: 36px;\n        letter-spacing: 1px;\n        font-weight: 300;\n        color: #fff;\n    }\n    .mb_pattern .nyBannerTyunContainer {\n        margin: 0 5%;\n        padding: 12% 0;\n    }\n    .mb_pattern .nyBannerWord h1 {\n        height: 30px;\n    }\n    .mb_pattern .nyBannerWord h1 span {\n        font-size: 24px;\n    }\n    .mb_pattern .nyBannerWord p {\n        height: 30px;\n    }\n    .mb_pattern .nyBannerWord p span {\n        font-size: 24px;\n    }\n</style>"
      },
      "imageSrc": "./assets/resource-banners/banner-05.png"
    },
    {
      "id": "banner-008",
      "title": "样式6",
      "category": "banner",
      "parts": {
        "H1": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div style=\"display: inline-block\" class=\"nyBannerWord\">\n            <h1>\n                <span>about us</span>\n            </h1>\n            <div class=\"nyBannerhx\"></div>\n        </div>\n    </div>\n</div>\n",
        "P": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div style=\"display: inline-block\" class=\"nyBannerWord\">\n            <p>\n                <span>PRODUCT</span>\n            </p>\n            <div class=\"nyBannerhx\"></div>\n        </div>\n    </div>\n</div>",
        "CSS": "<style>\n    /* 公共通用样式 */\n    .nyBannerTyunContainer {\n        margin: 0 10% 0 20%;\n        padding: 8% 0;\n    }\n    .nyBannerWord {\n        position: relative;\n    }\n    .nyBannerhx {\n        margin-top: 0;\n        width: 43px;\n        height: 9px;\n        background: #e89d40;\n    }\n    .mb_pattern .nyBannerTyunContainer {\n        margin: 0 5%;\n        padding: 13.5% 0;\n    }\n    .mb_pattern .nyBannerhx {\n        width: 20px;\n        height: 5px;\n    }\n\n    /* p、h1 共用基础样式 */\n    .nyBannerWord p,\n    .nyBannerWord h1 {\n        height: 40px;\n        font-size: 0;\n        text-transform: uppercase;\n    }\n    .nyBannerWord p span,\n    .nyBannerWord h1 span {\n        line-height: 1;\n        font-size: 36px;\n        letter-spacing: 1px;\n        font-weight: 500;\n        color: #fff;\n    }\n\n    /* 移动端 p、h1 共用样式 */\n    .mb_pattern .nyBannerWord p,\n    .mb_pattern .nyBannerWord h1 {\n        height: 30px;\n    }\n    .mb_pattern .nyBannerWord p span,\n    .mb_pattern .nyBannerWord h1 span {\n        font-size: 28px;\n    }\n</style>\n"
      },
      "imageSrc": "./assets/resource-banners/banner-06.png"
    },
    {
      "id": "banner-009",
      "title": "样式7",
      "category": "banner",
      "parts": {
        "H1": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div class=\"nyBannerline\"></div>\n        <div class=\"nyBannerWord\">\n            <div class=\"nyBannerfk\"></div>\n            <div class=\"nyBannerfk1\"></div>\n            <h1>\n                <span>About Us</span>\n            </h1>\n        </div>\n        <div class=\"nyBannerline1\"></div>\n    </div>\n</div>",
        "P": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div class=\"nyBannerline\"></div>\n        <div class=\"nyBannerWord\">\n            <div class=\"nyBannerfk\"></div>\n            <div class=\"nyBannerfk1\"></div>\n            <p>\n                <span>PRODUCTS</span>\n            </p>\n        </div>\n        <div class=\"nyBannerline1\"></div>\n    </div>\n</div>",
        "CSS": "<style>\n    /*全局颜色更改*/\n    :root {\n        --zt-color: #fff;\n    }\n\n    .nyBannerTyunContainer {\n        margin: 0 10% 0 20%;\n        padding: 3.25% 0;\n    }\n    .nyBannerWord {\n        position: relative;\n    }\n    .nyBannerline {\n        margin-left: 130px;\n        width: 55px;\n        height: 50px;\n        border-top: 2px solid var(--zt-color);\n        transform: rotate(-55deg);\n        opacity: 0.5;\n    }\n\n    .nyBannerline1 {\n        margin-left: 30px;\n        margin-top: 30px;\n        width: 20px;\n        height: 20px;\n        border-top: 2px solid var(--zt-color);\n        transform: rotate(-55deg);\n        opacity: 0.5;\n    }\n\n    .nyBannerfk {\n        margin-top: 10px;\n        position: relative;\n        width: 135px;\n        height: 115px;\n        border-top: 2px solid var(--zt-color);\n        border-left: 2px solid var(--zt-color);\n        border-bottom: 2px solid var(--zt-color);\n        opacity: 0.7;\n    }\n    .nyBannerfk:after {\n        content: '';\n        width: 2px;\n        height: 12px;\n        position: absolute;\n        top: 0%;\n        right: 0%;\n        background-color: var(--zt-color);\n        opacity: 0.7;\n    }\n    .nyBannerfk:before {\n        content: '';\n        width: 2px;\n        height: 12px;\n        position: absolute;\n        bottom: 0%;\n        right: 0%;\n        background-color: var(--zt-color);\n        opacity: 0.7;\n    }\n\n    .nyBannerfk1 {\n        left: -10px;\n        top: -8px;\n        position: absolute;\n        width: 135px;\n        height: 115px;\n        border-top: 1px solid var(--zt-color);\n        border-left: 1px solid var(--zt-color);\n        border-bottom: 1px solid var(--zt-color);\n        opacity: 0.4;\n    }\n\n    .nyBannerfk1:after {\n        content: '';\n        width: 1px;\n        height: 17px;\n        position: absolute;\n        top: 0%;\n        right: 0%;\n        background-color: var(--zt-color);\n        opacity: 0.4;\n    }\n    .nyBannerfk1:before {\n        content: '';\n        width: 1px;\n        height: 7px;\n        position: absolute;\n        bottom: 0%;\n        right: 0%;\n        background-color: var(--zt-color);\n        opacity: 0.4;\n    }\n    .nyBannerWord h1 {\n        position: absolute;\n        top: calc(50% - 20px);\n        left: 30px;\n        height: 40px;\n        font-size: 0;\n        text-transform: uppercase;\n    }\n    .nyBannerWord h1 span {\n        line-height: 1;\n        font-size: 42px;\n\n        font-weight: 400;\n        color: var(--zt-color);\n    }\n    .nyBannerWord p {\n        position: absolute;\n        top: calc(50% - 20px);\n        left: 30px;\n        height: 40px;\n        font-size: 0;\n        text-transform: uppercase;\n    }\n    .nyBannerWord p span {\n        line-height: 1;\n        font-size: 42px;\n\n        font-weight: 400;\n        color: var(--zt-color);\n    }\n    .mb_pattern .nyBannerTyunContainer {\n        margin: 0 10%;\n        padding: 10% 0;\n    }\n    .mb_pattern .nyBannerWord h1 {\n        height: 30px;\n    }\n    .mb_pattern .nyBannerWord h1 span {\n        font-size: 24px;\n    }\n    .mb_pattern .nyBannerline,\n    .mb_pattern .nyBannerline1 {\n        display: none;\n    }\n    .mb_pattern .nyBannerfk,\n    .mb_pattern .nyBannerfk1 {\n        width: 60px !important;\n        height: 50px !important;\n        border-top: 1px solid var(--zt-color);\n        border-left: 1px solid var(--zt-color);\n        border-bottom: 1px solid var(--zt-color);\n    }\n\n    .mb_pattern .nyBannerWord h1 {\n        top: calc(50% - 13px) !important;\n        left: 15px !important;\n    }\n    .mb_pattern .nyBannerWord p {\n        height: 30px;\n    }\n    .mb_pattern .nyBannerWord p span {\n        font-size: 24px;\n    }\n    .mb_pattern .nyBannerWord p {\n        top: calc(50% - 13px) !important;\n        left: 15px !important;\n    }\n</style>"
      },
      "imageSrc": "./assets/resource-banners/banner-07.png"
    },
    {
      "id": "banner-010",
      "title": "样式8",
      "category": "banner",
      "parts": {
        "H1": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div class=\"nyBannerWord\">\n            <h1><span>about</span></h1>\n        </div>\n    </div>\n</div>",
        "P": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div class=\"nyBannerWord\">\n            <p><span>PRODUCT</span></p>\n        </div>\n    </div>\n</div>",
        "CSS": "<style>\n    .nyBannerTyunContainer {\n        margin: 0 20%;\n        padding: 8%;\n    }\n    .nyBannerWord {\n        position: relative;\n    }\n    .nyBannerWord p,\n    .nyBannerWord h1 {\n        border-left: 4px solid #fff;\n        padding-left: 15px;\n        height: 40px;\n        font-size: 0;\n        text-transform: uppercase;\n    }\n    .nyBannerWord p span,\n    .nyBannerWord h1 span {\n        line-height: 40px;\n        font-size: 36px;\n        font-family: 'Montserrat-Regular';\n        font-weight: 700;\n        color: #fff;\n    }\n    .mb_pattern .nyBannerTyunContainer {\n        margin: 0 5%;\n        padding: 14% 0;\n    }\n    .mb_pattern .nyBannerWord p,\n    .mb_pattern .nyBannerWord h1 {\n        height: 30px;\n    }\n    .mb_pattern .nyBannerWord p span,\n    .mb_pattern .nyBannerWord h1 span {\n        font-size: 28px;\n    }\n</style>\n"
      },
      "imageSrc": "./assets/resource-banners/banner-08.png"
    },
    {
      "id": "banner-011",
      "title": "样式9",
      "category": "banner",
      "parts": {
        "H1": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div class=\"nyBannerWord\">\n            <div style=\"display: inline-block\">\n                <h1>about us</h1>\n            </div>\n        </div>\n    </div>\n</div>",
        "P": "<div class=\"nyBannerTyun\">\n    <div class=\"nyBannerTyunContainer\">\n        <div class=\"nyBannerWord\">\n            <div style=\"display: inline-block\">\n                <p>Products</p>\n            </div>\n        </div>\n    </div>\n</div>",
        "CSS": "<style>\n    .nyBannerTyunContainer {\n        padding: 8% 0;\n    }\n    .nyBannerWord,\n    .nyBannerWord .xhx {\n        position: relative;\n            text-align: center;\n    }\n    .nyBannerWord p,\n    .nyBannerWord h1 {\n        position: relative;\n        line-height: 1;\n        font-size: 32px;\n        font-weight: 700;\n        margin-bottom: 10px;\n        color: transparent;\n        -webkit-background-clip: text;\n        background-image: linear-gradient(90deg, rgba(221, 67, 25, 1) 0%, rgba(251, 196, 0, 1) 100%);\n        text-transform: uppercase;\n    }\n    .nyRightitle {\n        text-align: right;\n    }\n\n    /* 左侧横线：左端菱形 */\n    .nyBannerWord p::before,\n    .nyBannerWord h1::before {\n        content: '';\n        width: 56px;\n        height: 8px;\n        right: -75px;\n        top: 50%;\n        margin-top: -4px;\n        position: absolute;\n        background: linear-gradient(90deg, rgba(251, 196, 0, 1), rgba(221, 67, 25, 1));\n        clip-path: polygon(0px 4px, 4px 0px, 7px 3px, 56px 3px, 56px 5px, 7px 5px, 4px 8px);\n    }\n\n    /* 右侧横线：右端菱形 */\n    .nyBannerWord p::after,\n    .nyBannerWord h1::after {\n        content: '';\n        width: 56px;\n        height: 8px;\n        left: -75px;\n        top: 50%;\n        margin-top: -4px;\n        position: absolute;\n        background: linear-gradient(90deg, rgba(221, 67, 25, 1), rgba(251, 196, 0, 1));\n        clip-path: polygon(0px 3px, 49px 3px, 52px 0px, 56px 4px, 52px 8px, 49px 5px, 0px 5px);\n    }\n\n    /* 手机端适配 */\n    .mb_pattern .nyBannerTyunContainer {\n        padding: 15% 0;\n    }\n    .mb_pattern .nyBannerWord p,\n    .mb_pattern .nyBannerWord h1 {\n        height: 26px;\n        font-size: 14px;\n        margin-bottom: 0px;\n    }\n    .mb_pattern .nyBannerWord p::before,\n    .mb_pattern .nyBannerWord h1::before {\n        margin-top: -9px;\n    }\n    .mb_pattern .nyBannerWord p::after,\n    .mb_pattern .nyBannerWord h1::after {\n        margin-top: -9px;\n    }\n</style>\n"
      },
      "description": "复制后请替换示例数据",
      "imageSrc": "./assets/resource-banners/banner-09.png"
    }
  ]
};
  root.ToolboxResourceData = resourceData;
  if (typeof module !== 'undefined' && module.exports) module.exports = resourceData;
}(typeof window !== 'undefined' ? window : globalThis));
