/* eslint-disable no-loop-func */
export default () => {
  const slider = document.querySelector('.slider');
  if (!slider) {
    return;
  }
  const slides = document.querySelectorAll('.slider-item');
  const nextBtn = document.querySelector('.slider-control-button.is-next');
  const backBtn = document.querySelector('.slider-control-button.is-back');
  const bulits = document.querySelector('.slider-bulits');

  let currentSlide = 0;
  const slideCount = slides.length;

  let bulit = '';
  for (let i = 0; i < slideCount; i += 1) {
    bulit += `<li class="slider-bulit"><button class="slider-bulit-button ' + ${(i === currentSlide ? 'is-active' : '')} + '" type="button" data-index="' + i + '"><span class="visually-hidden">' + i + '</span></button></li>`;
  }
  bulits.innerHTML = bulit;

  const bulitButtons = bulits.querySelectorAll('.slider-bulit-button');

  const sliderAction = (currentSlide1, nextSlide) => {
    slides[currentSlide1].classList.remove('is-active');
    slides[nextSlide].classList.add('is-active');
    bulitButtons[currentSlide1].classList.remove('is-active');
    bulitButtons[nextSlide].classList.add('is-active');
  };


  for (let i = 0; i < slideCount; i += 1) {
    bulitButtons[i].addEventListener('click', (e) => {
      const nextSlide = Number(e.target.getAttribute('data-index'));
      sliderAction(currentSlide, nextSlide);
      currentSlide = nextSlide;
    });
  }

  nextBtn.addEventListener('click', () => {
    let nextSlide = currentSlide + 1;
    if (nextSlide >= slideCount) {
      nextSlide = 0;
    }
    sliderAction(currentSlide, nextSlide);
    currentSlide = nextSlide;
  });
  backBtn.addEventListener('click', () => {
    let backSlide = currentSlide - 1;
    if (backSlide < 0) {
      backSlide = slideCount - 1;
    }
    sliderAction(currentSlide, backSlide);
    currentSlide = backSlide;
  });

  const link = document.querySelector('.redbutton-2');
  const popup = document.querySelector('.window-message');
  const close = popup.querySelector('.window-message-close');
  const login = popup.querySelector('[name=name]');

  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.classList.add('modal-show');
    setTimeout(() => {
      login.focus();
    }, 400);
  });
  close.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.classList.remove('modal-show');
    popup.classList.remove('modal-error');
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popup.classList.contains('modal-show')) {
        popup.classList.remove('modal-show');
        popup.classList.remove('modal-error');
      }
    }
  });
  const link2 = document.querySelector('#credit');
  link2.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.classList.add('modal-show');
    setTimeout(() => {
      login.focus();
    }, 400);
  });

  const mapLink = document.querySelector('.map');

  const mapPopup = document.querySelector('.map-big');
  const mapClose = mapPopup.querySelector('.window-message-close');
  mapLink.addEventListener('click', (evt2) => {
    evt2.preventDefault();
    mapPopup.classList.add('modal-show');
  });

  mapClose.addEventListener('click', (evt2) => {
    evt2.preventDefault();
    mapPopup.classList.remove('modal-show');
  });

  window.addEventListener('keydown', (evt2) => {
    if (evt2.keyCode === 27) {
      if (mapPopup.classList.contains('modal-show')) {
        evt2.preventDefault();
        mapPopup.classList.remove('modal-show');
      }
    }
  });
};
