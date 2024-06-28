const express = require('express');
const router = express.Router();
const {home, about, blog, contact, crypto, stocks, affiliate, login, signup} = require('../controllers/homeController')

router.get('/', home);
router.get('/about', about);
router.get('/blog', blog);
router.get('/contact', contact);
router.get('/crypto', crypto);
router.get('/stocks', stocks);
router.get('/affiliate', affiliate);
router.get('/login', login);
router.get('/signup', signup);

module.exports = router;