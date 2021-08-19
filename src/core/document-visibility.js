import {VisibilityState} from './constants/visibility-state';
import {getVendorJsPropertyName} from './dom/style';

/**
 * @param {!Document} doc
 * @return {!VisibilityState}
 */
export function getDocumentVisibilityState(doc) {
  // New API: `document.visibilityState` property.
  const visibilityStateProp = getVendorJsPropertyName(
    doc,
    'visibilityState',
    true
  );
  if (doc[visibilityStateProp]) {
    return doc[visibilityStateProp];
  }

  // Old API: `document.hidden` property.
  const hiddenProp = getVendorJsPropertyName(doc, 'hidden', true);
  if (doc[hiddenProp]) {
    return doc[hiddenProp] ? VisibilityState.HIDDEN : VisibilityState.VISIBLE;
  }

  return VisibilityState.VISIBLE;
}

/**
 * Returns the value of "document.hidden" property. The reasons why it may
 * not be visible include document in a non-active tab or when the document
 * is being pre-rendered via link with rel="prerender".
 * @param {!Document} doc
 * @return {boolean}
 */
export function isDocumentHidden(doc) {
  return getDocumentVisibilityState(doc) != VisibilityState.VISIBLE;
}

/**
 * @param {!Document} doc
 * @param {function()} handler
 */
export function addDocumentVisibilityChangeListener(doc, handler) {
  if (!doc.addEventListener) {
    return;
  }
  const visibilityChangeEvent = getVisibilityChangeEvent(doc);
  if (visibilityChangeEvent) {
    doc.addEventListener(visibilityChangeEvent, handler);
  }
}

/**
 * @param {!Document} doc
 * @param {function()} handler
 */
export function removeDocumentVisibilityChangeListener(doc, handler) {
  if (!doc.removeEventListener) {
    return;
  }
  const visibilityChangeEvent = getVisibilityChangeEvent(doc);
  if (visibilityChangeEvent) {
    doc.removeEventListener(visibilityChangeEvent, handler);
  }
}

/**
 * @param {!Document} doc
 * @return {?string}
 */
function getVisibilityChangeEvent(doc) {
  const hiddenProp = getVendorJsPropertyName(doc, 'hidden', true);
  const vendorStop = hiddenProp.indexOf('Hidden');
  return vendorStop != -1
    ? hiddenProp.substring(0, vendorStop) + 'Visibilitychange'
    : 'visibilitychange';
}
