/* eslint no-underscore-dangle: 0 */
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExp: Date,
  avatarUrl: String,
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        itemId: {
          type: Schema.Types.ObjectId,
          ref: 'Item',
          required: true,
        },
      },
    ],
  },
  bookmarks: {
    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: 'Item',
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (item) {
  const items = [...this.cart.items];
  const idx = items.findIndex((c) => c.itemId.toString() === item._id.toString());

  if (idx >= 0) {
    items[idx].count += 1;
  } else {
    items.push({
      itemId: item._id,
      count: 1,
    });
  }
  this.cart = { items };
  return this.save();
};

userSchema.methods.removeFromCart = function (id) {
  let items = [...this.cart.items];
  const idx = items.findIndex((c) => c.itemId.toString() === id.toString());

  if (items[idx].count === 1) {
    items = items.filter((c) => c.itemId.toString() !== id.toString());
  } else {
    items[idx].count -= 1;
  }

  this.cart = { items };
  return this.save();
};

userSchema.methods.addToBook = function (item) {
  const items = [...this.bookmarks.items];
  const idx = items.findIndex((c) => c.itemId.toString() === item._id.toString());

  if (idx >= 0) {
    return;
  }
  items.push({
    itemId: item._id,
  });
  this.bookmarks = { items };
  return this.save();
};

userSchema.methods.removeFromBook = function (id) {
  let items = [...this.bookmarks.items];

  items = items.filter((c) => c.itemId.toString() !== id.toString());

  this.bookmarks = { items };
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = model('User', userSchema);
