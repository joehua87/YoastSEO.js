import buildAnalyzer from './helpers/i18n';
import { expect } from 'chai';

const metaArgs = {
  keyword: "keyword",
  queue: ["metaDescriptionLength"],
  meta: "this is the metadescription that contains a keyword"
};

describe("a test returning the length of the metadescription", () => {
  it("returns a match for the keyword", () => {
    const metaAnalyzer = buildAnalyzer(metaArgs);
    const result = metaAnalyzer.metaDescriptionLength();
    expect(result[0].result).to.equal(51);
  });
});

const metaArgs2 = {
  keyword: "sample",
  queue: ["metaDescriptionLength"],
  meta: "this is the metadescription that doesn't contains a keyword"
};

describe("a test returning the length of the metadescription", () => {
  it("returns no matches for the keyword, since it isn't there", () => {
    const metaAnalyzer = buildAnalyzer(metaArgs2);
    const result = metaAnalyzer.metaDescriptionLength();
    expect(result[0].result).to.equal(59);
  });
});

const metaArgs3 = {
  keyword: "sample",
  queue: ["metaDescriptionLength"]
};

describe("a test returning the length of the metadescription", () => {
  it("returns 0 for the length, since there is no metadescription", () => {
    const metaAnalyzer = buildAnalyzer(metaArgs3);
    const result = metaAnalyzer.metaDescriptionLength();
    expect(result[0].result).to.equal(0);
  });
});
