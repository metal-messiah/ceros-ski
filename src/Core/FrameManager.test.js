import 'babel-polyfill';
import { tick, getFrame } from './FrameManager';

test('tick should increase frame by 1', () => {
  tick();
  expect(getFrame()).toBe(1);

  tick();
  expect(getFrame()).toBe(2);
});
