import buildAnalyzer from './helpers/i18n';
import { expect } from 'chai';

const doubleArgs = {
  text: "This is the year that Yoast turns 5 years old. A natural time to reflect upon how the company is doing and what it should and should not be doing and what we want for the future. Today we’re proud to announce that we’ve been acquired by CrowdFavorite",
  keyword: "test",
  queue: ["keywordDoubles"],
  usedKeywords: []
};

describe("Test for the focus keyword doubles", () => {
  it("returns no double keywords", () => {
    const analyzer = buildAnalyzer(doubleArgs);
    const result = analyzer.keywordDoubles();
    expect(result[0].result.count).to.equal(0);
    expect(result[0].result.id).to.equal(0);
  });
});

const doubleArgs2 = {
  text: "This is the year that Yoast turns 5 years old. A natural time to reflect upon how the company is doing and what it should and should not be doing and what we want for the future. Today we’re proud to announce that we’ve been acquired by CrowdFavorite",
  keyword: "yoast",
  queue: ["keywordDoubles"],
  usedKeywords: {yoast: [16], test: [2, 15], keyword: [3, 5, 7, 12, 23]}
};

describe("Test for the focus keyword doubles", () => {
  it("returns a keyword double", () => {
    const analyzer = buildAnalyzer(doubleArgs2);
    const result = analyzer.keywordDoubles();
    expect(result[0].result.count).to.equal(1);
    expect(result[0].result.id).to.equal(16);
  });
});

const doubleArgs3 = {
  text: "This is the year that Yoast turns 5 years old. A natural time to reflect upon how the company is doing and what it should and should not be doing and what we want for the future. Today we’re proud to announce that we’ve been acquired by CrowdFavorite",
  keyword: "yoast",
  queue: ["keywordDoubles"],
  usedKeywords: {yoast: [3, 5, 9]}
};

describe("Test for the focus keyword doubles", () => {
  it("returns 3 keyword doubles", () => {
    const analyzer = buildAnalyzer(doubleArgs3);
    const result = analyzer.keywordDoubles();
    expect(result[0].result.count).to.equal(3);
    expect(result[0].result.id).to.equal(0);
  });
});
