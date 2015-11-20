require('./arrays');
require('./functions');
require('./globals');
require('./objects');

//
// Extend m.request to make it behave more like a promise.
// This change is in the next version of mithril.
//
var m = require('mithril');

var original = m.request;
m.request = function () {
  var result = original.apply(m, arguments);
  result.catch = result.then.bind(result, null);
  return result;
}
