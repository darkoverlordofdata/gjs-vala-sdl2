/**
 * Systems
 */
import * as sdx from 'Sdx'

const fireRate = 0.1
let timeToFire = 0
let enemyT1 = 2
let enemyT2 = 7
let enemyT3 = 13

export function inputSystem(game, entities) {
    const player = entities.pool[0]
    player.position.x = game.mouse_x
    player.position.y = game.mouse_y
    if (game.mouse_down || game.getKey(sdx.InputKeys.z)) { /* fire system */
        timeToFire -= game.delta_time
        if (timeToFire < 0) {
            timeToFire = fireRate
            entities.bullet(game, game.mouse_x+27, game.mouse_y+2)
            entities.bullet(game, game.mouse_x-27, game.mouse_y+2)
        }
    }
}

export function physicsSystem(game, entities) {
    for (let e of entities.active) {
        if (e.active) {
            if (e.velocity) {
                e.position.x += e.velocity.x * game.delta_time
                e.position.y += e.velocity.y * game.delta_time
            }
            if (e.bounds) {     // adjust bounds 'hit zone'
                e.bounds.x = e.position.x - e.bounds.w/8
                e.bounds.y = e.position.y - e.bounds.h/2
            }
            // update the sprite object
            e.sprite.x = e.position.x
            e.sprite.y = e.position.y
            if (e.scale) e.sprite.setScale(e.scale.x, e.scale.y)
            if (e.tint) e.sprite.setColor(e.tint.r, e.tint.g, e.tint.b)
            
        }
    }
}

export function expireSystem(game, entities) {
    for (let e of entities.active) {
        if (e.player) continue
        if (e.active && e.expires) {
            e.expires -= game.delta_time
            if (e.expires < 0) {
                entities.deactivate(game, e)
            }
        }
    }
}

export function removalSystem(game, entities) {
    for (let e of entities.active) {
        if (e.player) continue
        if (e.active && e.position.y < 0 || e.position.y > game.height) {
            entities.deactivate(game, e)
        }
    }
}

export function tweenSystem(game, entities) {
    for (let e of entities.active) {
        if (e.active && e.tween) {
            let tween = e.tween
            let x = e.scale.x + (tween.speed * game.delta_time)
            let y = e.scale.y + (tween.speed * game.delta_time)
            let active = e.tween.active

            if (x > tween.max) {
                x = tween.max
                y = tween.max
                active = false
            } else if (x < tween.min) {
                x = tween.min
                y = tween.min
                active = false
            }
            e.scale.x = x
            e.scale.y = y
            e.tween.active = active
        }
    }
}

export function spawnSystem(game, entities) {
    function spawn(t, enemy) {
        const d1 = t-game.delta_time
        if (d1<0) {
            switch(enemy) {
                case 1: entities.enemy1(game); return 2
                case 2: entities.enemy2(game); return 7
                case 3: entities.enemy3(game); return 13
                default: throw new Error("WTF")
            }
        } else return d1
    }
    enemyT1 = spawn(enemyT1, 1)
    enemyT2 = spawn(enemyT2, 2)
    enemyT3 = spawn(enemyT3, 3)
}

export function collisionSystem(game, entities) {
    for (let e of entities.active) 
        if (e.active && e.enemy) 
            for (let b of entities.active) 
                if (b.active && b.bullet) 
                    if (intersects(e, b)) handleCollision(game, e, b, entities)
}

function intersects(a, b) {
    const r1 = a.bounds
    const r2 = b.bounds
    return ((r1.x < r2.x + r2.w) && 
            (r1.x + r1.w > r2.x) && 
            (r1.y < r2.y + r2.h) && 
            (r1.y + r1.h > r2.y)) 
    
}

function handleCollision(game, enemy, bullet, entities) {
    let x = bullet.position.x
    let y = bullet.position.y
    entities.bang(game, x, y)
    entities.deactivate(game, bullet)
    for (let i=0; i<4; i++) {
        entities.particle(game, x, y)
    }
    if (enemy.health) {
        enemy.health.current -= 2
        if (enemy.health.current < 0) {
            x = enemy.position.x
            y = enemy.position.y
            entities.deactivate(game, enemy)
            entities.explosion(game, x, y)
        }
    }
}
    
