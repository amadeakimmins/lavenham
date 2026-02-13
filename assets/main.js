//Mobile Header
const mobileHeaderBtns = document.querySelectorAll(
  '[data-mobile-nav-btn]'
);
const mobileHeader = document.querySelector('#mobileHeader');
const childLinkContainers = document.querySelectorAll(
  '.mobile-navigation__child-links-container'
);

mobileHeaderBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (mobileHeader) {
      mobileHeader.classList.toggle('open');
      document
        .querySelector('body')
        .classList.toggle('overflow-hidden');
    }
    navigationInner.classList.add('active');
    setTimeout(() => {
      childLinkContainers.forEach(el => {
        el.classList.remove('active');
      });
    }, 300);
  });
});

/* Mobile Navigation */
const navigationInner = document.querySelector(
  '.mobile-navigation-inner'
);
const mobileNavBtns = document.querySelectorAll(
  '.mobile-navigation__link-container'
);

mobileNavBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    const link = e.currentTarget.dataset.link;
    const childLinks = document.querySelector(
      `.mobile-navigation__child-links-container[data-link="${link}"]`
    );
    childLinks.classList.add('active');
    navigationInner.classList.remove('active');
  });
});

/* EnterView  */
const reveals = document.querySelectorAll('.reveal');
const stagger = document.querySelectorAll('.stagger');

if (reveals.length > 0) {
  enterView({
    selector: '.reveal',
    enter: (el, i) => {
      el.classList.add('entered');
    },
    exit: el => {
      el.classList.remove('entered');
    },
    offset: 0.1
  });
}

if (stagger.length > 0) {
  stagger.forEach(el => {
    el.querySelectorAll('.stagger-child').forEach((e, i) => {
      e.style.setProperty('--animation-order', i);
    });
  });
}

/* Swiper Initialiser */
const swiperContainerP = document.getElementsByClassName(
  'carousel_product'
);
for (var i = 0; i < swiperContainerP.length; i++) {
  swiperContainerP[i].classList.add('swiperP' + i);

  const swiperPage = swiperContainerP[i].querySelector(
    '.swiper-pagination'
  );

  if (swiperPage) {
    swiperPage.classList.add('pageP' + i);
  }

  var mySwiperP = new Swiper('.swiperP' + i, {
    direction: 'horizontal',
    loop: false,
    autoHeight: false,
    slidesPerView: 1,
    speed: 300,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-product-button-next',
      prevEl: '.swiper-product-button-prev'
    }
  });
}

var swiperTestimonialsCarousel = new Swiper(
  '.swiper-testimonials-carousel',
  {
    direction: 'horizontal',
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-testimonials-carousel-button-next',
      prevEl: '.swiper-testimonials-carousel-button-prev'
    },
    breakpoints: {
      768: {
        slidesPerView: 1.5,
        spaceBetween: 60
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 90
      }
    }
  }
);

var swiperFeaturedCollection = new Swiper(
  '#featuredCollectionSlider',
  {
    direction: 'horizontal',
    slidesPerView: 1.2,
    slidesOffsetBefore: 16,
    slidesOffsetAfter: 16,
    spaceBetween: 16,
    navigation: {
      nextEl: '.swiper-featured-collection-button-next',
      prevEl: '.swiper-featured-collection-button-prev'
    },
    breakpoints: {
      768: {
        slidesPerView: 3.3,
        spaceBetween: 20,
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20
      },
      1024: {
        slidesPerView: 4.5,
        // centeredSlides: true,
        // loop: true,
        spaceBetween: 20,
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20
      }
    }
  }
);

var navigationCollectionSlider = new Swiper(
  '#navigationCollectionSlider',
  {
    direction: 'horizontal',
    slidesPerView: 2.5,
    slidesOffsetBefore: 20,
    slidesOffsetAfter: 20,
    spaceBetween: 20
  }
);

var swiperMultiColumn = new Swiper('#multiColumnSlider', {
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 16,
  navigation: {
    nextEl: '.swiper-multicolumn-button-next',
    prevEl: '.swiper-multicolumn-button-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 2.5,
      spaceBetween: 40
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
      slidesOffsetBefore: 0
    }
  }
});

