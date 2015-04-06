function init () {
  var AGENTS_BY_TEAM = 40;
  var team1 = new Team("team 1", [
    {ratio: 1, agent: Bot }
  ], AGENTS_BY_TEAM, 0xFF0000);
  
  var team2 = new Team("team 2", [
    {ratio: 1, agent: Bot }
  ], AGENTS_BY_TEAM, 0x0000FF);

  var canvasElement = document.querySelector("#canvas");

  var stage = new PIXI.Stage(0xcccccc);
  var renderer = new PIXI.autoDetectRenderer(800,600, canvasElement);

  var hud = new GameHud(team1.getName(), team2.getName());
  var world = new World(team1, team2, hud);

  _.each(team1.getAgents(), function(agent) {
      world.add(agent);
  });

  _.each(team2.getAgents(), function(agent) {
      world.add(agent);
  });

  stage.addChild(world.sprite);

  hud.addTo(stage);

  var prevTimestamp = 0;
  function animate(timestamp) {

    var deltaTime = timestamp - prevTimestamp;
    prevTimestamp += deltaTime;

    world.render(deltaTime);
    renderer.render(stage);

    requestAnimFrame(animate);
  }

  requestAnimFrame(animate);
}
