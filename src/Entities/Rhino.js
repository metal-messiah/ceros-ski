import * as Constants from '../Constants';
import { Entity } from './Entity';
import * as FrameManager from '../Core/FrameManager';

export class Rhino extends Entity {
  assetName = Constants.RHINO_DEFAULT;
  speed = Constants.RHINO_STARTING_SPEED;

  caughtSkier = false;

  constructor(x, y, target) {
    super(x, y);
    this.target = target;
  }

  move() {
    const { x: targetX, y: targetY } = this.target.getPosition();

    this.seek('y', targetY);
    this.seek('x', targetX);

    this.caughtSkier = this.x === targetX && this.y === targetY;
  }

  seek(coord, targetCoord) {
    // adjust the x/y to seek the target (skier)
    if (targetCoord < this[coord]) {
      this[coord] = this[coord] - this.speed < targetCoord ? targetCoord : this[coord] - this.speed;
    } else if (targetCoord > this[coord]) {
      this[coord] = this[coord] + this.speed > targetCoord ? targetCoord : this[coord] + this.speed;
    }
  }

  handleAnimation() {
    if (FrameManager.getFrame() % Constants.ANIMATION_CYCLE_RATE === 0) {
      // cycle animations
      if (!this.caughtSkier) {
        this.animate(true, Constants.ANIMATIONS.RHINO_RUN);
      } else {
        this.animate(false, Constants.ANIMATIONS.RHINO_EAT);
      }
    }
  }
}
