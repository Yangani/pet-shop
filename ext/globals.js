// Creates a getter function. Useful for mapping over arrays.
// Example use:
//
//   var records = [{ score: 1 }, { score: 50 }, ...]
//   var scores  = users.map(getProp('score'))
//   scores //=> [1, 50, ...]
//
window.getProp = function (propName) {
  return function (obj) { return obj[propName] }
}
