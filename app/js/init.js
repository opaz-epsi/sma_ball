function init () {
  var canvasElement = document.querySelector("#canvas");

  var stage = new PIXI.Stage(0xcccccc);
  var renderer = new PIXI.autoDetectRenderer(800,600, canvasElement);

  var world = new World();

  _.times(100, function() {
    _.tap(new Bot(), function(bot) {
      world.add(bot);
      world.setRandomPosition(bot);
    });
  });

  _.times(100, function() {
    _.tap(new Resource(), function(resource) {
        world.add(resource);
        world.setRandomPosition(resource);
    });
  });

  stage.addChild(world.sprite);

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
