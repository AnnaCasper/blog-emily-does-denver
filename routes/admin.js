var express = require('express');
var router = express.Router();
// var db = require('monk')(process.env.MONGO_URI);
// var blogCollection = db.get('blogs');

//GET admin login page
router.get('/login', function(req, res, next){
  res.render('admin/login');
});

//GET admin index page
router.get('/', function(req, res, next){
  res.render('admin');
});

//POST admin login
router.post('/login', function(req, res, next){
  res.redirect('/admin');
});

//GET new post page
router.get('/new', function(req, res, next){
  res.render('admin/new');
});

//POST new blog
router.post('/new', function(req, res, next){
  blogCollection.insert({title: req.body.title,
    content: req.body.content});
  res.redirect('/admin');
})

//GET show page
router.get('/show', function(req, res, next){
  res.render('admin/show');
});

//GET edit page
router.get('/edit', function(req, res, next){
  res.render('admin/show');
});

module.exports = router;