var swiperMultiColumnText = new Swiper('#multiColumnTextSlider', {
  direction: 'horizontal',
  slidesPerView: 1.2,
  slidesOffsetBefore: 20,
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-mulitcolumn-button-next',
    prevEl: '.swiper-mulitcolumn-button-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 2.5,
      spaceBetween: 40,
      slidesOffsetBefore: 40
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 0,
      slidesOffsetBefore: 0
    }
  }
});

var tabContentSwiper = new Swiper('.tab-content__swiper', {
  direction: 'horizontal',
  slidesPerView: 1,
  centeredSlides: false,
  loop: false,
  spaceBetween: 40,
  navigation: {
    nextEl: '.swiper-tab-content-button-next',
    prevEl: '.swiper-tab-content-button-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 2
    }
  }
});

// Cart ATC FUNCTIONALITY
const optionSelect = document.querySelector(
  '.pcard--cart [data-purchase-type-select]'
);
const subscriptionSelect = document.querySelector(
  '.pcard--cart [data-subsciption-select]'
);
const variantSelect = document.querySelector(
  '.pcard--cart [data-variant-select'
);
const sellingPlanInput = document.querySelector(
  '.pcard--cart #sellingPlanSelect'
);

const regPrice = document.querySelector(
  '.pcard--cart .product-card__normal-price'
);
const subPrice = document.querySelector(
  '.pcard--cart .product-card__sub-price'
);

const selects = document.querySelectorAll(
  '.pcard--cart .product-card__option-select-container'
);

if (optionSelect) {
  optionSelect.addEventListener('change', e => {
    const value = e.target.value;

    if (value == 'oneOff') {
      subscriptionSelect.style.display = 'none';
      subPrice.style.display = 'none';
      sellingPlanInput.name = '';
      regPrice.classList.add('product-card__normal-price--regular');
    } else if (value == 'subscription') {
      subscriptionSelect.style.display = 'flex';
      subPrice.style.display = 'block';
      sellingPlanInput.name = 'selling_plan';
      regPrice.classList.remove(
        'product-card__normal-price--regular'
      );
    }
  });
}

if (variantSelect) {
  variantSelect.addEventListener('change', e => {
    const el = e.target.options[e.target.selectedIndex];
    const elPrice = el.dataset.price;
    const elSubPrice = el.dataset.subPrice;

    regPrice.innerHTML = formatMoney(regPrice.innerHTML, elPrice);
    regPrice.dataset.price = elPrice;

    if (elSubPrice) {
      subPrice.innerHTML = formatMoney(
        regPrice.innerHTML,
        elSubPrice
      );
      subPrice.dataset.price = elSubPrice;
    }
  });
}

// Product Card Atc Forms Open / Close
let productCardAtc = document.querySelectorAll('[data-card-atc]');

