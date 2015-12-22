import Jed from 'jed';
import Analyzer from '../../src/analyzer';

export const buildJed = () => {
  return new Jed({
    "domain": "js-text-analysis",
    "locale_data": {
      "js-text-analysis": {
        "": {}
      }
    }
  });
};

/**
 * Returns an analyzer object for testing with default args
 *
 * @param {Object} args
 *
 * @returns {YoastSEO.Analyzer}
 */
export default (args) => {

  if (typeof args.i18n === "undefined") {
    args.i18n = buildJed();
    args.locale = 'en_US';
  }

  return new Analyzer(args);
};
