class MegaNavigation {
  constructor() {
    this.container = document.querySelector('.header__inner');
    this.nav = this.container?.querySelector('.nav');
    if (!this.container || !this.nav) return;

    this.triggers = this.nav.querySelectorAll('[data-nav-trigger]');
    this.activeHandle = null;
    this.closeTimeout = null;

    this.bindEvents();

    this.mobileNav = document.getElementById('mobile-nav');
    this.mobileToggle = document.querySelector('.mobile-toggle');
    this.isMobileOpen = false;

    this.initMobile();
  }

  bindEvents() {
    // --- CLICK (desktop + fallback) ---
    this.nav.addEventListener('click', e => {
      const trigger = e.target.closest('[data-nav-trigger]');
      if (!trigger) return;

      e.preventDefault();
      const handle = trigger.dataset.navTrigger;
      this.toggle(handle);
    });

    // --- HOVER (DESKTOP ONLY) ---
    // --- HOVER (DESKTOP ONLY) ---
    if (
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      this.nav.addEventListener('mouseover', e => {
        if (this.isMobileOpen) return;

        const navItem = e.target.closest('.nav__item');
        if (!navItem || !this.nav.contains(navItem)) return;

        this.clearCloseTimeout();

        const trigger = navItem.querySelector('[data-nav-trigger]');
        const handle = trigger?.dataset.navTrigger;
        const panel = handle
          ? document.getElementById(`panel-${handle}`)
          : null;

        if (panel) {
          this.open(handle);
        } else {
          this.closeAll();
        }
      });

      const panelsContainer =
        this.container.querySelector('.nav-panels');

      if (panelsContainer) {
        panelsContainer.addEventListener('mouseenter', () => {
          this.clearCloseTimeout();
        });

        panelsContainer.addEventListener('mouseleave', () => {
          this.startCloseTimeout();
        });
      }

      this.container.addEventListener('mouseleave', () => {
        this.startCloseTimeout();
      });
    }

    // --- OUTSIDE CLICK CLOSE ---
    document.addEventListener('click', e => {
      if (!this.container.contains(e.target)) {
        this.closeAll();
      }
    });

    // --- ESCAPE CLOSE ---
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (this.isMobileOpen) {
          this.closeMobile();
        } else {
          this.closeAll();
        }
      }
    });
  }

  toggle(handle) {
    if (this.activeHandle === handle) {
      this.closeAll();
      return;
    }

    this.open(handle);
  }

  open(handle) {
    if (this.activeHandle === handle) return;

    // Close only previous active panel
    if (this.activeHandle) {
      const previousPanel = document.getElementById(
        `panel-${this.activeHandle}`
      );
      const previousTrigger = this.nav.querySelector(
        `[data-nav-trigger="${this.activeHandle}"]`
      );

      if (previousPanel) previousPanel.classList.remove('is-active');
      if (previousTrigger)
        previousTrigger.setAttribute('aria-expanded', 'false');
    }

    const trigger = this.nav.querySelector(
      `[data-nav-trigger="${handle}"]`
    );
    const panel = document.getElementById(`panel-${handle}`);

    if (!panel || !trigger) return;

    panel.classList.add('is-active');
    trigger.setAttribute('aria-expanded', 'true');

    this.activeHandle = handle;
    document.body.classList.add('nav-active');
  }

  closeAll() {
    this.triggers.forEach(trigger => {
      const handle = trigger.dataset.navTrigger;
      const panel = document.getElementById(`panel-${handle}`);

      trigger.setAttribute('aria-expanded', 'false');

      if (panel) {
        panel.classList.remove('is-active');
      }
    });

    this.activeHandle = null;
    document.body.classList.remove('nav-active');
  }

  startCloseTimeout() {
    this.closeTimeout = setTimeout(() => {
      this.closeAll();
    }, 120);
  }

  clearCloseTimeout() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  initMobile() {
    if (!this.mobileNav || !this.mobileToggle) return;

    const rootLevel = this.mobileNav.querySelector(
      '.mobile-nav__level--root'
    );
    const triggers = this.mobileNav.querySelectorAll(
      '[data-mobile-trigger]'
    );
    const backBtn = this.mobileNav.querySelector('.mobile-nav__back');
    const closeBtn = this.mobileNav.querySelector(
      '.mobile-nav__close'
    );

    let activePanel = null;

    // --- OPEN ---
    this.mobileToggle.addEventListener('click', () => {
      this.mobileNav.hidden = false;

      requestAnimationFrame(() => {
        this.mobileNav.classList.add('is-active');
      });

      this.mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-lock');
      this.isMobileOpen = true;

      backBtn.hidden = true;
    });

    // --- DRILL ---
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const handle = trigger.dataset.mobileTrigger;
        const targetPanel = this.mobileNav.querySelector(
          `[data-mobile-panel="${handle}"]`
        );

        if (!targetPanel) return;

        rootLevel.classList.add('is-leaving');
        targetPanel.classList.add('is-active');
        activePanel = targetPanel;

        backBtn.hidden = false;
      });
    });

    // --- BACK ---
    backBtn.addEventListener('click', () => {
      if (!activePanel) return;

      rootLevel.classList.remove('is-leaving');
      activePanel.classList.remove('is-active');
      activePanel = null;

      backBtn.hidden = true;
    });

    // --- CLOSE ---
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeMobile();
      });
    }
  }

  closeMobile() {
    if (!this.mobileNav) return;

    const rootLevel = this.mobileNav.querySelector(
      '.mobile-nav__level--root'
    );
    const panels = this.mobileNav.querySelectorAll(
      '[data-mobile-panel]'
    );
    const backBtn = this.mobileNav.querySelector('.mobile-nav__back');

    this.mobileNav.classList.remove('is-active');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-lock');

    rootLevel.classList.remove('is-leaving');
    panels.forEach(panel => panel.classList.remove('is-active'));

    backBtn.hidden = true;

    setTimeout(() => {
      this.mobileNav.hidden = true;
    }, 350);

    this.isMobileOpen = false;
  }
}

class HeaderSearch {
  constructor() {
    this.abortController = null;
    this.init();
  }

  init() {
    this.inputs = document.querySelectorAll('.header__search-input');
    this.resultsContainers = document.querySelectorAll(
      '[data-predictive-search]'
    );

    if (!this.inputs.length || !this.resultsContainers.length) return;

    this.bindEvents();
  }

  bindEvents() {
    this.inputs.forEach(input => {
      input.addEventListener('input', e => this.handleInput(e));
    });
  }

  async handleInput(e) {
    const query = e.target.value.trim();

    if (query.length < 2) {
      this.clearResults();
      return;
    }

    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    try {
      const response = await fetch(
        `/search/suggest?q=${encodeURIComponent(
          query
        )}&section_id=predictive-search&resources[type]=product&resources[limit]=20`,
        { signal: this.abortController.signal }
      );

      const html = await response.text();
      this.renderResults(html);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Predictive search error:', err);
      }
    }
  }

  renderResults(html) {
    this.resultsContainers.forEach(container => {
      container.innerHTML = html;
    });
  }

  clearResults() {
    this.resultsContainers.forEach(container => {
      container.innerHTML = '';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MegaNavigation();
  new HeaderSearch();
});
