export default () => {
  const check = document.querySelector('.login-block');
  if (!check) {
    return;
  }
  const modal = document.createElement('div');
  modal.classList.add('modal-cart', 'popup', 'modal-show');
  modal.innerHTML = `<button id="auth-close" class="popup-close modal-cart-close"><span class="visually-hidden">закрыть</span></button>
  <div class="modal-cart-content">
      <p class="modal-cart-text modal-cart-text-error">Чтобы совершать покупки, войдите или зарегистрируйтесь</p>
  </div>
  <div class="modal-cart-footer">
      <a class="modal-cart-btn" href="../auth/login">Войти</a>
      <a class="modal-cart-close-btn" href="../auth/registration">Зарегистрироваться</a>
  </div>`;
  const bookmark = document.querySelector('.bookmark');
  bookmark.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.append(modal);
    const close = document.querySelector('#auth-close');
    close.addEventListener('click', (event2) => {
      event2.preventDefault();
      modal.remove();
    });
  });

  const basket = document.querySelector('.basket');
  basket.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.append(modal);
    const close = document.querySelector('#auth-close');
    close.addEventListener('click', (event2) => {
      event2.preventDefault();
      modal.remove();
    });
  });
  const order = document.querySelector('.order');
  order.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.append(modal);
    const close = document.querySelector('#auth-close');
    close.addEventListener('click', (event2) => {
      event2.preventDefault();
      modal.remove();
    });
  });
  const buttons = document.querySelectorAll('.buy');
  for (let i = 0; i < buttons.length; i += 1) {
    const button = buttons[i];
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      document.body.append(modal);
      const close = document.querySelector('#auth-close');
      close.addEventListener('click', (event2) => {
        event2.preventDefault();
        modal.remove();
      });
    });
  }
  const tobookmarks = document.querySelectorAll('.product-bookmark');
  for (let i = 0; i < tobookmarks.length; i += 1) {
    const tobookmark = tobookmarks[i];
    tobookmark.addEventListener('click', async (e) => {
      e.preventDefault();
      document.body.append(modal);
      const close = document.querySelector('#auth-close');
      close.addEventListener('click', (event2) => {
        event2.preventDefault();
        modal.remove();
      });
    });
  }
};
