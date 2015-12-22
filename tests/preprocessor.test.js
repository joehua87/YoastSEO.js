import PreProcessor from '../src/preprecessor';
import { expect } from 'chai';

const preprocArgs = {
  testString: "<h1>Dit is een</h1> <h2>standaard</h2>- TEKST <ul><li>test1</li><li>test2</li><li>test3</li><li>test4</li></ul>met VEEL caps, spaties, <h6>tekens</h6> en andere overbodige meuk!?'...; <img src='http:// linknaarplaatje' alt='mooiplaatje' />Het aantal Woorden<br><br> is negentien"
};

const expectedOutput = {
  cleanText: "<h1>dit is een</h1> <h2>standaard</h2>- tekst <ul><li>test1</li><li>test2</li><li>test3</li><li>test4</li></ul>met veel caps, spaties, <h6>tekens</h6> en andere overbodige meuk. '. ; <img src='http:// linknaarplaatje' alt='mooiplaatje' />het aantal woorden<br><br> is negentien.",
  cleanTextSomeTags: "<h1>dit is een</h1> <h2>standaard</h2>- tekst <li>test1</li><li>test2</li><li>test3</li><li>test4</li> met veel caps, spaties, <h6>tekens</h6> en andere overbodige meuk. '. ; het aantal woorden is negentien.",
  cleanTextNoTags: "dit is een standaard - tekst test1 test2 test3 test4 met veel caps, spaties, tekens en andere overbodige meuk. '. ; het aantal woorden is negentien."
};

describe("Test for the preprocessor that formats text for the analyzer", () => {
  const preproc = new PreProcessor(preprocArgs.testString);
  it("returns processed clean text", () => {
    expect(preproc.__store.cleanText).to.equal(expectedOutput.cleanText);
  });
  it("returns processed notags text", () => {
    expect(preproc.__store.cleanTextNoTags).to.equal(expectedOutput.cleanTextNoTags);
  });
  it("returns processed sometags text", () => {
    expect(preproc.__store.cleanTextSomeTags).to.equal(expectedOutput.cleanTextSomeTags);
  });
});

// Test for wordcount if sentence ends with a tag.
it("return 1 word if there is one word", () => {
  const preProcessor = new PreProcessor('<p>word</p>');

  expect(preProcessor.__store.wordcountNoTags).to.equal(1);
});

// Test for wordcount if sentence has lots of spaces
it("return 1 word if there is one word, despite spaces", () => {
  const preProcessor = new PreProcessor('word               .');

  expect(preProcessor.__store.wordcountNoTags).to.equal(1);
});
