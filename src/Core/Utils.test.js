import * as Utils from './Utils';

test('randomInt returns random int in range', () => {
  const randomInt = Utils.randomInt(1, 5);

  expect(Number.isNaN(randomInt)).toBeFalsy();
  expect(randomInt).toBeGreaterThanOrEqual(1);
  expect(randomInt).toBeLessThanOrEqual(5);

  expect(Number.isInteger(randomInt)).toBeTruthy();
});

test('intersectTwoRects returns correctly', () => {
  const rect1 = { left: 0, right: 5, top: 0, bottom: 5 };
  const rect2 = { left: 2, right: 7, top: 2, bottom: 7 };
  let intersects = Utils.intersectTwoRects(rect1, rect2);
  expect(intersects).toBeTruthy();

  const rect3 = { left: 100, right: 200, top: 100, bottom: 200 };
  intersects = Utils.intersectTwoRects(rect2, rect3);
  expect(intersects).toBeFalsy();
});
