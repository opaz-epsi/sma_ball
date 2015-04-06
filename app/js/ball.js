function Ball(physics) {
  var BALL_RADIUS = 10;
  var BALL_COLOR = 0x000000;

  var agent = new Agent("Ball", 20,  BALL_COLOR);
  
  var constraints = [];

  function registerConstraint(constraint) {
    constraints.push(constraint);
  }

  function removeAllConstraints() {
    _.each(constraints, function(constraint) {
      physics.removeConstraint(constraint);
    });
    constraints = [];
  }

  var delay = 0;
  function update(deltaTime) {
    agent.update(deltaTime);
    delay -= deltaTime;
    if(delay <= 0) {
      removeAllConstraints();
      delay = 1000; 
    }
  }

  return extend(agent, {
    update: update,
    registerConstraint: registerConstraint,
    removeAllConstraints: removeAllConstraints
  });
}
