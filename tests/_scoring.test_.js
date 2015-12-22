import buildAnalyzer from './helpers/i18n';
import { expect } from 'chai';


const scoreArgs = {
  text: "<p>One of the speakers at our upcoming <a href='https://yoast.com/conference/'>YoastCon</a> is Marcus Tandler, one of my best friends in the industry. I met Marcus&nbsp;almost at the beginning of my career as an&nbsp;SEO consultant, we’ve since&nbsp;had fun at numerous conferences throughout the world, most notably <a href='http://seoktoberfest.net/' onclick='__gaTracker('send', 'event', 'outbound-article', 'http://seoktoberfest.net/', 'SEOktoberfest');'>SEOktoberfest</a>, which Marcus organizes in his hometown Munich.</p><p>I’m very proud that he’ll be speaking at YoastCon and wanted to show you all, as a warmup, this presentation he gave at TedX Munich, about the (past, present &amp;) future of search:</p><p>At YoastCon, Marcus will <a href='https://yoast.com/conference/program/#marcus-tandler'>talk about the “rise of the machines”</a>: the next big step in search engine ranking. He will explain how Google is now using machine learning and why he thinks links, currently a major factor of the ranking process, will soon become irrelevant.</p>",
  keyword: "about",
  url: "https://yoast.com/keyword-search",
  pageTitle: "the pagetitle",
  meta: "the metadescription of the page",
  queue: ["wordCount", "keywordDensity", "fleschReading", "firstParagraph", "metaDescriptionLength", "metaDescriptionKeyword", "stopwords", "subHeadings", "pageTitleLength", "pageTitleKeyword", "urlKeyword", "urlLength", "urlStopwords", "imageCount", "linkCount"]
};

describe("a test for the scoring function of all functions in the analyzer", () => {
  it("returns scores for all objects", () => {
    const scorer = buildAnalyzer(scoreArgs);
    scorer.runQueue();
    const analyzeScore = scorer.analyzeScorer.__score;
    expect(analyzeScore.length).to.equal(15);
    expect(analyzeScore[0].name).to.equal("wordCount");
    expect(analyzeScore[0].score).to.equal(-10);
    expect(analyzeScore[1].name).to.equal("keywordDensity");
    expect(analyzeScore[1].score).to.equal(9);
    expect(analyzeScore[1].text).to.equal("The keyword density is 1.5%, which is great; the focus keyword was found 2 times.");
    expect(analyzeScore[2].name).to.equal("fleschReading");
    expect(analyzeScore[2].score).to.equal(5);
    //214 syllables
    expect(analyzeScore[2].text).to.equal("The copy scores 48.4 in the <a href='https://yoast.com/flesch-reading-ease-score/' target='new'>Flesch Reading Ease</a> test, which is considered difficult to read. Try to make shorter sentences, using less difficult words to improve readability.");
    expect(analyzeScore[3].name).to.equal("firstParagraph");
    expect(analyzeScore[3].score).to.equal(3);
    expect(analyzeScore[3].text).to.equal("The focus keyword doesn&#39;t appear in the first paragraph of the copy. Make sure the topic is clear immediately.");
    expect(analyzeScore[4].name).to.equal("metaDescriptionLength");
    expect(analyzeScore[4].score).to.equal(6);
    expect(analyzeScore[4].text).to.equal("The meta description is under 120 characters, however up to 156 characters are available.");
    expect(analyzeScore[5].name).to.equal("metaDescriptionKeyword");
    expect(analyzeScore[5].score).to.equal(3);
    expect(analyzeScore[5].text).to.equal("A meta description has been specified, but it does not contain the focus keyword.");
    expect(analyzeScore[6].name).to.equal("stopwordKeywordCount");
    expect(analyzeScore[6].score).to.equal(5);
    expect(analyzeScore[6].text).to.equal("The focus keyword for this page contains one or more <a href='https://en.wikipedia.org/wiki/Stop_words' target='new'>stop words</a>, consider removing them. Found &#39;about&#39;.");
    expect(analyzeScore[7].name).to.equal("subHeadings");
    expect(analyzeScore[7].score).to.equal(7);
    expect(analyzeScore[8].name).to.equal("pageTitleLength");
    expect(analyzeScore[8].score).to.equal(6);
    expect(analyzeScore[8].text).to.equal("The page title contains 13 characters, which is less than the recommended minimum of 40 characters. Use the space to add keyword variations or create compelling call-to-action copy.");
    expect(analyzeScore[9].name).to.equal("pageTitleKeyword");
    expect(analyzeScore[9].score).to.equal(2);
    expect(analyzeScore[9].text).to.equal("The focus keyword &#39;about&#39; does not appear in the page title.");
    expect(analyzeScore[10].name).to.equal("urlKeyword");
    expect(analyzeScore[10].score).to.equal(6);
    expect(analyzeScore[10].text).to.equal("The focus keyword does not appear in the URL for this page. If you decide to rename the URL be sure to check the old URL 301 redirects to the new one!");
    expect(analyzeScore[11].name).to.equal("urlLength");
    expect(analyzeScore[12].name).to.equal("urlStopwords");
    expect(analyzeScore[13].name).to.equal("imageCount");
    expect(analyzeScore[13].score).to.equal(3);
    expect(analyzeScore[13].text).to.equal("No images appear in this page, consider adding some as appropriate.");
    expect(analyzeScore[14].name).to.equal("linkCount");
    expect(analyzeScore[14].score).to.equal(2);
    expect(analyzeScore[14].text).to.equal("You&#39;re linking to another page with the focus keyword you want this page to rank for. Consider changing that if you truly want this page to rank.");
  });
});

const scoreArgs2 = {
  text: "",
  keyword: "",
  meta: "Liquorice sweet roll sesame snaps sweet roll croissant gummies. Chocolate bar gummies icing cake jelly beans. Jelly beans pie soufflé fruitcake pie jelly br", // Meta description with length 156
  queue: ["metaDescriptionLength"]
};
describe("A meta description scoring", () => {
  it("should correctly report maximum length", () => {
    const analyzer = buildAnalyzer(scoreArgs2);
    analyzer.runQueue();
    const score = analyzer.analyzeScorer.__score;

    expect(score[0].text).to.equal("In the specified meta description, consider: How does it compare to the competition? Could it be made more appealing?");
    expect(score[0].score).to.equal(9);
  });
});

const scoreArgs3 = {
  text: "<img src='test123' alt='keyword' /><img src='test321' alt='another-alt' />",
  keyword: "keyword",
  queue: ["imageCount"]
};
describe("A word count scoring", () => {
  it("should correctly report alt tags with keywords", () => {
    const analyzer = buildAnalyzer(scoreArgs3);
    analyzer.runQueue();

    const score = analyzer.analyzeScorer.__score;

    expect(score[0].text).to.equal("The images on this page contain alt tags with the focus keyword.");
    expect(score[0].score).to.equal(9);
  });
});
