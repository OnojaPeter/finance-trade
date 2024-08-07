const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        // console.log(user)
        if (!user) {
            return done(null, false, { message: 'Incorrect email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(isMatch)

        if (!isMatch) {
        return done(null, false, { message: 'Incorrect password' });
        }
    
        return done(null, user);
    } catch (error) {
        return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
});

const initializePassport = () => {
  return passport.initialize();
};

const sessionPassport = () => {
  return passport.session();
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

const isUser = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'user') {
    return next();
  }
  req.flash('error_msg', 'Login to access this page');
  res.redirect('/login');
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  req.flash('error_msg', 'Login to access this page');
  res.redirect('/login');
};

function saveOriginalUrl(req, res, next) {
  if (!req.isAuthenticated() && req.method === 'GET') {
      req.session.returnTo = req.originalUrl;
      console.log(req.session.returnTo)
      console.log(req.originalUrl)
  }
  next();
}

module.exports = {
  initializePassport,
  sessionPassport,
  isAuthenticated,
  isUser,
  isAdmin,
  saveOriginalUrl
};