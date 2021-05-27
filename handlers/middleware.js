const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;

        req.flash('error', 'you must be signed in to view this page');
        return res.redirect('/login');
    }
    next();
}

module.exports = isLoggedIn;