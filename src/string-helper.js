export default class StringHelper {

  /**
   * removes strings from array and replaces them with keyword.
   * @param textString
   * @param stringsToRemove []
   * @param replacement (default == space)
   * @returns {textString}
   */
  replaceString(textString, stringsToRemove, replacement) {
    const tmp = textString.replace(this.stringToRegex(stringsToRemove), replacement || ' ');
    return this.stripSpaces(tmp);
  }

  /**
   * matches string with given array of strings to match.
   * @param textString
   * @param stringsToMatch
   * @returns {matches}
   */
  matchString(textString, stringsToMatch) {
    return textString.match(this.stringToRegex(stringsToMatch, false));
  }

  /**
   * checks if the match on textStrings is not null. If it has matches returns the length.
   * Otherwise it returns 0 (no matches).
   * @param textString
   * @param regex
   * @returns {number}
   */
  countMatches(textString, regex) {
    return textString.match(regex) !== null ? textString.match.length : 0;
  }

  /**
   * builds regex from array with multiple strings
   * @param stringArray
   * @returns {RegExp}
   */
  stringToRegex(stringArray, disableWordBoundary) {
    let regexString;

    const array = stringArray.map((string) => {
      if (disableWordBoundary) {
        return string;
      }
      return this.getWordBoundaryString(string);
    });

    regexString = '(' + array.join(')|(') + ')';

    return new RegExp(regexString, 'g');
  }

  /**
   * Returns a string that can be used in a regex to match a matchString with word boundaries.
   *
   * @param {String} matchString The string to generate a regex string for.
   * @param {String} extraWordBoundary Extra characters to match a word boundary on.
   * @return {String} A regex string that matches the matchString with word boundaries
   */
  getWordBoundaryString(matchString, extraWordBoundary) {
    const wordBoundary = `[ \n\r\t\.,'\(\)"\+;!?:\/${extraWordBoundary || ''}<>]`;
    const wordBoundaryEnd = `($|${wordBoundary})`;
    const wordBoundaryStart = `(^|${wordBoundary})`;

    return wordBoundaryStart + matchString + wordBoundaryEnd;
  }

  /**
   * Creates a regex with a wordboundary. Since /b isn't working properly in JavaScript we have to
   * use an alternative regex.
   */
  getWordBoundaryRegex(textString, extraWordBoundary) {
    return new RegExp(this.getWordBoundaryString(textString, extraWordBoundary), 'ig');
  }

  /**
   * Strip extra spaces, replace duplicates with single space. Remove space at front / end of string
   * @param textString
   * @returns textString
   */
  stripSpaces(textString) {

    // replace multiple spaces with single space
    let tmp = textString.replace(/\s{2,}/g, ' ');

    // replace spaces followed by periods with only the period.
    tmp = tmp.replace(/\s\./g, '.');

    // remove first/last character if space
    tmp = tmp.replace(/^\s+|\s+$/g, '');
    return tmp;
  }

  /**
   * adds escape characters to string
   * @param textString
   * @returns textString
   */
  addEscapeChars(textString) {
    return textString.replace(/[\-\[\]\/\{}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }

  /**
   * removes all HTMLtags from input string, except h1-6, li, p and dd
   * @param textString
   * @returns textString
   */
  stripSomeTags(textString) {

    // remove tags, except li, p, h1-6, dd
    let tmp = textString.replace(
      /<(?!li|\/li|p|\/p|h1|\/h1|h2|\/h2|h3|\/h3|h4|\/h4|h5|\/h5|h6|\/h6|dd).*?\>/g, ' ');
    tmp = this.stripSpaces(tmp);
    return tmp;
  }

  /**
   * remove all HTMLtags from input string.
   * @param textString
   * @returns textString
   */
  stripAllTags(textString) {

    // remove all tags
    let tmp = textString.replace(/(<([^>]+)>)/ig, ' ');

    // remove < and > if any are used
    tmp = tmp.replace(/[<>]/g, '');
    tmp = this.stripSpaces(tmp);
    return tmp;
  }

  /**
   * Removes all words comprised only of numbers and remove special characters.
   * @param textString {String}
   * @returns {string}
   */
  stripNonWords(textString) {

    //  replace comma', hyphens etc with spaces
    let tmp = textString.replace(/[\-\;\:\,\(\)\"\'\|\“\”]/g, ' ');

    //  remove apostrophe
    tmp = tmp.replace(/[\’]/g, '');

    //  Remove "words" comprised only of numbers
    tmp = tmp.replace(this.getWordBoundaryRegex('[0-9]+'), '$1$3');

    tmp = this.stripSpaces(tmp);

    if (tmp === '.') {
      tmp = '';
    }
    return tmp;
  }

  /**
   * Removes all invalid characters from a certain keyword
   *
   * @param {string} keyword The un-sanitized keyword.
   * @returns {string} The sanitized keyword.
   */
  sanitizeKeyword(keyword) {
    let tmp = keyword.replace(/[\[\]\/\{\}\(\)\*\+\?\\\^\$\|]/g, '');
    tmp = this.stripAllTags(tmp);
    return tmp;
  }

  /**
   * Escapes HTML characters from strings.
   *
   * @param textString
   * @returns {string}
   */
  escapeHTML(textString) {
    let tmp = textString;
    if (typeof textString === 'string') {
      tmp = textString.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\'/, '&quot;')
        .replace(/\'/g, '&#39;');
    }
    return tmp;
  }
}
