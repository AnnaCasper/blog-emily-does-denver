var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//GET about page
router.get('/about', function(req, res, next){
  res.render('about');
});

//GET admin login page
router.get('/admin/login', function(req, res, next){
  res.render('admin/login');
});

//POST admin login
router.post('/admin/login', function(req, res, next){
  res.redirect('/admin');
})

module.exports = router;
