# YoastSEO.js
* View the original docs at https://github.com/Yoast/YoastSEO.js

## Done
* Rewrite with ES6 (with babel and eslint)
* Tests with Mocha

## TODO
* Fix Test Errors: _scoring.test_.js
```
a test for the scoring function of all functions in the analyzer returns scores for all objects:
 AssertionError: expected 'The copy scores 45.2 in the <a href=\'https://yoast.com/flesch-reading-ease-score/\' target=\'new\'>Flesch Reading Ease</a> test, which is considered difficult to read. Try to make shorter sentences, using less difficult words to improve readability.' to equal 'The copy scores 48.4 in the <a href=\'https://yoast.com/flesch-reading-ease-score/\' target=\'new\'>Flesch Reading Ease</a> test, which is considered difficult to read. Try to make shorter sentences, using less difficult words to improve readability.'
      + expected - actual

      -The copy scores 45.2 in the <a href='https://yoast.com/flesch-reading-ease-score/' target='new'>Flesch Reading Ease</a> test, which is considered difficult to read. Try to make shorter sentences, using less difficult words to improve readability.
      +The copy scores 48.4 in the <a href='https://yoast.com/flesch-reading-ease-score/' target='new'>Flesch Reading Ease</a> test, which is considered difficult to read. Try to make shorter sentences, using less difficult words to improve readability.

```
* Pass EsLint Rules
* Remove Jed
* Build UI with React + Redux Universal (https://github.com/erikras/react-redux-universal-hot-example)
