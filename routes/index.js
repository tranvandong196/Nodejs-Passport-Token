var express = require('express');
var router = express.Router();
var passport = require('passport');
const passportFb = require('passport-facebook').Strategy;

var User = require('../app/models/User');

/* GET home page. */
router.get('/',  function(req, res, next) {
  res.send('Welcome to my page');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/auth/fb', passport.authenticate('facebook', {scope: ['email']}));
router.get('/auth/fb/cb', passport.authenticate('facebook', {failureRedirect: '/login', successRedirect: '/'}));

let options = {
    clientID: "506278836478647",
    clientSecret: "30b837a7f595ceb1a3a86efd2639a17c",
    callbackURL: "http://localhost:3000/auth/fb/cb",
    profileFields: ['email', 'gender', 'locale', 'displayName']
};

let verify =  (accessToken,  refresToken, profile, done) => {
  User.findOne({username: profile._json.email}, function (err, user) {
      if(err) return done(err);
      if(user) return done(null, user);

      const newUser = new User({
          username: profile._json.email,
          password: 'not_create',
          age: 0
      })

      newUser.save(err => {
          return done(null, newUser);
      })

  })
}

passport.use(new passportFb(options, verify));
passport.serializeUser((user, done) => {
  done(null, user.username)
});
passport.deserializeUser((username, done) => {
    User.findOne({username: username}, (err, user) => {
        done(err, user);
    })
})


module.exports = router;
