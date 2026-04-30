'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULTS, LOGS, FadecEngine, FadecState, FuelMapRenderer } from '../lib/fadec/index.js';

export function useFadecController() {
  const stateRef = useRef(new FadecState(DEFAULTS));
  const engine = useMemo(() => new FadecEngine(), []);
  const renderer = useMemo(() => new FuelMapRenderer(), []);
  const canvasRef = useRef(null);
  const logIndexRef = useRef(0);

  const [state, setState] = useState(() => stateRef.current.snapshot());
  const [clock, setClock] = useState('00:00:00');
  const [logText, setLogText] = useState('System initialized. All channels nominal. Awaiting input...');

  const computed = useMemo(() => engine.compute(state), [engine, state]);

  const commitState = () => {
    setState(stateRef.current.snapshot());
  };

  const updateField = (key, value) => {
    stateRef.current.setField(key, value);
    commitState();
  };

  const reset = () => {
    stateRef.current.reset();
    logIndexRef.current = 0;
    commitState();
    setLogText('System reset. All values returned to default.');
  };

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`,
      );
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    renderer.draw(canvasRef.current, state.throttle, computed.overtemp ? 0 : computed.wf);
  }, [renderer, state.throttle, computed.overtemp, computed.wf]);

  useEffect(() => {
    const timer = setInterval(() => {
      const noise = (Math.random() - 0.5) * 0.5;
      renderer.draw(canvasRef.current, state.throttle, computed.overtemp ? 0 : (state.wa + noise) / 15);
    }, 800);

    return () => clearInterval(timer);
  }, [renderer, state.wa, state.throttle, computed.overtemp]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogText(LOGS[logIndexRef.current % LOGS.length]);
      logIndexRef.current += 1;
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return {
    state,
    computed,
    clock,
    logText,
    canvasRef,
    updateField,
    reset,
  };
}
