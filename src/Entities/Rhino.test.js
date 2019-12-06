import { Rhino } from './Rhino';
import { Skier } from './Skier';
import * as Constants from '../Constants';

const skier = new Skier(0, 0);

const skierPosition = skier.getPosition();
const right = skierPosition.x + Constants.GAME_WIDTH / 2;
const middle = skierPosition.y;
const rhino = new Rhino(right, middle, skier);

test('rhino should seek target (skier)', () => {
  const maxCycles = 100;
  let incrementer = 0;

  while (rhino.getPosition().x !== rhino.target.getPosition().x && incrementer < maxCycles) {
    incrementer++;
    const { x: targetX, y: targetY } = rhino.target.getPosition();

    rhino.seek('y', targetY);
    rhino.seek('x', targetX);
  }
  expect(incrementer).toBeLessThan(maxCycles);
  expect(rhino.getPosition().x).toEqual(rhino.target.getPosition().x);
});

test('rhino should toggle animate assets correctly', () => {
  const maxCycles = 100;
  let incrementer = 0;

  while (incrementer < maxCycles) {
    incrementer++;
    if (incrementer > 80) {
      rhino.caughtSkier = true;
      rhino.handleAnimation();
      expect(Constants.ANIMATIONS.RHINO_EAT.includes(rhino.assetName)).toBe(true);
    } else {
      rhino.handleAnimation();
      expect(Constants.ANIMATIONS.RHINO_RUN.includes(rhino.assetName)).toBe(true);
    }
  }
});
