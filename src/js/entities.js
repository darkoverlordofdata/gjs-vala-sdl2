/**
 * Entity Factory
 */
import * as sdx from 'Sdx'

const Tau = 6.28318

function createBackground() {
    // sprite defaults to layer 0
    return {
        active: true,
        scale: {x: 3, y: 3},
        position: {x: 0, y: 0},
        velocity: {x: 0, y: 0},
        sprite: sdx.createSprite('images/BackdropBlackLittleSparkBlack.png')        
    }
}

function createPlayer() {
    const sprite = sdx.createSprite('images/spaceshipspr.png')
    sprite.layer = 8
    return {
        player: true,
        active: true,
        bounds: {x: 0, y: 0, w: sprite.width, h: sprite.height},
        position: {x: 0, y: 0},
        velocity: {x: 0, y: 0},
        sprite: sprite
    }
}

function createBullet() {
    const sprite = sdx.createSprite('images/bullet.png')
    sprite.layer = 9
    return {
        active: false,
        bounds: {x: 0, y: 0, w: sprite.width, h: sprite.height},
        position: {x: 0, y: 0},
        velocity: {x: 0, y: -800},
        tint: {r:0xd2, g:0xfa, b:0, a:0xff},
        sprite: sprite
    }
}

function createEnemy1() {
    const sprite = sdx.createSprite('images/enemy1.png')
    sprite.layer = 5
    return {
        active: false,
        model: 1,
        bounds: {x: 0, y: 0, w: sprite.width, h: sprite.height},
        position: {x: 0, y: 0},
        velocity: {x: 0, y: 40},
        health: {current: 10, maximum: 10},
        sprite: sprite
    }
}
function createEnemy2() {
    const sprite = sdx.createSprite('images/enemy2.png')
    sprite.layer = 6
    return {
        active: false,
        model: 2,
        bounds: {x: 0, y: 0, w: sprite.width, h: sprite.height},
        position: {x: 0, y: 0},
        velocity: {x: 0, y: 30},
        health: {current: 20, maximum: 20},
        sprite: sprite
    }
}
function createEnemy3() {
    const sprite = sdx.createSprite('images/enemy3.png')
    sprite.layer = 7
    return {
        active: false,
        model: 3,
        bounds: {x: 0, y: 0, w: sprite.width, h: sprite.height},
        position: {x: 0, y: 0},
        velocity: {x: 0, y: 20},
        health: {current: 60, maximum: 60},
        sprite: sprite
    }
}

function createExplosion() {
    const sprite = sdx.createSprite('images/explosion.png')
    sprite.layer = 10
    return {
        active: false,
        bounds: {x: 0, y: 0, w: sprite.width, h: sprite.height},
        position: {x: 0, y: 0},
        scale: {x: 0.5, y: 0.5},
        tween: {min: 0.5/100, max: 0.5, speed:-3, repeat:false, active:true},
        tint: {r:0xd2, g:0xfa, b:0xd2, a:0xfa},
        expires: 0.2,
        sprite: sprite
    }
}

function createBang() {
    const sprite = sdx.createSprite('images/explosion.png')
    sprite.layer = 10
    return {
        active: false,
        bounds: {x: 0, y: 0, w: sprite.width, h: sprite.height},
        position: {x: 0, y: 0},
        scale: {x: 0.2, y: 0.2},
        tween: {min: 0.2/100, max: 0.2, speed:-3, repeat:false, active:true},
        tint: {r:0xd2, g:0xfa, b:0xd2, a:0xfa},
        expires: 0.2,
        sprite: sprite
    }
}

function createParticle() {
    const radians = Math.random() * Tau
    const magnitude = Math.ceil(Math.random()*200)
    const velocityX = magnitude * Math.cos(radians)
    const velocityY = magnitude * Math.sin(radians)
    const scale = Math.random()*10
    const sprite = sdx.createSprite('images/star.png')
    sprite.layer = 10
    return {
        active: false,
        bounds: {x: 0, y: 0, w: sprite.width, h: sprite.height},
        position: {x: 0, y: 0},
        scale: {x: scale, y: scale},
        velocity: {x: velocityX, y: velocityY},
        tint: {r:0xfa, g:0xfa, b:0xd2, a:0xff},
        expires: 0.5,
        sprite: sprite
    }
}

export const all = new Array(27)
export const bullets = new Array(20)
export const enemies = new Array(18)
export const explosions = new Array(8)
export const bangs = new Array(8)

export function createAll(game) {
    let z = 0 // entity 
    let b = 0 // bullets
    let e = 0 // enemies
    let x = 0 // explosions
    let g = 0 // bang
    let p = 0 // particle

    all[z++] = createBackground()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()
    all[z++] = bullets[b++] = createBullet()

    all[z++] = enemies[e++] = createEnemy1()
    all[z++] = enemies[e++] = createEnemy1()
    all[z++] = enemies[e++] = createEnemy1()
    all[z++] = enemies[e++] = createEnemy1()
    all[z++] = enemies[e++] = createEnemy1()
    all[z++] = enemies[e++] = createEnemy1()
    all[z++] = enemies[e++] = createEnemy1()

    all[z++] = enemies[e++] = createEnemy2()
    all[z++] = enemies[e++] = createEnemy2()
    all[z++] = enemies[e++] = createEnemy2()
    all[z++] = enemies[e++] = createEnemy2()
    all[z++] = enemies[e++] = createEnemy2()
    all[z++] = enemies[e++] = createEnemy2()
    all[z++] = enemies[e++] = createEnemy2()

    all[z++] = enemies[e++] = createEnemy3()
    all[z++] = enemies[e++] = createEnemy3()
    all[z++] = enemies[e++] = createEnemy3()
    all[z++] = enemies[e++] = createEnemy3()
    all[z++] = enemies[e++] = createEnemy3()
    all[z++] = enemies[e++] = createEnemy3()
    all[z++] = enemies[e++] = createEnemy3()

    all[z++] = explosions[x++] = createExplosion()
    all[z++] = explosions[x++] = createExplosion()
    all[z++] = explosions[x++] = createExplosion()
    all[z++] = explosions[x++] = createExplosion()
    all[z++] = explosions[x++] = createExplosion()
    all[z++] = explosions[x++] = createExplosion()
    all[z++] = explosions[x++] = createExplosion()
    all[z++] = explosions[x++] = createExplosion()

    all[z++] = bangs[g++] = createBang()
    all[z++] = bangs[g++] = createBang()
    all[z++] = bangs[g++] = createBang()
    all[z++] = bangs[g++] = createBang()
    all[z++] = bangs[g++] = createBang()
    all[z++] = bangs[g++] = createBang()
    all[z++] = bangs[g++] = createBang()
    all[z++] = bangs[g++] = createBang()

    const player = all[z++] = createPlayer()
    game.addSprite(all[0].sprite)
    game.addSprite(player.sprite)
    return player

}
