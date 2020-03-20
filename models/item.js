const {Schema, model} = require('mongoose')

const item = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    required: true
  },
  img: String,
  imgBig1: String,
  imgBig2: String,
  imgBig3: String,
  type: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: String,

  production: String,
  power: String,
  totalBoughts: {
    type: Number,
    required: true
  },
  specifications: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('Item', item)