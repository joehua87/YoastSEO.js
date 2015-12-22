import StringHelper from './string-helper';
import { preprocessorConfig } from './config/config';

/**
 * YoastSEO.PreProcessor object definition. Creates __store object and calls init.
 * @params textString
 */
export default class PreProcessor {
  constructor(text) {
    // create __store object to store data
    this.__store = {};
    this.__store.originalText = text;
    this.stringHelper = new StringHelper();
    this.init();
  }

  /**
   * init function calling all necessary PreProcessorfunctions
   */
  init() {

    // call function to clean text
    this.textFormat();

    // call function to count words
    this.countStore();
  }

  /**
   * formats the original text from __store and save as cleantext, cleantextSomeTags en
   * cleanTextNoTags
   */
  textFormat() {
    this.__store.cleanText = this.cleanText(this.__store.originalText);
    this.__store.cleanTextSomeTags = this.stringHelper.stripSomeTags(this.__store.cleanText);
    this.__store.cleanTextNoTags = this.stringHelper.stripAllTags(this.__store.cleanTextSomeTags);
    this.__store.cleanTextNoDigits = this.stringHelper.stripNonWords(this.__store.cleanTextNoTags);
  }

  /**
   * saves wordcount (all words) and wordcountNoTags (all words except those in tags) in the __store
   * saves sentencecount and syllable count in __store
   * object
   */
  countStore() {

    // wordcounters
    const wordcountString = this.__store.cleanText;

    this.__store.wordcount = wordcountString === '' ? 0 : wordcountString.split(/\s/g).length;

    const wordcountStringNoTags = this.__store.cleanTextNoTags;

    this.__store.wordcountNoTags = wordcountStringNoTags === '' ? 0 : wordcountStringNoTags.split(/\s/g).length;

    const wordcountStringNoDigits = this.__store.cleanTextNoDigits;

    this.__store.wordcountNoDigits = wordcountStringNoDigits === '' ? 0 : wordcountStringNoDigits.split(/\s/g).length;

    // sentencecounters
    this.__store.sentenceCountNoTags = this.sentenceCount(this.__store.cleanTextNoDigits);

    // syllablecounters
    this.__store.syllablecount = this.syllableCount(this.__store.cleanTextNoDigits);
  }

  /**
   * counts the number of sentences in a textstring by splitting on a period. Removes sentences that
   * are empty or have only a space.
   * @param textString
   */
  sentenceCount(textString) {
    const sentences = textString.split('.');
    let sentenceCount = 0;
    for (let idx = 0; idx < sentences.length; idx++) {
      if (sentences[idx] !== '' && sentences[idx] !== ' ') {
        sentenceCount++;
      }
    }
    return sentenceCount;
  }

  /**
   * counts the number of syllables in a textstring, calls exclusionwordsfunction, basic syllable
   * counter and advanced syllable counter.
   * @param textString
   * @returns syllable count
   */
  syllableCount(textString) {
    this.syllableCount = 0;
    let tmp = textString.replace(/[.]/g, ' ');
    tmp = this.removeWords(tmp);
    const words = tmp.split(" ");

    const subtractSyllablesRegexp = this.stringHelper.stringToRegex(
      preprocessorConfig.syllables.subtractSyllables, true);

    const addSyllablesRegexp = this.stringHelper.stringToRegex(
      preprocessorConfig.syllables.addSyllables, true);

    for (let i = 0; i < words.length; i++) {
      this.basicSyllableCount(words[i].split(/[^aeiouy]/g));
      this.advancedSyllableCount(words[i], subtractSyllablesRegexp, "subtract");
      this.advancedSyllableCount(words[i], addSyllablesRegexp, "add");
    }
    return this.syllableCount;
  }

  /**
   * counts the syllables by splitting on consonants
   * @param splitWordArray
   */

  basicSyllableCount(splitWordArray) {
    for (let idx = 0; idx < splitWordArray.length; idx++) {
      if (splitWordArray[idx].length > 0) {
        this.syllableCount++;
      }
    }
  }

  /**
   * counts the syllables by validating against regexxes, and adding and subtracting the number of
   * matches.
   * @param inputString
   * @param regex
   * @param operator
   */
  advancedSyllableCount(inputString, regex, operator) {
    const match = inputString.match(regex);
    if (match !== null) {
      if (operator === 'subtract') {
        this.syllableCount -= match.length;
      } else if (operator === 'add') {
        this.syllableCount += match.length;
      }
    }
  }

  /**
   * removes words from textstring and count syllables. Used for words that fail against regexes.
   * @param textString
   * @returns textString with exclusionwords removed
   */
  removeWords(textString) {
    const config = preprocessorConfig;

    let tmp = textString;
    for (let i = 0; i < config.syllables.exclusionWords.length; i++) {
      const exclusionRegex = new RegExp(config.syllables.exclusionWords[i].word, "g");
      const matches = textString.match(exclusionRegex);
      if (matches !== null) {
        this.syllableCount += config.syllables.exclusionWords[i].syllables;
        tmp = textString.replace(exclusionRegex, "");
      }
    }
    return tmp;
  }

  /**
   * cleans text by removing special characters, numberonly words and replacing all terminators by
   * periods
   * @param textString
   * @returns textString
   */
  cleanText(textString) {
    let tmp = textString;
    if (tmp !== '') {
      tmp = this.replaceDiacritics(textString);
      tmp = tmp.toLocaleLowerCase();

      //  Remove some HTML entities as first action
      tmp = tmp.replace('&nbsp;', ' ');

      //  unify all terminators
      tmp = tmp.replace(/[.?!]/g, '.');

      //  Remove double spaces
      tmp = this.stringHelper.stripSpaces(tmp);

      //  add period in case it is missing
      tmp += '.';

      //  replace newlines with spaces
      tmp = tmp.replace(/[ ]*(\n|\r\n|\r)[ ]*/g, ' ');

      //  remove duplicate terminators
      tmp = tmp.replace(/([\.])[\. ]+/g, '$1');

      //  pad sentence terminators
      tmp = tmp.replace(/[ ]*([\.])+/g, '$1 ');

      //  Remove double spaces
      tmp = this.stringHelper.stripSpaces(tmp);

      if (tmp === '.') {
        tmp = '';
      }
    }
    return tmp;
  }

  /**
   * replaces all diacritics with standard characters following the diacritics removal map from the
   * config.
   * @param textString
   * @returns textString
   */
  replaceDiacritics(textString) {
    const config = preprocessorConfig;

    let tmp = textString;
    for (let idx = 0; idx < config.diacriticsRemovalMap.length; idx++) {
      tmp = textString.replace(
        config.diacriticsRemovalMap[idx].letters,
        config.diacriticsRemovalMap[idx].base
      );
    }
    return tmp;
  }
}
