function home(req, res) {
    res.render('home/home', { user: req.user });
}

function about(req, res) {
    res.render('home/about', { user: req.user });
}

function blog(req, res) {
    res.render('home/blog', { user: req.user });
}

function contact(req, res) {
    res.render('home/contact', { user: req.user });
}

function crypto(req, res) {
    res.render('home/crypto', { user: req.user });
}

function stocks(req, res) {
    res.render('home/stocks', { user: req.user });
}

function affiliate(req, res) {
    res.render('home/affiliate', { user: req.user });
}

function login(req, res) {
    res.render('login', { user: req.user });
}

function signup(req, res) {
    res.render('signup', { user: req.user });
}

module.exports = {
    home, 
    about, 
    blog, 
    contact,
    crypto, 
    stocks, 
    affiliate, 
    login, 
    signup
}