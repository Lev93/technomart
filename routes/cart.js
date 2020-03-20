const {Router} = require('express')
const Item = require('../models/item')
const router = Router()

function mapCartItems(cart) {
  return cart.items.map(c => ({
    ...c.itemId._doc, count: c.count
  }))
}

function computePrice(items) {
  return items.reduce((total, item) => {
    return total += item.discountPrice * item.count
  }, 0)
}

router.post('/add', async (req, res) => {
  const item = await Item.findById(req.body.id)
  await req.user.addToCart(item)
})

router.post('/remove', async (req, res) => {
  await req.user.removeFromCart(req.body.id)
  res.redirect('/cart')
})

router.get('/', async (req, res) => {
  const user = await req.user
    .populate('cart.items.itemId')
    .execPopulate()
  const items = mapCartItems(user.cart)
  items.map((item) => {
    item.totalprice = item.count * item.discountPrice
  })
  res.render('cart', {
    items: items,
    price: computePrice(items)
  })
})

module.exports = router