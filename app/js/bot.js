function Bot() {
  var BOT_RADIUS = 2;
  var BOT_COLOR = 0x000000;

  var agent = new Agent("Bot", BOT_RADIUS, BOT_COLOR);

  var delay = 0;

  function addRandomVelocity() {
    Matter.Body.setVelocity(agent.getBody(), 
                            { x:-10+Math.random() * 20,
                              y:-10+Math.random() * 20});
  }

  var resourceConstraint = null;
  function handleCollision(collided, physicsHelper) {
    if(collided.type === "Resource") {
      if(!resourceConstraint) {
        resourceConstraint = physicsHelper.attachAgents(agent, collided, 1);
      } else {
        physicsHelper.detachAgents(resourceConstraint);
        resourceConstraint = null;
      }
      delay = 0;
    }
  }

  function update(timestamp) {
    agent.update(timestamp);
    delay -= timestamp;
    if(delay <= 0) {
      addRandomVelocity();
      delay = 2000 * Math.random() + 500;
    }
  }

  return extend(agent, {
    update: update,
    handleCollision: handleCollision
 });
}
