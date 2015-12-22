import buildAnalyzer from './helpers/i18n';
import { expect } from 'chai';

const titleKeywordArg = {
  pageTitle: "this is a pagetitle",
  keyword: "pagetitle",
  queue: ["pageTitleKeyword"]
};

describe("a test to check if the keyword occurs in the pagetitle", () => {
  it("returns the number of keywordmatches", () => {
    const pagetitleKeyword = buildAnalyzer(titleKeywordArg);
    const result = pagetitleKeyword.pageTitleKeyword();
    expect(result[0].result.matches).to.equal(1);
    expect(result[0].result.position).to.equal(10);
  });
});

const titleKeywordArg2 = {
  pageTitle: "this is a much longer pagetitle",
  keyword: "keyword",
  queue: ["pageTitleKeyword"]
};

describe("a test to check if the keyword occurs in the pagetitle", () => {
  it("returns zero, since there is no keyword match", () => {
    const pagetitleAnalyzer2 = buildAnalyzer(titleKeywordArg2);
    const result = pagetitleAnalyzer2.pageTitleKeyword();
    expect(result[0].result.matches).to.equal(0);
  });
});

const titleKeywordArg3 = {
  textString: "this is a default text",
  keyword: "keyword",
  queue: ["pageTitleKeyword"]
};

describe("a test to check if the keyword occurs in the pagetitle", () => {
  it("returns zero, since there is no pagetitle", () => {
    const pagetitleAnalyzer3 = buildAnalyzer(titleKeywordArg3);
    const result = pagetitleAnalyzer3.pageTitleKeyword();
    expect(result[0].result.matches).to.equal(0);
  });
});

const titleKeywordArg4 = {
  pageTitle: "focus keyword",
  keyword: "focus keyword",
  queue: ["pageTitleKeyword"]
};
const titleKeywordArg5 = {
  pageTitle: "focus-keyword",
  keyword: "focus-keyword",
  queue: ["pageTitleKeyword"]
};
const titleKeywordArg6 = {
  pageTitle: "focus-keyword",
  keyword: "focus keyword",
  queue: ["pageTitleKeyword"]
};
const titleKeywordArg7 = {
  pageTitle: "focus keyword",
  keyword: "focus-keyword",
  queue: ["pageTitleKeyword"]
};
const titleKeywordArg8 = {
  pageTitle: "Focus keyword",
  keyword: "focus keyword",
  queue: ["pageTitleKeyword"]
};
const titleKeywordArg9 = {
  pageTitle: "äbc",
  keyword: "äbc"
};
const titleKeywordArg10 = {
  pageTitle: "ст, чтобы проверить нечто Test текст, чтобы ",
  keyword: "нечто"
};

describe("a test with keywords", () => {
  let pageTitleAnalyzer;
  let result;

  it("returns correct results with spaces in the keyword", () => {
    pageTitleAnalyzer = buildAnalyzer(titleKeywordArg4);

    result = pageTitleAnalyzer.pageTitleKeyword();

    expect(result[0].result.matches).to.equal(1);
    expect(result[0].result.position).to.equal(0);
  });

  it("returns correct results with a dash in the keyword", () => {
    pageTitleAnalyzer = buildAnalyzer(titleKeywordArg5);

    result = pageTitleAnalyzer.pageTitleKeyword();

    expect(result[0].result.matches).to.equal(1);
    expect(result[0].result.position).to.equal(0);
  });

  it("returns correct results with a dash in the keyword", () => {
    pageTitleAnalyzer = buildAnalyzer(titleKeywordArg6);

    result = pageTitleAnalyzer.pageTitleKeyword();

    expect(result[0].result.matches).to.equal(0);
    expect(result[0].result.position).to.equal(-1);
  });

  it("returns correct results with a dash in the keyword", () => {
    pageTitleAnalyzer = buildAnalyzer(titleKeywordArg7);

    result = pageTitleAnalyzer.pageTitleKeyword();

    expect(result[0].result.matches).to.equal(0);
    expect(result[0].result.position).to.equal(-1);
  });
  it("returns correct results with a capital in the keyword", () => {
    pageTitleAnalyzer = buildAnalyzer(titleKeywordArg8);

    result = pageTitleAnalyzer.pageTitleKeyword();

    expect(result[0].result.matches).to.equal(1);
    expect(result[0].result.position).to.equal(0);
  });
  it("returns correct results with a diacritic in the keyword", () => {
    pageTitleAnalyzer = buildAnalyzer(titleKeywordArg9);

    result = pageTitleAnalyzer.pageTitleKeyword();

    expect(result[0].result.matches).to.equal(1);
    expect(result[0].result.position).to.equal(0);
  });
  it("returns result with arabic (non-latin) text", () => {
    pageTitleAnalyzer = buildAnalyzer(titleKeywordArg10);

    result = pageTitleAnalyzer.pageTitleKeyword();

    expect(result[0].result.matches).to.equal(1);
  });
});


