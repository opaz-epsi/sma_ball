function extend(parent, child) {
  if(parent) {
    return Object.freeze(_.extend({}, parent, child));
  } else {
    return Object.freeze(child);
  }
}
