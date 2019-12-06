import { isMobileDevice } from './Utils';

export class Canvas {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  drawOffset = {
    x: 0,
    y: 0
  };
  ctx = null;

  gameOver = false;
  gameOverY = 0;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.createCanvas();
  }

  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'skiCanvas';
    canvas.width = this.width * window.devicePixelRatio;
    canvas.height = this.height * window.devicePixelRatio;
    canvas.style.width = this.width + 'px';
    canvas.style.height = this.height + 'px';

    canvas.addEventListener('click', e => this.handleClick(e));

    this.ctx = canvas.getContext('2d');
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    document.body.appendChild(canvas);
  }

  clearCanvas() {
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
  }

  handleClick() {
    if (this.gameOver) {
      // restart
      if (isMobileDevice()) {
        window.location.reload();
      }
    }
  }

  setGameOver(gameOver) {
    this.gameOver = gameOver;
  }

  setDrawOffset(x, y) {
    this.drawOffset.x = x;
    this.drawOffset.y = y;
  }

  drawImage(image, x, y, width, height) {
    x -= this.drawOffset.x;
    y -= this.drawOffset.y;

    this.ctx.drawImage(image, x, y, width, height);
  }

  drawScore(skier) {
    this.ctx.font = 'bold 12pt Courier';
    this.ctx.textAlign = 'left';

    const score = skier.getPosition().y;
    const text = `Score: ${Math.floor(score).toLocaleString()}`;

    const textWidth = this.ctx.measureText(text).width;
    const padding = 25;
    const x = this.width - textWidth - padding;
    const y = padding;

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(x - 10, 5, textWidth + 20, 30);

    this.ctx.fillStyle = this.getScoreColor(skier);
    this.ctx.fillText(text, x, y);
  }

  getScoreColor(skier) {
    if (skier.collided) {
      return 'red';
    }
    if (skier.jumping) {
      return 'green';
    }
    return 'black';
  }

  drawGameOver() {
    this.gameOverY = this.gameOverY >= this.height / 2 - 100 ? this.gameOverY : this.gameOverY + 10;
    this.ctx.font = isMobileDevice() ? 'bold 24pt Courier' : 'bold 48pt Courier';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = 'black';

    const gameOverText = 'GAME OVER';
    const gameOverTextWidth = this.ctx.measureText(gameOverText).width;

    this.ctx.fillText(gameOverText, this.width / 2 - gameOverTextWidth / 2, this.gameOverY);

    this.ctx.font = isMobileDevice() ? 'bold 12pt Courier' : 'bold 24pt Courier';
    const restartText = isMobileDevice() ? 'Tap to Play Again' : 'Press SPACE to Play Again';
    const restartTextWidth = this.ctx.measureText(restartText).width;

    this.ctx.fillText(restartText, this.width / 2 - restartTextWidth / 2, this.gameOverY + 50);
  }
}
