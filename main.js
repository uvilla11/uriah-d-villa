(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const pages = [...document.querySelectorAll('.case-page')];
  const baseTitle = 'Uriah Villa — Embedded Systems & Robotics Engineer';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initRouter = () => {
    const home = document.getElementById('home');
    if (!home) return;

    let lastCaseTrigger = null;

    document.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#case/"]');
      if (link) lastCaseTrigger = link;
    });

    const focusHeading = container => {
      const heading = container.querySelector('h1');
      if (!heading) return;
      setTimeout(() => heading.focus({preventScroll: true}), reduceMotion ? 0 : 180);
    };

    const showRoute = () => {
      const match = location.hash.match(/^#case\/([a-z0-9-]+)$/i);
      const slug = match ? match[1].toLowerCase() : '';
      const page = match ? document.getElementById('case-' + slug) : null;
      const wasInCase = body.classList.contains('in-case');

      if (match && !page) {
        location.replace('#work');
        return;
      }

      pages.forEach(item => item.classList.remove('is-active'));

      if (page) {
        page.classList.add('is-active');
        body.classList.add('in-case');
        document.title = page.dataset.title + ' — Uriah Villa';
        scrollTo({top: 0, behavior: 'auto'});
        focusHeading(page);
        return;
      }

      body.classList.remove('in-case');
      document.title = baseTitle;

      const targetId = location.hash.slice(1);
      const target = (targetId && document.getElementById(targetId)) || document.getElementById('top');
      requestAnimationFrame(() => {
        if (target) target.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block: 'start'});
        if (wasInCase) {
          const triggerBelongsToTarget = lastCaseTrigger && lastCaseTrigger.isConnected && target && target.contains(lastCaseTrigger);
          const focusTarget = triggerBelongsToTarget
            ? lastCaseTrigger
            : target && (target.querySelector('h1, h2') || target);
          if (focusTarget) {
            if (!focusTarget.hasAttribute('tabindex') && !focusTarget.matches('a, button, input, textarea, select')) {
              focusTarget.setAttribute('tabindex', '-1');
            }
            setTimeout(() => focusTarget.focus({preventScroll: true}), reduceMotion ? 0 : 260);
          }
          lastCaseTrigger = null;
        }
      });
    };

    addEventListener('hashchange', showRoute);
    showRoute();
  };

  const initTheme = () => {
    const themeButton = document.getElementById('themeToggle');
    if (!themeButton) return;

    const syncThemeButton = () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      themeButton.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    };
    syncThemeButton();

    themeButton.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (_) {}
      syncThemeButton();
    });
  };

  const initMobileMenu = () => {
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) return;

    const mobileSummary = mobileMenu.querySelector('summary');
    mobileMenu.addEventListener('toggle', () => {
      mobileSummary.setAttribute('aria-label', mobileMenu.open ? 'Close navigation menu' : 'Open navigation menu');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.removeAttribute('open'));
    });
  };

  const initSkipLink = () => {
    const skipLink = document.querySelector('.skip-link');
    if (!skipLink) return;

    skipLink.addEventListener('click', event => {
      event.preventDefault();
      const visiblePage = pages.find(page => page.classList.contains('is-active'));
      const target = visiblePage ? visiblePage.querySelector('h1') : document.getElementById('hero-title');
      if (!target) return;
      target.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block: 'start'});
      target.focus({preventScroll: true});
    });
  };

  const initProgress = () => {
    const progress = document.getElementById('scrollProgress');
    if (!progress) return;

    let progressFrame = 0;
    const updateProgress = () => {
      progressFrame = 0;
      const range = document.documentElement.scrollHeight - innerHeight;
      const ratio = range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0;
      progress.style.transform = 'scaleX(' + ratio + ')';
    };
    addEventListener('scroll', () => {
      if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress);
    }, {passive: true});
    addEventListener('resize', updateProgress);
    updateProgress();
  };

  const initFooterTop = () => {
    const footerTop = document.getElementById('footerTop');
    if (!footerTop) return;

    footerTop.addEventListener('click', () => {
      const visiblePage = pages.find(page => page.classList.contains('is-active'));
      const heading = visiblePage ? visiblePage.querySelector('h1') : document.getElementById('hero-title');
      scrollTo({top: 0, behavior: reduceMotion ? 'auto' : 'smooth'});
      if (heading) setTimeout(() => heading.focus({preventScroll: true}), reduceMotion ? 0 : 260);
    });
  };

  const initForm = () => {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitButton = document.getElementById('submitButton');
    if (!form || !formStatus || !submitButton) return;

    form.addEventListener('submit', async event => {
      event.preventDefault();
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
      formStatus.textContent = '';
      formStatus.dataset.state = '';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {'Accept': 'application/json'}
        });
        if (!response.ok) throw new Error('Form submission failed: ' + response.status);
        form.reset();
        formStatus.dataset.state = 'success';
        formStatus.textContent = 'Message sent. I’ll get back to you soon.';
      } catch (_) {
        formStatus.dataset.state = 'error';
        formStatus.textContent = 'The form could not send. Please email me directly at uvilla11@gmail.com.';
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
      }
    });
  };

  const initYear = () => {
    const year = document.getElementById('year');
    if (!year) return;
    year.textContent = new Date().getFullYear();
  };

  [initRouter, initTheme, initMobileMenu, initSkipLink,
   initProgress, initFooterTop, initForm, initYear]
    .forEach(fn => { try { fn(); } catch (err) { console.error(err); } });
})();
