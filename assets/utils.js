// Query selector
function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Query selector all
function qsa(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

// Add event listener
function addGlobalEventListener(
  type,
  selector,
  callback,
  options,
  parent = document
) {
  parent.addEventListener(
    type,
    e => {
      if (e.target.matches(selector)) callback(e);
    },
    options
  );
}

// First of array
function first(array, n = 1) {
  if (n === 1) return array[0];
  return array.filter((_, index) => index < n);
}

// Last of array
function last(array, n = 1) {
  if (n === 1) return array[array.length - 1];
  return array.filter((_, index) => array.length - index <= n);
}

// Random item from array
function sample(array) {
  return array[randomNumberBetween(0, array.length - 1)];
}

function updateQueryString(key, value, url) {
  if (!url) {
    url = window.location.href;
  }

  let updated = '';
  var re = new RegExp('([?&])' + key + '=.*?(&|#|$)(.*)', 'gi'),
    hash;

  if (re.test(url)) {
    if (typeof value !== 'undefined' && value !== null) {
      updated = url.replace(re, '$1' + key + '=' + value + '$2$3');
    } else {
      hash = url.split('#');
      url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
      if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
        url += '#' + hash[1];
      }
      updated = url;
    }
  } else {
    if (typeof value !== 'undefined' && value !== null) {
      var separator = url.indexOf('?') !== -1 ? '&' : '?';
      hash = url.split('#');
      url = hash[0] + separator + key + '=' + value;
      if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
        url += '#' + hash[1];
      }
      updated = url;
    } else {
      updated = url;
    }
  }

  window.history.replaceState({ path: updated }, '', updated);
}

/* Change Product Quantity */
function changeCardQuantity(card, quantity) {
  const input = card.querySelector('.product-card__quantity-input');

  const regPrice = card.querySelector('.product-card__normal-price');
  const subPrice = card.querySelector('.product-card__sub-price');

  if (quantity == 'plus') {
    Number(input.value++);
  } else if (quantity == 'minus' && input.value > 1) {
    Number(input.value--);
  }

  updatePrice(input, regPrice, subPrice);
}

/* Update Price */
function updatePrice(input, regPriceEl, subPriceEl) {
  const quantity = input.value;
  const currency = regPriceEl.innerHTML.charAt(0);

  if (subPriceEl) {
    const subPrice = (subPriceEl.dataset.price / 100) * quantity;
    subPriceEl.innerHTML = currency + subPrice.toFixed(2);
  }

  const regPrice = (regPriceEl.dataset.price / 100) * quantity;
  regPriceEl.innerHTML = currency + regPrice.toFixed(2);
}

function formatMoney(originalPrice, newPrice, quantity = 1) {
  const currency = originalPrice.charAt(0);
  return currency + ((newPrice / 100) * quantity).toFixed(2);
}
