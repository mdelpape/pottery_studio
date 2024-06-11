import { useEffect, useRef } from 'react';

export function useKeyPress(target, event) {
  useEffect(() => {
    const downHandler = ({ key }) => target.indexOf(key) !== -1 && event(true);
    const upHandler = ({ key }) => target.indexOf(key) !== -1 && event(false);
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);
}

export function useControls() {
  const keys = useRef({ forward: false, backward: false, left: false, right: false, brake: false, reset: false, test: false });
  useKeyPress(['w'], (pressed) => (keys.current.forward = pressed));
  useKeyPress(['s'], (pressed) => (keys.current.backward = pressed));
  useKeyPress(['a'], (pressed) => (keys.current.left = pressed));
  useKeyPress(['d'], (pressed) => (keys.current.right = pressed));
  useKeyPress([' '], (pressed) => (keys.current.brake = pressed));
  useKeyPress(['r'], (pressed) => (keys.current.reset = pressed));
  useKeyPress(['t'], (pressed) => (keys.current.test = pressed));

  return keys;
}
