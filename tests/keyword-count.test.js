import buildAnalyzer from './helpers/i18n';
import { expect } from 'chai';

const keywordCountArgs = {
  text: '<img src="plaatje" animation="a bunch of filler texts" alt="keyword" width="100" /> TestText',
  keyword: "keyword"
};

describe("A keyword count test with no keyword in the test, only the alt", () => {
  it("should return no keyword found in the text.", () => {
    const textAnalyzer = buildAnalyzer(keywordCountArgs);
    const result = textAnalyzer.keywordCount();
    expect(result).to.equal(0);
  });
});

const keywordCountArgs2 = {
  text: '<img src="plaatje" animation="a bunch of filler texts" alt="keyword" width="100" /> TestText',
  keyword: "width"
};

describe("A keyword count test with no keyword in the test, but keyword is in the tag", () => {
  it("should return no keyword found in the text.", () => {
    const textAnalyzer = buildAnalyzer(keywordCountArgs2);
    const result = textAnalyzer.keywordCount();
    expect(result).to.equal(0);
  });
});

const keywordCountArgs3 = {
  text: 'a string with diacritics äbc',
  keyword: "äbc"
};

describe("a keyword with diacritics", () => {
  it("should return 1 keyword found in the text.", () => {
    const textAnalyzer = buildAnalyzer(keywordCountArgs3);
    const result = textAnalyzer.keywordCount();
    expect(result).to.equal(1);
  });
});

const keywordCountArgs4 = {
  text: 'a string with a combined word, test123',
  keyword: 'test123'
};

describe("a keyword with combined word", () => {
  it("should return 1 keyword found in the text.", () => {
    const textAnalyzer = buildAnalyzer(keywordCountArgs4);
    const result = textAnalyzer.keywordCount();
    expect(result).to.equal(1);
  });
});

const keywordCountArgs5 = {
  text: 'a string with a word and number, test 123',
  keyword: 'test 123'
};

describe("a keyword with combined word", () => {
  it("should return 1 keyword found in the text.", () => {
    const textAnalyzer = buildAnalyzer(keywordCountArgs5);
    const result = textAnalyzer.keywordCount();
    expect(result).to.equal(1);
  });
});

const keywordCountArgs6 = {
  text: 'a string with a word and number, test 123',
  keyword: '123'
};

describe("a keyword with only digits", () => {
  it("should return 1 keyword found in the text.", () => {
    const textAnalyzer = buildAnalyzer(keywordCountArgs6);
    const result = textAnalyzer.keywordCount();
    expect(result).to.equal(1);
  });
});

const keywordCountArgs7 = {
  text: "Тест текст тест нечто",
  keyword: "текст"
};

describe("a text in Cyrillic", () => {
  it("should return 1 matches for the keyword", () => {
    const textAnalyzer = buildAnalyzer(keywordCountArgs7);
    const result = textAnalyzer.keywordCount();
    expect(result).to.equal(1);
  });
});

const keywordCountArgs8 = {
  text: "Тест текст тест нечто Тест текст тест нечто Тест текст тест нечто",
  keyword: "текст"
};

describe("a text in Cyrillic", () => {
  it("should return 3 matches for the keyword", () => {
    const textAnalyzer = buildAnalyzer(keywordCountArgs8);
    const result = textAnalyzer.keywordCount();
    expect(result).to.equal(3);
  });
});
