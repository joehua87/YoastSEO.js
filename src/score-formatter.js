export default class ScoreFormatter {
  /**
   * defines the variables used for the scoreformatter, runs the outputScore en overallScore
   * functions.
   *
   * @param {YoastSEO.App} args
   * @constructor
   */
  constructor(args) {
    this.scores = args.scores;
    this.overallScore = args.overallScore;
    this.outputTarget = args.outputTarget;
    this.overallTarget = args.overallTarget;
    this.totalScore = 0;
    this.keyword = args.keyword;
    this.i18n = args.i18n;
    this.saveScores = args.saveScores;
  }


  /**
   * Renders the score in the HTML.
   */
  renderScore() {
    this.outputScore();
    this.outputOverallScore();
  }


  /**
   * creates the list for showing the results from the analyzerscorer
   */
  outputScore() {
    this.sortScores();
    const outputTarget = document.getElementById(this.outputTarget);
    outputTarget.innerHTML = "";
    const newList = document.createElement("ul");
    newList.className = "wpseoanalysis";
    for (let i = 0; i < this.scores.length; i++) {
      if (this.scores[i].text !== "") {
        const scoreRating = this.scoreRating(this.scores[i].score);

        const newLI = document.createElement("li");
        newLI.className = "score";
        const scoreSpan = document.createElement("span");
        scoreSpan.className = "wpseo-score-icon " + scoreRating;
        newLI.appendChild(scoreSpan);

        const seoScoreText = this.getSEOScoreText(scoreRating);

        const screenReaderDiv = document.createElement("span");
        screenReaderDiv.className = "screen-reader-text";
        screenReaderDiv.textContent = seoScoreText;

        newLI.appendChild(screenReaderDiv);
        const textSpan = document.createElement("span");
        textSpan.className = "wpseo-score-text";
        textSpan.innerHTML = this.scores[i].text;
        newLI.appendChild(textSpan);
        newList.appendChild(newLI);
      }
    }
    outputTarget.appendChild(newList);
  }


  /**
   * sorts the scores array on ascending scores
   */
  sortScores() {
    this.scores = this.scores.sort((a, b) => {
      return a.score - b.score;
    });
  }


  /**
   * outputs the overallScore in the overallTarget element.
   */
  outputOverallScore() {
    const overallTarget = document.getElementById(this.overallTarget);

    if (overallTarget) {
      overallTarget.className = "overallScore " + this.overallScoreRating(Math.round(this.overallScore));
      if (this.keyword === "") {
        overallTarget.className = "overallScore " + this.overallScoreRating("na");
      }
    }

    this.saveScores(this.overallScore);
  }


  /**
   * Retuns a string that is used as a CSSclass, based on the numeric score or the NA string.
   * @param {number|string} score
   * @returns {string} scoreRate
   */
  scoreRating(score) {
    let scoreRate;
    switch (true) {
      case score <= 4:
        scoreRate = "bad";
        break;
      case score > 4 && score <= 7:
        scoreRate = "ok";
        break;
      case score > 7:
        scoreRate = "good";
        break;
      default:
      case score === "na":
        scoreRate = "na";
        break;
    }
    return scoreRate;
  }


  /**
   * Divides the total score by ten and calls the scoreRating function.
   * @param {number|string} score
   * @returns {string} scoreRate
   */
  overallScoreRating(score) {
    let tmp = score;
    if (typeof tmp === "number") {
      tmp = ( tmp / 10 );
    }
    return this.scoreRating(tmp);
  }


  /**
   * Returns a translated score description based on the textual score rating
   *
   * @param {string} scoreRating Textual score rating, can be retrieved with scoreRating from the actual score.
   *
   * @return {string}
   */
  getSEOScoreText(scoreRating) {
    let scoreText = "";

    switch (scoreRating) {
      case "na":
        scoreText = this.i18n.dgettext("js-text-analysis", "No keyword");
        break;

      case "bad":
        scoreText = this.i18n.dgettext("js-text-analysis", "Bad SEO score");
        break;

      case "ok":
        scoreText = this.i18n.dgettext("js-text-analysis", "Ok SEO score");
        break;

      case "good":
        scoreText = this.i18n.dgettext("js-text-analysis", "Good SEO score");
        break;
      default:
        break;
    }

    return scoreText;
  }
}
