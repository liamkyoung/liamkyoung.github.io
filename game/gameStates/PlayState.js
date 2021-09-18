'use strict'

import Player from '../player.js'
import Balloon from '../balloon.js'
import Bullet from '../bullet.js'
import Gun from '../gun.js'

function Play () {
  this.player = new Player()
  this.balloon = new Balloon(100, 0, 800, 300)
  this.gun = new Gun(this.player.sprite.x, this.player.sprite.y, this.player.sprite.rotation)
  this.bulletSpeed = 5
  this.stage = null

  this.background = new PIXI.Sprite.from('../game/public/scene.png')
  this.background.width = screen.width * 1.2
  this.background.height = screen.height - 50
  this.background.x = screen.width / 2
  this.background.y = screen.height / 2 - 100
  this.background.anchor.set(0.5, 0.5)
}

Play.prototype.add = function (stage) {
  stage.addChild(this.background)
  this.gun.add(stage)
  this.player.add(stage, this.gun)
  this.balloon.add(stage)
  this.gun.add(stage)
  this.stage = stage
}

Play.prototype.remove = function (stage) {
  stage.removeChild(this.background)
  this.player.remove(stage)
  this.stage = null
}

Play.prototype.loop = function (renderer) {
  this.player.loop(renderer)
  this.balloon.loop(renderer)
  this.gun.loop(renderer)
  // this.boulders.forEach((v, i) => {
  //   this.player.checkCollisionCircle(v.sprite.x, v.sprite.y, v.sprite.collisionRadius)
  // })
}

Play.prototype.destroy = function () {
  this.player.destroy()
}

export default Play
