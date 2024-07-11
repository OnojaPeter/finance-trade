const express = require('express');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
// const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const multer = require('multer');
const passport = require('passport');
const Passport = require('./middlewares/passport')
const LocalStrategy = require('passport-local').Strategy;

// Configure environment variables
dotenv.config();

// Create an Express application
const app = express();

// Body parsers
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('css', express.static('public/css', { 'extensions': ['css']}));
// Set up view engine
app.set('view engine', 'ejs');

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });

// database uri
const uri = 'mongodb://127.0.0.1:27017/Mutrade';
// const uri = process.env.MONGODB_URI;

// Session configuration
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: uri }),
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 *60 * 24 * 7,
    maxAge: 1000 * 60 *60 * 24 * 7
}
}));

// Initialize Passport and configure session management
app.use(Passport.initializePassport());
app.use(Passport.sessionPassport());
// app.use(passport.session());
// app.use(passport.authenticate('session'));

// Flash messages middleware
app.use(flash());
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.session = req.session
  next();
});

// Connect to MongoDB
// const uri = 'mongodb://127.0.0.1:27017/Mutrade';
// const uri = process.env.MONGODB_URI;
mongoose.connect(uri);
const db = mongoose.connection;
// Event listeners for connection status
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async() => {
  console.log('Connected to MongoDB successfully!');
});


const {isUser, isAdmin} = require('./middlewares/passport')
// ROUTES
const homeRoute = require('./routes/homeRoute');
const profileRoute = require('./routes/profileRoute');
const adminRoute = require('./routes/adminRoute');
const authRoute = require('./routes/authRoute')

// APP.USE
app.use('/', homeRoute);
app.use('/profile', isUser, profileRoute);
app.use('/admin', adminRoute);
app.use('/auth', authRoute);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});