import * as Constants from '../Constants';
import { AssetManager } from './AssetManager';
import { Canvas } from './Canvas';
import { Skier } from '../Entities/Skier';
import { ObstacleManager } from '../Entities/Obstacles/ObstacleManager';
import { Rect } from './Utils';
import { Rhino } from '../Entities/Rhino';
import * as FrameManager from './FrameManager';

export class Game {
  gameWindow = null;

  constructor() {
    this.assetManager = new AssetManager();
    this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
    this.skier = new Skier(0, 0);
    this.rhino = null;
    this.obstacleManager = new ObstacleManager();

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  init() {
    this.obstacleManager.placeInitialObstacles();
  }

  async load() {
    await this.assetManager.loadAssets(Constants.ASSETS);
  }

  run() {
    this.canvas.clearCanvas();

    // counting frames
    FrameManager.tick();

    this.updateGameWindow();
    this.drawGameWindow();

    requestAnimationFrame(this.run.bind(this));
  }

  createRhino() {
    // create a rhino at the middle and off the right edge of the screen
    const skierPosition = this.skier.getPosition();
    const right = skierPosition.x + Constants.GAME_WIDTH / 2;
    const middle = skierPosition.y;
    this.rhino = new Rhino(right, middle, this.skier);
  }

  shouldShowRhino() {
    return FrameManager.getFrame() > Constants.SHOW_RHINO_FRAME;
  }

  gameOver() {
    // game is over if rhino exists and has eaten the skier!
    return this.rhino && this.rhino.caughtSkier;
  }

  updateGameWindow() {
    this.canvas.setGameOver(this.gameOver());

    if (!this.gameOver()) {
      // dont move skier if he got caught
      this.skier.capturePrevPosition();
      this.skier.move();
    }

    if (this.shouldShowRhino()) {
      if (!this.rhino) {
        this.createRhino();
      }
      this.rhino.move();
    }

    const previousGameWindow = this.gameWindow;
    this.calculateGameWindow();

    this.obstacleManager.setNewObstacleChance(this.skier.getPosition().y, this.skier.getPrevPosition().y);
    this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

    this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
  }

  drawGameWindow() {
    this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

    if (!this.gameOver()) {
      // dont animate or draw the skier if they got caught.
      this.skier.handleAnimation();
      this.skier.draw(this.canvas, this.assetManager);
    }

    this.obstacleManager.drawObstacles(this.canvas, this.assetManager);

    if (this.shouldShowRhino()) {
      if (!this.rhino) {
        this.createRhino();
      }
      // let rhino animate
      this.rhino.handleAnimation();
      this.rhino.draw(this.canvas, this.assetManager);
    }

    this.canvas.drawScore(this.skier);

    if (this.gameOver()) {
      this.canvas.drawGameOver();
    }
  }

  calculateGameWindow() {
    const skierPosition = this.skier.getPosition();
    const left = skierPosition.x - Constants.GAME_WIDTH / 2;
    const top = skierPosition.y - Constants.GAME_HEIGHT / 2;

    this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
  }

  handleKeyDown(event) {
    if (!this.gameOver()) {
      // cant control skier if they are caught
      switch (event.which) {
        case Constants.KEYS.LEFT:
          this.skier.turnLeft();
          event.preventDefault();
          break;
        case Constants.KEYS.RIGHT:
          this.skier.turnRight();
          event.preventDefault();
          break;
        case Constants.KEYS.UP:
          this.skier.turnUp();
          event.preventDefault();
          break;
        case Constants.KEYS.DOWN:
          this.skier.turnDown();
          event.preventDefault();
          break;
        case Constants.KEYS.SPACE:
          this.skier.jump();
          event.preventDefault();
          break;
      }
    } else {
      if (event.which === Constants.KEYS.SPACE) {
        window.location.reload();
      }
    }
  }
}
