# Pet Shop

In this assignment, you'll be using [Mithril.js](http://mithril.js.org) to implement a pet show browser.

## Learning Takeaways

In the sprint and its accompanying lectures, you will learn the following:

### Major Topics:

- The Virtual DOM and You
- Separation of concerns with MVC
- What view-state is, and how it differs from model data

### Minor topics:

- [JavaScript Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
- [Browserify](http://browserify.org/)

## Prerequisites

* Read this post on [what is a Virtual DOM?](http://jbi.sh/what-is-virtual-dom/)

## Mithril.js Overview

[Mithril.js](http://mithril.js.org/) is a lightweight JavaScript MVC (model-view-controller)
framework for building front-end applications. Mithril is great for building SPAs (single page
apps) or adding a complex user interaction in an otherwise static page.

A Mithril app is composed of **components**. In web development, a component is a self-contained, functional part of the page. It usually has its own user interface state, such as "am I toggled open?", "which tab is selected?", "what has the user typed in so far?", and so on.

A Mithril component is represented by a plain JavaScript object with two properties: `controller` and `view`.

* The **controller** contains user interface state. It is a constructor function, and gets initialized once (by Mithril).

* The **view** is a function that returns a plain JavaScript object that represents a **Virtual DOM element**. The view function will get called every time data changes.

Mithril views are **reactive**, which means when data changes, the views reflect those changes, without the need to write extra code to update the view yourself.

### Learning Resources:

- [Mithril.js: A Tutorial Introduction](http://gilbert.ghost.io/mithril-js-tutorial-1/) - don't read part 2 until after you complete the basic requirements
- [Mithril.js Official Wiki](https://github.com/lhorie/mithril.js/wiki)
- [Official Docs](http://mithril.js.org/mithril.html) - You should definitely have this open the whole time.

## Pet Shop App

The `client` folder holds most of the application code, and includes the following files:

```
client/
├── components
│   └── PetShopWindow.js       - The JavaScript code for this component
│
├── models
│   │
│   └── shop.js                - The model to handle Pet Shop data
│
├── public
│   └── index.html             - main html file
│
├── styles
│   │── AuthPanel.scss         - Styles for the AuthPanel component (hint-hint)
│   └── PetShopWindow.scss     - Styles for the PetShopWindow component
│
│── main.js                    - Where all the JavaScript starts
└── main.scss                  - Where all the Sass starts

ext/                           - Small extensions to the JavaScript language. Get familiar
│                                with these so you can add them to your toolbelt!
│── arrays.js
│── functions.js
│── globals.js
└── objects.js
```

To get started, run the following commands:

```bash
$ npm install
$ npm start
```

Then visit [localhost:4000](http://localhost:4000).

# Assignment

In this sprint you will be working with a public toy [REST API](https://www.youtube.com/watch?v=7YcW25PHnAA): [pet-shop.api.mks.io](http://pet-shop.api.mks.io). I recommend exploring the API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en). Poking around should give you an idea of how to interact with the API – it's friendly enough to give you detailed error messages.

WARNING: Always look at the **status code**, especially if you are getting a blank response. Some endpoints are protected behind authentication, so you will need to sign in first!

The starting code provides a basic Mithril app with a single request to this API, and showing the result on the page. Don't forget to `npm install` !

### Postman

Before you start, poke around the API using Postman. **DO NOT SKIP THIS STEP!** Specifically, make sure you figure out how to:

- Get the data for a pet shop
- Get the data for a pet shop's pets
- Sign up for an account
- Sign into an account
- "Like" a pet

Some endpoints require an API token. You can generate one by signing in. To use it, you will need to include it in the `POST` parameters; the correct key is `apiToken` (don't forget to set your `Content-Type`!)

## Basic requirements:

For the basic requirements, you will only be working with pet shop `id=1`:

- [ ] Show all pets that this shop houses. For each pet:
  - [ ] Display the pet's name and species
  - [ ] Display the pet's picture
  - [ ] Display the number of votes this pet has received
- [ ] Implement sign up and sign in
- [ ] For each pet, add a button that allows a signed-in user to like the pet
  - [ ] Do not show this button when a user is not signed in
  - [ ] Ping the server every 5 seconds to display any like count updates

## Extra Credit:

- [ ] Allow a signed-in user to add a new pet to the pet shop
- [ ] Let the user sort a shop's pets by number of likes
- [ ] Allow the user to filter a shop's pets by species
- [ ] Save these sorts and filters across refreshes via localStorage

## More Extra Credit:

- [ ] Allow all users to browse any available pet shop by using [m.route](http://mithril.js.org/mithril.route.html) to give each pet shop its own page.
- [ ] Allow a signed-in user to create a new pet shop
- [ ] When a user hovers over a pet's `like` count, show a tooltip of all the usernames that liked that pet.

## Tips

- Mithril shines in supporting a **top-down component architecture**. This means there is one top-level component, and all other parts of the page are decendents of this component. Those parts may be simple elements, or they may be other components (which may have their own decendents).

- Views are reactive, but controllers are not. You should put/pull any data you want to auto-update in the view (example: latest chat messages, currently logged in users, etc.).

### Routing

When you reach the Extra Credit, getting started with `m.route` is easy. In your `main.js`, you only need to add a route to the `m.route()` call. The route key is the url, while the value is a component (an object w/ controller + view).

Here is an example:

```javascript
m.route(document.getElementById('app'), '/', {
  '/': PetShopList,
  '/shop/:id': PetShop,
});
```
