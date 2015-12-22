import buildAnalyzer from './helpers/i18n';
import { expect } from 'chai';

const firstParagraphArg = {
  text: "<p>this is a default text to test the first paragraph for the word keyword</p> if the keyword is mentioned after the first paragraph, it shouldn't count the keyword. ",
  queue: ["firstParagraph"],
  keyword: "keyword"
};

describe("a test for checking the first paragraph for keyword(s)", () => {
  it("returns the count of keywords", () => {
    const firstParagraphAnalyzer = buildAnalyzer(firstParagraphArg);
    const result = firstParagraphAnalyzer.firstParagraph();
    expect(result[0].result).to.equal(1);
  });
});

const firstParagraphArg2 = {
  text: "this is a default text to test the first paragraph for the word keyword if the keyword is mentioned after the first paragraph, it shouldn't count the keyword. ",
  queue: ["firstParagraph"],
  keyword: "keyword"
};

describe("a test for checking the first paragraph for keywords, when no paragraph is defined", () => {
  it("returns 0, since no paragraphs are in text", () => {
    const firstParagraphAnalyzer2 = buildAnalyzer(firstParagraphArg2);
    const result = firstParagraphAnalyzer2.firstParagraph();
    expect(result[0].result).to.equal(3);
  });
});

const firstParagraphArg3 = {
  text: "<p>One question we get</p> quite often <p>in our website reviews</p> is whether we can help people recover from the drop they noticed in their rankings or traffic. A lot of the times, this is a legitimate drop and people were actually in a bit of trouble.",
  keyword: "website",
  queue: ["firstParagraph"]
};

describe("a test for checking the first paragraph for keywords, when no paragraph is defined", () => {
  it("returns 0, since there are 2 paragraphs and 2nd matches keyword", () => {
    const firstParagraphAnalyzer3 = buildAnalyzer(firstParagraphArg3);
    const result = firstParagraphAnalyzer3.firstParagraph();
    expect(result[0].result).to.equal(0);
  });
});

const firstParagraphArg4 = {
  text: "One question we get quite often in our website reviews \n\n is whether we can help people recover from the drop they noticed in their rankings or traffic. A lot of the times, this is a legitimate drop and people were actually in a bit of trouble.",
  keyword: "website",
  queue: ["firstParagraph"]
};

describe("a test for checking the firstparagraph with newlines in stead of <p>-tags", () => {
  it("returns 1, the keyword is used before the double linebreak", () => {
    const firstParagraphAnalyzer4 = buildAnalyzer(firstParagraphArg4);
    const result = firstParagraphAnalyzer4.firstParagraph();
    expect(result[0].result).to.equal(1);
  });
});

const firstParagraphArg5 = {
  text: "<table><tr><td>keyword</td></tr></table>",
  keyword: "keyword",
  queue: ["firstParagraph"]
};

describe("The first paragraph test detecting keyword", () => {
  let analyzer;

  it("should work with HTML tables around the keyword", () => {
    analyzer = buildAnalyzer(firstParagraphArg5);
    const result = analyzer.firstParagraph();

    expect(result[0].result).to.equal(1);
  });
});
