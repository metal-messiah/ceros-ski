export class Entity {
  x = 0;
  y = 0;

  assetName = '';

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getAssetName() {
    return this.assetName;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y
    };
  }

  animate(isLooped, animationAssets) {
    // figure out which step in the loop we are on
    const currentIndex = animationAssets.findIndex(a => a === this.assetName);
    // if it doesnt find it, meaning its a new asset loop, start it from the beginning
    let animationPosition = currentIndex >= 0 ? currentIndex : 0;

    if (isLooped) {
      // endlessly cycle through animations array
      animationPosition = (animationPosition + 1) % animationAssets.length;
    } else if (animationPosition < animationAssets.length - 1) {
      // cycle ONCE through animations array
      animationPosition++;
    }

    this.assetName = animationAssets[animationPosition];
  }

  draw(canvas, assetManager) {
    const asset = assetManager.getAsset(this.assetName);
    const drawX = this.x - asset.width / 2;
    const drawY = this.y - asset.height / 2;

    canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
  }
}
