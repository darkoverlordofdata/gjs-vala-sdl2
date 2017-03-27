/**
 * Extensions for Example
 */

import {Sdx} from 'Sdx'
import {Entity} from 'entitas'
import {Pool} from 'entitas'

export enum Layer {
  DEFAULT,
  BACKGROUND,
  ACTORS_1,
  ACTORS_2,
  ACTORS_3,
  PARTICLES
}
export enum Effect {
  PEW,
  ASPLODE,
  SMALLASPLODE
}

module example.extensions {


  const Tau = Math.PI*2

  /**
   * Create the player
   */
  Pool.prototype.createPlayer = function() {
    this.createEntity('Player')
      .addBounds(43)
      .addVelocity(0, 0)
      .addPosition(~~(Sdx.app.width/4), ~~(Sdx.app.height-80))
      .addLayer(Layer.ACTORS_3)
      .addResource('images/spaceshipspr.png')
      .setPlayer(true)
  }

  /**
   * Create a bullet at (x,y)
   *
   * @param x
   * @param y
   */
  Pool.prototype.createBullet = function (x: number, y: number) {
    this.createEntity('Bullet')
      .addPosition(~~x, ~~y)
      .addVelocity(0, 800)
      .addBounds(5)
      .addExpires(1)
      .addSoundEffect(Effect.PEW)
      .addLayer(Layer.PARTICLES)
      .addResource('images/bullet.png')
      .setBullet(true)

  }

  /**
   * Create a particle at (x,y)
   *
   * @param x
   * @param y
   */
  Pool.prototype.createParticle = function (x: number, y: number) {
    var radians: number = Math.random() * Tau
    var magnitude: number = Math.random()*200
    var velocityX = magnitude * Math.cos(radians)
    var velocityY = magnitude * Math.sin(radians)
    var scale = Math.random()

    this.createEntity('Particle')
      .addExpires(1)
      .addColorAnimation(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, false, false, false, true, true)
      .addPosition(~~x, ~~y)
      .addVelocity(velocityX, velocityY)
      .addScale(scale, scale)
      .addLayer(Layer.PARTICLES)
      .addResource('images/star.png')
  }

  /**
   * Create a small explosion at (x,y)
   *
   * @param x
   * @param y
   */
  Pool.prototype.createSmallExplosion = function (x: number, y: number) {
    var scale = .1
    this.createEntity('SmallExp')
      .addExpires(0.5)
      .addScaleAnimation(scale / 100, scale, -3, false, true)
      .addPosition(~~x, ~~y)
      .addScale(scale, scale)
      .addLayer(Layer.PARTICLES)
      .addResource('images/explosion.png')
  }

  /**
   * Create a big explosion at (x,y)
   *
   * @param x
   * @param y
   */
  Pool.prototype.createBigExplosion = function (x: number, y: number) {
    var scale = .5
    this.createEntity('BigExp')
      .addExpires(0.5)
      .addScaleAnimation(scale / 100, scale, -3, false, true)
      .addPosition(~~x, ~~y)
      .addScale(scale, scale)
      .addLayer(Layer.PARTICLES)
      .addResource('images/explosion.png')
  }

  /**
   * Create enemy ship #1
   *
   */
  Pool.prototype.createEnemy1 = function() {
    var x = Math.random() * (Sdx.app.width-40)+20
    var y = Sdx.app.height/2 - 200
    this.createEntity("Enemy1")
      .addBounds(20)
      .addPosition(~~x, ~~y)
      .addVelocity(0, -40)
      .addLayer(Layer.ACTORS_1)
      .addResource('images/enemy1.png')
      .addHealth(10, 10)
      .setEnemy(true)

  }

  /**
   * Create enemy ship #2
   */
  Pool.prototype.createEnemy2 = function() {
    var x = Math.random() * (Sdx.app.width-80)+40
    var y = Sdx.app.height/2 - 100
    this.createEntity("Enemy2")
      .addBounds(40)
      .addPosition(~~x, ~~y)
      .addVelocity(0, -30)
      .addLayer(Layer.ACTORS_2)
      .addResource('images/enemy2.png')
      .addHealth(20, 20)
      .setEnemy(true)
  }

  /**
   * Create enemy ship #3
   */
  Pool.prototype.createEnemy3 = function() {
    var x = Math.random() * (Sdx.app.width-140)+70
    var y = Sdx.app.height/2 - 50
    this.createEntity("Enemy3")
      .addBounds(70)
      .addPosition(~~x, ~~y)
      .addVelocity(0, -20)
      .addLayer(Layer.ACTORS_3)
      .addResource('images/enemy3.png')
      .addHealth(60, 60)
      .setEnemy(true)
  }

}