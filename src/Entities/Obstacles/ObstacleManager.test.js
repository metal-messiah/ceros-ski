import { ObstacleManager } from './ObstacleManager';
const obstacleManager = new ObstacleManager();

test('Obstacle chance (difficulty) should increase as skier progresses', () => {
  for (let i = 100; i < 10000; i += 100) {
    const oldChance = obstacleManager.newObstacleChance;

    const newScore = i;
    const prevScore = i - 100;
    obstacleManager.setNewObstacleChance(newScore, prevScore);

    const newChance = obstacleManager.newObstacleChance;

    expect(newChance).toBeGreaterThan(oldChance);
  }
});
