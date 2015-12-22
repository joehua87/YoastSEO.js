import buildAnalyzer from './helpers/i18n';
import { expect } from 'chai';

const imgArgs = {
  text: "Lorem ipsum dolor sit amet, <a href='http://yoast.com'>consectetur</a> adipiscing elit. <a href='http://google.com'>urabitur aliquet</a> vel ipsum non feugiat. Aenean purus turpis, rhoncus a vestibulum at, ornare et enim. <img src='http://domein.tld/plaatje.jpg' alt='Donec' /> et imperdiet sem. Mauris in efficitur odio, sit amet aliquam eros. <a href='ftp://Morbi.com'>suscipit</a>, leo tincidunt malesuada rhoncus, odio sem ornare erat, sed aliquet magna odio sed lectus. Quisque tempus iaculis enim, in dignissim diam elementum sit amet. Proin elit augue, constius sed diam sed, iaculis constius risus. Morbi fringilla eleifend gravida.Integer nec magna ex. <a href='http://Suspendisse.nl' target='blank'>ornare</a> ultrices tellus, sit amet consequat libero faucibus a. <img src='http://Lorem.jpg' /> ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt, orci eu lacinia maximus, ex arcu ultricies turpis, elementum feugiat est neque eget risus. Nam pulvinar sagittis arcu vitae <a href='http://yoast.com' rel='nofollow'>iaculis.</a> In leo augue, congue sit amet molestie eget, aliquet vitae tellus. Suspendisse at nisl a velit eleifend posuere. Nulla vulputate, lorem sit amet facilisis condimentum, eros orci vulputate urna, vitae ullamcorper elit velit et lectus. <img src='http://' alt='' />Sed accumsan magna et ultrices tempor. Vivamus euismod mi <a href='http://example.com' rel='nofollow'>sed</a> nunc semper dapibus.",
  queue: ["imageCount"],
  keyword: "keyword"
};

describe("a test to extract the images from a given textstring", () => {
  it("returns the number of images found in the textstring", () => {
    const imageAnalyzer = buildAnalyzer(imgArgs);
    const result = imageAnalyzer.imageCount();
    expect(result[0].result.total).to.equal(3);
    expect(result[0].result.alt).to.equal(1);
    expect(result[0].result.noAlt).to.equal(2);

  });
});

const imgArgs2 = {
  text: "<img src='http://plaatje.nl' alt='maïs' />",
  keyword: "maïs"
};

describe("a test to match the keyword in the alt-tag using diacritics", () => {
  it("returns a match with the keyword", () => {
    const imageAnalyzer = buildAnalyzer(imgArgs2);
    const result = imageAnalyzer.imageCount();
    expect(result[0].result.altKeyword).to.equal(1);
  });
});

const imgArgs3 = {
  text: "<img src='http://picture.com' alt='текст' />",
  keyword: "текст"
};

describe("a test to check keywords in alttags", () => {
  it("returns the alttag with keyword", () => {
    const imageAnalyzer = buildAnalyzer(imgArgs3);
    const result = imageAnalyzer.imageCount();
    expect(result[0].result.altKeyword).to.equal(1);
  });
});

const imgArgs4 = {
  text: "<img src='http://image.com/picture' alt='picture' />",
  keyword: "picture"
};

describe("a test to match the keyword in the alt-tag", () => {
  it("returns a match with the keyword", () => {
    const imageAnalyzer = buildAnalyzer(imgArgs4);
    const result = imageAnalyzer.imageCount();
    expect(result[0].result.altKeyword).to.equal(1);
  });
});

const imgArgs5 = {
  text: "<img src='http://image.com/picture' alt='test' />",
  keyword: "picture"
};

describe("a test to match the keyword in the alt-tag", () => {
  it("returns no match with the keyword, it isn't in the alt-tag", () => {
    const imageAnalyzer = buildAnalyzer(imgArgs5);
    const result = imageAnalyzer.imageCount();
    expect(result[0].result.altKeyword).to.equal(0);
  });
});
