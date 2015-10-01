var m = require('mithril')
var Shop = require('../models/shop')


var PetShopWindow = module.exports = {}

PetShopWindow.controller = function () {
  var ctrl = this
  ctrl.shop = null
  Shop.fetch().then(function(shopData) {
    ctrl.shop = shopData
  })
}

PetShopWindow.view = function (ctrl) {
  return m('.pet-shop', [
    m('h1', "Welcome to " + ctrl.shop.name)
  ])
}
