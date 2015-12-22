import buildAnalyzer from './helpers/i18n';
import { expect } from 'chai';

const urlArgs = {
  keyword: "keyword",
  queue: ["urlKeyword", "urlLength", "urlStopwords"],
  url: "https://yoast.com/keyword-yoast",
  text: ""
};

describe("a test matching the keywords in the url", () => {
  it("returns a match for the keyword", () => {
    const urlAnalyzer = buildAnalyzer(urlArgs);
    urlAnalyzer.runQueue();
    const result = urlAnalyzer.__output;
    expect(result[0].result).to.equal(1);
    expect(result[1].result.urlTooLong).to.equal(false);
    expect(result[2].result).to.equal(0);
  });
});

const urlArgs2 = {
  keyword: "sample",
  queue: ["urlKeyword"],
  url: "https://yoast.com/keyword-yoast",
  text: ""
};

describe("a test matching the keywords in the url", () => {
  it("returns no matches for the keyword, since it isn't there", () => {
    const urlAnalyzer = buildAnalyzer(urlArgs2);
    const result = urlAnalyzer.urlKeyword();
    expect(result[0].result).to.equal(0);
  });
});

const urlArgs3 = {
  keyword: "sample",
  queue: ["urlKeyword"]
};

describe("a test matching the keywords in the url", () => {
  it("returns no matches for the keyword, since there is no url defined", () => {
    const urlAnalyzer = buildAnalyzer(urlArgs3);
    const result = urlAnalyzer.urlKeyword();
    expect(result[0].result).to.equal(0);
  });
});

const urlArgs4 = {
  keyword: "one two three",
  url: "http://domain.tld/one-two-three"
};

describe("a test matching a keyword with multiple spaces", () => {
  it("returns a match for the keyword", () => {
    const urlAnalyzer = buildAnalyzer(urlArgs4);
    const result = urlAnalyzer.urlKeyword();
    expect(result[0].result).to.equal(1);
  });
});

const urlArgs5 = {
  keyword: "one-two-three",
  url: "http://domain.com/one-two-three"
};

describe("a test matching a keyword with multiple hyphens", () => {
  it("returns a match for the keyword", () => {
    const urlAnalyzer = buildAnalyzer(urlArgs5);
    const result = urlAnalyzer.urlKeyword();
    expect(result[0].result).to.equal(1);
  });
});

const urlArgs6 = {
  keyword: "one-two-three-four-five",
  url: "http://domain.com/one-two-three-four-five"
};

describe("a test matching a keyword with multiple hyphens", () => {
  it("returns a match for the keyword", () => {
    const urlAnalyzer = buildAnalyzer(urlArgs6);
    const result = urlAnalyzer.urlKeyword();
    expect(result[0].result).to.equal(1);
  });
});

const urlArgs7 = {
  keyword: "one two three four five",
  url: "http://domain.com/one-two-three-four-five"
};

describe("a test matching a keyword with multiple spaces", () => {
  it("returns a match for the keyword", () => {
    const urlAnalyzer = buildAnalyzer(urlArgs7);
    const result = urlAnalyzer.urlKeyword();
    expect(result[0].result).to.equal(1);
  });
});


const urlArgs8 = {
  keyword: "yoast seo 3",
  url: "http://domain.com/yoast-seo-3"
};

describe("a test matching a keyword with one space and a number", () => {
  it("returns a match for the keyword", () => {
    const urlAnalyzer = buildAnalyzer(urlArgs8);
    const result = urlAnalyzer.urlKeyword();
    expect(result[0].result).to.equal(1);
  });
});

