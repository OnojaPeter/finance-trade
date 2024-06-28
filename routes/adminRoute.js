const express = require('express');
const router = express.Router();
const {dashboard, deposits, withdrawals, kyc, support, users} = require('../controllers/adminController')

router.get('/dashboard', dashboard);
router.get('/deposits', deposits);
router.get('/withdrawals', withdrawals);
router.get('/kyc', kyc);
router.get('/support', support);
router.get('/users', users);

module.exports = router;