import { Entity } from './Entity';
import * as Constants from '../Constants';

const entity = new Entity(0, 0);

test('Animate method should loop infinitely if isLooped', () => {
  const animationAssets = Constants.ANIMATIONS.RHINO_RUN;

  //loop twice!
  for (let i = 0; i < animationAssets.length * 2; i++) {
    entity.animate(true, animationAssets);
  }
  // if it keeps iterating past animationAssets length,
  // and the function doesnt loop back, it will be undefined

  expect(entity.assetName).toBeDefined();
});

test('Animate method should loop once if not isLooped', () => {
  const animationAssets = Constants.ANIMATIONS.RHINO_RUN;

  //loop twice!
  for (let i = 0; i < animationAssets.length * 2; i++) {
    entity.animate(false, animationAssets);
  }
  // since ifLooped is false, should just be the last asset
  expect(entity.assetName).toEqual(animationAssets[animationAssets.length - 1]);
});
