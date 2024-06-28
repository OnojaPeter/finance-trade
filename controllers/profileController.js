function dashboard(req, res) {
    res.render('profile/dashboard', { user: req.user });
}

function changepw(req, res) {
    res.render('profile/changepw', { user: req.user });
}

function deposit(req, res) {
    res.render('profile/deposit', { user: req.user });
}

function kyc(req, res) {
    res.render('profile/kyc', { user: req.user });
}

function support(req, res) {
    res.render('profile/support', { user: req.user });
}

function withdraw(req, res) {
    res.render('profile/withdraw', { user: req.user });
}

function investment(req, res) {
    res.render('profile/investment', { user: req.user });
}

function transactions(req, res) {
    res.render('profile/transactions', { user: req.user });
}

function profile(req, res) {
    res.render('profile/profile', { user: req.user });
}

function investPlan(req, res) {
    res.render('profile/investPlan', { user: req.user });
}

module.exports = {
    dashboard, 
    changepw, 
    deposit, 
    withdraw, 
    kyc, 
    support, 
    investment, 
    profile, 
    investPlan, 
    transactions
}