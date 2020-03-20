const User = require('../models/user')

module.exports = async function(req, res, next) {
    res.locals.isAuth = req.session.isAuthenticated
    res.locals.csrf = req.csrfToken()
    if (req.session.user) {
        req.session.user = await User.findOne({ _id: req.session.user._id })
        res.locals.userName = req.session.user.name
    } 
    res.locals.cart = req.session.user.cart.items.length
    next()
}