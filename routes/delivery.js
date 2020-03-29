const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.render('delivery', {
    title: 'Доставка',
  });
});

module.exports = router;
