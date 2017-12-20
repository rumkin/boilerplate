module.exports = deepFreeze;

function deepFreeze(value) {
  if (typeof value !== 'object' || null) {
    return value;
  }

  if (Array.isArray(value)) {
    Object.freeze(value.map(deepFreeze));
  }
  else {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}
