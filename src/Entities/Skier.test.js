import { Skier } from './Skier';
import * as Constants from '../Constants';

const skier = new Skier(0, 0);

test('A crashed skier turns left when left direction is set', () => {
  // crash the skier
  skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
  // then turn left
  skier.turnLeft();

  expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
});

test('A crashed skier turns right when right direction is set', () => {
  // crash the skier
  skier.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
  // then turn right
  skier.turnRight();

  expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
});

test('skier should toggle animate assets correctly', () => {
  const maxCycles = 100;
  let incrementer = 0;

  while (incrementer < maxCycles) {
    incrementer++;
    if (incrementer > 80) {
      skier.jumping = true;
      skier.handleAnimation();
      expect(Constants.ANIMATIONS.SKIER_JUMP.includes(skier.assetName)).toBe(true);
    } else {
      skier.turnDown();
      skier.handleAnimation();
      expect(skier.assetName).toEqual(Constants.SKIER_DIRECTION_ASSET[Constants.SKIER_DIRECTIONS.DOWN]);
    }
  }
});
