(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SiteToolboxExamples = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  return {
    navSource: `<div class="basic_navbar">
  <div class="itemNav"><a href="/products"><span class="pageLink">产品中心</span></a></div>
  <div class="itemNav"><a href="/news"><span class="pageLink">新闻资讯</span></a></div>
  <div class="navchildlist">
    <div class="level_2_content navchildLine"><a href="/products/a"><span class="navchildLink">产品一</span></a></div>
    <div class="level_2_content navchildLine"><a href="/products/b"><span class="navchildLink">产品二</span></a></div>
    <div class="level_2_content navchildLine"><a href="/products/c"><span class="navchildLink">产品三</span></a></div>
  </div>
  <div class="navchildlist">
    <div class="level_2_content navchildLine"><a href="/news/company"><span class="navchildLink">公司新闻</span></a></div>
    <div class="level_2_content navchildLine"><a href="/news/industry"><span class="navchildLink">行业资讯</span></a></div>
  </div>
</div>`,

    navTemplate: `<div class="product-nav">
  <div class="product-nav-item">
    <a href="/old-parent">旧栏目</a>
    <div class="product-nav-children">
      <p><a href="/old-child-1">旧子项一</a></p>
      <p><a href="/old-child-2">旧子项二</a></p>
    </div>
  </div>
  <div class="product-nav-item">
    <a href="/old-parent-2">旧栏目二</a>
    <div class="product-nav-children">
      <p><a href="/old-child-3">旧子项三</a></p>
      <p><a href="/old-child-4">旧子项四</a></p>
    </div>
  </div>
</div>`,

    contactText: `公司名称：星河科技有限公司
联系人：张三
手机：13800138000
座机：400-800-1234
电子邮箱：hello@example.com
办公地址：广东省深圳市南山区科技园`,

    contactTemplate: `<ul class="contact-list">
  <li><strong>公司名称：</strong><span>旧公司</span></li>
  <li><strong>联系人：</strong><span>旧联系人</span></li>
  <li><strong>手机：</strong><a href="tel:10086">10086</a></li>
  <li><strong>电子邮箱：</strong><a href="mailto:old@example.com">old@example.com</a></li>
  <li><strong>办公地址：</strong><span>旧地址</span></li>
</ul>`,

    textprocText: `  第一行内容  

第二行    多个空格
第二行    多个空格
Hello World`,

    formatHtml: `<h2>产品优势<br>应用场景</h2>
<p style="font-size:16px;color:red" onclick="alert(1)">  这是一段  需要清理样式和空格的正文。</p>
<p><strong>核心特点</strong></p>
<p><img src="https://example.com/demo.jpg" style="width:900px" onerror="alert(1)"></p>
<script>alert('unsafe')<\/script>`,
  };
});
