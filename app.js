const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const ejs = require('ejs');
const express = require('express');
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



// Define routes
app.get('/', (req, res) => {
    res.render('home/home', { user: req.user });
  });


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});