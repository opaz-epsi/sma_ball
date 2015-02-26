function ExpertSystem() {

  var factBase = [];
  var ruleBase = [];

  function addFact(label) {
    factBase[label] = null;
    return label;
  }

  function getFactValue(label) {
    return factBase[label];
  }

  function getFactsCount() {
    return Object.keys(factBase).length;
  }

  function setFactValue(label, value) {
    return factBase[label] = value;
  }

  function isTrue(label) {
    return getFactValue(label);
  }

  function isFalse(label) {
    return !getFactValue(label);
  }

  function setTrue(label) {
    return setFactValue(label, true); 
  }

  function resetFacts() {
    _.each(Object.keys(factBase), function(f) {
      factBase[f] = null;
    });
  }

  function addRule(premises, target) {
    _.each(premises, function(label) {
      addFact(label);
    });
    addFact(target);
    ruleBase.push({premises: premises, target: target});
  }

  function isRuleValid(rule) {
    return _.reduce(rule.premises, function(valid, label) {
      return valid && isTrue(label);
    }, true);
  }

  function infer() {
    var infered = _.chain(ruleBase)
                    .filter(function(r) { return isRuleValid(r) && isFalse(r.target); })
                    .map   (function(r) { return setTrue(r.target) && r.target; })
                    .value();
    
    return _.union(infered, infered.length > 0 ? infer() : []);
  }

  function factToAsk() {
    return _.chain(Object.keys(factBase))
            .filter(function(f) { return !_.contains(_.pluck(ruleBase, "target"), f);  })
            .filter(function(f) { return getFactValue(f) === null; })
            .first().value();
  }

  return Object.create({
    factBase: factBase,
    getFactsCount: getFactsCount,
    addFact: addFact,
    getFactValue: getFactValue,
    setFactValue: setFactValue,
    resetFacts: resetFacts,

    ruleBase: ruleBase,
    addRule: addRule,
    isRuleValid: isRuleValid,

    infer: infer,
    factToAsk: factToAsk
  });
}
