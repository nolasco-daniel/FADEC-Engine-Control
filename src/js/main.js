(function () {
  if (!window.FadecEvents || !window.FadecEvents.init) {
    console.error('FADEC modules failed to load.');
    return;
  }

  window.FadecEvents.init();
})();
