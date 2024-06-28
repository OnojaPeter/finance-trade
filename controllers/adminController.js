function dashboard(req, res) {
    res.render('admin/dashboard', { user: req.user });
}

function deposits(req, res) {
    res.render('admin/deposits', { user: req.user });
}

function withdrawals(req, res) {
    res.render('admin/withdrawals', { user: req.user });
}

function kyc(req, res) {
    res.render('admin/kyc', { user: req.user });
}

function support(req, res) {
    res.render('admin/support', { user: req.user });
}

function users(req, res) {
    res.render('admin/users', { user: req.user });
}

module.exports = {
    dashboard, 
    deposits, 
    withdrawals, 
    kyc, 
    support, 
    users
}