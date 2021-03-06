import buildAnalyzer from './helpers/i18n';
import { expect } from 'chai';

const linkArgs = {
  text: "<p><img class='alignright wp-image-320928 size-medium' title='Cornerstone Content' src='https://yoast.com/wp-content/uploads/2011/12/pyramide_cornerstone-250x199.png' alt='' width='250' height='199'>The most common question we answer in our <a title='Website Review' href='https://yoast.com/hire-us/website-review/'>website reviews</a> is <em>“how do I make my site rank for keyword X?”</em>. What most people don’t realize is that they’re asking the wrong question. You see, sites don’t rank: pages rank. If you want to rank for a keyword, you’ll need to determine which page is going to be the page ranking for that keyword.</p><p>Adding that keyword to the title of <em>every</em> page is not going to help. Nor is writing 200 articles about it without one central article to link all those articles to. You need one single page that is the center of the content about that topic. One “hub” page, if you will.</p><p>That page will need to be 100% awesome in all ways. Brian Clark of Copyblogger calls this type of content “cornerstone content” and has written&nbsp;<a href='http://www.copyblogger.com/how-to-create-cornerstone-content-that-google-loves/' onclick='__gaTracker('send', 'event', 'outbound-article', 'http://www.copyblogger.com/how-to-create-cornerstone-content-that-google-loves/', 'an awesome article about it');' target='_blank'>an awesome article about it</a>&nbsp;(a few years ago, already). In fact, go and read Brian’s article, he explains that way better than I can, I’ll wait You’re back? Ok, read on:</p>",
  queue: ["linkCount"]
};

describe("A test to count links in a given text", () => {
  it("link counter for first string", () => {
    const linkAnalyzer = buildAnalyzer(linkArgs);
    const result = linkAnalyzer.linkCount();
    expect(result[0].result.total).to.equal(2);
  });
});

const linkArgs2 = {
  text: "<p><img class='alignright wp-image-320928 size-medium' title='Cornerstone Content' src='https://yoast.com/wp-content/uploads/2011/12/pyramide_cornerstone-250x199.png' alt='' width='250' height='199'>The most common question we answer in our <a title='Website Review' href='https://yoast.com/hire-us/website-review/' rel='nofollow'>website reviews</a> is <em>“how do I make my site rank for keyword X?”</em>. What most people don’t realize is that they’re asking the wrong question. You see, sites don’t rank: pages rank. If you want to rank for a keyword, you’ll need to determine which page is going to be the page ranking for that keyword.</p><p>Adding that keyword to the title of <em>every</em> page is not going to help. Nor is writing 200 articles about it without one central article to link all those articles to. You need one single page that is the center of the content about that topic. One “hub” page, if you will.</p><p>That page will need to be 100% awesome in all ways. Brian Clark of Copyblogger calls this type of content “cornerstone content” and has written&nbsp;<a href='http://www.copyblogger.com/how-to-create-cornerstone-content-that-google-loves/' onclick='__gaTracker('send', 'event', 'outbound-article', 'http://www.copyblogger.com/how-to-create-cornerstone-content-that-google-loves/', 'an awesome article about it');' target='_blank'>an awesome article about it</a>&nbsp;(a few years ago, already). In fact, go and read Brian’s article, he explains that way better than I can, I’ll wait You’re back? Ok, read on:</p>",
  queue: ["linkCount"],
  baseUrl: "yoast.com"
};

const linkArgs3 = {
  text: "Lorem ipsum dolor sit amet, <a href='http://yoast.com'>consectetur</a> adipiscing elit. <a href='http://google.com'>urabitur aliquet</a> vel ipsum non feugiat. Aenean purus turpis, rhoncus a vestibulum at, ornare et enim. Donec et imperdiet sem. Mauris in efficitur odio, sit amet aliquam eros. <a href='ftp://Morbi.com'>suscipit</a>, leo tincidunt malesuada rhoncus, odio sem ornare erat, sed aliquet magna odio sed lectus. Quisque tempus iaculis enim, in dignissim diam elementum sit amet. Proin elit augue, constius sed diam sed, iaculis constius risus. Morbi fringilla eleifend gravida.Integer nec magna ex. <a href='http://Suspendisse.nl' target='blank'>ornare</a> ultrices tellus, sit amet consequat libero faucibus a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt, orci eu lacinia maximus, ex arcu ultricies turpis, elementum feugiat est neque eget risus. Nam pulvinar sagittis arcu vitae <a href='http://yoast.com' rel='nofollow'>iaculis.</a> In leo augue, congue sit amet molestie eget, aliquet vitae tellus. Suspendisse at nisl a velit eleifend posuere. Nulla vulputate, lorem sit amet facilisis condimentum, eros orci vulputate urna, vitae ullamcorper elit velit et lectus. Sed accumsan magna et ultrices tempor. Vivamus euismod mi <a href='http://example.com' rel='nofollow'>sed</a> nunc semper dapibus.",
  queue: ["linkCount"],
  baseUrl: "yoast.com"
};

describe("A test to determine the type of links in a given text", () => {
  it("link types from first string", () => {
    const linkAnalyzer2 = buildAnalyzer(linkArgs2);
    const result = linkAnalyzer2.linkCount();
    expect(result[0].result.internalNofollow).to.equal(1);
    expect(result[0].result.externalDofollow).to.equal(1);
  });
  it("link types from text with different types of links", () => {
    const linkAnalyzer3 = buildAnalyzer(linkArgs3);
    const result = linkAnalyzer3.linkCount();
    expect(result[0].result.total).to.equal(6);
    expect(result[0].result.internalNofollow).to.equal(1);
    expect(result[0].result.internalDofollow).to.equal(1);
    expect(result[0].result.internalTotal).to.equal(2);
    expect(result[0].result.externalTotal).to.equal(3);
    expect(result[0].result.externalNofollow).to.equal(1);
    expect(result[0].result.externalDofollow).to.equal(2);
    expect(result[0].result.otherTotal).to.equal(1);
  });
});

