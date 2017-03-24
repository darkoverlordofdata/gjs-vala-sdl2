/**
 * Systems
 */
import * as sdx from 'Sdx'
import * as keys from 'keys'

const fireRate = 0.1
let timeToFire = 0
let enemyT1 = 2
let enemyT2 = 7
let enemyT3 = 13

export function physicsSystem(game, entities) {
    for (let e of entities) {
        if (e.active) {
            if (e.velocity) {
                e.position.x += e.velocity.x * game.delta_time
                e.position.y += e.velocity.y * game.delta_time
            }
            e.sprite.x = e.position.x
            e.sprite.y = e.position.y
            if (e.bounds) {
                e.bounds.x = e.position.x
                e.bounds.y = e.position.y
            }
            if (e.scale) e.sprite.setScale(e.scale.x, e.scale.y)
            if (e.tint) e.sprite.setColor(e.tint.r, e.tint.g, e.tint.b)
            
        }
    }
}

export function inputSystem(game, player, bullets) {
    player.position.x = game.mouse_x
    player.position.y = game.mouse_y
    if (game.mouse_down || game.getKey(keys.KEY_z)) { /* fire system */
        timeToFire -= game.delta_time
        if (timeToFire < 0) {
            timeToFire = fireRate
            for (let e of bullets) {
                if (!e.active) {
                    e.active = true
                    e.position.x = game.mouse_x+27
                    e.position.y = game.mouse_y+2
                    game.addSprite(e.sprite)
                    break
                }
            }
            for (let e of bullets) {
                if (!e.active) {
                    e.active = true
                    e.position.x = game.mouse_x-27
                    e.position.y = game.mouse_y+2
                    game.addSprite(e.sprite)
                    break
                }
            }
        }
    }
}

export function expireSystem(game, entities) {
    for (let e of entities) {
        if (e.player) continue
        if (e.active && e.expires) {
            e.expires -= game.delta_time
            if (e.expires < 0) {
                e.active = false
                game.removeSprite(e.sprite)
            }
        }
    }
}

export function removalSystem(game, entities) {
    for (let e of entities) {
        if (e.player) continue
        if (e.active && e.position.y < 0 || e.position.y > game.height) {
            game.removeSprite(e.sprite)
            e.active = false
        }
    }
}

export function tweenSystem(game, entities) {
    for (let e of entities) {
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

export function spawnSystem(game, enemies) {
    function spawn(t, enemy) {
        const d1 = t-game.delta_time
        if (d1<0) {
            for (let e of enemies) {
                if (!e.active && e.model === enemy) {
                    e.position.x = Math.random()*game.width - e.bounds.w/2
                    e.position.y = e.bounds.h
                    e.health.current = e.health.maximum
                    e.active = true
                    game.addSprite(e.sprite)
                    break
                }
            }
            switch(enemy) {
                case 1: return 2
                case 2: return 7
                case 3: return 13
                default: return 0
            }
        } else return d1
    }
    enemyT1 = spawn(enemyT1, 1)
    enemyT2 = spawn(enemyT2, 2)
    enemyT3 = spawn(enemyT3, 3)

}

function intersects(a, b) {
    const r1 = a.bounds
    const r2 = b.bounds
    return ((r1.x < r2.x + r2.w) && 
            (r1.x + r1.w > r2.x) && 
            (r1.y < r2.y + r2.h) && 
            (r1.y + r1.h > r2.y)) 
    
}
function handleCollision(game, a, b, bangs, explosions) {
    for (let e of bangs) {
        if (!e.active) {
            e.active = true
            e.position.x = a.position.x
            e.position.y = a.position.y
            e.scale.x = 0.2
            e.scale.y = 0.2
            e.tween.active = true
            e.expires = 0.2
            game.addSprite(e.sprite)
            break
        }
    }
    b.active = false
    game.removeSprite(b.sprite)
    // for (i <- 0 to 3) game.addParticle(b.position.x, b.position.y)
    if (a.health) {
        a.health.current -= 2
        if (a.health.current < 0) {
            for (let e of explosions) {
                if (!e.active) {
                    e.active = true
                    e.position.x = a.position.x
                    e.position.y = a.position.y
                    e.tween.active = true
                    e.scale.x = 0.5
                    e.scale.y = 0.5
                    e.expires = 0.2
                    game.addSprite(e.sprite)
                    break
                }
            }
            a.active = false
            game.removeSprite(a.sprite)
        }
    }
}
// game.addBang(b.position.x, b.position.y)
// game.removeEntity(b.id)
// for (i <- 0 to 3) game.addParticle(b.position.x, b.position.y)
// a.health match {
//     case Some(health) => {
//         val h = health.current -2
//         if (h < 0) {
//             game.addExplosion(b.position.x, b.position.y)
//             return a.copy(active = false)
//         } else {
//             return a.copy(health = Some(new Health(h, health.maximum)))
//         }   
//     }
//     case _ => a
// }
    
export function collisionSystem(game, enemies, bullets, bangs, explosions) {
    for (let e of enemies) 
        if (e.active) 
            for (let b of bullets) 
                if (b.active) 
                    if (intersects(e, b)) handleCollision(game, e, b, bangs, explosions)
}
