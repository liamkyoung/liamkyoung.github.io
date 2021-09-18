'use strict'

function Bullet (x, y) {
  this.sprite = new PIXI.Sprite.from('game/public/needle.png')
  this.sprite.width = 100
  this.sprite.height = 100
  this.sprite.x = x
  this.sprite.y = y
  this.sprite.hitArea = new PIXI.Rectangle(x, y, 100, 100)
  this.collided = false
}

Bullet.prototype.hit = () => {
  this.collided = true
}

export default Bullet
