// Подключение свайпера
import Swiper, { Navigation, Scrollbar } from 'swiper';
Swiper.use([Navigation, Scrollbar]);

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
