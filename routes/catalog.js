const {Router} = require('express')
const router = Router()
const Item = require('../models/item')
const auth = require('../middleware/auth')
const keys = require('../keys')

const newcheck = (date) => {
  const now = Date.now()
  const dateinms = Date.parse(date)
  if ((now - dateinms) <= 604800000) {
    return true;
  } else {
    return false;
  }
}

const isAdmin = (req) => {
  if (!req.user) {
    return false
  } else if (req.user._id.toString() !== keys.ADMIN_ID) {
    return false
  } else {
    return true
  }
}

router.get('/', async (req, res) => {
    const items = await Item.find().populate('userId', 'email name')
    .then(documents => {
        const context = {
          usersDocuments: documents.map(document => {
            return {
              title: document.title,
              price: document.price,
              discountPrice: document.discountPrice,
              img: document.img,
              id: document._id,
              new: newcheck(document.date)
            }
        })
    }
    res.render('catalog', {
        items: context.usersDocuments,
        isAdmin: isAdmin(req)
      })
  })
})

router.get('/add', (req, res) => {
    if (isAdmin(req)) {
      res.render('catalogAdd')
    } else {
      res.redirect('/catalog')
    }
})

router.get('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id)
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
      isAdmin: isAdmin(req)
    })
  })

router.get('/:id/edit', auth, async (req, res) => {
  const item = await Item.findById(req.params.id)
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
    })
  } else {
    res.redirect('/catalog')
  }
})

router.post('/add',  auth, async (req, res) => {
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
    })
    try {
      if (isAdmin(req)) {
        await item.save()
        res.redirect('/catalog')
      } else {
        res.redirect('/catalog')
      }
    } catch (e) {
      console.log(e)
    }
  })

router.post('/edit', auth, async (req, res) => {
  if (isAdmin(req)) {
    const {id} = req.body
    delete req.body.id
    await Item.findByIdAndUpdate(id, req.body)
    res.redirect('/catalog')
  } else {
    res.redirect('/catalog')
  }
})

router.post('/remove', auth, async (req, res) => {
  try {
    if (isAdmin(req)) {
      await Item.deleteOne({_id: req.body.id})
      res.redirect('/catalog')
    } else {
      res.redirect('/catalog')
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
