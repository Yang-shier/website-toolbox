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
        result = input.replace(/\n[ \t]*\n/g, '\n');
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

  function parseNavSource(html) {
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
        if (!childLists[index]) return;

        var level2Items = childLists[index].querySelectorAll('.level_2_content.navchildLine');
        if (level2Items.length === 0) level2Items = childLists[index].querySelectorAll('.child_content_list > .navchildLine');
        if (level2Items.length === 0) level2Items = childLists[index].querySelectorAll('.navchildPart > .navchildLine');
        if (level2Items.length === 0) level2Items = childLists[index].querySelectorAll('.navchildLine');

        var children = [];
        level2Items.forEach(function (line) {
          var ca = line.querySelector('a[href]');
          if (!ca) return;
          var childTitle = (ca.querySelector('.navchildLink, .level_2_title') || ca).textContent.trim();
          var childLink = ca.getAttribute('href') || '';
          if (childTitle) children.push({ title: childTitle, link: childLink, checked: true });
        });

        if (children.length > 0) {
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

      if (children.length > 0) {
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

  function formatHTMLSource(html) {
    return splitImageTextParagraphHTML(html)
      .replace(/>\s+</g, '><')
      .replace(/(<\/(?:p|div|table|tbody|thead|tr|td|th|ul|ol|li|h[1-6])>)/gi, '$1\n')
      .replace(/(<(?:p|div|table|tbody|thead|tr|td|th|ul|ol|li|h[1-6])[\s>])/gi, '\n$1')
      .replace(/^\n+/, '')
      .replace(/\n{2,}/g, '\n');
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

    function collectUrlMatches(re) {
      while ((match = re.exec(source))) {
        var valueOffset = match[0].indexOf(match[3]);
        pushMatch(match.index + valueOffset, match.index + valueOffset + match[3].length);
      }
    }

    if (mode === 'background') {
      collectUrlMatches(/\bbackground(?:-image)?\s*:[^;{}]*?(url\(\s*)(["']?)([^"')]+)(\2\s*\))/gi);
    } else {
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

      collectUrlMatches(/(url\(\s*)(["']?)([^"')]+)(\2\s*\))/gi);
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
    var matches = collectImageLinkMatches(source, options.mode === 'background' ? 'background' : 'all');
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
    formatHTMLSource: formatHTMLSource,
    splitImageTextParagraphHTML: splitImageTextParagraphHTML,
    extractImageReplacementLinks: extractImageReplacementLinks,
    replaceImageLinksInCode: replaceImageLinksInCode,
  };
});
