/* eslint no-underscore-dangle: 0 */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
const User = require('../models/user');

function computeCount(items) {
  return items.reduce((total, item) => total += item.count, 0);
}

module.exports = async function (req, res, next) {
  res.locals.isAuth = req.session.isAuthenticated;
  res.locals.csrf = req.csrfToken();
  if (req.session.user) {
    req.session.user = await User.findOne({ _id: req.session.user._id });
    res.locals.userName = req.session.user.name;
  }
  if (req.session.user) {
    res.locals.cart = computeCount(req.session.user.cart.items);
    res.locals.bookmarks = req.session.user.bookmarks.items.length;
  }
  next();
};
