function Resource() {
  var RESOURCE_RADIUS = 4;
  var RESOURCE_COLOR = 0xFF0000;
  
  var agent = new Agent("Resource", RESOURCE_RADIUS, RESOURCE_COLOR);
/*
  var attached = [];
  function handleCollision(collided, physicsHelper) {
    if(collided.type === "Resource") {
        if(!_.contains(attached, collided)) {
          physicsHelper.attachAgents(agent, collided, 0.01);
          attached.push(collided);
        }
    }
  }*/

  return extend(agent, {
   // handleCollision: handleCollision
  });
}

