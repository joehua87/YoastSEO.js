import StringHelper from '../src/string-helper';
import { expect } from 'chai';

const stringhelperArgs = {
  words: ['a', 'abc', 'abcdef'],
  textString: 'abc'
};

describe('a test to match a word in a string', () => {
  it(`should match 'abc'`, () => {
    const stringHelper = new StringHelper();
    const regex = stringHelper.stringToRegex(stringhelperArgs.words);

    const result = stringhelperArgs.textString.match(regex);
    expect(result[0]).to.equal('abc');
  });
});
