function Resource() {
  var RESOURCE_RADIUS = 3;
  var RESOURCE_COLOR = 0xFF0000;
  
  var agent = new Agent("Resource", RESOURCE_RADIUS, RESOURCE_COLOR);

  var attached = [];
  function handleCollision(collided) {
    if(collided.type === "Resource") {
        if(!_.contains(attached, collided)) {
          agent.getPhysicsHelper().attachAgents(agent, collided, 0.1);
          attached.push(collided);
        }
    }
  }

  function update(delta) {
    agent.update(delta);
    if(attached.length > 0) {
      agent.sprite.clear();
      agent.sprite.beginFill(0x0000FF);
      agent.sprite.drawCircle(0,0, RESOURCE_RADIUS);
      agent.sprite.endFill();
    }
  }

  return extend(agent, {
    handleCollision: handleCollision,
    update: update
  });
}

