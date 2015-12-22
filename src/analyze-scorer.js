import { AnalyzerScoring, analyzerScoreRating } from './config/scoring';

/**
 * inits the analyzerscorer used for scoring of the output from the textanalyzer
 *
 * @param {Analyzer} refObj
 * @constructor
 */
export default class AnalyzeScorer {
  constructor(refObj) {
    this.__score = [];
    this.refObj = refObj;
    this.i18n = refObj.config.i18n;
    this.init();
  }


  /**
   * loads the analyzerScoring from the config file.
   */
  init() {
    const scoringConfig = new AnalyzerScoring(this.i18n);
    this.scoring = scoringConfig.analyzerScoring;
  }

  /**
   * Starts the scoring by taking the resultObject from the analyzer. Then runs the scorequeue.
   * @param resultObj
   */
  score(resultObj) {
    this.resultObj = resultObj;
    this.runQueue();
  }

  /**
   * runs the queue and saves the result in the __score-object.
   */
  runQueue() {
    for (let i = 0; i < this.resultObj.length; i++) {
      const subScore = this.genericScore(this.resultObj[i]);
      if (typeof subScore !== "undefined") {
        this.__score = this.__score.concat(subScore);
      }
    }
    this.__totalScore = this.totalScore();
  }

  /**
   * scoring function that returns results based on the resultobj from the analyzer matched with
   * the scorearrays in the scoring config.
   * @param obj
   * @returns {{name: (analyzerScoring.scoreName), score: number, text: string}}
   */
  genericScore(obj) {
    if (typeof obj !== "undefined") {
      const scoreObj = this.scoreLookup(obj.test);

      // defines default score Object.
      const score = {name: scoreObj.scoreName, score: 0, text: ""}
      for (let i = 0; i < scoreObj.scoreArray.length; i++) {
        this.setMatcher(obj, scoreObj, i);
        switch (true) {

          //  if a type is given, the scorer looks for that object in the resultObject to use
          //  for scoring
          case (
            typeof scoreObj.scoreArray[i].type === "string" &&
            this.result[scoreObj.scoreArray[i].type]
          ):
            return this.returnScore(score, scoreObj, i);

          //  looks if the value from the score is below the maximum value
          case (
            typeof scoreObj.scoreArray[i].min === "undefined" &&
            this.matcher <= scoreObj.scoreArray[i].max
          ):
            return this.returnScore(score, scoreObj, i);

          //  looks if the value from the score is above the minimum value
          case (
            typeof scoreObj.scoreArray[i].max === "undefined" &&
            this.matcher >= scoreObj.scoreArray[i].min
          ):
            return this.returnScore(score, scoreObj, i);

          //  looks if the value from the score is between the minimum and maximum value
          case (
            this.matcher >= scoreObj.scoreArray[i].min &&
            this.matcher <= scoreObj.scoreArray[i].max
          ):
            return this.returnScore(score, scoreObj, i);
          default:
            break;
        }
      }
      return score;
    }
  }

  /**
   * sets matcher and resultvariables so the scorefunction can use this.
   * @param obj
   * @param scoreObj
   * @param i
   */
  setMatcher(obj, scoreObj, i) {
    this.matcher = parseFloat(obj.result);
    this.result = obj.result;
    if (typeof scoreObj.scoreArray[i].matcher !== "undefined") {
      this.matcher = parseFloat(this.result[scoreObj.scoreArray[i].matcher]);
    }
  }

  /**
   * finds the scoringobject by scorename for the current result.
   * @param name
   * @returns scoringObject
   */
  scoreLookup(name) {
    for (let ii = 0; ii < this.scoring.length; ii++) {
      if (name === this.scoring[ii].scoreName) {
        return this.scoring[ii];
      }
    }
  }

  /**
   * fills the score with score and text from the scoreArray and runs the textformatter.
   * @param score
   * @param scoreObj
   * @param i
   * @returns scoreObject
   */
  returnScore(score, scoreObj, i) {
    score.score = scoreObj.scoreArray[i].score;
    score.text = this.scoreTextFormat(scoreObj.scoreArray[i], scoreObj.replaceArray);
    return score;
  }

  /**
   * Formats the resulttexts with variables. Uses a value, source, sourceObj or scoreObj for the
   * replacement source replaces the position from the replaceArray with the replacement source.
   * @param scoreObj
   * @param replaceArray
   * @returns formatted resultText
   */
  scoreTextFormat(scoreObj, replaceArray) {
    let replaceWord;
    let resultText = scoreObj.text;
    resultText = this.refObj.stringHelper.escapeHTML(resultText);
    if (typeof replaceArray !== "undefined") {
      for (let i = 0; i < replaceArray.length; i++) {
        switch (true) {
          case ( typeof replaceArray[i].value !== "undefined" ):

            //  gets the value from the replaceArray and replaces it on the given position
            resultText = resultText.replace(
              replaceArray[i].position,
              replaceArray[i].value
            );
            break;
          case ( typeof replaceArray[i].source !== "undefined" ):

            //  gets the source (which is a value of the analyzer) and replaces it on the
            //  given position
            resultText = resultText.replace(
              replaceArray[i].position,
              this.refObj.stringHelper.escapeHTML(this[replaceArray[i].source])
            );
            break;
          case ( typeof replaceArray[i].sourceObj !== "undefined" ):

            //  gets the replaceword (which is a reference to an object in the analyzer) and
            //  replaces is on the given position
            replaceWord = this.parseReplaceWord(replaceArray[i].sourceObj);
            if (typeof replaceArray[i].rawOutput === "undefined" || replaceArray[i].rawOutput !== true) {
              replaceWord = this.refObj.stringHelper.escapeHTML(replaceWord);
            }

            resultText = resultText.replace(replaceArray[i].position, replaceWord);
            break;
          case ( typeof replaceArray[i].scoreObj !== "undefined" ):

            //  gets the replaceword from the scoreObject, to use values from the score in
            //  the textString.
            resultText = resultText.replace(
              replaceArray[i].position,
              this.refObj.stringHelper.escapeHTML(scoreObj[replaceArray[i].scoreObj])
            );
            break;
          default:
            break;
        }
      }
    }
    return resultText;
  }

  /**
   * converts the string to the correct object and returns the string to be used in the text.
   * @param replaceWord
   * @returns {AnalyzeScorer}
   */
  parseReplaceWord(replaceWord) {
    const parts = replaceWord.split(".");
    let source = this;
    for (let i = 1; i < parts.length; i++) {
      source = source[parts[i]];
    }
    return source;
  }

  /**
   * calculates the totalscore, by adding all scores and dividing them by the amount in the score
   * array. Removes unused results that have no score
   * @returns score
   */
  totalScore() {
    let scoreAmount = this.__score.length;
    let totalScore = 0;
    for (let i = 0; i < this.__score.length; i++) {
      if (typeof this.__score[i] !== "undefined" && this.__score[i].text !== "") {
        totalScore += this.__score[i].score;
      } else {
        scoreAmount--;
      }
    }
    const totalAmount = scoreAmount * analyzerScoreRating;
    return Math.round(( totalScore / totalAmount ) * 100);
  }

  /**
   * Returns total score as calculated.
   *
   * @returns {number}
   */
  getTotalScore() {
    return this.__totalScore;
  }

  /**
   * Adds a custom scoring to the analyzer scoring
   *
   * @param {Object} scoring
   * @param {string} scoring.name
   * @param {Object} scoring.scoring
   */
  addScoring(scoring) {
    const scoringObject = scoring.scoring;

    scoringObject.scoreName = scoring.name;

    this.scoring.push(scoringObject);
  }
}
