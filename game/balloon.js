'use strict'

function Balloon (x, y, height, width) {
  this.sprite = new PIXI.Sprite.from('game/public/balloon.png')
  this.sprite.x = x
  this.sprite.y = y
  this.down = true
  this.sprite.width = width
  this.sprite.height = height
  this.sprite.hitArea = new PIXI.Rectangle(x, y, width, 50)
  // this.sprite.collisionRadius = size / 2
  this.health = 100

  this.basicText = new PIXI.Text(`Balloon Health: ${this.health}`, { fontFamily: 'Calibri', fontSize: 24, fill: 0x00ff00, align: 'center' })
  this.basicText.x = screen.width - 300
  this.basicText.y = 100

  this.healthBar = new PIXI.Sprite.from('./public/healthbar.png')
  this.healthBar.width = 400
  this.healthBar.height = 100
  this.healthBar.x = screen.width - 200
  this.healthBar.y = 100
  this.healthBar.cropEnabled = true
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

Balloon.prototype.loop = function (renderer, gun) {
  if (this.health <= 0) {
    // Winner Screen
    console.log('WINNER')
  }

  // 0 -> 100 -> 0 -> -100 -> 0 -> 100
  let dy = 4
  if (this.down) {
    if (this.sprite.y > 200) {
      this.down = false
    }
    this.sprite.y += dy
  } else if (!this.down) {
    if (this.sprite.y < -500) {
      this.down = true
    }
    this.sprite.y += -dy
  }

  function intersects (a, b) {
    let aBox = a.getBounds()
    let bBox = b.getBounds()

    return aBox.x + aBox.width > bBox.x && aBox.x < bBox.x + bBox.width && aBox.y + aBox.height > bBox.y && aBox.y < bBox.y + bBox.height
  }

  for (let i = 0; i < gun.bullets.length; i++) {
    // console.log(intersects(this.sprite, gun.bullets[i].sprite))
    if (gun.bullets[i].collided === false && intersects(this.sprite, gun.bullets[i].sprite)) {
      gun.bullets[i].collided = true
      this.health -= 2
      console.log('BULLET HIT! Health: ', this.health)
      this.healthBar.width = (this.health / 100) * 300
    }
  }
  this.basicText.text = `Balloon Health: ${this.health}`
}

export default Balloon
