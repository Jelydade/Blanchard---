// dropdown-menu

document.querySelectorAll(".menu__btn").forEach(button => {
  button.addEventListener('click', function(event) {
    document.querySelectorAll('.menu__item').forEach(item => {
      if(item.querySelector('.menu__btn') !== button) {
        item.classList.remove('menu__item--open');
      }
    });
    event.isClick = true;
    button.parentElement.classList.toggle('menu__item--open');
  });
});

document.body.addEventListener('click', function(event) {
  if (
      event._isClick == true ||
      event.target.classList.contains('menu__btn') == true ||
      event.target.classList.contains('dropdown-menu') == true
    ) return;
  document.querySelectorAll('.menu__item').forEach(item => {
    item.classList.remove('menu__item--open');
  });
});


// select

const element = document.querySelector('.gallery__select');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',
	position: 'bottom'
});

//slider

const swiper = new Swiper('.gallery-swiper', {
  loop: false,
  navigation: {
    nextEl: '.gallery-swiper-button-next',
    prevEl: '.gallery-swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  },
  slidesPerView: 1,
  spaceBetween: 20,
  a11y: {
    paginationBulletMessage: 'Слайд номер {{index}}',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 38,
    },
    1440: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    }
  }
});

const eventsSwiper = new Swiper('.events-swiper', {
  loop: false,
  pagination: {
    el: '.events-swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  navigation: {
    nextEl: '.events-swiper-button-next',
    prevEl: '.events-swiper-button-prev',
  },
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 34,
  a11y: {
    paginationBulletMessage: 'Слайд номер {{index}}',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 27,
    },
    1440: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    }
  }
});

const partnersSwiper = new Swiper('.partners-swiper', {
  loop: true,
  navigation: {
    nextEl: '.partners-swiper-button-next',
    prevEl: '.partners-swiper-button-prev',
  },
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 34,
  a11y: {
    paginationBulletMessage: 'Слайд номер {{index}}',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },
    992: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50,
    },
    1440: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    }
  }
});

// accordion

new Accordion ('.accordion-container');

// tabs

let tabsLink = document.querySelectorAll('.persons__link');
let tabsCard = document.querySelectorAll('.catalog__card');

tabsLink.forEach(function(elem){
  elem.addEventListener('click', function(e) {
    const path = e.currentTarget.dataset.path;

    tabsCard.forEach(function(elem) {
       elem.classList.remove('catalog__card--active');
    });
    document.querySelector(`[data-card="${path}"]`).classList.add('catalog__card--active');
  });
});

// map

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.75846806898367,37.60108849999989],
    zoom: 14
  });

  var myPlacemark = new ymaps.Placemark([55.75846806898367,37.60108849999989], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/location.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [-3, -42]
  });
  // myMap.controls.remove('geolocationControl'); // удаляем геолокацию
  myMap.controls.remove('searchControl'); // удаляем поиск
  myMap.controls.remove('trafficControl'); // удаляем контроль трафика
  myMap.controls.remove('typeSelector'); // удаляем тип
  myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  // myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
  myMap.controls.remove('rulerControl'); // удаляем контрол правил
  myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);
}

// Inputmask

var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999)-999-99-99");
im.mask(selector);

// validation

const validation = new JustValidate('#form', {
    errorLabelStyle: {
      color: '#D11616',
    },
  });

validation.addField('#name', [

  {
    rule: 'required',
    errorMessage: 'Введите имя',
  },
  {
    rule: 'minLength',
    value: 2,
    errorMessage: 'Не короче 2 символов',
  },
  {
    rule: 'maxLength',
    value: 30,
    errorMessage: 'Слишком длинное имя',
  },

])
  .addField('#tel', [
  {
    rule: 'required',
    errorMessage: 'Введите телефон',
  },
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Number(phone) && phone.length === 10;
    },
    errorMessage: 'Телефон некорректный',
  },
])

validation.onSuccess(function () {
  document.getElementById('form').submit();
});

//burger

let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let menuLinks = menu.querySelectorAll('.nav__link');

burger.addEventListener('click', function() {
  burger.classList.toggle('burger--active');
  menu.classList.toggle('header__nav-visible');
  document.body.classList.toggle('stop-scroll');
});

menuLinks.forEach(function(elem) {
  elem.addEventListener('click', function() {
    burger.classList.remove('burger--active');
    menu.classList.remove('header__nav-visible');
    document.body.classList.remove('stop-scroll');
  });
});

// search

let searchBtn = document.querySelector('.search__btn-tablet');
let cancelBtn = document.querySelector('.search__btn-cancel');
let searchBox = document.querySelector('.search-wrap');
let searchInput = document.querySelector('.search__input-tablet');


searchBtn.addEventListener('click', function() {
  searchBox.classList.add('search-wrap--active');
  cancelBtn.classList.add('search__btn-cancel--active');
  searchInput.classList.add('search__input-tablet--active');
});

cancelBtn.addEventListener('click', function() {
  searchBox.classList.remove('search-wrap--active');
  cancelBtn.classList.remove('search__btn-cancel--active');
  searchInput.classList.remove('search__input-tablet--active');
});


