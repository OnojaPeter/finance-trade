const passport = require('passport')

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
          req.flash('success', 'Welcome Back');
          const redirectUrl = req.session.returnTo || '/';
          delete req.session.returnTo;
          return res.redirect(redirectUrl);
        });
    })(req, res, next);
}

const signup = async (req, res) => {
    const { fname, lname, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const message = 'User with mail already exists';
        return res.render('client-signup', { message });
      }
  
      const newUser = new User({ fname, lname, email, password, role: 'user' });
      await newUser.save();
  
      req.flash('success', 'Please Login with your email and password');
      res.redirect('/login');
    } catch (err) {
      console.error(err);
      res.render('client-signup', { message: 'An error occurred, please try again.' });
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