import buildAnalyzer from './helpers/i18n';
import { expect } from 'chai';

const metaArgs = {
  keyword: "keyword",
  meta: "this is the metadescription that contains a keyword"
};

describe("a test matching the keywords in the metadescription", () => {
  it("returns a match for the keyword", () => {
    const metaAnalyzer = buildAnalyzer(metaArgs);
    const result = metaAnalyzer.metaDescriptionKeyword();
    expect(result[0].result).to.equal(1);
  });
});

const metaArgs2 = {
  keyword: "sample",
  meta: "this is the metadescription that doesn't contain a keyword"
};

describe("a test matching the keywords in the metadescription", () => {
  it("returns no matches for the keyword, since it isn't there", () => {
    const metaAnalyzer = buildAnalyzer(metaArgs2);
    const result = metaAnalyzer.metaDescriptionKeyword();
    expect(result[0].result).to.equal(0);
  });
});

const metaArgs3 = {
  keyword: "sample",
};

describe("a test matching the keyword in the metadescription", () => {
  it("returns no matches for the keyword, since there is no metadescription", () => {
    const metaAnalyzer = buildAnalyzer(metaArgs3);
    const result = metaAnalyzer.metaDescriptionKeyword();
    expect(result[0].result).to.equal(-1);
  });
});

const metaArgs4 = {
  meta: "Last month, Google actually announced a change in their algorithm before it had already happened. ",
  keyword: ""
};

describe("a test matching the keyword in the metadescription", () => {
  it("returns no matches for the keyword, since the keyword is not set", () => {
    const metaAnalyzer = buildAnalyzer(metaArgs4);
    const result = metaAnalyzer.metaDescriptionKeyword();
    expect(result[0].result).to.equal(-1);
  });
});

const metaArgs5 = {
  meta: "",
  keyword: ""
};

describe("a test matching the keyword in the metadescription", () => {
  it("returns no matches for the keyword, since the keyword is not set and the meta is empty", () => {
    const metaAnalyzer = buildAnalyzer(metaArgs5);
    const result = metaAnalyzer.metaDescriptionKeyword();
    expect(result[0].result).to.equal(-1);
  });
});

const metaArgs6 = {
  meta: "Key-word",
  keyword: "key-word"
};

describe("a test matching a hyphenated keyword with caps", () => {
  it("returns 1 match", () => {
    const metaAnalyzer = buildAnalyzer(metaArgs6);
    const result = metaAnalyzer.metaDescriptionKeyword();
    expect(result[0].result).to.equal(1);
  });
});

const metaArgs7 = {
  meta: "tëst with a diacritic",
  keyword: "tëst"
};

describe("a test matching a hyphenated keyword with caps", () => {
  it("returns 1 match", () => {
    const metaAnalyzer = buildAnalyzer(metaArgs7);
    const result = metaAnalyzer.metaDescriptionKeyword();
    expect(result[0].result).to.equal(1);
  });
});
