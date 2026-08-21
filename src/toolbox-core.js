(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SiteToolboxCore = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var CONTACT_LABELS = {
    联系人: 'name',
    姓名: 'name',
    站内业务联系人: 'name',
    业务联系人: 'name',
    负责人: 'name',
    联系电话: 'phone',
    电话: 'phone',
    手机: 'phone',
    手机号: 'phone',
    手机号码: 'phone',
    服务热线: 'phone',
    咨询热线: 'phone',
    客服热线: 'phone',
    联系热线: 'phone',
    联系方式: 'phone',
    站内业务联系人手机号码: 'phone',
    业务联系人手机号码: 'phone',
    座机号码: 'landline',
    座机: 'landline',
    座机号: 'landline',
    '400电话': 'landline',
    '400电话优先选择': 'landline',
    电子邮箱: 'email',
    邮箱: 'email',
    邮箱地址: 'email',
    公司名称: 'company',
    公司名: 'company',
    企业名称: 'company',
    公司地址: 'address',
    联系地址: 'address',
    详细地址: 'address',
    办公地址: 'address',
    厂家地址: 'address',
    地址: 'address',
    传真: 'fax',
    传真号: 'fax',
    传真号码: 'fax',
    邮编: 'zip',
    邮政编码: 'zip',
    QQ: 'qq',
    QQ号码: 'qq',
    QQ号: 'qq',
    微信: 'wechat',
    微信号: 'wechat',
    网站: 'website',
    网址: 'website',
    官网: 'website',
  };

  var SORTED_LABELS = Object.entries(CONTACT_LABELS).sort(function (a, b) {
    return b[0].length - a[0].length;
  });

  var CN_PUNCT = '，。！？、；：“”‘’【】（）《》——…';
  var EN_PUNCT = ',.!?;:\'""[]()<>--.';

  function pushValue(result, key, value) {
    if (!key || !value) return;
    if (!result[key]) result[key] = [];
    result[key].push(value);
  }

  function matchLabel(labelText) {
    var normalized = String(labelText || '').replace(/\s+/g, '');
    for (var i = 0; i < SORTED_LABELS.length; i++) {
      var label = SORTED_LABELS[i][0];
      if (normalized.includes(label) || label.includes(normalized)) return SORTED_LABELS[i];
    }
    return null;
  }

  function parseContactText(text) {
    var result = {};
    var lines = String(text || '')
      .split(/\n/)
      .map(function (line) {
        return line.trim();
      })
      .filter(Boolean);

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var matched = false;
      var tabParts = line.split(/\t+/);

      if (tabParts.length >= 2) {
        var tabMatch = matchLabel(tabParts[0]);
        if (tabMatch) {
          pushValue(result, tabMatch[1], tabParts.slice(1).join('\t').trim());
          continue;
        }
      }

      for (var j = 0; j < SORTED_LABELS.length; j++) {
        var label = SORTED_LABELS[j][0];
        var key = SORTED_LABELS[j][1];
        if (!line.replace(/\s+/g, '').includes(label)) continue;

        var colonIdx = line.search(/[：:]/);
        var value = '';
        if (colonIdx !== -1) {
          value = line.substring(colonIdx + 1).trim();
          if (!value && i + 1 < lines.length) value = lines[++i];
        } else if (i + 1 < lines.length) {
          value = lines[++i];
        }

        pushValue(result, key, value);
        matched = true;
        break;
      }

      if (!matched && line.length <= 10 && !/\d{5,}/.test(line) && !/[省市区县镇路街号]/.test(line) && !/[@.]/.test(line)) {
        var nextLine = lines[i + 1] || '';
        var nextMatch = matchLabel(nextLine);
        if (nextMatch && (nextMatch[1] === 'phone' || nextMatch[1] === 'landline')) {
          pushValue(result, 'name', line);
        }
      }
    }

    return result;
  }

  function normalizeForbiddenWord(item) {
    if (!item || item.word === undefined || item.word === null) return null;
    var word = String(item.word).trim();
    if (!word) return null;
    var replacement = item.replacement === undefined || item.replacement === null ? '' : String(item.replacement).trim();
    return { word: word, replacement: replacement };
  }

  function applyForbiddenWords(text, forbiddenWords) {
    var result = String(text || '');
    (forbiddenWords || []).forEach(function (item) {
      var normalized = normalizeForbiddenWord(item);
      if (normalized && result.indexOf(normalized.word) !== -1) {
        result = result.split(normalized.word).join(normalized.replacement);
      }
    });
    return result;
  }

  function transformText(input, type) {
    input = String(input || '');
    var result = input;
    switch (type) {
      case 'upper':
        result = input.toUpperCase();
        break;
      case 'lower':
        result = input.toLowerCase();
        break;
      case 'capitalize':
        result = input.toLowerCase().replace(/(^|[\s。！？；.!?;]+)(\S)/g, function (m, sep, ch) {
          return sep + ch.toUpperCase();
        });
        break;
      case 'trimSpaces':
        result = input
          .split(/\r?\n/)
          .map(function (line) {
            return line.trim();
          })
          .join('\n');
        break;
      case 'collapseSpaces':
        result = input.replace(/[\t\u00a0\u3000 ]+/g, ' ');
        break;
      case 'removeSpaces':
        result = input.replace(/[\t\u00a0\u3000 ]+/g, '');
        break;
      case 'cn2en':
        for (var i = 0; i < CN_PUNCT.length; i++) result = result.split(CN_PUNCT[i]).join(EN_PUNCT[i] || '');
        break;
      case 'en2cn':
        for (var j = 0; j < EN_PUNCT.length; j++) {
          if (EN_PUNCT[j]) result = result.split(EN_PUNCT[j]).join(CN_PUNCT[j] || '');
        }
        break;
      case 'trimEmpty':
        result = input
          .split(/\r\n?|\n/)
          .filter(function (line) {
            return line.replace(/[\s\u200B\uFEFF]/g, '') !== '';
          })
          .join('\n');
        break;
      case 'removeBreaks':
        result = input.replace(/[\r\n]+/g, '');
        break;
      case 'keepSingleBreak':
        result = input.replace(/\n{2,}/g, '\n').replace(/\r{2,}/g, '\r');
        break;
      case 'lineUnique':
        var seen = {};
        result = input
          .split(/\r?\n/)
          .filter(function (line) {
            var key = line.trim();
            if (!key || seen[key]) return false;
            seen[key] = true;
            return true;
          })
          .join('\n');
        break;
      case 'lineSort':
        result = input
          .split(/\r?\n/)
          .filter(function (line) {
            return line.trim();
          })
          .sort(function (a, b) {
            return a.localeCompare(b, 'zh-CN');
          })
          .join('\n');
        break;
      case 'lineNumber':
        result = input
          .split(/\r?\n/)
          .filter(function (line) {
            return line.trim();
          })
          .map(function (line, idx) {
            return idx + 1 + '. ' + line.trim();
          })
          .join('\n');
        break;
    }
    return result;
  }

  function decodeEntities(text) {
    return String(text || '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }

  function stripTags(html) {
    return decodeEntities(String(html || '').replace(/<[^>]*>/g, '')).trim();
  }

  function escapeHTML(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function markdownTextFromHTML(source) {
    return decodeEntities(
      String(source || '')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/(?:p|div|h[1-6]|li)>/gi, '\n')
        .replace(/<[^>]*>/g, '')
    ).trim();
  }

  function markdownToHTMLSource(source) {
    var lines = markdownTextFromHTML(source).split(/\r?\n/);
    var html = [];

    lines.forEach(function (rawLine) {
      var line = rawLine.trim();
      var match;
      if (!line) return;

      match = line.match(/^#{1,6}\s+(.+)$/);
      if (match) {
        html.push('<p><strong>' + escapeHTML(match[1].trim()) + '</strong></p>');
        return;
      }

      match = line.match(/^[-*+]\s+(.+)$/);
      if (match) {
        html.push('<p>&bull; ' + escapeHTML(match[1].trim()) + '</p>');
        return;
      }

      html.push('<p>' + escapeHTML(line) + '</p>');
    });

    return html.join('\n');
  }

  function attr(html, name) {
    var re = new RegExp(name + "\\s*=\\s*([\"'])(.*?)\\1", 'i');
    var match = String(html || '').match(re);
    return match ? decodeEntities(match[2]) : '';
  }

  function splitByClass(html, className) {
    var re = new RegExp(
      "<([a-zA-Z][\\w:-]*)([^>]*class=[\"'][^\"']*\\b" +
        className +
        "\\b[^\"']*[\"'][^>]*)>([\\s\\S]*?)(?=<[a-zA-Z][\\w:-]*[^>]*class=[\"'][^\"']*\\b" +
        className +
        "\\b|$)",
      'gi'
    );
    var chunks = [];
    var match;
    while ((match = re.exec(String(html || '')))) {
      chunks.push('<' + match[1] + match[2] + '>' + match[3]);
    }
    return chunks;
  }

  function firstLink(block) {
    var match = String(block || '').match(/<a\b([\s\S]*?)>([\s\S]*?)<\/a>/i);
    if (!match) return null;
    return { href: attr('<a ' + match[1] + '>', 'href'), text: stripTags(match[2]) };
  }

  function parseNavSource(html, options) {
    var includeLeafParents = options && options.includeLeafParents === true;
    if (typeof document !== 'undefined' && document.createElement) {
      var wrap = document.createElement('div');
      wrap.innerHTML = String(html || '');
      var firstNavbar = wrap.querySelector('.basic_navbar') || wrap;
      var mainItems = firstNavbar.querySelectorAll('.itemNav');
      var childLists = firstNavbar.querySelectorAll('.navchildlist');
      var domItems = [];

      mainItems.forEach(function (item, index) {
        var a = item.querySelector('a[href]');
        if (!a) return;
        var parentTitle = (a.querySelector('.pageLink, .nav_item_name') || a).textContent.trim();
        var parentLink = a.getAttribute('href') || '';
        var childList = childLists[index];
        var children = [];

        if (childList) {
          var level2Items = childList.querySelectorAll('.level_2_content.navchildLine');
          if (level2Items.length === 0) level2Items = childList.querySelectorAll('.child_content_list > .navchildLine');
          if (level2Items.length === 0) level2Items = childList.querySelectorAll('.navchildPart > .navchildLine');
          if (level2Items.length === 0) level2Items = childList.querySelectorAll('.navchildLine');

          level2Items.forEach(function (line) {
            var ca = line.querySelector('a[href]');
            if (!ca) return;
            var childTitle = (ca.querySelector('.navchildLink, .level_2_title') || ca).textContent.trim();
            var childLink = ca.getAttribute('href') || '';
            if (childTitle) children.push({ title: childTitle, link: childLink, checked: true });
          });
        }

        if (children.length > 0 || includeLeafParents) {
          domItems.push({ title: parentTitle, link: parentLink, children: children, checked: true });
        }
      });

      return domItems;
    }

    var source = String(html || '');
    var navMatch = source.match(/<([a-zA-Z][\w:-]*)([^>]*class=["'][^"']*\bbasic_navbar\b[^"']*["'][^>]*)>([\s\S]*)<\/\1>/i);
    var navHtml = navMatch ? navMatch[3] : source;
    var mainItems = splitByClass(navHtml, 'itemNav');
    var childLists = splitByClass(navHtml, 'navchildlist');
    var items = [];

    mainItems.forEach(function (itemHtml, index) {
      var parent = firstLink(itemHtml);
      if (!parent || !parent.text) return;

      var childHtml = childLists[index] || '';
      var childLines = splitByClass(childHtml, 'navchildLine');
      var children = [];
      childLines.forEach(function (lineHtml) {
        var child = firstLink(lineHtml);
        if (child && child.text) children.push({ title: child.text, link: child.href, checked: true });
      });

      if (children.length > 0 || includeLeafParents) {
        items.push({ title: parent.text, link: parent.href, children: children, checked: true });
      }
    });

    return items;
  }

  function getNavSourceDiagnostics(html) {
    var source = String(html || '').trim();
    if (!source) return ['请先粘贴源导航代码'];

    if (typeof document !== 'undefined' && document.createElement) {
      var wrap = document.createElement('div');
      wrap.innerHTML = source;
      var firstNavbar = wrap.querySelector('.basic_navbar') || wrap;
      var mainItems = firstNavbar.querySelectorAll('.itemNav');
      var childLists = firstNavbar.querySelectorAll('.navchildlist');
      if (mainItems.length === 0) return ['没有找到父级导航项 .itemNav'];
      if (childLists.length === 0) return ['没有找到子级导航容器 .navchildlist'];
      var childLinks = firstNavbar.querySelectorAll('.navchildlist a[href]');
      if (childLinks.length === 0) return ['找到了子级容器，但没有找到子级链接 a[href]'];
      return [];
    }

    if (!/class=["'][^"']*\bitemNav\b/i.test(source)) return ['没有找到父级导航项 .itemNav'];
    if (!/class=["'][^"']*\bnavchildlist\b/i.test(source)) return ['没有找到子级导航容器 .navchildlist'];
    if (!/class=["'][^"']*\bnavchildlist\b[\s\S]*?<a\b[^>]*href=/i.test(source)) {
      return ['找到了子级容器，但没有找到子级链接 a[href]'];
    }
    return [];
  }

  function sanitizeElement(el) {
    if (!el || !el.querySelectorAll) return el;
    el.querySelectorAll('script, iframe, object, embed').forEach(function (node) {
      if (node.parentNode) node.parentNode.removeChild(node);
    });
    el.querySelectorAll('*').forEach(function (node) {
      Array.from(node.attributes || []).forEach(function (attr) {
        var name = attr.name.toLowerCase();
        var value = attr.value || '';
        if (name.indexOf('on') === 0 || name === 'srcdoc') {
          node.removeAttribute(attr.name);
          return;
        }
        if ((name === 'href' || name === 'src') && /^\s*javascript:/i.test(value)) {
          node.removeAttribute(attr.name);
        }
      });
    });
    return el;
  }

  function sanitizeHTMLString(html) {
    var source = String(html || '');
    if (typeof document !== 'undefined' && document.createElement) {
      var wrap = document.createElement('div');
      wrap.innerHTML = source;
      sanitizeElement(wrap);
      return wrap.innerHTML;
    }
    return source
      .replace(/<\s*(script|iframe|object|embed)\b[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
      .replace(/<\s*(script|iframe|object|embed)\b[^>]*\/?\s*>/gi, '')
      .replace(/\s+on[a-z0-9_-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      .replace(/\s+srcdoc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      .replace(/\s+(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, '')
      .replace(/\s+(href|src)\s*=\s*javascript:[^\s>]+/gi, '');
  }

  function splitImageTextParagraphHTML(html) {
    return String(html || '').replace(/<p\b([^>]*)>([\s\S]*?)<\/p>/gi, function (full, attrs, content) {
      if (!/<img\b/i.test(content)) return full;
      if (!/(?:<img\b[^>]*\/?>\s*[^<\s]|[^<\s][\s\S]*?<img\b)/i.test(content)) return full;

      var parts = content.match(/<img\b[^>]*\/?>|<(?!img\b)[^>]+>|[^<]+/gi) || [];
      var groups = [];
      var current = '';
      var currentKind = '';

      function kindOf(part) {
        if (/^<img\b/i.test(part)) return 'image';
        if (/^\s*$/.test(part)) return currentKind || 'text';
        return 'text';
      }

      function pushCurrent() {
        if (current.trim()) groups.push(current.trim());
        current = '';
        currentKind = '';
      }

      parts.forEach(function (part) {
        var kind = kindOf(part);
        if (current && kind !== currentKind && part.trim()) pushCurrent();
        current += part;
        currentKind = kind;
      });
      pushCurrent();

      if (groups.length < 2) return full;
      return groups.map(function (group) {
        return '<p' + attrs + '>' + group + '</p>';
      }).join('\n');
    });
  }

  function normalizeNonBreakingHyphens(html) {
    return String(html || '').replace(/\u2011/g, '-');
  }

  function formatHTMLSource(html) {
    return splitImageTextParagraphHTML(normalizeNonBreakingHyphens(html))
      .replace(/>\s+</g, '><')
      .replace(/(<\/(?:p|div|table|tbody|thead|tr|td|th|ul|ol|li|h[1-6])>)/gi, '$1\n')
      .replace(/(<(?:p|div|table|tbody|thead|tr|td|th|ul|ol|li|h[1-6])[\s>])/gi, '\n$1')
      .replace(/^\n+/, '')
      .replace(/\n{2,}/g, '\n');
  }

  function parseLineList(value) {
    var seen = {};
    return String(value || '')
      .split(/\r?\n/)
      .map(function (line) {
        return line.trim();
      })
      .filter(function (line) {
        if (!line || seen[line]) return false;
        seen[line] = true;
        return true;
      });
  }

  function isValidClassName(className) {
    return /^[A-Za-z_-][A-Za-z0-9_-]*$/.test(String(className || '').trim());
  }

  function exactTextMatch(text, words) {
    var normalized = String(text || '').trim();
    return (words || []).indexOf(normalized) !== -1;
  }

  function hasChildBlockElement(block) {
    if (!block || !block.children) return false;
    var blockTags = {
      P: true,
      DIV: true,
      H1: true,
      H2: true,
      H3: true,
      H4: true,
      H5: true,
      H6: true,
      TABLE: true,
      UL: true,
      OL: true,
      BLOCKQUOTE: true,
      SECTION: true,
      ARTICLE: true,
    };
    for (var i = 0; i < block.children.length; i++) {
      if (blockTags[block.children[i].tagName]) return true;
      if (hasChildBlockElement(block.children[i])) return true;
    }
    return false;
  }

  function isLeafContentBlock(block) {
    return block && !hasChildBlockElement(block);
  }

  function applySpecifiedTitleBoldElement(el, words) {
    if (!el || !el.querySelectorAll || !words || !words.length) return el;
    el.querySelectorAll('p, div, h1, h2, h3, h4, h5, h6').forEach(function (block) {
      if (!isLeafContentBlock(block)) return;
      if (/^H[1-6]$/.test(block.tagName || '')) return;
      if (!exactTextMatch(block.textContent, words)) return;
      if (block.querySelector('strong, b')) return;
      var strong = el.ownerDocument.createElement('strong');
      while (block.firstChild) strong.appendChild(block.firstChild);
      block.appendChild(strong);
    });
    return el;
  }

  function applySpecifiedTextClassElement(el, words, className) {
    className = String(className || '').trim();
    if (!el || !el.querySelectorAll || !words || !words.length || !isValidClassName(className)) return el;
    el.querySelectorAll('p, div, h1, h2, h3, h4, h5, h6').forEach(function (block) {
      if (!isLeafContentBlock(block)) return;
      if (!exactTextMatch(block.textContent, words)) return;
      if (block.classList) {
        block.classList.add(className);
        return;
      }
      var current = block.getAttribute('class') || '';
      var classes = current.split(/\s+/).filter(Boolean);
      if (classes.indexOf(className) === -1) classes.push(className);
      block.setAttribute('class', classes.join(' '));
    });
    return el;
  }

  function blockTextFromHTML(content) {
    return String(content || '').replace(/<[^>]*>/g, '').trim();
  }

  function containsBlockHTML(content) {
    return /<\s*(?:p|div|h[1-6]|table|ul|ol|blockquote|section|article)\b/i.test(String(content || ''));
  }

  function escapeRegExp(value) {
    return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function buildWordsPattern(words) {
    var escaped = (words || [])
      .filter(Boolean)
      .sort(function (a, b) {
        return b.length - a.length;
      })
      .map(escapeRegExp);
    return escaped.length ? new RegExp('(' + escaped.join('|') + ')', 'g') : null;
  }

  function isInsideBold(node) {
    var current = node && node.parentNode;
    while (current) {
      if (current.nodeType === 1 && /^(strong|b)$/i.test(current.tagName || '')) return true;
      current = current.parentNode;
    }
    return false;
  }

  function applySpecifiedTextBoldElement(el, words) {
    if (!el || !el.ownerDocument || !words || !words.length) return el;
    var pattern = buildWordsPattern(words);
    if (!pattern) return el;
    var walker = el.ownerDocument.createTreeWalker(el, 4, {
      acceptNode: function (node) {
        if (!node.nodeValue || !pattern.test(node.nodeValue)) return 2;
        pattern.lastIndex = 0;
        if (isInsideBold(node)) return 2;
        return 1;
      },
    });
    var nodes = [];
    var node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach(function (textNode) {
      pattern.lastIndex = 0;
      var frag = el.ownerDocument.createDocumentFragment();
      var text = textNode.nodeValue;
      var lastIndex = 0;
      var match;
      while ((match = pattern.exec(text))) {
        if (match.index > lastIndex) frag.appendChild(el.ownerDocument.createTextNode(text.slice(lastIndex, match.index)));
        var strong = el.ownerDocument.createElement('strong');
        strong.textContent = match[0];
        frag.appendChild(strong);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) frag.appendChild(el.ownerDocument.createTextNode(text.slice(lastIndex)));
      textNode.parentNode.replaceChild(frag, textNode);
    });
    return el;
  }

  function applySpecifiedTitleBoldHTML(html, words) {
    words = words || [];
    var source = String(html || '');
    if (!words.length) return source;
    if (typeof document !== 'undefined' && document.createElement) {
      var wrap = document.createElement('div');
      wrap.innerHTML = source;
      applySpecifiedTitleBoldElement(wrap, words);
      return wrap.innerHTML;
    }
    return source.replace(/<((?:p|div|h[1-6]))\b([^>]*)>([\s\S]*?)<\/\1>/gi, function (full, tag, attrs, content) {
      if (containsBlockHTML(content)) {
        return '<' + tag + attrs + '>' + applySpecifiedTitleBoldHTML(content, words) + '</' + tag + '>';
      }
      if (/^h[1-6]$/i.test(tag)) return full;
      if (!exactTextMatch(blockTextFromHTML(content), words)) return full;
      if (/<\s*(?:strong|b)\b/i.test(content)) return full;
      return '<' + tag + attrs + '><strong>' + content + '</strong></' + tag + '>';
    });
  }

  function mergeClassIntoAttrs(attrs, className) {
    var classRe = /\sclass\s*=\s*(["'])(.*?)\1/i;
    var match = classRe.exec(attrs);
    if (!match) return attrs + ' class="' + className + '"';
    var classes = match[2].split(/\s+/).filter(Boolean);
    if (classes.indexOf(className) === -1) classes.push(className);
    return attrs.replace(classRe, ' class=' + match[1] + classes.join(' ') + match[1]);
  }

  function applySpecifiedTextClassHTML(html, words, className) {
    words = words || [];
    className = String(className || '').trim();
    var source = String(html || '');
    if (!words.length || !isValidClassName(className)) return source;
    if (typeof document !== 'undefined' && document.createElement) {
      var wrap = document.createElement('div');
      wrap.innerHTML = source;
      applySpecifiedTextClassElement(wrap, words, className);
      return wrap.innerHTML;
    }
    return source.replace(/<((?:p|div|h[1-6]))\b([^>]*)>([\s\S]*?)<\/\1>/gi, function (full, tag, attrs, content) {
      if (containsBlockHTML(content)) {
        return '<' + tag + attrs + '>' + applySpecifiedTextClassHTML(content, words, className) + '</' + tag + '>';
      }
      if (!exactTextMatch(blockTextFromHTML(content), words)) return full;
      return '<' + tag + mergeClassIntoAttrs(attrs, className) + '>' + content + '</' + tag + '>';
    });
  }

  function applyTextBoldToPlainHTML(content, words) {
    var pattern = buildWordsPattern(words);
    if (!pattern) return content;
    return String(content || '').replace(pattern, '<strong>$1</strong>');
  }

  function applySpecifiedTextBoldHTML(html, words) {
    words = words || [];
    var source = String(html || '');
    if (!words.length) return source;
    if (typeof document !== 'undefined' && document.createElement) {
      var wrap = document.createElement('div');
      wrap.innerHTML = source;
      applySpecifiedTextBoldElement(wrap, words);
      return wrap.innerHTML;
    }
    return source.replace(/<((?:p|div|h[1-6]))\b([^>]*)>([\s\S]*?)<\/\1>/gi, function (full, tag, attrs, content) {
      if (/<\s*(?:strong|b)\b/i.test(content)) {
        return '<' + tag + attrs + '>' + content.replace(/(<\/(?:strong|b)>)([\s\S]*?)(?=<\s*(?:strong|b)\b|$)/gi, function (segment) {
          return segment.replace(/([^<>]+)(?![^<]*>)/g, function (text) {
            return applyTextBoldToPlainHTML(text, words);
          });
        }) + '</' + tag + '>';
      }
      if (containsBlockHTML(content)) {
        return '<' + tag + attrs + '>' + applySpecifiedTextBoldHTML(content, words) + '</' + tag + '>';
      }
      return '<' + tag + attrs + '>' + applyTextBoldToPlainHTML(content, words) + '</' + tag + '>';
    });
  }

  function extractImageReplacementLinks(input) {
    var source = String(input || '');
    var links = [];
    var imgRe = /<img\b[^>]*?\bsrc\s*=\s*(["'])(.*?)\1/gi;
    var match;
    while ((match = imgRe.exec(source))) {
      var src = decodeEntities(match[2]).trim();
      if (src) links.push(src);
    }
    if (links.length > 0) return links;

    return source
      .split(/\r?\n/)
      .map(function (line) {
        return line.trim();
      })
      .filter(Boolean);
  }

  function collectImageLinkMatches(code, mode) {
    var source = String(code || '');
    var matches = [];
    var match;

    function pushMatch(start, end) {
      if (start >= 0 && end > start) matches.push({ start: start, end: end });
    }

    function collectUrlMatches(re, skipRanges) {
      while ((match = re.exec(source))) {
        var valueOffset = match[0].indexOf(match[3]);
        var start = match.index + valueOffset;
        var end = start + match[3].length;
        if (
          skipRanges &&
          skipRanges.some(function (range) {
            return start >= range.start && end <= range.end;
          })
        ) {
          continue;
        }
        pushMatch(start, end);
      }
    }

    function collectBackgroundUrlRanges() {
      var ranges = [];
      var re = /\bbackground(?:-image)?\s*:[^;{}]*?(url\(\s*)(["']?)([^"')]+)(\2\s*\))/gi;
      var bgMatch;
      while ((bgMatch = re.exec(source))) {
        var valueOffset = bgMatch[0].indexOf(bgMatch[3]);
        ranges.push({
          start: bgMatch.index + valueOffset,
          end: bgMatch.index + valueOffset + bgMatch[3].length,
        });
      }
      return ranges;
    }

    if (mode === 'background') {
      collectUrlMatches(/\bbackground(?:-image)?\s*:[^;{}]*?(url\(\s*)(["']?)([^"')]+)(\2\s*\))/gi);
    } else {
      var backgroundRanges = mode === 'noBackground' ? collectBackgroundUrlRanges() : null;
      var imgSrcRe = /(<img\b[^>]*?\bsrc\s*=\s*)(["'])([^"']*)(\2)/gi;
      while ((match = imgSrcRe.exec(source))) {
        pushMatch(match.index + match[1].length + match[2].length, match.index + match[1].length + match[2].length + match[3].length);
      }

      var srcsetRe = /(\bsrcset\s*=\s*)(["'])([\s\S]*?)(\2)/gi;
      while ((match = srcsetRe.exec(source))) {
        var valueStart = match.index + match[1].length + match[2].length;
        var value = match[3];
        var candidateRe = /(^|,\s*)(\S+)([^,]*)/g;
        var candidate;
        while ((candidate = candidateRe.exec(value))) {
          pushMatch(valueStart + candidate.index + candidate[1].length, valueStart + candidate.index + candidate[1].length + candidate[2].length);
        }
      }

      collectUrlMatches(/(url\(\s*)(["']?)([^"')]+)(\2\s*\))/gi, backgroundRanges);
    }

    return matches.sort(function (a, b) {
      return a.start - b.start;
    });
  }

  function replaceImageLinksInCode(options) {
    options = options || {};
    var source = String(options.code || '');
    var links = (options.links || []).map(function (link) {
      return String(link || '').trim();
    }).filter(Boolean);
    var mode = options.mode === 'background' || options.mode === 'noBackground' ? options.mode : 'all';
    var matches = collectImageLinkMatches(source, mode);
    var replaceCount = Math.min(links.length, matches.length);
    var output = source;

    for (var i = replaceCount - 1; i >= 0; i--) {
      output = output.slice(0, matches[i].start) + links[i] + output.slice(matches[i].end);
    }

    return {
      code: output,
      linkCount: links.length,
      matchCount: matches.length,
      replacedCount: replaceCount,
      unusedLinks: Math.max(links.length - replaceCount, 0),
      remainingMatches: Math.max(matches.length - replaceCount, 0),
    };
  }

  return {
    CONTACT_LABELS: CONTACT_LABELS,
    parseContactText: parseContactText,
    normalizeForbiddenWord: normalizeForbiddenWord,
    applyForbiddenWords: applyForbiddenWords,
    transformText: transformText,
    parseNavSource: parseNavSource,
    getNavSourceDiagnostics: getNavSourceDiagnostics,
    sanitizeElement: sanitizeElement,
    sanitizeHTMLString: sanitizeHTMLString,
    markdownToHTMLSource: markdownToHTMLSource,
    normalizeNonBreakingHyphens: normalizeNonBreakingHyphens,
    formatHTMLSource: formatHTMLSource,
    splitImageTextParagraphHTML: splitImageTextParagraphHTML,
    parseLineList: parseLineList,
    isValidClassName: isValidClassName,
    applySpecifiedTitleBoldElement: applySpecifiedTitleBoldElement,
    applySpecifiedTextBoldElement: applySpecifiedTextBoldElement,
    applySpecifiedTextClassElement: applySpecifiedTextClassElement,
    applySpecifiedTitleBoldHTML: applySpecifiedTitleBoldHTML,
    applySpecifiedTextBoldHTML: applySpecifiedTextBoldHTML,
    applySpecifiedTextClassHTML: applySpecifiedTextClassHTML,
    extractImageReplacementLinks: extractImageReplacementLinks,
    replaceImageLinksInCode: replaceImageLinksInCode,
  };
});
