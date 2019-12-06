import { Obstacle } from './Obstacle';
import * as Constants from '../../Constants';

const obstacle = new Obstacle(0, 0);
test('isRock returns correctly', () => {
  obstacle.assetName = Constants.ROCK1;
  expect(obstacle.isRock()).toBe(true);

  obstacle.assetName = Constants.ROCK2;
  expect(obstacle.isRock()).toBe(true);

  obstacle.assetName = Constants.TREE;
  expect(obstacle.isRock()).toBe(false);
});
