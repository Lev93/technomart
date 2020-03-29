const { Router } = require('express');
const Item = require('../models/item');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { input } = req.query;
    const filter = { title: { $regex: input, $options: 'i' } };
    const items = await Item.find({ ...filter }, 'title _id')
      .limit(5);
    res.send(items);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
