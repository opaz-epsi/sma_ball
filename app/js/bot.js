function Bot(teamName, color) {
  var BOT_RADIUS = 2;
  var BOT_COLOR = color;

  var agent = new Agent("Bot", BOT_RADIUS, BOT_COLOR);

  var delay = 0;
  var targetBall = null;
  var ballConstraint = null;
  var collidedBall = null;

  var expertSystem = new ExpertSystem();
  expertSystem.addRule(["No ball", "Time to move", "Saw ball", "20%"],   "Move to ball");
  expertSystem.addRule(["No ball", "Time to move"],                      "Move random");
  expertSystem.addRule(["No ball", "Touched ball"],                      "Grab ball");
  //expertSystem.addRule(["Has ball", "Touched ball"],                     "Release ball");

  function perceive() {
    var perceived = [];
    if(delay <= 0)              { perceived.push("Time to move"); }
    if(!ballConstraint)     { perceived.push("No ball"); }
    if(ballConstraint)      { perceived.push("Has ball"); }
    if(collidedBall)        { perceived.push("Touched ball"); }
    if(targetBall)          { perceived.push("Saw ball"); }
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
      case "Grab ball":
        grabBall(collidedBall);  
        return;
      case "Release ball":
        releaseBall();
        return;
      case "Move random":
        addRandomVelocity();  
        return;
      case "Move to ball":
        goToAgent(targetBall);
        return;
    }
  }

  function addRandomVelocity() {
    Matter.Body.setVelocity(agent.getBody(), 
                            { x:-10+Math.random() * 20,
                              y:-10+Math.random() * 20});
  }

  function grabBall(ball) {
    ballConstraint = agent.getPhysicsHelper().attachAgents(agent, ball, 1);
  }

  function releaseBall() {
    agent.getPhysicsHelper().detachAgents(ballConstraint);
    ballConstraint = null;
  }

  function handleCollision(collided) {
    if(collided.type === "Ball") {
      collidedBall = collided;
    }
  }

  function handlePerception(perceived) {
    if(perceived.type === "Ball") {
      if(perceived !== targetBall && !ballConstraint) {
        targetBall = perceived;
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
    collidedBall = null;
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
