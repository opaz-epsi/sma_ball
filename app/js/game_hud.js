function GameHud(team1, team2) {
  var container = new PIXI.DisplayObjectContainer();
  var scoreText = new PIXI.Text("");

  var scores = {};
  scores[team1] = 0;
  scores[team2] = 0;

  container.addChild(scoreText);

  function addTo(parent) {
    parent.addChild(container);
  }

  function updateScoreText() {
    scoreText.setText(team1 + " [" + scores[team1] + " - " + scores[team2] + "] " + team2);
  }

  function addGoal(team) {
    scores[team] += 1;
    updateScoreText();
  }

  updateScoreText();

  return {
    addTo: addTo,
    addGoal: addGoal
  };
}
