function Team(name, infos, count, color) {
  var agents = [];

  function init() {
    _.each(infos, function(info)  {
      var agentCount = Math.round(info.ratio*count);
      var agentClass = info.agent;
      _.times(agentCount, function() {
        agents.push(new agentClass(name, color));
      });
    });
  }

  function getAgents() {
    return agents;
  }

  function getName() {
    return name;
  }

  init();

  return {
    getName: getName,
    getAgents: getAgents
  };
}
