var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var blogCollection = db.get('blogs');
var userCollection = db.get('users')
var authorization = require('express-authorization');
var bcrypt = require('bcryptjs');

var validations = require("../lib/javascripts/validations");

//GET admin login page
router.get('/login', function(req, res, next){
  res.render('admin/login');
});

//POST login
router.post('/login', function(req, res, next){
  userCollection.findOne({ email: req.body.email.toUpperCase()}, function(err, data){
    if (data == null){
      res.render('admin/login', { errors: "There is no account associated with this email. Please create a new account."});
    } else {
      var compare = bcrypt.compareSync(req.body.password, data.password);
      if (compare === true){
        res.cookie('currentUser', data._id);
        res.redirect('/admin');
      } else {
        res.render('admin/login', {errors: "Email and password do not match."})
      };
    };
  });
});

//GET admin index page
router.get('/', function(req, res, next){
  if(req.cookies.currentUser){
    res.render('admin');
  } else {
    res.redirect('/admin/login')
  }
});

//POST admin login
router.post('/login', function(req, res, next){
  res.redirect('/admin');
});

//GET sign up page
router.get('/signup', function(req, res, next){
  res.render('admin/signup')
});

//POST new user
router.post('/signup', function(req, res, next){
  var upperCase = req.body.email.toUpperCase();
  var email = upperCase.replace(" ", "");
  var uniqueEmail = validations.existingEmail(email, function(duplicateError){
    var errors = validations.validateSignUp(
      req.body.user_name,
      email,
      req.body.password,
      req.body.confirm,
      duplicateError);
    if (errors.length === 0){
      var hash = bcrypt.hashSync(req.body.password, 8);
      userCollection.insert({
        user_name: req.body.user_name,
        email: email,
        password: hash,
        });
      userCollection.findOne({email: email}, function(err, data){
        res.cookie('currentUser', data._id);
        res.redirect('/admin');
      });
    } else {
        res.render('admin/signup', {
          errors: errors,
          user_name: req.body.user_name,
          email: email
          });
      };
  })
})

//GET logout
router.get('/logout', function(req, res, next){
  res.clearCookie('currentUser');
  res.render('admin/login');
});

//GET new post page
router.get('/new', function(req, res, next){
  if(req.cookies.currentUser){
    res.render('admin/new');
  } else {
    res.redirect('/admin/login')
  }
});

//POST new blog
router.post('/new', function(req, res, next){
  blogCollection.insert({title: req.body.title,
    date: req.body.date,
    content: req.body.content}, function(err, data){
      res.redirect('/admin/show');
    });
});

//GET show page
router.get('/show', function(req, res, next){
  if(req.cookies.currentUser){
    blogCollection.find({}, function(err, blogs){
      res.render('admin/show', {blogs: blogs});
    })
  } else {
    res.redirect('/admin/login')
  }

});

//GET edit page
router.get('/:id/edit', function(req, res, next){
  if(req.cookies.currentUser){
    blogCollection.findOne({_id: req.params.id}, function(err, blog){
      res.render('admin/edit', {blog: blog});
    })
  } else {
    res.redirect('/admin/login')
  }
});

//POST edits
router.post('/:id/edit', function(req, res, next){
  blogCollection.update({_id: req.params.id}, { $set: {
    title: req.body.title,
    date: req.body.date,
    content: req.body.content
  }}, function(err, data){
    res.redirect('/admin/show');
  })
})

//POST delete
router.post('/:id/delete', function(req, res, next){
  if(req.cookies.currentUser){
    blogCollection.findOne({_id: req.params.id}, function(err, blog){
      res.render('admin/edit', {blog: blog});
    })
  } else {
    res.redirect('/admin/login')
  }
});

module.exports = router;
