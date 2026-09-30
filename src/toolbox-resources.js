(function exposeToolboxResources(root) {
  'use strict';

  const MIXED_PART_ORDER = ['HTML', 'CSS', 'JavaScript', 'H1', 'P'];

  function normalizeText(value) {
    return typeof value === 'string'
      ? value.replace(/\s+/g, ' ').trim().toLocaleLowerCase()
      : '';
  }

  function getPathBases(pathBases) {
    if (pathBases && typeof pathBases === 'object') {
      return pathBases;
    }
    const resourceData = root.ToolboxResourceData;
    return resourceData && resourceData.pathBases && typeof resourceData.pathBases === 'object'
      ? resourceData.pathBases
      : {};
  }

  function getFullPath(entry, pathBases) {
    if (!entry || typeof entry !== 'object' || !entry.basePathKey) {
      return '';
    }

    const basePath = getPathBases(pathBases)[entry.basePathKey];
    if (typeof basePath !== 'string' || !basePath) {
      return '';
    }

    const relativePath = typeof entry.relativePath === 'string' ? entry.relativePath.replace(/^\\+/, '') : '';
    const normalizedBase = basePath.replace(/\\+$/, '');
    return relativePath ? `${normalizedBase}\\${relativePath}` : normalizedBase;
  }

  function getCopyText(entry, partKey, pathBases) {
    if (!entry || typeof entry !== 'object') {
      return '';
    }

    if (entry.parts && typeof entry.parts === 'object') {
      if (partKey === 'all') {
        return MIXED_PART_ORDER
          .map((key) => entry.parts[key])
          .filter((value) => typeof value === 'string' && value)
          .join('\n\n');
      }
      return typeof entry.parts[partKey] === 'string' ? entry.parts[partKey] : '';
    }

    if (typeof entry.url === 'string') {
      return entry.url;
    }

    const fullPath = getFullPath(entry, pathBases);
    if (fullPath) {
      return fullPath;
    }

    return typeof entry.content === 'string' ? entry.content : '';
  }

  function getSearchText(entry) {
    if (!entry || typeof entry !== 'object') {
      return '';
    }

    const values = [
      entry.title,
      entry.description,
      entry.content,
      entry.url,
      entry.relativePath,
      getFullPath(entry),
    ];
    if (Array.isArray(entry.aliases)) values.push(...entry.aliases);
    if (Array.isArray(entry.tags)) values.push(...entry.tags);
    if (entry.parts && typeof entry.parts === 'object') values.push(...Object.values(entry.parts));
    return normalizeText(values.filter((value) => typeof value === 'string').join(' '));
  }

  function filterEntries(entries, query, category) {
    const sourceEntries = Array.isArray(entries) ? entries : [];
    const normalizedQuery = normalizeText(query);
    return sourceEntries.filter((entry) => (
      (!category || category === 'all' || entry.category === category)
      && (!normalizedQuery || getSearchText(entry).includes(normalizedQuery))
    ));
  }

  function isValidHttpUrl(value) {
    if (typeof value !== 'string' || !value.trim()) {
      return false;
    }
    try {
      const url = new URL(value.trim());
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_error) {
      return false;
    }
  }

  const api = { normalizeText, getFullPath, getCopyText, filterEntries, isValidHttpUrl };
  root.ToolboxResources = api;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
}(typeof window !== 'undefined' ? window : globalThis));
