import buildAnalyzer from './helpers/i18n';
import { expect } from 'chai';

const keywordArgs = {
  text: "Last month, Google actually announced a change in their algorithm before it had already happened. In this post they mention that starting April 21st mobile-friendliness will become a ranking factor more and more.    In the past few weeks we’ve been getting quite a few reports from Google Webmaster Tools. Not only did they add a Mobile Usability item under the Search Traffic section, but they also sent out emails with the subject Fix mobile usability issues found on <website>. Obviously, Google is bringing mobile-friendliness under the website owner’s attention.    So we thought it would be a good idea to explain what you should pay attention to and what we think you should be doing to prepare yourself for the update on April 21st.",
  keyword: "mobile",
  queue: ["keywordDensity"]
};

describe("A keyword density test with a good amount of occurences of the keyword ", () => {
  it("returns keyword density - good", () => {
    const textAnalyzerDensity = buildAnalyzer(keywordArgs);
    const result = textAnalyzerDensity.keywordDensity();
    expect(result[0].result).to.contain(1.6);
  });
});

const keywordArgs2 = {
  text: "Last month, Google mobile actually announced a mobile change in their algorithm before it had already happened. In this post they mention that starting April 21st mobile-friendliness will become a ranking factor more and more.    In the past few weeks we’ve been getting quite a few reports from Google Webmaster Tools. Not only did they add a Mobile Usability item under the Search mobile Traffic section, but they also sent out mobile emails with the subject Fix mobile usability mobile issues found on <website>. Obviously, Google is bringing mobile-friendliness under the website owner’s attention.    So we thought it would be a good idea to explain what you should pay attention to and what we think you should be doing to prepare yourself for the update on April 21st.",
  keyword: "mobile",
  queue: ["keywordDensity"]
};

describe("A keyword density test with a high-density occurence of the keyword", () => {
  it("returns keyword density - high", () => {
    const textAnalyzerDensity = buildAnalyzer(keywordArgs2);
    const result = textAnalyzerDensity.keywordDensity();
    expect(result[0].result).to.contain(5.5);
  });
});

const keywordArgs3 = {
  text: "Last month, Google mobile actually announced a mobile change in their algorithm before it had already happened. In this post they mention that starting April 21st mobile-friendliness will become a ranking factor more and more.    In the past few weeks we’ve been getting quite a few reports from Google Webmaster Tools. Not only did they add a Mobile Usability item under the Search mobile Traffic section, but they also sent out mobile emails with the subject Fix mobile usability mobile issues found on <website>. Obviously, Google is bringing mobile-friendliness under the website owner’s attention.    So we thought it would be a good idea to explain what you should pay attention to and what we think you should be doing to prepare yourself for the update on April 21st.",
  keyword: "potato",
  queue: ["keywordDensity"]
};

describe("A keyword density test where there are no matching keywords", () => {
  it("returns keyword density - none ", () => {
    const textAnalyzerDensity = buildAnalyzer(keywordArgs3);
    const result = textAnalyzerDensity.keywordDensity();
    expect(result[0].result).to.contain(0);
  });
});

const keywordArgs4 = {
  text: "Last month, Google mobile actually announced a mobile change in their ",
  keyword: "potato",
  queue: ["keywordDensity"]
};

describe("A keyword density test with a string shorter than 100 words", () => {
  it("returns keyword density - < 100", () => {
    const textAnalyzer = buildAnalyzer(keywordArgs4);
    const result = textAnalyzer.keywordDensity();
    expect(result).to.equal(undefined);
  });
});

const keywordArgs5 = {
  text: "Last month, Google mobile actually announced a mobile change in their algorithm before it had already happened. In this post they mention that starting April 21st mobile-friendliness will become a ranking factor more and more.    In the past few weeks we’ve been getting quite a few reports from Google Webmaster Tools. Not only did they add a Mobile Usability item under the Search mobile Traffic section, but they also sent out mobile emails with the subject Fix mobile usability mobile issues found on <website>. Obviously, Google is bringing mobile-friendliness under the website owner’s attention.    So we thought it would be a good idea to explain what you should pay attention to and what we think you should be doing to prepare yourself for the update on April 21st.",
  keyword: "month",
  queue: ["keywordDensity"]
};

describe("A keyword density test with a low occurence of the keyword", () => {
  it("returns keyword density - low ", () => {
    const textAnalyzer = buildAnalyzer(keywordArgs5);
    textAnalyzer.runQueue();

  });
});

const keywordArgs6 = {
  text: "Last month, Google mobile actually announced a mobile change in their algorithm before it had already happened. In this post they mention that starting April 21st mobile-friendliness will become a ranking factor more and more.    In the past few weeks we’ve been getting quite a few reports from Google Webmaster Tools. Not only did they add a Mobile Usability item under the Search mobile Traffic section, but they also sent out mobile emails with the subject Fix mobile usability mobile issues found on <website>. Obviously, Google is bringing mobile-friendliness under the website owner’s attention.    So we thought it would be a good idea to explain what you should pay attention to and what we think you should be doing to prepare yourself for the update on April 21st.",
  keyword: "<i>mobile</i>",
  queue: ["keywordDensity"]
};

describe("A keyword density test with a high-density occurence of the keyword, where the keyword has htmltags.", () => {
  it("returns keyword density - high", () => {
    const textAnalyzerDensity = buildAnalyzer(keywordArgs6);
    const result = textAnalyzerDensity.keywordDensity();
    expect(result[0].result).to.contain(5.5);
  });
});

const keywordArgs7 = {
  text: "focus&nbsp;keyword a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a" +
  " a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a",
  keyword: "focus keyword",
  queue: ["keywordDensity"]
};

describe("A keyword density test with &nbsp;", () => {
  it("it should match &nbsp; with an actual space", () => {
    const analyzer = buildAnalyzer(keywordArgs7);
    const result = analyzer.keywordDensity();

    expect(result[0].result).to.contain(1.0);
  });
});

const keywordArgs8 = {
  text: "Тест текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто testText проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто Тест текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто testText проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто Test текст, чтобы проверить нечто",
  keyword: "нечто"
};

describe("A keyword density test with Arabic language", () => {
  it("should match keyword in the text", () => {
    const analyzer = buildAnalyzer(keywordArgs8);
    const result = analyzer.keywordDensity();

    expect(result[0].result).to.contain(20.7);
  });
});

const keywordArgs9 = {
  text: "Key'word ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non turpis mattis mi malesuada commodo sed sed ipsum. Curabitur nec mi dui. Sed sit amet eros rhoncus, fringilla nulla eget, fermentum nisi. Praesent lacinia purus ac lacus consectetur tincidunt id auctor enim. Quisque nec odio scelerisque, viverra ipsum nec, molestie mauris. Aliquam sed ultricies lorem, sit amet dictum diam. Fusce vel ullamcorper felis, eget accumsan erat. Quisque eu mattis magna, vel sodales nulla. Phasellus iaculis leo non sapien auctor commodo. Aliquam tincidunt, nisl eget scelerisque luctus, ex ipsum diam scelerisque felis, vitae commodo justo arcu vitae sem. Proin maximus odio sed.",
  keyword: "Key'word"
};

describe("A text matching the keyword when it has an ' in it", () => {
  it("should match keyword in the text", () => {
    const analyzer = buildAnalyzer(keywordArgs9);
    const result = analyzer.keywordDensity();

    expect(result[0].result).to.contain(1.0);
  });
});
