﻿// Scroll Header
function scrollHeader() {
  const headerTop = document.querySelector(".header-top");
  const headerBottom = document.querySelector(".header-bottom");
  const cartDropdown = document.querySelector(".cart__dropdown");
  const accountDropdown = document.querySelector(".account__dropdown");

  window.addEventListener("scroll", () => {
    if (window.innerWidth <= 991) {
      if (this.scrollY >= 85) {
        headerTop.classList.add("active");
        cartDropdown.classList.remove("active");
        accountDropdown.classList.remove("active");
      } else headerTop.classList.remove("active");
    } else {
      if (this.scrollY >= 160) {
        headerBottom.classList.add("active");
        cartDropdown.classList.remove("active");
        accountDropdown.classList.remove("active");
      } else headerBottom.classList.remove("active");
    }
  });
}
scrollHeader();

// Search Control
function searchControl() {
  const searchContainer = document.querySelector(".header__search");
  const searchBtn = document.querySelector(".search__btn");
  const searchBtnXSM = document.querySelector(".header__search__open");

  searchBtn.onclick = () => {
    if (576 <= window.innerWidth && window.innerWidth <= 991) {
      if (searchContainer.className.includes("active")) {
        searchContainer.classList.remove("active");
      } else {
        searchContainer.classList.add("active");
        return false;
      }
    }
  };

  searchBtnXSM.addEventListener("click", () => {
    searchContainer.classList.toggle("active");
  });
}
searchControl();

// Cart Control
function cartControl() {
  const cartBtn = document.querySelector(".cart__link");
  const cartDropdown = document.querySelector(".cart__dropdown");

  cartBtn.addEventListener("click", () => {
    cartDropdown.classList.toggle("active");
  });

  window.addEventListener("click", (e) => {
    const cart = document.querySelector(".header__cart");
    if (!cart.contains(e.target)) {
      cartDropdown.classList.remove("active");
    }
  });

  // Calculate total product price
  const cartProductItems = document.querySelectorAll(".cart__item");
  const productPriceSubtotal = document.querySelector(".cart__items-price");
  const productShipping = document.querySelector(".cart__ship-price");
  const productPriceTotal = document.querySelector(".cart__total-price");
  const productCount = document.querySelector(".header__cart .cart__count");
  const cartProctCount = document.querySelector(".cart__sumary-count");

  if (cartProductItems.length == 0) {
    cartDropdown.innerHTML = `<div class="cart-empty__box">
              <img src='assets/image/Cart-empty.png' alt='Cart empty'>
              <p class="cart-empty__desc">Your cart is empty</p>
              <a href="Home.aspx" class="cart-empty__button button button-wg">Shop now</a>
          </div>`;
  }

  var count = 0,
    priceSubtotal = 0,
    priceTotal = 0;

  cartProductItems.forEach((item) => {
    const productPrice = item.querySelector(".cart-price");
    const productQuantity = item.querySelector(".cart-qty-number");

    count += parseInt(productQuantity.innerHTML);
    priceSubtotal +=
      parseFloat(productPrice.innerHTML.slice(1)) *
      parseInt(productQuantity.innerHTML);
  });
  priceTotal = priceSubtotal - parseFloat(productShipping.innerHTML.slice(1));

  productCount.innerHTML = `${count}`;
  cartProctCount.innerHTML = `${count} items`;
  productPriceSubtotal.innerHTML = `$${priceSubtotal.toFixed(2)}`;
  productPriceTotal.innerHTML = `$${priceTotal.toFixed(2)}`;
}
cartControl();

// Account Header Control
function headerAccountControl() {
  const headerAccountBtn = document.querySelector(".account__link");
  const headerAccountDropdown = document.querySelector(".account__dropdown");

  headerAccountBtn.addEventListener("click", () => {
    headerAccountDropdown.classList.toggle("active");
  });

  window.addEventListener("click", (e) => {
    const headerAccount = document.querySelector(".header__account");
    if (!headerAccount.contains(e.target)) {
      headerAccountDropdown.classList.remove("active");
    }
  });
}
headerAccountControl();

// Navbar Control
function navbarControl() {
  const navbar = document.querySelector("#navbar");
  const navbarOpen = document.querySelector(".navbar__open");
  const navbarClose = document.querySelector(".navbar__close");
  const overlay = document.querySelector("#overlay");
  const html = document.querySelector("html");

  navbarOpen.addEventListener("click", () => {
    navbar.classList.add("active");
    overlay.classList.add("active");
    html.classList.add("dis-scroll");
  });

  if (navbarClose) {
    navbarClose.addEventListener("click", () => {
      navbar.classList.remove("active");
      overlay.classList.remove("active");
      html.classList.remove("dis-scroll");
    });
  }
  overlay.addEventListener("click", () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    html.classList.remove("dis-scroll");
  });
  window.addEventListener("resize", () => {
    const windownWidth = window.innerWidth;

    if (windownWidth >= 992 && navbar.className.includes("active")) {
      navbar.classList.remove("active");
      overlay.classList.remove("active");
      html.classList.remove("dis-scroll");
    }
  });
}
navbarControl();

// Footer List Control
function footerListControl() {
  const footerDrop = document.querySelectorAll(".footer__content.has-drop");

  footerDrop.forEach((item) => {
    const footerTitle = item.querySelector(".footer__title");

    footerTitle.addEventListener("click", () => {
      const footerDropActive = document.querySelector(
        ".footer__content.active"
      );

      if (footerDropActive && footerDropActive != item)
        footerDropActive.classList.remove("active");
      item.classList.toggle("active");
    });
  });
}
footerListControl();

// Swiper Slider
function swiperSlider() {
  const homeBannerSwiper = new Swiper(".home-banner__slider .swiper", {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".home-banner__slider .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".home-banner__slider .swiper-next",
      prevEl: ".home-banner__slider .swiper-prev",
    },
  });

  const categoriesSwiper = new Swiper(".categories__slider .swiper", {
    loop: true,
    speed: 500,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".categories__navigation .swiper-next",
      prevEl: ".categories__navigation .swiper-prev",
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  const newProductSwiper = new Swiper(".newproduct__slider .swiper", {
    loop: true,
    speed: 500,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".newproduct__container .swiper-next",
      prevEl: ".newproduct__container .swiper-prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  const specialProductSwiper = new Swiper(".specialproduct__slider .swiper", {
    loop: true,
    speed: 500,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".specialproduct__container .swiper-next",
      prevEl: ".specialproduct__container .swiper-prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  const brandSwiper = new Swiper(".brand__slider .swiper", {
    loop: true,
    speed: 500,
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".brand__slider .swiper-next",
      prevEl: ".brand__slider .swiper-prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  });

  const quickviewSwiper = new Swiper(".quickview__slider .swiper", {
    speed: 500,
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: {
      nextEl: ".quickview__slider .swiper-next",
      prevEl: ".quickview__slider .swiper-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
    },
  });
}
swiperSlider();

// Render Star
function star() {
  const stars = document.querySelectorAll(".product__rating i");
  stars.forEach((star) => {
    if (star.className.indexOf("star-full") != -1)
      star.classList.add("fas", "fa-star");
    else if (star.className.indexOf("star-half") != -1)
      star.classList.add("fas", "fa-star-half-alt");
    else star.classList.add("far", "fa-star");
  });
}
star();

// scrollUp
function scrollUp() {
  const scrollUp = document.querySelector("#scrollup");

  window.addEventListener("scroll", () => {
    if (this.scrollY >= 350) scrollUp.classList.add("active");
    else scrollUp.classList.remove("active");
  });
}
scrollUp();
