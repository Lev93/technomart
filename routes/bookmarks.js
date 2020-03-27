/* eslint no-underscore-dangle: 0 */
const { Router } = require('express');
const Item = require('../models/item');

const router = Router();

function mapCartItems(bookmarks) {
  return bookmarks.items.map((c) => ({
    ...c.itemId._doc, count: c.count,
  }));
}

router.get('/', async (req, res) => {
  const user = await req.user
    .populate('bookmarks.items.itemId')
    .execPopulate();
  const items = mapCartItems(user.bookmarks);
  res.render('bookmarks', {
    items,
  });
});

router.post('/add', async (req, res) => {
  const item = await Item.findById(req.body.id);
  await req.user.addToBook(item);
  res.status(200);
});

router.post('/remove', async (req, res) => {
  await req.user.removeFromBook(req.body.id);
  res.redirect('/bookmarks');
});

module.exports = router;
