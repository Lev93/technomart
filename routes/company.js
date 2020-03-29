const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.render('company', {
    title: 'О компании',
  });
});

module.exports = router;
