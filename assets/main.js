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
        spaceBetween: 20,
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20
      }
    }
  }
);

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

// LOAD MORE BUTTON
function initLoadMore() {
  const buttons = document.querySelectorAll('.js-load-more');
  if (!buttons.length) return;

  buttons.forEach(button => {
    if (button.dataset.initialized) return;
    button.dataset.initialized = true;

    button.addEventListener('click', function () {
      const nextUrl = button.dataset.nextUrl;
      const containerSelector = button.dataset.container;

      if (!nextUrl || !containerSelector) return;

      const container = document.querySelector(containerSelector);
      if (!container) return;

      button.classList.add('is-loading');

      fetch(nextUrl)
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          const newContainer = doc.querySelector(containerSelector);
          const newButton = doc.querySelector('.js-load-more');

          if (newContainer) {
            container.insertAdjacentHTML(
              'beforeend',
              newContainer.innerHTML
            );
          }

          if (newButton) {
            button.dataset.nextUrl = newButton.dataset.nextUrl;
          } else {
            button.remove();
          }
        })
        .finally(() => {
          button.classList.remove('is-loading');
        });
    });
  });
}

// END OF LOAD MORE BUTTON

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

function initProductRecommendations(context = document) {
  const sections = context.querySelectorAll(
    '[data-product-recommendations]'
  );
  if (!sections.length) return;

  sections.forEach(section => {
    if (section.dataset.loaded === 'true') return;

    const url = section.dataset.url;
    if (!url) return;

    const wrapper = section.querySelector('.swiper-wrapper');
    if (!wrapper) return;

    fetch(url)
      .then(res => res.text())
      .then(html => {
        const temp = document.createElement('div');
        temp.innerHTML = html;

        const newSlides = temp.querySelectorAll(
          '.product-recommendations__card'
        );
        if (!newSlides.length) return;

        wrapper.innerHTML = '';

        newSlides.forEach(slide => {
          wrapper.appendChild(slide);
        });

        initRecommendationSwiper(section);

        section.dataset.loaded = 'true';
      })
      .catch(err => {
        console.error('Recommendation fetch failed:', err);
      });
  });
}

function initRecommendationSwiper(section) {
  const swiperEl = section.querySelector(
    '[data-recommendation-swiper]'
  );
  if (!swiperEl) return;

  if (swiperEl.swiper) {
    swiperEl.swiper.destroy(true, true);
  }

  new Swiper(swiperEl, {
    direction: 'horizontal',
    slidesPerView: 1.2,
    spaceBetween: 12,
    slidesOffsetBefore: 16,
    slidesOffsetAfter: 16,
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 24,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0
      }
    }
  });
}

window.addEventListener('hashchange', handleAccountPageNav);

document.addEventListener('DOMContentLoaded', function () {
  initLoadMore();
  handleAccountPageNav();
  initProductRecommendations();
});

document.addEventListener('shopify:section:load', event => {
  initProductRecommendations(event.target);
});
