import '../css/game.css';
import { Game } from './Core/Game.js';

const newGame = () => {
  const skiGame = new Game();
  skiGame.load().then(() => {
    skiGame.init();
    skiGame.run();
  });
};

document.addEventListener('DOMContentLoaded', () => newGame());
