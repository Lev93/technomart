/* eslint-disable no-loop-func */
export default () => {
  const slider = document.querySelector('.item-slider');
  if (!slider) {
    return;
  }
  const slides = document.querySelectorAll('.slider-item-2');
  const nextBtn = document.querySelector('.slider-control-button-2.is-next');
  const backBtn = document.querySelector('.slider-control-button-2.is-back');

  let currentSlide = 0;
  const slideCount = slides.length;

  const sliderAction = (currentSlide1, nextSlide) => {
    slides[currentSlide1].classList.remove('is-active');
    slides[nextSlide].classList.add('is-active');
  };

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
};
