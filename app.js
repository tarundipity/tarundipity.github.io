/* Tarun Kaur — Portfolio interactions */
(function () {
  // ---- Filter tabs ----
  const filterBtns = document.querySelectorAll('.filters button');
  const projects = document.querySelectorAll('.proj');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.toggle('active', b === btn));
      projects.forEach((p) => {
        const cats = (p.dataset.cat || '').split(' ');
        const show = f === 'all' || cats.includes(f);
        p.classList.toggle('hide', !show);
      });
    });
  });

  // ---- Expandable project cards ----
  document.querySelectorAll('.proj').forEach((proj) => {
    const trigger = proj.querySelector('.proj-top');
    const hint = proj.querySelector('.expand-hint');
    const toggle = (e) => {
      // don't toggle when clicking a button/link inside
      if (e.target.closest('a, .btn, .slot')) return;
      proj.classList.toggle('open');
    };
    if (trigger) trigger.addEventListener('click', toggle);
    if (hint) hint.addEventListener('click', () => proj.classList.toggle('open'));
  });

  // ---- Placeholder slots: gentle nudge ----
  document.querySelectorAll('.slot').forEach((slot) => {
    slot.addEventListener('click', () => {
      const ss = slot.querySelector('.ss');
      if (!ss) return;
      const orig = ss.textContent;
      ss.textContent = 'drop files here later ✦';
      setTimeout(() => { ss.textContent = orig; }, 1400);
    });
  });

  // ---- Open a project card when linked to via #hash (e.g. #talaria) ----
  function openFromHash() {
    const id = decodeURIComponent((location.hash || '').slice(1));
    if (!id) return;
    const el = document.getElementById(id);
    if (el && el.classList.contains('proj')) {
      el.classList.add('open');
      // ensure the right filter shows it
      const cats = (el.dataset.cat || '').split(' ');
      const activeFilter = document.querySelector('.filters button.active')?.dataset.filter;
      if (activeFilter && activeFilter !== 'all' && !cats.includes(activeFilter)) {
        document.querySelector('.filters button[data-filter="all"]')?.click();
      }
    }
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  // ---- Dismissible case-study banner (temporary nudge) ----
  const banner = document.getElementById('csBanner');
  if (banner) {
    if (localStorage.getItem('csBannerDismissed') === '1') banner.classList.add('hidden');
    banner.querySelector('.cs-banner-x')?.addEventListener('click', () => {
      banner.classList.add('hidden');
      localStorage.setItem('csBannerDismissed', '1');
    });
  }
})();
