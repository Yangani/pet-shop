var m = require('mithril');


var Shop = module.exports;

Shop.signIn = function(username, password) {
  return m.request({method: "POST",
                    url: 'http://pet-shop.api.mks.io/signin',
                    data: {
                      username: username,
                      password: password
                    }
  })
}

Shop.signUp = function(username, password) {
  return m.request({method: 'POST',
                    url: 'http://pet-shop.api.mks.io/signup',
                    data: {
                      username: username,
                      password: password
                    }
                  })
}

Shop.fetch = function () {
  return m.request({ method: 'GET', url: 'http://pet-shop.api.mks.io/shops/1' });
}

Shop.fetchPets = function () {
  return m.request({ method: 'GET', url: 'http://pet-shop.api.mks.io/shops/1/pets' });
}

Shop.like = function(petId, apiToken){
  return m.request({method: "POST",
                    url: 'http://pet-shop.api.mks.io/shops/1/pets/' + petId + '/like',
                    data: {
                      apiToken: apiToken
                    }
})
}

Shop.addPet = function(species, name, imageUrl, apiToken) {
  return m.request({method: 'POST',
                    url: 'http://pet-shop.api.mks.io/shops/1/pets/',
                    data: {
                        apiToken: apiToken,
                        shopId: 1,
                        species: species,
                        name: name,
                        imageUrl: imageUrl
                    }
})
}

