const passport = require('passport')
const User = require('../models/user')

function login (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          console.log('not user');
          req.flash('error', 'Invalid email or password');
          return res.redirect('/login');
        }
        req.logIn(user, { keepSessionInfo: true }, (err) => {
          if (err) {
            return next(err);
          }
          req.flash('success_msg', 'Welcome Back');
          const redirectUrl = req.session.returnTo || '/profile/dashboard';
          delete req.session.returnTo;
          return res.redirect(redirectUrl);
        });
    })(req, res, next);
}

const signup = async (req, res) => {
    const { fName, lName, email, password, username } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        req.flash('error_msg', 'User with mail already exists.');
        return res.redirect('/signup')
      }
  
      const newUser = new User({ fName, lName, email, password, username, role: 'user' });
      await newUser.save();
  
      req.flash('success_msg', 'Please Login with your email and password');
      res.redirect('/login');
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'An error occurred, please try again.');
      res.redirect('/signup')
    }
  };
  

async function logout (req, res) {
    try {
        req.logout(err => {
            if (err) { return next(err); }
            res.redirect('/');
          });
    } catch (error) {
        console.error('error logging out:', error)
    }
}


module.exports = {
    logout,
    login,
    signup
}