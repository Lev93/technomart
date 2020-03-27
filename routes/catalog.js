/* eslint no-underscore-dangle: 0 */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unneeded-ternary */
const { Router } = require('express');

const router = Router();
const Item = require('../models/item');
const auth = require('../middleware/auth');
const keys = require('../keys');

const newcheck = (date) => {
  const now = Date.now();
  const dateinms = Date.parse(date);
  if ((now - dateinms) <= 604800000) {
    return true;
  }
  return false;
};

const isAdmin = (req) => {
  if (!req.user) {
    return false;
  }
  if (req.user._id.toString() !== keys.ADMIN_ID) {
    return false;
  }
  return true;
};

router.get('/', async (req, res) => {
  const { category } = req.query;
  const filter = {};
  if (category === 'инструмент') {
    filter.type = ['перфоратор', 'дрель', 'болгарка'];
  } else if (category) {
    filter.type = category;
  }
  const length = await Item.countDocuments({ ...filter });
  await Item.find({ ...filter }).limit(9).populate('userId', 'email name')
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

      const object = {
        main: req.query.category ? false : true,
        tools: req.query.category === 'инструмент' ? true : false,
        materials: req.query.category === 'материал' ? true : false,
        tech: req.query.category === 'техника' ? true : false,
        perforator: req.query.category === 'перфоратор' ? true : false,
        drell: req.query.category === 'дрель' ? true : false,
        bolgarka: req.query.category === 'болгарка' ? true : false,
        firstpage: length < 9 ? false : true,
        secondpage: length > 9 ? true : false,
        thirdpage: length > 18 ? true : false,
      };
      res.render('catalog', {
        items: context.usersDocuments,
        isAdmin: isAdmin(req),
        sortPopularity: true,
        up: true,
        sort: 'totalBoughts',
        ...object,
        category,
        pagenumber: 1,
        firstpageactive: true,
      });
    });
});

router.post('/filter', auth, async (req, res) => {
  console.log(req.body);
  const { production, power, prices, sorttype, category, pagenumber } = req.body;
  const price = prices.split('-').map((str) => str.trim().slice(4));
  const filter = {};
  if (category === 'инструмент') {
    filter.type = ['перфоратор', 'дрель', 'болгарка'];
  } else if (category) {
    filter.type = category;
  }
  const minprice = Number(price[0]);
  const maxprice = Number(price[1]);
  let productions = [];

  if (power) {
    filter.power = power;
  }
  if (production) {
    filter.production = production;
    productions = production;
  }
  const sortObject = {};
  if (sorttype[0] === '-') {
    sortObject[sorttype.slice(1)] = -1;
  } else {
    sortObject[sorttype] = 1;
  }
  let skip = 0;
  if (pagenumber !== '1') {
    skip = 9 * (Number(pagenumber) - 1);
  }
  const length = await Item.countDocuments({ ...filter });
  await Item.find({ ...filter, discountPrice: { $lte: maxprice, $gte: minprice } })
    .sort({ ...sortObject }).skip(skip)
    .limit(9).then((documents) => {
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

      const object = {
        bosch: productions.includes('BOSCH'),
        interscol: productions.includes('INTERSCOL'),
        makita: productions.includes('MAKITA'),
        dewalt: productions.includes('DEWALT'),
        hitachi: productions.includes('HITACHI'),
        main: category ? false : true,
        tools: category === 'инструмент' ? true : false,
        materials: category === 'материал' ? true : false,
        tech: category === 'техника' ? true : false,
        perforator: category === 'перфоратор' ? true : false,
        drell: category === 'дрель' ? true : false,
        bolgarka: category === 'болгарка' ? true : false,
        firstpage: length < 9 ? false : true,
        secondpage: length > 9 ? true : false,
        thirdpage: length > 18 ? true : false,
        firstpageactive: pagenumber === '1',
        secondpageactive: pagenumber === '2',
        thirdpageactive: pagenumber === '3',
        pagenumber,
      };
      res.render('catalog', {
        items: context.usersDocuments,
        isAdmin: isAdmin(req),
        power220: power === 'сетевой',
        poweracc: power === 'аккамуляторный',
        ...object,
        minprice,
        maxprice,
        sortPrice: sortObject.discountPrice ? true : false,
        sortPopularity: sortObject.totalBoughts ? true : false,
        sortType: sortObject.title ? true : false,
        sort: sorttype,
        up: sorttype[0] !== '-',
        down: sorttype[0] === '-',
        category,
      });
    });
});

router.get('/add', (req, res) => {
  if (isAdmin(req)) {
    res.render('catalogAdd');
  } else {
    res.redirect('/catalog');
  }
});

router.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render('item', {
    title: `${item.title}`,
    imgBig1: `${item.imgBig1}`,
    imgBig2: `${item.imgBig2}`,
    imgBig3: `${item.imgBig3}`,
    price: item.price,
    discountPrice: item.discountPrice,
    id: item._id,
    parameter1: item.specifications.split(';')[0],
    parameter2: item.specifications.split(';')[1],
    parameter3: item.specifications.split(';')[2],
    description: item.description,
    isAdmin: isAdmin(req),
  });
});

router.get('/:id/edit', auth, async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (isAdmin(req)) {
    res.render('item-edit', {
      title: item.title,
      img: item.img,
      imgBig1: `${item.imgBig1}`,
      imgBig2: `${item.imgBig2}`,
      imgBig3: `${item.imgBig3}`,
      price: item.price,
      discountPrice: item.discountPrice,
      parameter1: item.specifications.split(';')[0],
      parameter2: item.specifications.split(';')[1],
      parameter3: item.specifications.split(';')[2],
      description: item.description,
      type: item.type,
      quantity: item.quantity,
      production: item.production,
      power: item.power,
      totalBoughts: item.totalBoughts,
      specifications: item.specifications,
      id: item._id,
    });
  } else {
    res.redirect('/catalog');
  }
});

router.post('/add', auth, async (req, res) => {
  const item = new Item({
    title: req.body.title,
    price: req.body.price,
    discountPrice: req.body.discountPrice,
    img: req.body.img,
    imgBig1: req.body.imgBig1,
    imgBig2: req.body.imgBig2,
    imgBig3: req.body.imgBig3,
    type: req.body.type,
    quantity: req.body.quantity,
    description: req.body.description,
    production: req.body.production,
    power: req.body.power,
    totalBoughts: req.body.totalBoughts,
    specifications: req.body.specifications,
    userId: req.user._id,
  });
  try {
    if (isAdmin(req)) {
      await item.save();
      res.redirect('/catalog');
    } else {
      res.redirect('/catalog');
    }
  } catch (e) {
    console.log(e);
  }
});

router.post('/edit', auth, async (req, res) => {
  if (isAdmin(req)) {
    const { id } = req.body;
    delete req.body.id;
    await Item.findByIdAndUpdate(id, req.body);
    res.redirect('/catalog');
  } else {
    res.redirect('/catalog');
  }
});

router.post('/remove', auth, async (req, res) => {
  try {
    if (isAdmin(req)) {
      await Item.deleteOne({ _id: req.body.id });
      res.redirect('/catalog');
    } else {
      res.redirect('/catalog');
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
