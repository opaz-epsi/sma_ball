function Physics(width, height, wallThickness) {

  var bodies = [];

  var engine = Matter.Engine.create({
    renderer: Matter.RenderPixi,
    world: {gravity: {x:0, y:0}}
  });

  function addBody(body) {
    Matter.World.add(engine.world, [body]);
    bodies.push(body);
  }

  function removeBody(body) {
    Matter.World.remove(engine.world, [body]);
  }

  function addConstraint(constraint) {
    Matter.World.addConstraint(engine.world, constraint);
  }

  function removeConstraint(constraint) {
    Matter.World.removeConstraint(engine.world, constraint);
  }

  function collisions() {
  	return Matter.Detector.bruteForce(bodies, engine);
  }

  function patchPositions() {
    _.each(bodies, function(body) {
      patchBodyPosition(body);
    });	
  }

  function patchBodyPosition(body) {
        Matter.Body.translate(body, {
          x: body.position.x < wallThickness  ? wallThickness - body.position.x
                                              : body.position.x > width - wallThickness ? width - wallThickness - body.position.x
                                                                                        : 0,
          y: body.position.y < wallThickness  ? wallThickness - body.position.y
                                              : body.position.y > height - wallThickness ? height - wallThickness - body.position.y
                                                                                        : 0
        });
  }


  function update(deltaTime) {
    Matter.Engine.update(engine, deltaTime);
  }

  return extend(null, {
      addBody: addBody,
      removeBody: removeBody,
      addConstraint: addConstraint,
      removeConstraint: removeConstraint,

      update: update,
      collisions: collisions,
      patchPositions:  patchPositions
  });
}
