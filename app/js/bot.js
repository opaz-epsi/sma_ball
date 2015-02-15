function Bot() {
  var BOT_RADIUS = 2;
  var BOT_COLOR = 0x000000;

  var agent = new Agent("Bot", BOT_RADIUS, BOT_COLOR);

  function update(timestamp) {
    agent.update(timestamp);

  }

  return extend(agent, {
    update: update,

 });
}