const linkArgs4 = {
  text: "<p><img class='alignright wp-image-320928 size-medium' title='Cornerstone Content' src='https://yoast.com/wp-content/uploads/2011/12/pyramide_cornerstone-250x199.png' alt='' width='250' height='199'>The most common question we answer in our <a title='Website Review' href='https://yoast.com/hire-us/website-review/' rel='nofollow'>website reviews</a> is <em>“how do I make my site rank for keyword X?”</em>. What most people don’t realize is that they’re asking the wrong question. You see, sites don’t rank: pages rank. If you want to rank for a keyword, you’ll need to determine which page is going to be the page ranking for that keyword.</p><p>Adding that keyword to the title of <em>every</em> page is not going to help. Nor is writing 200 articles about it without one central article to link all those articles to. You need one single page that is the center of the content about that topic. One “hub” page, if you will.</p><p>That page will need to be 100% awesome in all ways. Brian Clark of Copyblogger calls this type of content “cornerstone content” and has written&nbsp;<a href='http://www.copyblogger.com/how-to-create-cornerstone-content-that-google-loves/' onclick='__gaTracker('send', 'event', 'outbound-article', 'http://www.copyblogger.com/how-to-create-cornerstone-content-that-google-loves/', 'an awesome article about it');' target='_blank'>an awesome article about it</a>&nbsp;(a few years ago, already). In fact, go and read Brian’s article, he explains that way better than I can, I’ll wait You’re back? Ok, read on:</p>",
  queue: ["linkCount"]
};

describe("A test to check links in a given text, without an URL in the config", () => {
  it("returns only external links", () => {
    const linkAnalyzer4 = buildAnalyzer(linkArgs4);
    const result = linkAnalyzer4.linkCount();
    expect(result[0].result.total).to.equal(2);
    expect(result[0].result.externalTotal).to.equal(2);
    expect(result[0].result.internalTotal).to.equal(0);
  });
});

const linkArgs5 = {
  text: "<p>The most common question we answer in our <a title='Website Review' href='https://yoast.com/hire-us/website-review/' rel='nofollow'> <img class='alignright wp-image-320928 size-medium' title='Cornerstone Content' src='https://yoast.com/wp-content/uploads/2011/12/pyramide_cornerstone-250x199.png' alt='keyword' width='250' height='199'> website reviews</a> is <em>“how do I make my site rank for keyword X?”</em>. What most people don’t realize is that they’re asking the wrong question. You see, sites don’t rank: pages rank. If you want to rank for a keyword, you’ll need to determine which page is going to be the page ranking for that keyword.</p><p>Adding that keyword to the title of <em>every</em> page is not going to help. Nor is writing 200 articles about it without one central article to link all those articles to. You need one single page that is the center of the content about that topic. One “hub” page, if you will.</p><p>That page will need to be 100% awesome in all ways. Brian Clark of Copyblogger calls this type of content “cornerstone content” and has written&nbsp;&nbsp;(a few years ago, already). In fact, go and read Brian’s article, he explains that way better than I can, I’ll wait You’re back? Ok, read on:</p>",
  queue: ["linkCount"],
  keyword: "keyword"

};

describe("A test to check for the keyword in the URL with an image. ", () => {
  it("should not report the keyword found in the link, since it is not used in the href, only in the alt-tag of the enclosed image", () => {
    const linkAnalyzer5 = buildAnalyzer(linkArgs5);
    const result = linkAnalyzer5.linkCount();
    expect(result[0].result.totalKeyword).to.equal(0);
  });
});

const linkArgs6 = {
  text: "<p><a href='https://keyword-linkje.com'>keyword</a> text with keyword link, should match, since the keyword is separated with a -</p>",
  queue: ["linkCount"],
  keyword: "keyword"
};

describe("A test to check for the keyword in the URL", () => {
  it("should match the keyword, since it is found in the href", () => {
    const linkAnalyzer6 = buildAnalyzer(linkArgs6);
    const result = linkAnalyzer6.linkCount();
    expect(result[0].result.totalKeyword).to.equal(1);
  });
});

const linkArgs7 = {
  text: "<p><a>keyword</a> text with keyword link, should match</p>",
  queue: ["linkCount"],
  keyword: "keyword"
};

describe("A test to check for errors", () => {
  it("should not fail the test, but return 1 since the keyword is in the textnode", () => {
    const linkAnalyzer7 = buildAnalyzer(linkArgs7);
    const result = linkAnalyzer7.linkCount();
    expect(result[0].result.totalKeyword).to.equal(1);
  });
});

const linkArgs8 = {
  text: "<p><a href='https://keywordlinkje.com'>keyword</a> text with keyword link, should not match, since the keyword is part of the total link</p>",
  queue: ["linkCount"],
  keyword: "keyword"
};

describe("A test to check for the keyword in the URL", () => {
  it("should match the keyword, since it is found in the href", () => {
    const linkAnalyzer6 = buildAnalyzer(linkArgs8);
    const result = linkAnalyzer6.linkCount();
    expect(result[0].result.totalKeyword).to.equal(1);
  });
});