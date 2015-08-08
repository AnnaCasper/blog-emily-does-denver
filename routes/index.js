var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var blogCollection = db.get('blogs');
var userCollection = db.get('users');

/* GET home page. */
router.get('/', function(req, res, next) {
  blogCollection.find( { $query: {}, $orderby: { _id : -1 } }, function(err, blogs){
    res.render('index', {blogs: blogs});
  })
});

//GET styleguide
router.get('/styleguide', function(req, res, next){
  res.render('styleguide');
})
//GET about page
router.post('/about', function(req, res, next){
  res.render('about');
});

//GET home page
router.post('/home', function(req, res, next){
  res.redirect('/');
})

module.exports = router;
