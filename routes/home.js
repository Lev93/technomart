/* eslint no-underscore-dangle: 0 */
/* eslint-disable arrow-body-style */
const { Router } = require('express');
const Item = require('../models/item');

const router = Router();

const newcheck = (date) => {
  const now = Date.now();
  const dateinms = Date.parse(date);
  if ((now - dateinms) <= 604800000) {
    return true;
  }
  return false;
};

router.get('/', async (req, res) => {
  await Item.find().sort({ totalBoughts: -1 }).limit(4).populate('userId', 'email name')
    .then((documents) => {
      const context = {
        usersDocuments: documents.map((document) => {
          return {
            title: document.title,
            price: document.price,
            discountPrice: document.discountPrice,
            img: document.img,
            id: document._id,
            new: newcheck(document.date),
          };
        }),
      };

      res.render('index', {
        items: context.usersDocuments,
        title: 'Техномарт',
      });
    });
});

module.exports = router;
