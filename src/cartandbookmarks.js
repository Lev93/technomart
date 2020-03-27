/* eslint-disable prefer-destructuring */
/* eslint-disable no-multi-assign */
import axios from 'axios';
import qs from 'qs';

export const cart = () => {
  const popupCart = document.querySelector('.modal-cart');
  if (!popupCart) {
    return;
  }
  const close = popupCart.querySelector('.modal-cart-close');
  const countBtn = document.querySelector('.basket');
  const counter = countBtn.querySelector('.count');
  close.addEventListener('click', (evt) => {
    evt.preventDefault();
    popupCart.classList.remove('modal-show');
  });
  const buttons = document.querySelectorAll('.buy');
  const closeCart = document.querySelector('.modal-cart-close-btn');
  closeCart.addEventListener('click', (event) => {
    event.preventDefault();
    popupCart.classList.remove('modal-show');
  });

  for (let i = 0; i < buttons.length; i += 1) {
    const button = buttons[i];
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const check = document.querySelector('.login-block');
      if (check) {
        return;
      }
      popupCart.classList.add('modal-show');
      countBtn.classList.add('active');
      let count = Number(counter.innerHTML);
      counter.innerHTML = count += 1;
      const id = button.dataset.id;
      const csrf = button.dataset.csrf;
      const data = { id };
      await axios({
        method: 'post',
        url: '/cart/add',
        headers: { 'X-XSRF-TOKEN': csrf },
        data: qs.stringify(data),
      });
    });
  }
};

export const bookmarks = () => {
  const countbookmark = document.querySelector('.bookmark');
  const counterbookmark = countbookmark.querySelector('.bookmarkspan');

  const tobookmarks = document.querySelectorAll('.product-bookmark');
  for (let j = 0; j < tobookmarks.length; j += 1) {
    const tobookmark = tobookmarks[j];
    tobookmark.addEventListener('click', async (e) => {
      e.preventDefault();
      const check = document.querySelector('.login-block');
      if (check) {
        return;
      }
      countbookmark.classList.add('active');
      let countb = Number(counterbookmark.innerHTML);
      counterbookmark.innerHTML = countb += 1;
      const id = tobookmark.dataset.id;
      const csrf = tobookmark.dataset.csrf;
      const data = { id };
      await axios({
        method: 'post',
        url: '/bookmarks/add',
        headers: { 'X-XSRF-TOKEN': csrf },
        data: qs.stringify(data),
      });
    });
  }
};
export const active = () => {
  const countBtn = document.querySelector('.basket');
  const counter = countBtn.querySelector('.count');
  if (Number(counter.innerHTML) > 0) {
    countBtn.classList.add('active');
  }
  const countbookmark = document.querySelector('.bookmark');
  const counterbookmark = countbookmark.querySelector('.bookmarkspan');
  if (Number(counterbookmark.innerHTML) > 0) {
    countbookmark.classList.add('active');
  }
};
