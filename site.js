(function () {
  var KEY = 'eggcellent:scroll-to-features';

  function remember(value) {
    try { if (value) sessionStorage.setItem(KEY, '1'); else sessionStorage.removeItem(KEY); } catch (e) {}
  }
  function remembered() {
    try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }

  // Scrolls to the features section when it is on this page. Returns false when
  // it is not, which means we are on a sub-page and have to travel home first.
  function scrollToFeatures(behavior) {
    var target = document.getElementById('features');
    if (!target) return false;
    target.scrollIntoView({ behavior: behavior, block: 'start' });
    return true;
  }

  var smooth = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

  Array.prototype.forEach.call(document.querySelectorAll('[data-scroll="features"]'), function (link) {
    link.addEventListener('click', function (e) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (scrollToFeatures(smooth)) e.preventDefault();
      else remember(true); // the home page will pick this up once it loads
    });
  });

  if (remembered()) {
    remember(false);
    scrollToFeatures('auto');
  }
})();

// App Store link: campaign tokens for App Store Connect analytics, plus the
// visitor's country store taken from the browser language (pl-PL -> pl).
// `?ref=reddit` on the page URL becomes campaign `web-reddit` and is kept for
// the rest of the visit, so it survives a trip to a sub-page and back. Without
// a ref the campaign is `landing`. The plain link in the HTML (campaign
// `landing`, no country) stays in place whenever this fails.
(function () {
  var APP_ID = '6789988052';
  var PROVIDER_TOKEN = '129156858'; // App Store Connect provider token, same for every campaign
  var REF_KEY = 'eggcellent:ref';
  var MAX_CAMPAIGN = 30; // App Store Connect limit for a campaign token

  function readRef() {
    var ref = '';
    try { ref = new URLSearchParams(window.location.search).get('ref') || ''; } catch (e) {}
    ref = ref.toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');
    try {
      if (ref) sessionStorage.setItem(REF_KEY, ref);
      else ref = sessionStorage.getItem(REF_KEY) || '';
    } catch (e) {}
    return ref;
  }

  function countryPath() {
    try {
      var cc = (new Intl.Locale(navigator.language).maximize().region || '').toLowerCase();
      return /^[a-z]{2}$/.test(cc) ? cc + '/' : '';
    } catch (e) { return ''; }
  }

  try {
    var ref = readRef();
    var campaign = ref ? ('web-' + ref).slice(0, MAX_CAMPAIGN).replace(/[-_]+$/, '') : 'landing';
    var href = 'https://apps.apple.com/' + countryPath() + 'app/apple-store/id' + APP_ID +
      '?pt=' + PROVIDER_TOKEN + '&ct=' + encodeURIComponent(campaign) + '&mt=8';
    Array.prototype.forEach.call(document.querySelectorAll('a[data-app-store]'), function (link) {
      link.href = href;
    });
  } catch (e) {}
})();
