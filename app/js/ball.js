function Ball(physics) {
  var BALL_RADIUS = 10;
  var BALL_COLOR = 0x000000;

  var agent = new Agent("Ball", 20,  BALL_COLOR);
  
  var delay = 0;
  var constraints = [];

  function registerConstraint(constraint) {
    constraints.push(constraint);
    startDelay();
  }

  function startDelay() {
    if(delayFinished()) {
      delay = 1000;
    }
  }

  function delayFinished() {
    return delay <= 0;
  }

  function resetDelay() {
    delay = 0;
  }

  function removeAllConstraints() {
    _.each(constraints, function(constraint) {
      physics.removeConstraint(constraint);
    });
    constraints = [];
  }

  function update(deltaTime) {
    agent.update(deltaTime);
    if(constraints.length > 0) {
      delay -= deltaTime;
      if(delayFinished()) {
        removeAllConstraints();
        resetDelay(); 
      }
    }
  }

  resetDelay();
  
  return extend(agent, {
    update: update,
    registerConstraint: registerConstraint,
    removeAllConstraints: removeAllConstraints
  });
}
