function Bot(teamName, color) {
  var BOT_RADIUS = 2;
  var BOT_COLOR = color;

  var agent = new Agent("Bot", BOT_RADIUS, BOT_COLOR);

  var delay = 0;
  var targetResource = null;
  var resourceConstraint = null;
  var collidedResource = null;

  var expertSystem = new ExpertSystem();
  expertSystem.addRule(["Time to move", "Saw resource", "20%"],   "Move to resource");
  expertSystem.addRule(["Time to move"],                          "Move random");
  expertSystem.addRule(["No resource", "Touched resource"],       "Grab resource");
  expertSystem.addRule(["Has resource", "Touched resource"],      "Release resource");

  function perceive() {
    var perceived = [];
    if(delay <= 0)              { perceived.push("Time to move"); }
    if(!resourceConstraint)     { perceived.push("No resource"); }
    if(resourceConstraint)      { perceived.push("Has resource"); }
    if(collidedResource)        { perceived.push("Touched resource"); }
    if(targetResource)          { perceived.push("Saw resource"); }
    if(Math.random() > 0.2)     { perceived.push("20%"); }

    return perceived;
  }
  
  function analyze(facts) {
    expertSystem.resetFacts();
    _.each(facts, function(f) {
      expertSystem.setFactValue(f, true);
    });

    var infered = expertSystem.infer();
    if(infered.length > 0) {
      return infered[0];
    }
    return null;
  }
  
  function act(fact) {
    switch(fact) {
      case "Grab resource":
        grabResource(collidedResource);  
        return;
      case "Release resource":
        releaseResource();
        return;
      case "Move random":
        addRandomVelocity();  
        return;
      case "Move to resource":
        goToAgent(targetResource);
        return;
    }
  }

  function addRandomVelocity() {
    Matter.Body.setVelocity(agent.getBody(), 
                            { x:-10+Math.random() * 20,
                              y:-10+Math.random() * 20});
  }

  function grabResource(resource) {
    resourceConstraint = agent.getPhysicsHelper().attachAgents(agent, resource, 1);
  }

  function releaseResource() {
    agent.getPhysicsHelper().detachAgents(resourceConstraint);
    resourceConstraint = null;
  }

  function handleCollision(collided) {
    if(collided.type === "Resource") {
      collidedResource = collided;
    }
  }

  function handlePerception(perceived) {
    if(perceived.type === "Resource") {
      if(perceived !== targetResource && !resourceConstraint) {
        targetResource = perceived;
      }
    }
  }

  function goToAgent(target) {
	    Matter.Body.setVelocity(agent.getBody(), 
                        { x:(target.getPosition().x - agent.getPosition().x)/10,
                          y:(target.getPosition().y - agent.getPosition().y)/10});
  }

  function updateTime(timestamp) {
    delay -= timestamp;
  }

  function update(timestamp) {
    agent.update(timestamp);
    updateTime(timestamp);
    
    act(analyze(perceive()));
    
    postUpdate();
  }

  function postUpdate() {
    if(delay <= 0) {
      delay = Math.random() * 500 + 1000;
    }
    collidedResource = null;
  }

  function getTeam() {
    return team;
  }

  return extend(agent, {
    update: update,
    handleCollision: handleCollision,
    handlePerception: handlePerception,
    getTeam: getTeam
  });
}
