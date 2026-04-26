(function () {
  const State = window.FadecState;
  const UI = window.FadecUI;
  const Canvas = window.FadecCanvas;

  const $ = (id) => document.getElementById(id);

  function syncSliderState(key, value) {
    State[key] = Number(value);
    UI.update();
  }

  function resetAll() {
    State.wa = State.defaults.wa;
    State.tamb = State.defaults.tamb;
    State.throttle = State.defaults.throttle;
    State.n1Actual = State.defaults.n1Actual;

    $('wa-slider').value = State.defaults.wa;
    $('tamb-slider').value = State.defaults.tamb;
    $('throttle-slider').value = State.defaults.throttle;
    $('n1-slider').value = State.defaults.n1Actual;

    UI.update();
    UI.pushLog('◉ System reset. All values returned to default.');
  }

  function init() {
    $('wa-slider').addEventListener('input', (e) => syncSliderState('wa', e.target.value));
    $('tamb-slider').addEventListener('input', (e) => syncSliderState('tamb', e.target.value));
    $('throttle-slider').addEventListener('input', (e) => syncSliderState('throttle', e.target.value));
    $('n1-slider').addEventListener('input', (e) => syncSliderState('n1Actual', e.target.value));
    $('reset-btn').addEventListener('click', resetAll);

    UI.updateClock();
    UI.update();

    setInterval(UI.updateClock, 1000);
    setInterval(() => {
      const noise = (Math.random() - 0.5) * 0.5;
      Canvas.drawFuelMap(State.throttle, (State.wa + noise) / 15);
    }, 800);
    setInterval(() => {
      const messages = State.logs;
      UI.pushLog(messages[State.logIndex % messages.length]);
      State.logIndex += 1;
    }, 3000);
  }

  window.FadecEvents = { init };
})();
