const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

const app = express();
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
  require('express-session')({
    secret: 'some secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: 'auto',
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

var FACEBOOK_APP_ID = "288274442123414";
var FACEBOOK_APP_SECRET = "a6b1b4e363921d3f25a9b276b3060010";

// facebook
passport.use(
  new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'posts']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(profile._json.name);
    console.log(profile._json.id);
    console.log(profile._json.posts.data);
    process.nextTick(function () {
      console.log("nextTick");  
      return done(null, profile);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/hello', (req, res) => res.send('world'));

// facebook
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook'));

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  res;
});

module.exports = {
  path: '/server',
  handler: app,
};