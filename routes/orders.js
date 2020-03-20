const {Router} = require('express')
const Order = require('../models/order')
const router = Router()

router.get('/', async (req, res) => {
    try {
      const orders = await Order.find({'user.userId': req.user._id}).populate('user.userId')
      .then(documents => {
        const context = {
          usersDocuments: documents.map(document => {
            return {
              _id: document._id,
              date: document.date,
              user: {
                  userId: {
                      name: document.user.userId.name,
                      email:document.user.userId.email
                  }
              },
              items: document.items.map(i => {
                return {
                  count: i.count,
                  item: {
                      price: i.item.discountPrice,
                      title: i.item.title,
                  }
                }
              })
            }
        })
        }
      res.render('orders', {
        orders: context.usersDocuments.map(o => {
            return {
              ...o,
              price: o.items.reduce((total, c) => {
                return total += c.count * c.item.price
              }, 0)
            }
          })
      })
    })
    } catch (e) {
      console.log(e)
    }
  })

router.post('/', async (req, res) => {
    try {
      const user = await req.user
        .populate('cart.items.itemId')
        .execPopulate()
  
      const items = user.cart.items.map(i => ({
        count: i.count,
        item: {...i.itemId._doc}
      }))
  
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        items: items
      })
  
      await order.save()
      await req.user.clearCart()
  
      res.redirect('/orders')
    } catch (e) {
      console.log(e)
    }
  })
  

module.exports = router