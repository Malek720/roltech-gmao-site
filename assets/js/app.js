(() => {
  'use strict';

  const S = window.SITE || {};
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const ICONS = {
    wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
    chart: ['M3 3v18h18', 'M18 17V9', 'M13 17V5', 'M8 17v-3'],
    shield: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z', 'm9 12 2 2 4-4'],
    building: ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z', 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2', 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2', 'M10 6h4', 'M10 10h4', 'M10 14h4', 'M10 18h4'],
    mail: ['m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z']
  };

  function icon(name) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    (ICONS[name] || []).forEach((d) => {
      const p = document.createElementNS(SVG_NS, 'path');
      p.setAttribute('d', d);
      svg.appendChild(p);
    });
    return svg;
  }

  // Small DOM helper: text is always inserted with textContent (no HTML injection).
  function h(tag, attrs = {}, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else el.setAttribute(k, v === true ? '' : v);
    }
    kids.flat().forEach((k) => {
      if (k === null || k === undefined) return;
      el.append(k.nodeType ? k : document.createTextNode(k));
    });
    return el;
  }

  /* ---------- Renderers ---------- */

  function renderClip(c, n) {
    const source = h('source', { src: `videos/${c.file}.mp4`, type: 'video/mp4' });
    const video = h('video', {
      controls: true, preload: 'none', playsinline: true,
      poster: `posters/${c.file}.jpg`, 'aria-label': c.title
    }, source, 'Votre navigateur ne peut pas lire cette vidéo.');
    const figure = h('figure', { class: 'clip-video' }, video);

    source.addEventListener('error', () => {
      figure.append(h('p', { class: 'clip-error', role: 'status', text: 'Cette vidéo est momentanément indisponible.' }));
    });
    video.addEventListener('play', () => {
      document.querySelectorAll('video').forEach((v) => { if (v !== video) v.pause(); });
    });

    return h('article', { class: 'clip reveal' },
      h('header', { class: 'clip-head' },
        h('span', { class: 'clip-num', 'aria-hidden': 'true', text: String(n).padStart(2, '0') }),
        h('h3', { text: c.title })),
      c.tags ? h('p', { class: 'tags' }, c.tags.map((t) => h('span', { class: 'tag', text: t }))) : null,
      h('p', { class: 'clip-desc', text: c.summary }),
      h('ul', { class: 'clip-points' }, c.points.map((p) => h('li', { text: p }))),
      figure
    );
  }

  function renderRole(id) {
    const r = (S.roles || {})[id];
    const wrap = h('div', { class: 'stack' });
    if (!r) return wrap;
    wrap.append(h('section', { class: 'intro reveal' },
      h('p', { class: 'eyebrow', text: r.eyebrow }),
      h('h2', { text: r.title }),
      h('p', { class: 'lead', text: r.intro }),
      h('ul', { class: 'abilities' }, r.abilities.map((a) => h('li', { text: a })))
    ));
    r.clips.forEach((c, i) => wrap.append(renderClip(c, i + 1)));
    return wrap;
  }

  function infoCard(eyebrow, title, paragraphs, ...extra) {
    return h('section', { class: 'card reveal' },
      h('p', { class: 'eyebrow', text: eyebrow }),
      h('h2', { text: title }),
      paragraphs.map((p) => h('p', { text: p })),
      ...extra
    );
  }

  function renderAbout() {
    const a = S.about || {};
    const wrap = h('div', { class: 'stack' });
    if (a.company) {
      wrap.append(infoCard('L’entreprise', 'RolTech, convoyeurs et manutention industrielle', a.company.paragraphs,
        a.company.note ? h('p', { class: 'note', text: a.company.note }) : null,
        a.company.link ? h('a', { class: 'btn', href: a.company.link, target: '_blank', rel: 'noopener noreferrer', text: 'Visiter le site de RolTech' }) : null));
    }
    const row = h('div', { class: 'grid2' });
    if (a.internship) row.append(infoCard('Le stage', 'Quatre sprints, du cahier des charges au rapport', a.internship.paragraphs));
    if (a.project) {
      row.append(infoCard('Le projet', 'Une GMAO simplifiée', a.project.paragraphs,
        h('div', { class: 'figures' }, (a.project.figures || []).map((f) => h('div', { class: 'figure' }, h('b', { text: f.value }), h('span', { text: f.label })))),
        h('ul', { class: 'chips' }, (a.project.stack || []).map((s) => h('li', { text: s })))));
    }
    wrap.append(row);
    return wrap;
  }

  function contactForm(c) {
    const status = h('p', { class: 'form-status', role: 'status', 'aria-live': 'polite' });
    const form = h('form', { novalidate: false },
      h('label', { for: 'f-nom', text: 'Votre nom' }),
      h('input', { id: 'f-nom', name: 'nom', type: 'text', required: true, autocomplete: 'name' }),
      h('label', { for: 'f-email', text: 'Votre e-mail' }),
      h('input', { id: 'f-email', name: 'email', type: 'email', required: true, autocomplete: 'email' }),
      h('label', { for: 'f-msg', text: 'Message' }),
      h('textarea', { id: 'f-msg', name: 'message', required: true }),
      h('button', { class: 'btn', type: 'submit', text: 'Envoyer par e-mail' }),
      status
    );
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const subject = `Contact depuis le site RolTech GMAO — ${d.get('nom')}`;
      const body = `${d.get('message')}\n\n— ${d.get('nom')} (${d.get('email')})`;
      window.location.href = `mailto:${c.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Votre application de messagerie va s’ouvrir avec le message prérempli.';
    });
    return h('section', { class: 'card reveal' },
      h('p', { class: 'eyebrow', text: 'Écrire un message' }),
      h('h2', { text: 'Formulaire de contact' }),
      form,
      h('p', { class: 'note', text: 'Ce formulaire ouvre votre application de messagerie : aucune donnée n’est stockée sur ce site.' })
    );
  }

  function renderContact() {
    const c = S.contact || {};
    const links = [];
    if (c.email) links.push(['E-mail', c.email, 'mailto:' + c.email]);
    if (c.linkedin) links.push(['LinkedIn', c.linkedin.replace(/^https?:\/\//, ''), c.linkedin]);
    if (c.github) links.push(['GitHub', c.github.replace(/^https?:\/\//, ''), c.github]);
    if (c.phone) links.push(['Téléphone', c.phone, 'tel:' + c.phone.replace(/\s+/g, '')]);

    const info = h('section', { class: 'card reveal' },
      h('p', { class: 'eyebrow', text: 'Contact' }),
      h('h2', { text: c.name || 'Contact' }),
      h('p', { class: 'lead', text: c.role || '' }),
      h('p', { text: 'Une question sur l’application, le projet ou le stage ? N’hésitez pas à me contacter.' }),
      h('ul', { class: 'contact-list' }, links.map(([k, v, href]) => h('li', {},
        h('span', { class: 'k', text: k }),
        h('a', Object.assign({ href, text: v }, href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})))))
    );
    const wrap = h('div', { class: 'grid2' }, info);
    if (c.email) wrap.append(contactForm(c));
    return wrap;
  }

  /* ---------- Tabs ---------- */

  const TABS = [
    { id: 'technicien', label: 'Technicien', icon: 'wrench', accent: '#88c0d0', render: () => renderRole('technicien') },
    { id: 'responsable', label: 'Responsable', icon: 'chart', accent: '#d08770', render: () => renderRole('responsable') },
    { id: 'administrateur', label: 'Administrateur', icon: 'shield', accent: '#b48ead', render: () => renderRole('administrateur') },
    { id: 'roltech', label: 'À propos de RolTech', icon: 'building', accent: '#a3be8c', render: renderAbout },
    { id: 'contact', label: 'Contact', icon: 'mail', accent: '#ebcb8b', render: renderContact }
  ];

  const tablist = document.getElementById('tabs');
  const panelsRoot = document.getElementById('panels');
  const main = document.getElementById('contenu');
  const nav = document.querySelector('.nav');
  const indicator = h('span', { class: 'tab-indicator', 'aria-hidden': 'true' });
  const tabEls = {};
  const panelEls = {};
  let current = TABS[0].id;

  tablist.append(indicator);
  TABS.forEach((t) => {
    const btn = h('button', {
      class: 'tab', type: 'button', role: 'tab', id: `tab-${t.id}`,
      'aria-controls': `panel-${t.id}`, 'aria-selected': 'false', tabindex: '-1'
    }, icon(t.icon), h('span', { text: t.label }));
    btn.style.setProperty('--tab-accent', t.accent);
    btn.addEventListener('click', () => activate(t.id, { scroll: true }));
    tablist.append(btn);

    const panel = h('section', {
      class: 'panel', role: 'tabpanel', id: `panel-${t.id}`,
      'aria-labelledby': `tab-${t.id}`, tabindex: '0', hidden: true
    });
    panel.append(t.render());
    panelsRoot.append(panel);
    tabEls[t.id] = btn;
    panelEls[t.id] = panel;
  });

  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 })
    : null;

  function observe(panel) {
    panel.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
      if (io && !reduce) io.observe(el); else el.classList.add('is-visible');
    });
  }

  function moveIndicator() {
    const b = tabEls[current];
    if (!b) return;
    indicator.style.width = `${b.offsetWidth}px`;
    indicator.style.transform = `translateX(${b.offsetLeft}px)`;
  }

  function activate(id, opts = {}) {
    if (!tabEls[id]) id = TABS[0].id;
    current = id;
    const tab = TABS.find((t) => t.id === id);
    TABS.forEach((t) => {
      const on = t.id === id;
      tabEls[t.id].setAttribute('aria-selected', String(on));
      tabEls[t.id].tabIndex = on ? 0 : -1;
      panelEls[t.id].hidden = !on;
    });
    document.querySelectorAll('video').forEach((v) => v.pause());
    document.documentElement.style.setProperty('--accent', tab.accent);
    moveIndicator();
    tabEls[id].scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });

    const panel = panelEls[id];
    panel.classList.remove('is-in');
    void panel.offsetWidth;
    panel.classList.add('is-in');
    observe(panel);

    if (opts.focus) tabEls[id].focus();
    if (opts.scroll) {
      const top = main.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 8;
      if (window.scrollY > top) window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    }
    if (location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`);
    document.title = `${tab.label} — RolTech GMAO`;
  }

  tablist.addEventListener('keydown', (e) => {
    const ids = TABS.map((t) => t.id);
    const cur = ids.findIndex((id) => tabEls[id] === document.activeElement);
    if (cur < 0) return;
    let next = null;
    if (e.key === 'ArrowRight') next = (cur + 1) % ids.length;
    else if (e.key === 'ArrowLeft') next = (cur - 1 + ids.length) % ids.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = ids.length - 1;
    if (next !== null) { e.preventDefault(); activate(ids[next], { focus: true }); }
  });

  window.addEventListener('hashchange', () => activate(location.hash.slice(1)));
  window.addEventListener('resize', moveIndicator);
  window.addEventListener('load', moveIndicator);

  document.getElementById('year').textContent = new Date().getFullYear();
  activate(location.hash.slice(1) || TABS[0].id);
})();