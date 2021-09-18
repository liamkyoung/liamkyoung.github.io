'use strict'

import Bullet from './bullet.js'

function Gun (x, y, rot) {
  this.bullets = []
  this.bulletSpeed = 2
  this.x = x
  this.y = y
  this.rotation = rot
}

Gun.prototype.add = function (stage) {
  this.stage = stage
}

Gun.prototype.shoot = function (rotation, startPosition) {
  let bullet = new Bullet(startPosition.x, startPosition.y)
  bullet.sprite.rotation = rotation
  this.stage.addChild(bullet.sprite)
  this.bullets.push(bullet)
  console.log('BANG')
}

Gun.prototype.loop = function () {
  for (let b = this.bullets.length - 1; b >= 0; b--) {
    // console.log('X', this.bullets[b].sprite.x)
    this.bullets[b].sprite.x += Math.cos(this.bullets[b].sprite.rotation) * this.bulletSpeed
    this.bullets[b].sprite.y += Math.sin(this.bullets[b].sprite.rotation) * this.bulletSpeed
  }
}

export default Gun
