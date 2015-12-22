import ScoreFormatter from "../src/score-formatter";
import { buildJed } from './helpers/i18n';
import { expect } from 'chai';

describe("A function to transform a textual score into a description", () => {
  const i18n = buildJed();

  const scoreFormatter = new ScoreFormatter({
    scores: [],
    overallScore: 0,
    outputTarget: '',
    overallTarget: '',
    keyword: '',
    saveScores: () => {
    },
    i18n: i18n
  });

  it("should know how to transform the score", () => {
    expect(scoreFormatter.getSEOScoreText('na')).to.equal("No keyword");
    expect(scoreFormatter.getSEOScoreText('bad')).to.equal("Bad SEO score");
    expect(scoreFormatter.getSEOScoreText('ok')).to.equal("Ok SEO score");
    expect(scoreFormatter.getSEOScoreText('good')).to.equal("Good SEO score");
  });

  it("should return an empty string with invalid scores", () => {
    expect(scoreFormatter.getSEOScoreText('')).to.equal("");
    expect(scoreFormatter.getSEOScoreText('some invalid string')).to.equal("");
  });
});

describe("A function to transform a numeric overall score into a textual score", () => {
  const i18n = buildJed();

  const scoreFormatter = new ScoreFormatter({
    scores: [],
    overallScore: 0,
    outputTarget: '',
    overallTarget: '',
    keyword: '',
    saveScores: () => {
    },
    i18n: i18n
  });

  it("should know how to transform the score", () => {
    const expectations = [
      [1, 'bad'],
      [23, 'bad'],
      [40, 'bad'],
      [41, 'ok'],
      [55, 'ok'],
      [70, 'ok'],
      [71, 'good'],
      [83, 'good'],
      [100, 'good']
    ];

    expectations.forEach((item) => {
      expect(scoreFormatter.overallScoreRating(item[0])).to.equal(item[1]);
    });
  });
});
