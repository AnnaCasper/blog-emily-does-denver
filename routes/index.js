var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//GET styleguide
router.get('/styleguide', function(req, res, next){
  res.render('styleguide');
})
//GET about page
router.post('/about', function(req, res, next){
  res.render('about');
});

module.exports = router;
