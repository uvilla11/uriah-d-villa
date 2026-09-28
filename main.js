/**
 * Precision Signal — Editorial Engineering System
 * Interactive Logic: Hash Router, Workspace Controls, Search & Filter, Theme, and Accessibility
 */
(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const baseTitle = 'Uriah Villa — MCU Applications & Embedded Systems Engineer';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // View Containers
  const homeView = document.getElementById('homeView');
  const workspaceView = document.getElementById('workspaceView');
  const casePages = [...document.querySelectorAll('.case-page')];

  /* --------------------------------------------------------------------------
     01. Hash Router
     -------------------------------------------------------------------------- */
  const initRouter = () => {
    if (!homeView || !workspaceView) return;

    let lastTrigger = null;

    document.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#"]');
      if (link) lastTrigger = link;
    });

    const focusHeading = container => {
      const heading = container.querySelector('h1, h2');
      if (!heading) return;
      if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
      setTimeout(() => heading.focus({preventScroll: true}), reduceMotion ? 0 : 160);
    };

    const updateNavActive = activeRoute => {
      document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#' + activeRoute || (activeRoute === 'home' && href === '#')) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    };

    const showRoute = () => {
      const hash = location.hash.replace(/^#/, '');

      // Check for Case Studies: #case/:slug
      const caseMatch = hash.match(/^case\/([a-z0-9-]+)$/i);
      if (caseMatch) {
        const slug = caseMatch[1].toLowerCase();
        const targetCase = document.getElementById('case-' + slug);

        if (!targetCase) {
          location.replace('#work');
          return;
        }

        homeView.style.display = 'none';
        workspaceView.classList.remove('is-active');
        casePages.forEach(p => p.classList.remove('is-active'));

        targetCase.classList.add('is-active');
        document.title = (targetCase.dataset.title || 'Case Study') + ' — Uriah Villa';
        scrollTo({top: 0, behavior: 'auto'});
        focusHeading(targetCase);
        updateNavActive('work');
        return;
      }

      // Check for Engineering Workspace: #workspace
      if (hash === 'workspace') {
        homeView.style.display = 'none';
        casePages.forEach(p => p.classList.remove('is-active'));
        workspaceView.classList.add('is-active');

        document.title = 'Engineering Workspace — Uriah Villa';
        scrollTo({top: 0, behavior: 'auto'});
        focusHeading(workspaceView);
        updateNavActive('workspace');
        return;
      }

      // Default: Homepage View
      workspaceView.classList.remove('is-active');
      casePages.forEach(p => p.classList.remove('is-active'));
      homeView.style.display = 'block';
      document.title = baseTitle;

      if (hash && hash !== 'home') {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          requestAnimationFrame(() => {
            targetElement.scrollIntoView({
              behavior: reduceMotion ? 'auto' : 'smooth',
              block: 'start'
            });
            focusHeading(targetElement);
          });
        }
        updateNavActive(hash);
      } else {
        updateNavActive('home');
        if (lastTrigger) {
          scrollTo({top: 0, behavior: reduceMotion ? 'auto' : 'smooth'});
        }
      }
    };

    addEventListener('hashchange', showRoute);
    showRoute();
  };

  /* --------------------------------------------------------------------------
     02. Engineering Workspace: Sidebar Tabs & Directory Search/Filter
     -------------------------------------------------------------------------- */
  const initWorkspace = () => {
    // Sidebar view switching
    const sidebarButtons = document.querySelectorAll('.workspace-sidebar .sidebar-item[data-view]');
    const panels = {
      directory: document.getElementById('panelDirectory'),
      protocols: document.getElementById('panelProtocols'),
      validation: document.getElementById('panelValidation'),
      logs: document.getElementById('panelLogs')
    };

    sidebarButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.dataset.view;
        sidebarButtons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        Object.keys(panels).forEach(key => {
          if (panels[key]) {
            panels[key].hidden = key !== targetView;
          }
        });
      });
    });

    // Directory Search & Filtering
    const searchInput = document.getElementById('directorySearch');
    const filterPills = document.querySelectorAll('.filter-pill');
    const tableBody = document.getElementById('directoryTableBody');
    const projectCountEl = document.getElementById('wsProjectCount');

    if (!tableBody) return;
    const rows = [...tableBody.querySelectorAll('tr')];

    let currentFilter = 'all';
    let currentQuery = '';

    const applyFilter = () => {
      let visibleCount = 0;

      rows.forEach(row => {
        const category = (row.dataset.category || '').toLowerCase();
        const searchCorpus = (row.dataset.search || '' + ' ' + row.textContent).toLowerCase();

        const matchesCategory = currentFilter === 'all' || category.includes(currentFilter);
        const matchesQuery = !currentQuery || searchCorpus.includes(currentQuery);

        if (matchesCategory && matchesQuery) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      if (projectCountEl) {
        projectCountEl.textContent = visibleCount + (visibleCount === 1 ? ' System' : ' Systems');
      }
    };

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        currentQuery = e.target.value.trim().toLowerCase();
        applyFilter();
      });
    }

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => {
          p.setAttribute('aria-selected', 'false');
        });
        pill.setAttribute('aria-selected', 'true');
        currentFilter = pill.dataset.filter || 'all';
        applyFilter();
      });
    });
  };

  /* --------------------------------------------------------------------------
     03. Theme Switcher (Standard-Compliant & Accessible)
     -------------------------------------------------------------------------- */
  const initTheme = () => {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    const mediaQuery = matchMedia('(prefers-color-scheme: dark)');

    const syncThemeUI = () => {
      const activeTheme = root.dataset.theme || (mediaQuery.matches ? 'dark' : 'light');
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      toggleBtn.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    };

    toggleBtn.addEventListener('click', () => {
      const currentTheme = root.dataset.theme || (mediaQuery.matches ? 'dark' : 'light');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      try {
        localStorage.setItem('theme', nextTheme);
      } catch (_) {}
      syncThemeUI();
    });

    mediaQuery.addEventListener('change', e => {
      try {
        if (!localStorage.getItem('theme')) {
          root.dataset.theme = e.matches ? 'dark' : 'light';
          syncThemeUI();
        }
      } catch (_) {}
    });

    syncThemeUI();
  };

  /* --------------------------------------------------------------------------
     04. Mobile Navigation Drawer
     -------------------------------------------------------------------------- */
  const initMobileMenu = () => {
    const toggle = document.getElementById('mobileNavToggle');
    const drawer = document.getElementById('mobileDrawer');
    if (!toggle || !drawer) return;

    const toggleDrawer = open => {
      const isOpen = open !== undefined ? open : drawer.hidden;
      drawer.hidden = !isOpen;
      toggle.setAttribute('aria-expanded', String(isOpen));
    };

    toggle.addEventListener('click', () => toggleDrawer());

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleDrawer(false));
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !drawer.hidden) {
        toggleDrawer(false);
        toggle.focus();
      }
    });
  };

  /* --------------------------------------------------------------------------
     05. Scroll Progress Bar
     -------------------------------------------------------------------------- */
  const initProgress = () => {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const total = root.scrollHeight - innerHeight;
      const ratio = total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0;
      bar.style.transform = `scaleX(${ratio})`;
    };

    addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, {passive: true});

    addEventListener('resize', update);
    update();
  };

  /* --------------------------------------------------------------------------
     06. Contact Form (AJAX via Formspree)
     -------------------------------------------------------------------------- */
  const initForm = () => {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const btn = document.getElementById('submitButton');
    if (!form || !status || !btn) return;

    const originalBtnHTML = btn.innerHTML;

    form.addEventListener('submit', async event => {
      event.preventDefault();
      btn.disabled = true;
      btn.textContent = 'Sending…';
      status.textContent = '';
      status.dataset.state = '';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {'Accept': 'application/json'}
        });

        if (!response.ok) throw new Error('Submission failed');
        form.reset();
        status.dataset.state = 'success';
        status.textContent = 'Message sent. I will respond to your technical inquiry shortly.';
      } catch (_) {
        status.dataset.state = 'error';
        status.textContent = 'Transmission failed. Please email me directly at uvilla11@gmail.com.';
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalBtnHTML;
      }
    });
  };

  /* --------------------------------------------------------------------------
     07. Utilities & Footer
     -------------------------------------------------------------------------- */
  const initUtilities = () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const topBtn = document.getElementById('footerTop');
    if (topBtn) {
      topBtn.addEventListener('click', () => {
        scrollTo({top: 0, behavior: reduceMotion ? 'auto' : 'smooth'});
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) setTimeout(() => heroTitle.focus({preventScroll: true}), reduceMotion ? 0 : 200);
      });
    }
  };

  // Safe Execution Bootstrap
  [
    initRouter,
    initWorkspace,
    initTheme,
    initMobileMenu,
    initProgress,
    initForm,
    initUtilities
  ].forEach(fn => {
    try {
      fn();
    } catch (err) {
      console.error(`[PrecisionSignal] Error initializing ${fn.name}:`, err);
    }
  });

})();