function listenersToCards() {
  productCardAtc.forEach(atc => {
    const card = atc.closest('.pcard');
    const form = card.querySelector('.product-card__atc-form');
    const closeBtn = card.querySelector(
      '.product-card__atc-form-close-btn'
    );
    const quantity = card.querySelector('.product-card__quantity');
    const btns = card.querySelectorAll('.product-card__quantity-btn');
    const optionSelect = card.querySelector(
      '[data-purchase-type-select]'
    );
    const subscriptionSelect = card.querySelector(
      '[data-subsciption-select]'
    );
    const variantSelect = card.querySelector('[data-variant-select');
    const sellingPlanInput = card.querySelector('#sellingPlanSelect');

    const regPrice = card.querySelector(
      '.product-card__normal-price'
    );
    const subPrice = card.querySelector('.product-card__sub-price');

    const selects = form.querySelectorAll(
      '.product-card__option-select-container'
    );

    atc.addEventListener('click', e => {
      e.preventDefault();

      form.classList.add('active');
      if (selects) {
        selects.forEach(select => {
          select.addEventListener('click', e => {
            e.preventDefault();
          });
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      form.classList.remove('active');
    });

    btns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        changeCardQuantity(card, btn.name);
      });
    });

    closeBtn.addEventListener('click', e => {
      e.preventDefault();
      form.classList.remove('active');
    });

    quantity.addEventListener('click', e => {
      e.preventDefault();
    });

    if (optionSelect) {
      optionSelect.addEventListener('change', e => {
        const value = e.target.value;

        if (value == 'oneOff') {
          subscriptionSelect.style.display = 'none';
          subPrice.style.display = 'none';
          sellingPlanInput.name = '';
          regPrice.classList.add(
            'product-card__normal-price--regular'
          );
        } else if (value == 'subscription') {
          subscriptionSelect.style.display = 'flex';
          subPrice.style.display = 'block';
          sellingPlanInput.name = 'selling_plan';
          regPrice.classList.remove(
            'product-card__normal-price--regular'
          );
        }
      });
    }

    if (variantSelect) {
      variantSelect.addEventListener('change', e => {
        const el = e.target.options[e.target.selectedIndex];
        const elPrice = el.dataset.price;
        const elSubPrice = el.dataset.subPrice;

        const quantityAmount = quantity.querySelector('input').value;

        regPrice.innerHTML = formatMoney(
          regPrice.innerHTML,
          elPrice,
          quantityAmount
        );
        regPrice.dataset.price = elPrice;

        if (elSubPrice) {
          subPrice.innerHTML = formatMoney(
            regPrice.innerHTML,
            elSubPrice,
            quantityAmount
          );
          subPrice.dataset.price = elSubPrice;
        }
      });
    }
  });
}

listenersToCards();

// NAVIGATION MOBILE
const navigationMobile = document.querySelector('#navigation-mobile');
const headerWrapperMobile = document.querySelector('header.mobile');
const menuItemsMobile = Array.from(
  document.querySelectorAll('#headerMenuItemMobile')
);
const childLinksMobile = document.querySelectorAll(
  '.navigation__child-link--mobile'
);

menuItemsMobile.forEach(item => {
  item.addEventListener('click', e => {
    const navItem = item.dataset.navItem;

    menuItemsMobile.forEach(menuItem =>
      menuItem.classList.remove('active')
    );
    document
      .querySelectorAll('#navChildMenuMobile.active')
      .forEach(el => {
        el.classList.remove('active');
      });

    if (item.classList.contains('has-children')) {
      const childLink = document.querySelector(
        `#navChildMenuMobile[data-nav-item="${navItem}"]`
      );

      if (childLink) {
        childLink.classList.add('active');
        item.classList.add('active');
      }
    }
  });
});
// END OF NAVIGATION MOBILE

// NAVIGATION
const navigation = document.querySelector('#navigation');
const headerWrapper = document.querySelector('header');
const menuItems = Array.from(
  document.querySelectorAll('#headerMenuItem')
);
const childLinks = document.querySelectorAll(
  '.navigation__child-link'
);

menuItems.forEach(item => {
  item.addEventListener('mouseenter', e => {
    const navItem = item.dataset.navItem;

    navigation.classList.remove('active');
    headerWrapper.classList.remove('nav-active');
    menuItems.forEach(menuItem =>
      menuItem.classList.remove('active')
    );
    document.querySelectorAll('#navChildMenu.active').forEach(el => {
      el.classList.remove('active');
    });

    if (item.classList.contains('has-children')) {
      const childLink = document.querySelector(
        `#navChildMenu[data-nav-item="${navItem}"]`
      );

      if (childLink) {
        childLink.classList.add('active');
        item.classList.add('active');
        navigation.classList.add('active');
        headerWrapper.classList.add('nav-active');
      }
    }
  });
});

navigation.addEventListener('mouseleave', () => {
  navigation.classList.remove('active');
  headerWrapper.classList.remove('nav-active');
  menuItems.forEach(menuItem => menuItem.classList.remove('active'));
  childLinks.forEach(child => child.classList.remove('active'));
});
// END OF NAVIGATION

// MOBILE VIEWPORT HEIGHT FIX
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

/* Toggle Class (Generic) */
function toggleClass(modalName, className = 'active') {
  var modalActive = document.querySelector(modalName);
  modalActive.classList.toggle(className);
}

