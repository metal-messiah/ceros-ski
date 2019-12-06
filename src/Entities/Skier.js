import * as Constants from '../Constants';
import { Entity } from './Entity';
import { intersectTwoRects, Rect } from '../Core/Utils';
import * as FrameManager from '../Core/FrameManager';

export class Skier extends Entity {
  assetName = Constants.SKIER_DOWN;

  direction = Constants.SKIER_DIRECTIONS.DOWN;
  speed = Constants.SKIER_STARTING_SPEED;

  jumping = false;
  collided = false;

  prevPosition = { x: null, y: null };

  constructor(x, y) {
    super(x, y);
  }

  setDirection(direction) {
    this.direction = direction;
  }

  capturePrevPosition() {
    this.prevPosition = { x: this.x, y: this.y };
  }

  getPrevPosition() {
    return this.prevPosition;
  }

  handleAnimation() {
    if (this.jumping) {
      // only run this animation loop if jumping
      if (FrameManager.getFrame() % Constants.ANIMATION_CYCLE_RATE === 0) {
        // loop (ONCE) through the animation sequence every 10 frames
        const animations = Constants.ANIMATIONS.SKIER_JUMP;
        this.animate(false, animations);
        if (this.assetName === animations[animations.length - 1]) {
          // when reaching the end of the loop, set jumping to false so it'll go back to direction asset
          this.endJump();
        }
      }
    } else if (this.assetName !== Constants.SKIER_DIRECTION_ASSET[this.direction]) {
      this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }
  }

  move() {
    switch (this.direction) {
      case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
        this.moveSkierLeftDown();
        break;
      case Constants.SKIER_DIRECTIONS.DOWN:
        this.moveSkierDown();
        break;
      case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
        this.moveSkierRightDown();
        break;
    }
  }

  moveSkierLeft() {
    this.x -= Constants.SKIER_STARTING_SPEED;
  }

  moveSkierLeftDown() {
    this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
  }

  moveSkierDown() {
    this.y += this.speed;
  }

  moveSkierRightDown() {
    this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
  }

  moveSkierRight() {
    this.x += Constants.SKIER_STARTING_SPEED;
  }

  moveSkierUp() {
    this.y -= Constants.SKIER_STARTING_SPEED;
  }

  turnLeft() {
    switch (this.direction) {
      case Constants.SKIER_DIRECTIONS.LEFT:
        this.moveSkierLeft();
        break;
      case Constants.SKIER_DIRECTIONS.CRASH:
        this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        break;
      default:
        if (this.collided) {
          this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
          this.moveSkierLeft();
        } else {
          this.setDirection(this.direction - 1);
        }
    }
  }

  turnRight() {
    switch (this.direction) {
      case Constants.SKIER_DIRECTIONS.RIGHT:
        this.moveSkierRight();
        break;
      case Constants.SKIER_DIRECTIONS.CRASH:
        this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
        break;
      default:
        if (this.collided) {
          this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
          this.moveSkierRight();
        } else {
          this.setDirection(this.direction + 1);
        }
    }
  }

  turnUp() {
    if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
      this.moveSkierUp();
    }
  }

  turnDown() {
    if (!this.collided) {
      this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }
  }

  jump() {
    this.jumping = true;
  }

  endJump() {
    this.jumping = false;
  }

  checkIfSkierHitObstacle(obstacleManager, assetManager) {
    const asset = assetManager.getAsset(this.assetName);
    const skierBounds = new Rect(
      this.x - asset.width / 2,
      this.y - asset.height / 2,
      this.x + asset.width / 2,
      this.y - asset.height / 4
    );

    const collision = obstacleManager.getObstacles().find(obstacle => {
      if (!this.jumping || (this.jumping && !obstacle.isRock())) {
        const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());

        const obstaclePosition = obstacle.getPosition();
        const obstacleBounds = new Rect(
          obstaclePosition.x - obstacleAsset.width / 2,
          obstaclePosition.y - obstacleAsset.height / 2,
          obstaclePosition.x + obstacleAsset.width / 2,
          obstaclePosition.y
        );
        return intersectTwoRects(skierBounds, obstacleBounds);
      } else {
        return false;
      }
    });

    if (collision) {
      if (!this.collided) {
        this.collided = true;
        this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
      }
    } else {
      this.collided = false;
    }
  }
}
