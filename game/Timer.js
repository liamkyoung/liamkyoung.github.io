'use strict'

function Timer () {
  this.countdown = 30
  this.text = new PIXI.Text(`Time Until Explosion: ${this.countdown}`, { fontFamily: 'Calibri', fontSize: 24, fill: 0x00ff00, align: 'center' })
  this.text.x = screen.width - 300
  this.text.y = 150

  this.lose = false
}

Timer.prototype.start = function (stage) {
  stage.addChild(this.text)
  setInterval(() => {
    this.countdown -= 1
    this.text.text = `Time Until Explosion: ${this.countdown}`
    console.log('Incrementing', this.countdown)

    if (this.countdown <= 0) {
      // Lose Screen
      console.log('BLEW UP')
    }
  }, 1000)
}

export default Timer
