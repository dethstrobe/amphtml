/** @typedef {{
      width: string,
      height: string,
      layout: string,
    }} */
export let LayoutInfoDef;

/** @enum {string} */
export const FailureType = {
  REQUEST_ERROR: 'REQUEST_ERROR',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
  EMPTY_RESPONSE: 'EMPTY_RESPONSE',
  VALIDATOR_ERROR: 'VALIDATOR_ERROR',
  RENDERER_ERROR: 'RENDERER_ERROR',
};

/** @enum {string} */
export const RecoveryModeType = {
  COLLAPSE: 'COLLAPSE',
  RETRY: 'RETRY',
};

/** @enum {string} */
export const ValidatorResult = {
  AMP: 'AMP',
  NON_AMP: 'NON_AMP',
};

/** @enum {string} */
export const AdResponseType = {
  CRYPTO: 'crypto',
  TEMPLATE: 'template',
};

/** @typedef {{
      type: !ValidatorResult,
      adResponseType: AdResponseType,
      creativeData: !Object,
    }} */
export let ValidatorOutput;

/** @typedef {{
      minifiedCreative: string,
      customElementExtensions: !Array<string>,
      customStylesheets: !Array<{href: string}>,
      images: (Array<string>|undefined),
    }} */
export let CreativeMetaDataDef;

/** @typedef {{
      templateUrl: string,
      data: (JsonObject|undefined),
      analytics: (JsonObject|undefined),
    }} */
export let AmpTemplateCreativeDef;

/** @typedef {{
      creative: (string|undefined),
      rawCreativeBytes: (!ArrayBuffer|undefined),
      sentinel: (string|undefined),
      additionalContextMetadata: (!JsonObject|undefined),
    }} */
export let CrossDomainDataDef;

/**
 * @abstract
 */
export class Validator {
  /**
   * @param {!Object} unusedContext
   * @param {!Element} unusedContainerElement
   * @param {!ArrayBuffer} unusedUnvalidatedBytes
   * @param {!Headers} unusedHeaders
   * @return {!Promise<!ValidatorOutput>}
   * @abstract
   */
  validate(
    unusedContext,
    unusedContainerElement,
    unusedUnvalidatedBytes,
    unusedHeaders
  ) {}
}

/**
 * @abstract
 */
export class Renderer {
  /**
   * @param {!Object} unusedContext
   * @param {!Element} unusedContainerElement
   * @param {!Object} unusedCreativeData Data passed from validator to renderer.
   *   This should only contain information generated by the validator; all
   *   other information should be put in context.
   * @return {!Promise}
   * @abstract
   */
  render(unusedContext, unusedContainerElement, unusedCreativeData) {}
}
