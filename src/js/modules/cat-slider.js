// Подключение свайпера
import Swiper, { Navigation, Scrollbar, Thumbs } from 'swiper';
Swiper.use([Navigation, Scrollbar, Thumbs]);

new Swiper('.cat-slider__swiper', {
  slidesPerView: 'auto',
  spaceBetween: 40,
  scrollbar: {
    el: '.cat-slider__scroll',
    draggable: true,
  },
  navigation: {
    nextEl: '.cat-slider__slider-btn--next',
    prevEl: '.cat-slider__slider-btn--prev',
  }
});

const thumbsSlider = new Swiper('.thumbs-slider', {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
})

const sliderTop = new Swiper('.slider-top', {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  thumbs: {
    swiper: thumbsSlider,
  },
})
