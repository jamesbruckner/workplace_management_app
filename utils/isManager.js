const isManager = (req, res, next) => {

    console.log(`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ${req.session}`)

    if (!req.session.logged_in) {
        res.redirect('./login');
    } else if (!req.session.is_manager) {
        res.redirect('/')
    } else {
        next();
    }
};

module.exports = isManager;