var Path = require('path')
var browserify = require('browserify-middleware')
var express = require('express')
var app = express()

//provide a browserified file at a path
var shared = ['mithril']
app.get('/scripts/vendor-bundle.js', browserify(shared))
app.get('/scripts/app-bundle.js', browserify('./client/main.js', { external: shared }))

// Serve sass file
var sass = require('node-sass-endpoint')
app.get('/styles/main.css', sass.serve('./client/main.scss'))

// Non-js static files
app.use(express.static('client/public'))

var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
