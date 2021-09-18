'use strict'

import PlayState from './gameStates/PlayState.js'
import EndState from './gameStates/EndState.js'

// Determine if the web browser supports WebGL
let type = 'WebGL'
if (!PIXI.utils.isWebGLSupported()) {
  type = 'Canvas'
}

PIXI.utils.sayHello(type)

window.complete = -1

// Set up the PIXI app and add it to the html document as a Canvas
const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, antialias: true })
document.body.style.margin = '0px'
document.body.appendChild(app.view)

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
// PIXI.Loader.shared.add('res/spritesheet.json')

// Start game when done loading
PIXI.Loader.shared.onComplete.add(start)
PIXI.Loader.shared.load()

function start () {
  const playState = new PlayState()
  const endState = new EndState()

  playState.add(app.stage, complete)

  app.ticker.add(delta => gameLoop(delta))

  // Game Loop
  function gameLoop (delta) {
    console.log(window.complete)
    if (window.complete == -1) {
      playState.loop(app.renderer)
    } else if (window.complete == 1) {
      endState.add(app.stage, true)
    } else if (window.complete == 0) {
      endState.add(app.stage, false)
    }
  }
}
