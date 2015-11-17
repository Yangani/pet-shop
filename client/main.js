// Require language extensions BEFORE anything else
require('../ext');
var m = require('mithril');


var PetShopWindow = require('./components/PetShopWindow');

m.route(document.getElementById('app'), '/', {
  '/': PetShopWindow
});