function toggleMultipleClass(
  selector1,
  selector2,
  className = 'active'
) {
  const el1 = document.querySelector(selector1);
  const el2 = document.querySelector(selector2);

  if (el1) el1.classList.toggle(className);
  if (el2) el2.classList.toggle(className);
}

/* Toggle forgot password form */
const forgotPasswordButtons = document.querySelectorAll(
  '.login__forgot-password-button'
);

forgotPasswordButtons.forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    toggleClass('.login__form');
    toggleClass('.forgot-password-form');

    console.log('here', button);
  });
});

/* Change Product Quantity */
function changeQuantity(formId, quantity) {
  var formQ = document.querySelector(formId);

  if (quantity == '+') {
    Number(formQ.value++);
  } else if (quantity == '-' && formQ.value > 1) {
    Number(formQ.value--);
  }
}

/* Open Cart */
function cartOpen() {
  document.querySelector('body').classList.add('js-my-cart-open');
}

/* Details Animator */
const details = document.querySelectorAll('details');

if (details) {
  details.forEach(targetDetail => {
    targetDetail.addEventListener('click', function (e) {
      if (targetDetail.hasAttribute('open')) {
        e.preventDefault();
        targetDetail.classList.add('closing');
        setTimeout(() => {
          targetDetail.removeAttribute('open');
          targetDetail.classList.remove('closing');
        }, 390);
      }
    });
  });
}

/* Orphan Remove and LSEP Removal */
var nbspSelectors = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'a',
  'span'
];
var nbspWordMin = 10; //Minimum words within parent tag to activate script

nbspSelectors.forEach(function (selector) {
  var nbspElements = document.querySelectorAll(selector);
  nbspElements.forEach(function (element) {
    element.innerHTML = element.innerHTML.replace(/\u2028/g, '');
    element.innerHTML = element.innerHTML.replace(/&#8232;/g, '');
    var wordCount = element.innerHTML.split(' ').length;
    if (wordCount >= nbspWordMin) {
      element.innerHTML = element.innerHTML.replace(
        / ([^ ]*)$/,
        '&nbsp;$1'
      );
    }
  });
});

/* Lazy Load Initialiser */
var lazyLoadInstance = new LazyLoad({});

/* Liquid Ajax Cart */

liquidAjaxCart.subscribeToCartAjaxRequests(
  (state, subscribeToResult) => {
    if (state.requestType == 'add') {
      const form = state.info.initiator;
      let btnInner = '';

      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btnInner = btn.innerHTML;
        btn.innerHTML = 'ADDING';
      }

      subscribeToResult(state => {
        const btn = form.querySelector('button[type="submit"]');
        if (state.responseData.ok) {
          cartOpen();
        }

        if (btn) {
          setTimeout(() => {
            btn.innerHTML = btnInner;
          }, 300);
        }
      });
    }
  }
);

/* enterview */
/* Load video on enter */

const llVideos = document.querySelectorAll('video.lazy');

if (llVideos.length > 0) {
  enterView({
    selector: '.video-ll',
    enter: function (el) {
      el.load();
      el.play();
    },
    offset: 0.1
  });
}

// Account nav
function handleAccountPageNav() {
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  const links = document.querySelectorAll('.account-nav-link');

  if (!links.length) return;

  links.forEach(link => link.classList.remove('active'));

  if (pathname === '/account') {
    const sections = document.querySelectorAll('.account-section');

    sections.forEach(section => section.classList.add('hidden'));

    const currentHash = hash || '#dashboard';
    const sectionId = currentHash.replace('#', 'account-');
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
      activeSection.classList.remove('hidden');
    }

    links.forEach(link => {
      const hrefHash = link.getAttribute('href').split('#')[1];
      if (`#${hrefHash}` === currentHash) {
        link.classList.add('active');
      }
    });

    if (!hash) {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}#dashboard`
      );
    }
  }

  if (pathname.includes('/account/addresses')) {
    const addressLink = document.getElementById('addresses-link');
    addressLink?.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', handleAccountPageNav);
window.addEventListener('hashchange', handleAccountPageNav);
