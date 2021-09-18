'use strict'

function EndState (win) {
  this.background = new PIXI.Sprite.from('../game/public/scene.png') // '../public/scene.png' OR ../game/public/scene.png
  this.background.width = screen.width * 1.2
  this.background.height = screen.height - 50
  this.background.x = screen.width / 2
  this.background.y = screen.height / 2 - 100
  this.background.anchor.set(0.5, 0.5)

  this.text = new PIXI.Text('?', { fontFamily: 'Calibri', fontSize: 100, fill: 0xffffff, align: 'center' })
  this.text.x = screen.width / 2 - 100
  this.text.y = screen.height / 2 - 50

  win ? this.text.text = 'WINNER!' : this.text.text = 'YOU LOSE'
}

EndState.prototype.add = function (stage, complete) {
    
    if (complete == 1) {
        this.text.text = 'WINNER!'
    } else {
        this.text.text = 'YOU LOSE'
    }
    stage.addChild(this.background)
  stage.addChild(this.text)
}

export default EndState