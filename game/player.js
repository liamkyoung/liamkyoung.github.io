'use strict'

import Vector from './vector.js'
import Gun from './gun.js'
function Player () {
  this.coordinateText = new PIXI.Text('X: -, Y: -')

  // this.playerStationaryTextures = PIXI.Loader.shared.resources['res/spritesheet.json'].spritesheet.animations.player_stationary
  // this.playerWalkingTextures = PIXI.Loader.shared.resources['res/spritesheet.json'].spritesheet.animations.player_walking

  this.sprite = new PIXI.Sprite.from('res/red.png')
  this.sprite.width = 100
  this.sprite.height = 200
  this.sprite.x = screen.width / 2
  this.sprite.y = screen.height - 200
  // his.sprite.colRadius = 40

  // this.sprite.animationSpeed = 0.03

  this.sprite.vx = 0

  this.moving = false

  // this.sprite.rotation = -1.5708

  this._initInput()
}

Player.prototype.add = function (stage, gun) {
  stage.addChild(this.coordinateText)
  stage.addChild(this.sprite)
  // stage.addChild(this.gun)
  this.stage = stage
  this.gun = gun
}

Player.prototype.remove = function (stage) {
  stage.removeChild(this.coordinateText)
  stage.removeChild(this.sprite)
  this.stage = null
}

Player.prototype.loop = function (renderer) {
  function rotateToPoint (mx, my, px, py) {
    let distY = my - py
    let distX = mx - px
    let angle = Math.atan2(distY, distX)
    return angle
  }

  this.sprite.rotation = rotateToPoint(renderer.plugins.interaction.mouse.global.x, renderer.plugins.interaction.mouse.global.y, this.sprite.x, this.sprite.y)

  if (this.keys.a) {
    this.sprite.vx = -2
  }
  if (this.keys.d) {
    this.sprite.vx = 2
  }

  if (!this.keys.a && !this.keys.d) {
    this.sprite.vx = 0
  }

  if (this.keys.a || this.keys.d) {
    if (!this.moving) {
      this.moving = true
      // this.sprite.textures = this.playerWalkingTextures
      // this.sprite.animationSpeed = 0.15
      // this.sprite.play()
    }
  } else {
    if (this.moving) {
      this.sprite.textures = this.playerStationaryTextures
      // this.sprite.animationSpeed = 0.03
      // this.sprite.play()
      // this.moving = false
    }
  }

  this.sprite.x += this.sprite.vx

  // this.sprite.rotation = Math.atan2(renderer.plugins.interaction.mouse.global.y - (renderer.height / 2), renderer.plugins.interaction.mouse.global.x - (renderer.width / 2)) + ((90 * Math.PI) / 180)

  this.coordinateText.text = `X: ${Math.trunc(this.sprite.x)}, Y: ${Math.trunc(this.sprite.y)}`

  // this.coordinateText.pivot.set(-this.sprite.x + (renderer.width / 2), -this.sprite.y + (renderer.height / 2))
  // this.stage.pivot.set(this.sprite.x - (renderer.width / 2), this.sprite.y - (renderer.height / 2))

  // this.gun.loop(renderer)
}

Player.prototype.checkCollisionCircle = function (x, y, r) {
  const distanceVector = new Vector(x - this.sprite.x, y - this.sprite.y)
  if (distanceVector.mag() < this.sprite.colRadius + r) {
    const overlap = distanceVector.mag() - (r + this.sprite.colRadius)
    const direction = distanceVector.normalize()
    direction.mul(overlap)
    this.sprite.x += direction.x
  }
}

Player.prototype.destroy = function () {
  this.sprite.destroy()
  this.coordinateText.destroy()
}

Player.prototype._initInput = function () {
  this.keys = {
    a: false,
    d: false
  }

  window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'a') { // Left
      this.keys.a = true
    }
    if (e.key.toLowerCase() === 'd') { // Right
      this.keys.d = true
    }
  })

  window.addEventListener('keyup', e => {
    if (e.key.toLowerCase() === 'a') { // Left
      this.keys.a = false
    }
    if (e.key.toLowerCase() === 'd') { // Right
      this.keys.d = false
    }
  })

  window.addEventListener('mousedown', e => {
    this.gun.shoot(this.sprite.rotation, {
      x: this.sprite.x + Math.cos(this.sprite.rotation),
      y: this.sprite.y + Math.sin(this.sprite.rotation)
    })
  })
}

export default Player
