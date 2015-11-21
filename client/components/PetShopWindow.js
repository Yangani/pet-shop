var m = require('mithril');
var Shop = require('../models/shop');

var PetShopWindow = module.exports;

PetShopWindow.controller = function() {
  var ctrl = this;
  ctrl.userName = "Input Username",
  ctrl.userPassword = "Input Password",
  ctrl.apiToken = null;
  ctrl.petId = null;
  ctrl.signedIn = false;

  ctrl.shop = null;
  Shop.fetch().then(function(shopData) {
    ctrl.shop = shopData;
  });

  ctrl.shopPets = null;
  Shop.fetchPets().then(function(petsData){
    ctrl.shopPets = petsData;
  });

  ctrl.signUp = function() {
    console.log('Shop', Shop);
    Shop.signUp(ctrl.userName, ctrl.userPassword);
  };

  ctrl.signIn = function() {
    Shop.signIn(ctrl.userName, ctrl.userPassword)
    .then(function(response){
      ctrl.apiToken = response.apiToken;
      ctrl.signedIn = true;
    });
  }

  ctrl.like = function() {
    Shop.like(ctrl.petId, ctrl.apiToken)
    .then(function(response){
      console.log(response);
    })
  }


}


PetShopWindow.view = function(ctrl) {

  // setTimeout(Shop.fetch
  //             .then(response){return }, 2000);

  return m('fieldset',[
      m('legend', 'User Name:'),
      m('input[type=text]', {
        value: ctrl.userName,
        oninput: function(e) {
          ctrl.userName = e.currentTarget.value;
        }
      }),
      m('input[type=text]', {
        value:ctrl.userPassword,
        oninput: function(e) {
          ctrl.userPassword = e.currentTarget.value;
        }
      }),
      m('button', { onclick: ctrl.signUp }, "Sign Up"),
      m('button', { onclick: ctrl.signIn }, "Sign In"),

        m('.pet-shop', [
          m('h1', "Welcome to " + ctrl.shop.name),
          ctrl.shopPets.map(function(pet){
            return [
                 m('p', 'Name: ' + pet.name),
                 m('p', 'Species: ' + pet.species),
                 m('div', [
                   m('p', 'Likes: ' + pet.likes.length),
                   m('button', { onclick: function() {
                     ctrl.petId = pet.id;
                     return ctrl.like();
                     }, 'data-id': pet.id, hidden: !ctrl.signedIn
                     } ,"Like Me!!!!")
                   ]),
                 m('p', 'picture of me!!!'),
                 m('img', {src:pet.imageUrl})
              ];
            })
        ])
      ])
}




