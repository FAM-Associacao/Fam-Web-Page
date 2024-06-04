var mySwiper = new Swiper('.mySwiper', {
  speed: 3000,
  direction: 'horizontal',
  pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
  },
  zoom: true,
  keyboard: {
      enabled: true,
      onlyInViewport: false,
  },
  mousewheel: {
      invert: true,
  },
  autoplay: {
      delay: 2000,
  },
  loop: true,
  breakpoints: {
    1900: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    360: {
      slidesPerView: 1,
      spaceBetween: 10,
    }
  }
});

