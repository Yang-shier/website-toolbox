(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SiteToolboxStorage = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var DEFAULT_DRAFT_KEY = 'site_toolbox_drafts_v1';

  function getStorage(storage) {
    if (storage) return storage;
    if (typeof localStorage !== 'undefined') return localStorage;
    return null;
  }

  function loadDrafts(key, storage) {
    var store = getStorage(storage);
    if (!store) return {};
    try {
      return JSON.parse(store.getItem(key || DEFAULT_DRAFT_KEY) || '{}') || {};
    } catch (e) {
      return {};
    }
  }

  function saveDraftField(key, id, value, storage) {
    var store = getStorage(storage);
    if (!store) return false;
    try {
      var drafts = loadDrafts(key, store);
      if (value) drafts[id] = value;
      else delete drafts[id];
      store.setItem(key || DEFAULT_DRAFT_KEY, JSON.stringify(drafts));
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearDraftFields(key, ids, storage) {
    var store = getStorage(storage);
    if (!store) return false;
    try {
      var drafts = loadDrafts(key, store);
      ids.forEach(function (id) {
        delete drafts[id];
      });
      store.setItem(key || DEFAULT_DRAFT_KEY, JSON.stringify(drafts));
      return true;
    } catch (e) {
      return false;
    }
  }

  function getFieldValue(field, getElement) {
    var el = getElement(field.id);
    if (!el) return '';
    return field.type === 'html' ? el.innerHTML : el.value;
  }

  function setFieldValue(field, value, getElement) {
    var el = getElement(field.id);
    if (!el) return false;
    if (field.type === 'html') el.innerHTML = value;
    else el.value = value;
    return true;
  }

  function collectWorkspaceDrafts(fields, getElement) {
    var values = {};
    fields.forEach(function (field) {
      var value = getFieldValue(field, getElement);
      if (value) values[field.id] = value;
    });
    return {
      version: 'site-toolbox-workspace-v1',
      exportedAt: new Date().toISOString(),
      fields: values,
    };
  }

  function applyWorkspaceDrafts(workspace, fields, getElement, saveField) {
    if (!workspace || !workspace.fields) return false;
    fields.forEach(function (field) {
      if (workspace.fields[field.id] === undefined) return;
      if (setFieldValue(field, workspace.fields[field.id], getElement) && saveField) {
        saveField(field.id, workspace.fields[field.id]);
      }
    });
    return true;
  }

  return {
    DEFAULT_DRAFT_KEY: DEFAULT_DRAFT_KEY,
    loadDrafts: loadDrafts,
    saveDraftField: saveDraftField,
    clearDraftFields: clearDraftFields,
    collectWorkspaceDrafts: collectWorkspaceDrafts,
    applyWorkspaceDrafts: applyWorkspaceDrafts,
  };
});
