const express = require('express');
const router = express.Router();
const {login, signup, logout} = require('../controllers/authController')

router.post('/login', login)
router.post('/logout', logout)
router.post('/logout', signup)

module.exports = router;