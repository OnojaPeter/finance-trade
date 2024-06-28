const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const ejs = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const multer = require('multer');
const nodemailer = require('nodemailer');
const passport = require('passport');
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

// Set up session management
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: uri })
}));

// Initialize Passport and configure session management
app.use(passport.initialize());
app.use(passport.session());

// Flash messages middleware
app.use(flash());

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



// ROUTES
const homeRoute = require('./routes/homeRoute');
const profileRoute = require('./routes/profileRoute');
const adminRoute = require('./routes/adminRoute')

// APP.USE
app.use('/', homeRoute);
app.use('/profile', profileRoute);
app.use('/admin', adminRoute);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});