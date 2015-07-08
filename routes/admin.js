var express = require('express');
var router = express.Router();

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

//GET show page
router.get('/show', function(req, res, next){
  res.render('admin/show');
});

module.exports = router;
