function World() {

  var WIDTH = 800;
  var HEIGHT = 600;
  var WALL_THICKNESS = 50;

  var agents = [];

  var botsContainer = new PIXI.DisplayObjectContainer();


  var ground    = Matter.Bodies.rectangle(WIDTH/2,
                                          HEIGHT-WALL_THICKNESS/2,
                                          WIDTH,
                                          WALL_THICKNESS,
                                          { isStatic: true });

  var leftWall  = Matter.Bodies.rectangle(WALL_THICKNESS/2,
                                          HEIGHT/2,
                                          WALL_THICKNESS,
                                          HEIGHT,
                                          { isStatic: true });

  var rightWall = Matter.Bodies.rectangle(WIDTH - WALL_THICKNESS/2,
                                          HEIGHT/2,
                                          WALL_THICKNESS,
                                          HEIGHT,
                                          { isStatic: true });

  var topWall   = Matter.Bodies.rectangle(WIDTH/2,
                                          WALL_THICKNESS/2,
                                          WIDTH,
                                          WALL_THICKNESS,
                                          { isStatic: true });


  var physics = new Physics(WIDTH, HEIGHT, WALL_THICKNESS);
  physics.addBody(ground);
  physics.addBody(leftWall);
  physics.addBody(rightWall);
  physics.addBody(topWall);

  var physicsHelper = {
    attachAgents: function (agentA, agentB, stiffness) {
      var constraint = Matter.Constraint.create({bodyA:agentA.getBody(), bodyB:agentB.getBody(), stiffness:stiffness});
      physics.addConstraint(constraint);

      return constraint;
    },
    detachAgents: function (constraint) {
      physics.removeConstraint(constraint);
    }
  };



  function add (agent) {
    agents.push(agent);
    botsContainer.addChild(agent.sprite);
    physics.addBody(agent.getBody());
    agent.getBody().agent = agent;
    agent.setPhysicsHelper(physicsHelper);
  }

  function setRandomPosition(agent) {
    agent.setPosition({x:WALL_THICKNESS + Math.random() * WIDTH - WALL_THICKNESS*2,
                       y:WALL_THICKNESS + Math.random() * HEIGHT - WALL_THICKNESS*2});
  }

  function processPerceptions() {
    _.each(agents, function(agentA){
      _.each(agents, function(agentB) {
        if(perceives(agentA, agentB)) {
          agentA.handlePerception(agentB);
        }
      });
    }); 
  }

  function perceives(agentA, agentB) {
    var distX = agentA.getPosition().x - agentB.getPosition().x;
    var distY = agentA.getPosition().y - agentB.getPosition().y;
    
    var dist =  distX*distX + distY*distY;

    return dist < 100*100;
  }


  function processCollisions() {
    var collisions = physics.collisions();
    _.each(collisions, function(collision) {
      
      var agentA = collision.bodyA.agent;
      var agentB = collision.bodyB.agent;
      if( agentA && agentB) {
        agentA.handleCollision(agentB);
        agentB.handleCollision(agentA);
      }

    });
  }

  function render (deltaTime) {
    agents.forEach(function(agent) {
      agent.update(deltaTime);
    });

    physics.update(deltaTime);
    //physics.patchPositions();
    processCollisions();
    processPerceptions();
  }

  return extend(null, {
    add: add,
    render: render,
    sprite: botsContainer,
    agents: agents,

    setRandomPosition: setRandomPosition
  });
}
