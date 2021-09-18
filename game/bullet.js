'use strict'

function Bullet (x, y) {
  this.sprite = new PIXI.Sprite.from('game/res/needle.png')
  this.sprite.width = 100
  this.sprite.height = 100
  this.sprite.x = x
  this.sprite.y = y
}

export default Bullet
