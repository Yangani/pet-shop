var m = require('mithril');
var Shop = require('../models/shop');

var PetShopWindow = module.exports;

var storage = localStorage;
console.log(storage);

PetShopWindow.controller = function() {
  var ctrl = this;
  ctrl.userName = "Input Username",
  ctrl.userPassword = "Input Password",
  ctrl.apiToken = null;
  ctrl.petId = null;
  ctrl.signedIn = false;
  ctrl.petName = "Create a pet name";
  ctrl.petURL = "Give me a picture of your pet";
  ctrl.speciesForFilter = "Select a Species";
  ctrl.species = null;

  ctrl.sorted = false;
  ctrl.filtered = false;

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
      storage.setItem('signedIn', true);
    });
  }

  ctrl.like = function() {
    Shop.like(ctrl.petId, ctrl.apiToken)
    .then(function(response){
    })
  }

  ctrl.addPet = function(){
    Shop.addPet(ctrl.species, ctrl.petName, ctrl.petURL, ctrl.apiToken)
    .then(function(response){
      console.log(response);
    })
  }

  ctrl.sortPets = function(){
    ctrl.shopPets = ctrl.shopPets.sort(function(a,b){
      return a.likes.length - b.likes.length;
    })
    ctrl.sorted = true;
    storage.setItem('sorted', true);
  }

  ctrl.filterSpecies = function(){
    ctrl.shopPets = ctrl.shopPets.filter(function(pet){
      if (pet.species === ctrl.speciesForFilter){
        return true;
      }
    })
    storage.setItem('filtered', true);
  }

  setInterval(function(){
    Shop.fetchPets()
    .then(function(petsData){
      ctrl.shopPets = petsData;
      if(storage.sorted){
        ctrl.sortPets();
      }
      if(storage.filtered) {
        ctrl.filterSpecies();
      }
    })

  }, 5000);

}


PetShopWindow.view = function(ctrl) {


  return m('div', [
      m('fieldset',[
      m('legend', 'User Name:'),
      m('input[type=text]', {
        value: ctrl.userName,
        oninput: function(e) {
          ctrl.userName = e.currentTarget.value;
        }
      }),
      m('input[type=Password]', {
        value:ctrl.userPassword,
        oninput: function(e) {
          ctrl.userPassword = e.currentTarget.value;
        }
      }),
      m('button', { onclick: ctrl.signUp }, "Sign Up"),
      m('button', { onclick: ctrl.signIn }, "Sign In")]),
//////////////////////////ADD A NEW PET/////////////////////////
      m('fieldset',[
        m('legend', 'Adding a Pet'),
        m('input[type=text]', {
          value: ctrl.petName,
          oninput: function(e) {
            ctrl.petName = e.currentTarget.value;
          }
        }),
        m('input[type=text]', {
          value:ctrl.petURL,
          oninput: function(e) {
            ctrl.petURL = e.currentTarget.value;
          }
        }),
        m('input[type=text]', {value:"Species: " + ctrl.species}),
        m('select',{onchange: function(e){
          ctrl.species = e.currentTarget.value;
        }}, [
          m('option', {value: "cat"}, 'cat'),
          m('option', {value: "dog"}, 'dog')
          ]),
        m('button', { onclick: ctrl.addPet, hidden: !ctrl.signedIn }, "Add Pet")
      ]),
///////////////////////////SORT PETS BY LIKES////////////////////////////////
      m('fieldset',[
        m('legend', 'Sort Pets'),
        m('button', {onclick: ctrl.sortPets}, 'Sort Pets')
        ]),
///////////////////////////SORT PETS BY LIKES////////////////////////////////
      m('fieldset',[
        m('legend', 'Filter based on Species'),
        m('input[type=text]', {value:"Species: " + ctrl.speciesForFilter}),
        m('select',{onchange: function(e){
          ctrl.speciesForFilter = e.currentTarget.value;
        }}, [
          m('option', {value: "cat"}, 'cat'),
          m('option', {value: "dog"}, 'dog')
          ]),
        m('button', { onclick: ctrl.filterSpecies}, "Filter Species")
      ]),
//////////////////////////VIEW PETS and LIKE////////////////////////////////
        m('.pet-shop', [
          m('h1', "Welcome to " + ctrl.shop.name),
          ctrl.shopPets.map(function(pet){
            return [
                  m('.pet', [
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
                 m('img', {src:pet.imageUrl, height:'100%', width:'100%'})
                 ])
              ];
            })
        ])
        ])
}




