import buildAnalyzer from './helpers/i18n';
import { expect } from 'chai';

const fleschArgs = {
  text: "This is the year that Yoast turns 5 years old. A natural time to reflect upon how the company is doing and what it should and should not be doing and what we want for the future. Today we’re proud to announce that we’ve been acquired by CrowdFavorite",
  queue: ["fleschReading"]
};

describe("Test for the flesch kincaid reading", () => {
  it("returns a flesh kincaid reading score", () => {
    const flesch = buildAnalyzer(fleschArgs);
    const result = flesch.fleschReading();
    expect(result[0].result).to.equal("79.3");
  });
});

var fleschArgs2 = {
  text: "One question we get quite often in our website reviews is whether we can help people recover from the drop they noticed in their rankings or traffic. A lot of the times, this is a legitimate drop and people were actually in a bit of trouble.",
  queue: ["fleschReading"]
};

describe("2nd test for the flesch kincaid reading", () => {
  it("returns a flesh kincaid reading score", () => {
    const flesch2 = buildAnalyzer(fleschArgs2);
    const result = flesch2.fleschReading();
    expect(result[0].result).to.equal("63.9");
  });
});

const fleschArgs3 = {
  text: ""
}

describe("3rd test for the flesch kincaid reading", () => {
  it("returns nothing, since no text is defined", () => {
    const flesch3 = buildAnalyzer(fleschArgs3);
    const result = flesch3.fleschReading();
    expect(typeof result).to.equal("undefined");
  });
});
