import buildAnalyzer from './helpers/i18n';
import { expect } from 'chai';

const titleArg = {
  pageTitle: "this is a pagetitle",
  queue: ["pagetitle"]
};

describe("a test counting the number of characters in the pagetitle", () => {
  it("returns the number of characters", () => {
    const pagetitleAnalyzer = buildAnalyzer(titleArg);
    const result = pagetitleAnalyzer.pageTitleLength();
    expect(result[0].result).to.equal(19);
  });
});

const titleArg2 = {
  pageTitle: "this is a much longer pagetitle",
  queue: ["pagetitle"]
};

describe("a test counting the number of characters in the pagetitle", () => {
  it("returns the number of characters", () => {
    const pagetitleAnalyzer = buildAnalyzer(titleArg2);
    const result = pagetitleAnalyzer.pageTitleLength();
    expect(result[0].result).to.equal(31);
  });
});


const titleArg3 = {
  queue: ["pagetitle"]
};

describe("a test counting the number of characters in an empty pagetitle", () => {
  it("returns null", () => {
    const pagetitleAnalyzer = buildAnalyzer(titleArg3);
    const result = pagetitleAnalyzer.pageTitleLength();
    expect(result[0].result).to.equal(0);
  });
});
