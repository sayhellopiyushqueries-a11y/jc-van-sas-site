/* ============================================================
   J.C. VAN SAS & ASSOCIATES — behaviour
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------- content ---------------- */

  var CASES = {
    'the-paperwork-paradox': {
      mark: '01',
      eyebrow: 'A real world case',
      title: 'The Paperwork Paradox',
      image: '/img/la-plata.jpg',
      alt: 'A vessel alongside in dock beneath quayside cranes',
      caption: 'Discharge alongside, archive photography',
      paragraphs: [
        'Cargo insurers instructed us in a dispute where two certificates, one from loading in Denmark, one from discharge in the Netherlands, stated quantities that did not align. The quantity loaded in Denmark had been determined by draft survey and recorded accordingly. On discharge in the Netherlands, a shore-based weighing installation produced a materially different figure.',
        'The investigation first established that the weighing installation in the Netherlands was functioning correctly. Further investigation revealed the actual cause: a breach in the vessel’s hull had allowed water to enter a ballast tank unintentionally, distorting the draft survey carried out in Denmark and, with it, the quantity recorded on the load port certificate.'
      ],
      finding: 'With these findings, the receiver was able to demonstrate to the supplier that the full quantity had not in fact been delivered.'
    }
  };

  var DEPTHS = {
    condition: {
      mark: '02', name: 'The Condition',
      title: 'Establishing the condition of a cargo',
      standfirst: 'A cargo is described before it moves and described again when it arrives. Where those two descriptions differ, the difference is where the investigation begins.',
      body: 'Condition is a matter of record long before it becomes a matter of dispute. Certificates, tally sheets, photographs, temperature logs and survey reports each state something about a cargo at a particular moment. Our work is to establish what those records actually show, whether the condition they describe could have arisen in the manner claimed, and whether the damage or deterioration found on arrival is consistent with the conditions the cargo passed through.',
      examined: ['Condition before shipment', 'Stowage and securing as found', 'Ingress of water and moisture', 'Temperature and ventilation records', 'Contamination and admixture', 'Handling damage', 'Condition on outturn'],
      needed: ['The description of the cargo as it was shipped', 'Any survey, photographs or logs taken during the voyage', 'The condition recorded on arrival, and by whom']
    },
    chain: {
      mark: '03', name: 'The Chain',
      title: 'Tracing the chain of responsibility',
      standfirst: 'Between the seller and the receiver a cargo passes through many hands. Responsibility passes with it, and rarely at the moment the parties assume.',
      body: 'A shipment is carried under contracts that allocate risk between the parties, and it is handled along the way by terminals, stevedores, hauliers and warehouse keepers who are not party to all of them. Establishing where responsibility sat at the moment a loss occurred requires the movement to be reconstructed against the documents that governed it, so that the point of transfer can be identified rather than assumed.',
      examined: ['Terms of carriage', 'Bills of lading and delivery orders', 'Transfer of risk', 'Terminal and stevedore handling', 'Interim storage', 'Sub contracted movements', 'Notice periods and time bars'],
      needed: ['The contracts and terms under which the cargo moved', 'The transport and handling documents along the route', 'The point at which the loss was first noticed, and by whom']
    },
    loss: {
      mark: '04', name: 'The Loss',
      title: 'Testing a measured quantity',
      standfirst: 'A shortage is a figure produced by a method. Before the figure can be relied upon, the method has to be examined.',
      body: 'Quantity is established by draft survey, by shore installation, by tally or by weighbridge, and each method carries its own tolerances and its own points of failure. Where two figures disagree, the disagreement often lies in the measurement rather than in the cargo. We examine how each figure was arrived at, what the method could and could not detect, and what quantity the evidence actually supports.',
      examined: ['Draft survey', 'Shore weighing installations', 'Tally and count', 'Ullage and sounding', 'Moisture and settlement', 'Calibration and tolerance', 'Reconciliation of certificates'],
      needed: ['Both figures in dispute, and the certificates that state them', 'The method by which each figure was obtained', 'Any calibration or maintenance record for the installation used']
    },
    risk: {
      mark: '05', name: 'The Risk',
      title: 'Reducing exposure on the next shipment',
      standfirst: 'Every matter that is properly investigated leaves behind something that can be used before the next shipment moves.',
      body: 'Once the facts of a loss are settled, the same evidence usually shows how the loss became possible in the first place. Recurring patterns in stowage, in documentation, in handling or in the choice of measurement method can be identified and addressed. The practice is engaged both after a loss and, where parties prefer, before one, to examine an intended shipment while the arrangements can still be changed.',
      examined: ['Recurring loss patterns', 'Stowage and securing review', 'Documentary practice', 'Selection of measurement method', 'Attendance before shipment', 'Terminal and route exposure'],
      needed: ['The cargoes and routes you move most often', 'Any losses of a similar kind over recent shipments', 'The arrangements you are able to change, and those you are not']
    }
  };

  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  var line = function (items) {
    return items.map(esc).join('<i>·</i>');
  };

  /* ---------------- sections ---------------- */

  var sections = $$('section[data-mark]');
  var total = sections.length ? sections[sections.length - 1].dataset.mark : '00';

  /* ---------------- loader ---------------- */

  (function () {
    var el = $('#loader');
    if (!el) return;
    if (reduce) { el.classList.add('gone'); return; }
    var wl = $('#ldwl');
    requestAnimationFrame(function () {
      if (wl) { wl.style.transition = 'stroke-dashoffset .7s cubic-bezier(.22,1,.36,1)'; wl.style.strokeDashoffset = '0'; }
    });
    setTimeout(function () { el.classList.add('lift'); }, 900);
    setTimeout(function () { el.classList.add('gone'); }, 1650);
  })();

  /* ---------------- reveals ---------------- */

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var d = parseInt(e.target.dataset.delay || '0', 10);
      setTimeout(function () { e.target.classList.add('in'); }, d);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });

  $$('.rv, .draw, .ph').forEach(function (el) { io.observe(el); });

  /* word rise on headings */
  $$('.split-words').forEach(function (h) {
    var words = h.textContent.trim().split(/\s+/);
    h.innerHTML = words.map(function (w, i) {
      return '<span class="word" style="transition-delay:' + (i * 0.05).toFixed(2) + 's">' + esc(w) + (i < words.length - 1 ? '&nbsp;' : '') + '</span>';
    }).join('');
    io.observe(h);
  });

  /* ---------------- counter ---------------- */

  $$('[data-count]').forEach(function (el) {
    var target = parseInt(el.dataset.count, 10);
    if (reduce) { el.textContent = target; return; }
    var seen = false;
    var o = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting || seen) return;
      seen = true; o.disconnect();
      var start = performance.now();
      (function tick(now) {
        var t = Math.min((now - start) / 2000, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(eased * target);
        if (t < 1) requestAnimationFrame(tick); else el.textContent = target;
      })(start);
    }, { threshold: 0.4 });
    o.observe(el);
  });

  /* ---------------- footer mark draw ---------------- */

  (function () {
    var m = $('#ftMark'); if (!m) return;
    var wl = m.querySelector('.wl'); if (!wl) return;
    if (reduce) { wl.style.strokeDashoffset = '0'; return; }
    var o = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      o.disconnect();
      wl.style.transition = 'stroke-dashoffset .9s ease-out';
      wl.style.strokeDashoffset = '0';
    }, { threshold: 0.4 });
    o.observe(m);
  })();

  /* ---------------- footer scale band ---------------- */

  (function () {
    var b = $('.scale-band'); if (!b) return;
    var h = '';
    for (var i = 0; i < 33; i++) h += '<i' + (i % 4 === 0 ? ' class="maj"' : '') + '></i>';
    b.innerHTML = h;
  })();

  /* ---------------- rail ---------------- */

  var railMarks = $('.rl-marks');
  var railFill = $('.rl-fill');
  var railLine = $('.rl-line');
  var railRead = $('.rl-read');
  var progress = $('#progress span');
  var dwNav = $('#dwNav');

  if (railMarks) {
    railMarks.innerHTML = sections.map(function (s) {
      return '<button type="button" class="rl-mark" data-go="' + s.id + '" data-m="' + s.dataset.mark + '">' +
        '<span class="tick"></span><span class="numeral">' + s.dataset.mark + '</span>' +
        '<span class="ticks"><i></i><i></i></span>' +
        '<span class="nm">' + esc(s.dataset.name) + '</span></button>';
    }).join('');
  }
  if (dwNav) {
    dwNav.innerHTML = sections.map(function (s) {
      return '<a class="dw-link" href="#' + s.id + '"><span class="numeral">' + s.dataset.mark + '</span><span>' + esc(s.dataset.name) + '</span></a>';
    }).join('');
  }

  $$('[data-go]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = document.getElementById(b.dataset.go);
      if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  });

  var lastRead = '';
  function paintRail(depth, activeMark) {
    if (progress) progress.style.width = (depth * 100).toFixed(2) + '%';
    if (railFill) railFill.style.transform = 'translateY(' + ((1 - depth) * 100).toFixed(2) + '%)';
    if (railLine) railLine.style.transform = 'translateY(' + ((1 - depth) * 100).toFixed(2) + 'px)';
    if (railLine && railFill) {
      var h = railFill.parentElement ? railFill.parentElement.clientHeight : 0;
      railLine.style.transform = 'translateY(' + ((1 - depth) * h).toFixed(1) + 'px)';
      if (railRead) {
        var ry = Math.max(30, Math.min(h - 4, (1 - depth) * h - 8));
        railRead.style.transform = 'translateY(' + ry.toFixed(1) + 'px) translateY(-100%)';
        var txt = activeMark + ' / ' + total;
        if (txt !== lastRead) {
          lastRead = txt;
          railRead.innerHTML = txt.split('').map(function (c) {
            return '<i style="animation:none">' + (c === ' ' ? '&nbsp;' : esc(c)) + '</i>';
          }).join('');
        }
      }
    }
  }

  var activeMark = '00';
  function setActive(mark) {
    if (mark === activeMark) return;
    activeMark = mark;
    $$('.rl-mark').forEach(function (b) { b.classList.toggle('on', b.dataset.m === mark); });
  }

  var ao = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.dataset.mark); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach(function (s) { ao.observe(s); });

  /* ---------------- header + scroll ---------------- */

  var header = $('#header');
  var lastY = window.scrollY;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var depth = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

    paintRail(depth, activeMark);

    if (header) {
      header.classList.toggle('condensed', y > 96);
      var drawerOpen = $('#drawer').classList.contains('open');
      var modalOpen = $('#modal').classList.contains('open');
      if (!drawerOpen && !modalOpen) {
        header.classList.toggle('hidden', y > 240 && y > lastY);
      } else {
        header.classList.remove('hidden');
      }
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---------------- drawer ---------------- */

  var drawer = $('#drawer');
  function closeDrawer() {
    drawer.classList.remove('open');
    $('#menuOpen').setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.body.classList.remove('locked');
  }
  $('#menuOpen').addEventListener('click', function () {
    drawer.classList.add('open');
    this.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('locked');
  });
  $$('[data-close-drawer]').forEach(function (b) { b.addEventListener('click', closeDrawer); });
  $$('#drawer a').forEach(function (a) { a.addEventListener('click', closeDrawer); });

  /* ---------------- cursor ---------------- */

  (function () {
    var c = $('#cursor'); if (!c) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    window.addEventListener('mousemove', function (e) {
      c.style.transform = 'translate3d(' + e.clientX + 'px,' + e.clientY + 'px,0)';
      var t = e.target;
      c.classList.toggle('over', !!(t && t.closest && t.closest('.ph')));
    }, { passive: true });
  })();

  /* ============================================================
     MODAL — one component, three views
     ============================================================ */

  var modal = $('#modal');
  var mBody = $('#mBody');
  var mEyebrow = $('#mEyebrow');
  var lastFocus = null;

  function openModal(view, key, subject) {
    lastFocus = document.activeElement;
    render(view, key, subject);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('locked');
    requestAnimationFrame(function () { modal.classList.add('shown'); });
    setTimeout(function () {
      var f = modal.querySelector('input, button, [href]');
      if (f) f.focus();
    }, 120);
  }

  function closeModal() {
    modal.classList.remove('shown');
    setTimeout(function () {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      document.body.classList.remove('locked');
      mBody.innerHTML = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }, 300);
  }

  function swapView(view, key, subject) {
    mBody.classList.add('fade');
    setTimeout(function () {
      render(view, key, subject);
      mBody.scrollTop = 0;
      mBody.classList.remove('fade');
    }, 250);
  }

  function formHTML(subject) {
    return '' +
      '<p class="label fog">Instruct the practice</p>' +
      '<h3 class="h-m" id="mTitle" style="margin-top:12px">Tell us what is known, and what is not.</h3>' +
      (subject ? '<p class="label fog" style="margin-top:24px">Subject · ' + esc(subject) + '</p>' : '') +
      '<form data-form style="margin-top:32px">' +
      (subject ? '<input type="hidden" name="subject" value="' + esc(subject) + '">' : '') +
      '<label class="field"><span class="label">Name</span><input type="text" name="name" required></label>' +
      '<label class="field"><span class="label">Email</span><input type="email" name="email" required></label>' +
      '<label class="field"><span class="label">The matter</span><textarea name="matter" rows="4" required></textarea></label>' +
      '<p class="err" data-err></p>' +
      '<button type="submit" class="act" style="margin-top:32px">Send</button>' +
      '<p class="note label">Form entries are delivered by email to the practice. Storage and processing detail to be confirmed.</p>' +
      '</form>';
  }

  function render(view, key, subject) {
    if (view === 'case') {
      var c = CASES[key];
      mEyebrow.innerHTML = '<span style="color:var(--green);margin-right:12px">' + c.mark + '</span>' + esc(c.eyebrow);
      mBody.innerHTML =
        '<p class="label fog">' + esc(c.eyebrow) + '</p>' +
        '<h3 class="h-m" id="mTitle" style="margin-top:12px">' + esc(c.title) + '</h3>' +
        '<figure><div class="ph in"><img src="' + c.image + '" alt="' + esc(c.alt) + '" width="1800" height="1479" loading="lazy"><span class="grain"></span></div>' +
        '<figcaption class="label">' + esc(c.caption) + '</figcaption></figure>' +
        '<div style="margin-top:32px">' + c.paragraphs.map(function (p) { return '<p class="measure">' + esc(p) + '</p>'; }).join('') + '</div>' +
        '<div class="mfind"><p class="label" style="color:var(--green)">The finding</p>' +
        '<p class="body-l measure" style="color:var(--harbour);margin-top:12px">' + esc(c.finding) + '</p></div>' +
        '<div class="mfoot"><p style="margin:0;font-size:15px">Matters of this kind can be put to the practice directly.</p>' +
        '<button type="button" class="act" data-to-enquiry="' + esc(c.title) + '">Instruct the practice</button></div>';
    } else if (view === 'detail') {
      var d = DEPTHS[key];
      mEyebrow.innerHTML = '<span style="color:var(--green);margin-right:12px">' + d.mark + '</span>' + esc(d.name);
      mBody.innerHTML =
        '<p class="label fog">' + d.mark + ' · ' + esc(d.name) + '</p>' +
        '<h3 class="h-m" id="mTitle" style="margin-top:12px">' + esc(d.title) + '</h3>' +
        '<p class="body-l measure" style="margin-top:24px">' + esc(d.standfirst) + '</p>' +
        '<p class="measure" style="margin-top:24px">' + esc(d.body) + '</p>' +
        '<p class="label fog" style="margin-top:40px">What is examined</p>' +
        '<p class="hazards" style="margin-top:12px">' + line(d.examined) + '</p>' +
        '<p class="label fog" style="margin-top:32px">What we will need from you</p>' +
        '<p class="hazards" style="margin-top:12px">' + line(d.needed) + '</p>' +
        '<div class="mfoot"><p style="margin:0;font-size:15px">Put a matter to the practice at this depth.</p>' +
        '<button type="button" class="act" data-to-enquiry="' + esc(d.name) + '">Instruct the practice</button></div>';
    } else {
      mEyebrow.innerHTML = '<span style="color:var(--green);margin-right:12px">00</span>Enquiry';
      mBody.innerHTML = formHTML(subject);
    }
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-case]');
    if (t) { openModal('case', t.dataset.case); return; }
    t = e.target.closest('[data-detail]');
    if (t) { openModal('detail', t.dataset.detail); return; }
    t = e.target.closest('[data-enquire]');
    if (t) { openModal('enquiry', null, t.dataset.enquire || null); return; }
    t = e.target.closest('[data-to-enquiry]');
    if (t) { swapView('enquiry', null, t.dataset.toEnquiry); return; }
    if (e.target.closest('[data-close-modal]')) { closeModal(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (modal.classList.contains('open')) closeModal();
      else if (drawer.classList.contains('open')) closeDrawer();
    }
    if (e.key === 'Tab' && modal.classList.contains('open')) {
      var f = $$('a[href], button, input, textarea, select', modal).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ============================================================
     FORMS
     ============================================================ */

  document.addEventListener('submit', function (e) {
    var form = e.target.closest('[data-form]');
    if (!form) return;
    e.preventDefault();

    var err = form.querySelector('[data-err]');
    var name = form.querySelector('[name=name]');
    var mail = form.querySelector('[name=email]');
    var matter = form.querySelector('[name=matter]');

    var problems = [];
    if (!name.value.trim()) problems.push('Add your name.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail.value.trim())) problems.push('Check the email address.');
    if (!matter.value.trim()) problems.push('Describe the matter.');

    if (problems.length) {
      err.textContent = problems.join(' ');
      err.classList.add('show');
      return;
    }
    err.classList.remove('show');

    var done = document.createElement('div');
    done.className = 'sent';
    done.innerHTML = '<p class="label">Enquiry recorded</p>' +
      '<p style="margin-top:12px;font-size:15px">Thank you. We will respond with how the matter can be examined.</p>';
    form.parentNode.replaceChild(done, form);
    try { sessionStorage.setItem('vansas-enquired', '1'); } catch (_) {}
    var fp = $('#fplate');
    if (fp) { fp.classList.remove('up'); setTimeout(function () { fp.classList.remove('live'); }, 600); }
  });

  /* ============================================================
     FOOTER PLATE
     ============================================================ */

  (function () {
    var fp = $('#fplate'); if (!fp) return;
    var KEY = 'vansas-footer-plate';
    try {
      if (sessionStorage.getItem(KEY) || sessionStorage.getItem('vansas-enquired')) return;
    } catch (_) {}

    var foot = document.querySelector('footer');
    if (!foot) return;

    var o = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      o.disconnect();
      try { sessionStorage.setItem(KEY, '1'); } catch (_) {}
      fp.classList.add('live');
      requestAnimationFrame(function () { fp.classList.add('up'); });
    }, { threshold: 0.4 });
    o.observe(foot);

    $('#fpClose').addEventListener('click', function () {
      fp.classList.remove('up');
      setTimeout(function () { fp.classList.remove('live'); }, 600);
    });
  })();

  /* ---------------- year ---------------- */
  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

})();
