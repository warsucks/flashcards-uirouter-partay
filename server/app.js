var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var FlashCardModel = require('./models/flash-card-model');

var app = express(); // Create an express app!
module.exports = app; // Export it so it can be require('')'d

// The path of our public directory. ([ROOT]/public)
var publicPath = path.join(__dirname, '../public');
var bowerPath = path.join(__dirname, '../bower_components');

// The path of our index.html file. ([ROOT]/index.html)
var indexHtmlPath = path.join(__dirname, '../index.html');

// http://nodejs.org/docs/latest/api/globals.html#globals_dirname
// for more information about __dirname

// http://nodejs.org/api/path.html#path_path_join_path1_path2
// for more information about path.join

// When our server gets a request and the url matches
// something in our public folder, serve up that file
// e.g. angular.js, style.css
app.use(express.static(publicPath));
app.use(express.static(bowerPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// If we're hitting our home page, serve up our index.html file!
app.get('/', function (req, res) {
    res.sendFile(indexHtmlPath);
});

app.use(function (req, res, next) {
	console.log('made it')
	next();
});

app.get('/cards/:id', function (req, res, next) {
    console.log("id", req.params.id);
    FlashCardModel.findById(req.params.id).exec()
    .then(function (foundCard) {
        console.log("found card");
        res.json(foundCard);
    })
    .then(null, next);
});

app.get('/cards', function (req, res) {

    var modelParams = {};

    if (req.query.category) {
    	modelParams.category = req.query.category;
    }

    FlashCardModel.find(modelParams, function (err, cards) {
        setTimeout(function () {
            res.send(cards);
        }, 500 + Math.random() * 1000);
    });

});

app.post('/cards', function (req, res, next) {
    FlashCardModel.create(req.body)
    .then(function (newCard) {
        res.json(newCard);
    })
    .then(null, next);
});

app.put('/cards/:id', function (req, res, next) {
    // FlashCardModel.findByIdAndUpdate(req.params.id, req.body).exec()
    // .then(function (updatedCard) {
    //     res.json(updatedCard);
    // })
    // .then(null, next);

    FlashCardModel.findById(req.params.id).exec()
    .then(function (foundCard) {
        for (var k in req.body) {
            foundCard[k] = req.body[k];
        }
        return foundCard.save();
    })
    .then(function (updatedCard) {
        res.json(updatedCard);
    })
    .then(null, next);
});

app.delete('/cards/:id', function(req, res, next)
{
  console.log("route id:",req.params.id);
  // FlashCardModel.findById(req.params.id).exec()
  // .then(function (foundCard) {
  //   console.log("found card",foundCard)
  //     foundCard.remove();
  //     res.json(foundCard);
  // })
  // .then(null, next);

  FlashCardModel.findByIdAndRemove(req.params.id).exec()
  .then(function (foundCard) {
    console.log("deleted card",foundCard)
      res.json(foundCard);
  })
  .then(null, next);
});
