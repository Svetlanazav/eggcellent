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
