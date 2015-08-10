var db = require('monk')(process.env.MONGOLAB_URI);
var blogCollection = db.get('blogs');
var userCollection = db.get('users')

module.exports = {
  validateSignUp: function(name, email, password, confirm, duplicateError){
  var errorArray = [];

    if(password !== confirm){
      errorArray.push("Passwords do not match.");
    };

    if(password.length < 8){
      errorArray.push("Password must be at least 8 characters long.");
    };

    if(name == "" || name == null){
      errorArray.push("Name must be filled out.");
    };

    if(email == "" || email == null){
      errorArray.push("Email must be filled out.");
    };

    if(password == "" || password == null){
      errorArray.push("Password must be filled out.");
    };

    if(confirm == "" || confirm == null){
      errorArray.push("Password confirmation must be filled out.");
    };

    if (duplicateError != 0){
      errorArray.push("There is already an account associated with this email address. Please enter a unique email.")
    };

  return errorArray;
},

existingEmail: function(email, callback){
  var error = 0;
  userCollection.findOne({email: email}, function(err, data){
    if(data){
      error = 1;
    } else {
      error = 0;
    };
    callback(error);
  });
},

}
