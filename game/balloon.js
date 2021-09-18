'use strict'

function Balloon (x, y, height, width) {
  this.sprite = new PIXI.Sprite.from('res/balloon.png')
  this.sprite.x = x
  this.sprite.y = y
  this.down = true
  this.sprite.width = width
  this.sprite.height = height
  // this.sprite.collisionRadius = size / 2
  this.health = 100

  this.basicText = new PIXI.Text(`Balloon Health: ${this.health}`)
  this.basicText.x = 50
  this.basicText.y = 50
}

Balloon.prototype.add = function (stage) {
  stage.addChild(this.sprite)
  stage.addChild(this.basicText)
}

Balloon.prototype.remove = function (stage) {
  stage.removeChild(this.sprite)
}

Balloon.prototype.destroy = function () {
  this.sprite.destroy()
}

Balloon.prototype.loop = function (renderer) {
  // 0 -> 100 -> 0 -> -100 -> 0 -> 100
  let dy = 4
  if (this.down) {
    if (this.sprite.y > 200) {
      this.down = false
    }
    this.sprite.y += dy
  } else if (!this.down) {
    if (this.sprite.y < -200) {
      this.down = true
    }
    this.sprite.y += -dy
  }
}

export default Balloon
