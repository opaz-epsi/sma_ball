function Agent(type, radius, color) {

  var body = Matter.Bodies.circle(0, 0, radius, {density: 1, friction:0, restitution:0.5, mass:1});

  var sprite = new PIXI.Graphics();
  sprite.beginFill(color);
  sprite.drawCircle(0,0, radius);
  sprite.endFill();

  var physicsHelper = null;
  
  function setPhysicsHelper(helper) {
    physicsHelper = helper;
  }
  function getPhysicsHelper() {
    return physicsHelper;
  }

  function getBody() {
    return body;
  }

  function setPosition(position) {
      Matter.Body.setPosition(getBody(), position);
  }

  function getPosition() {
    return getBody().position;
  }

  function update (timestamp) {
    sprite.x = getBody().position.x;
    sprite.y = getBody().position.y;
  }

  function handleCollision(collided) {
  }

  function handlePerception(perceived) {
  }

  return extend(null, {
    type:   type,
    sprite: sprite,

    getBody: getBody,

    setPhysicsHelper: setPhysicsHelper,
    getPhysicsHelper: getPhysicsHelper,

    setPosition: setPosition,
    getPosition: getPosition,

    handleCollision: handleCollision,
    handlePerception: handlePerception,

    update: update
  });
}
