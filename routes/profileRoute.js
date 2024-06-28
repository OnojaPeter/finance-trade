const express = require('express');
const router = express.Router();
const {dashboard, changepw, deposit, withdraw, kyc, support, investment, profile, investPlan, transactions} = require('../controllers/profileController')

router.get('/dashboard', dashboard);
router.get('/changepw', changepw);
router.get('/withdraw', withdraw);
router.get('/kyc', kyc);
router.get('/support', support);
router.get('/investment', investment);
router.get('/deposit', deposit);
router.get('/profile', profile);
router.get('/investPlan', investPlan);
router.get('/transactions', transactions);

module.exports = router;