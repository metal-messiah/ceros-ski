import * as Constants from '../Constants';

let frame = 0;

function tick() {
  frame++;
}

function getFrame() {
  return frame;
}

export { tick, getFrame };
