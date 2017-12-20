const OBJECT_STRING = Object.toString();

module.exports = function copy(target) {
  if (! target || typeof target !== 'object') {
    return target;
  }
  else if (Array.isArray(target)) {
    return target.map(copy);
  }
  else if (typeof target === 'object' && target.constructor.toString() === OBJECT_STRING) {
    return Object.getOwnPropertyNames(target)
    .reduce(function (result, name){
      result[name] = copy(target[name]);
      return result;
    }, {});
  }
  else {
    return target;
  }
};
