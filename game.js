const sdx = imports.gi.sdx; 

function main() {

    const KEY_z = 122
    const KEY_ESC = 27
    const fireRate = 0.1
    const base = "/home/bruce/gjs/sdxjs/data"

    const game = sdx.createGame("ShmupWarz", 640, 640, base) 
    const bgd = sdx.createSprite('images/BackdropBlackLittleSparkBlack.png')
    const player = sdx.createSprite('images/spaceshipspr.png')

    function createBullet() {
        return {
            active: false,
            position: {x: 0, y: 0},
            velocity: {x: 0, y: -800},
            sprite: sdx.createSprite('images/bullet.png')
        }
    }

    function createEnemy1() {
        return {
            active: false,
            position: {x: 0, y: 0},
            velocity: {x: 0, y: 20},
            sprite: sdx.createSprite('images/enemy1.png')
        }
    }

    const entities = new Array(27)
    const bullets = new Array(20)
    const enemies = new Array(6)
    
    entities[ 0] = bullets[ 0] = createBullet()
    entities[ 1] = bullets[ 1] = createBullet()
    entities[ 2] = bullets[ 2] = createBullet()
    entities[ 3] = bullets[ 3] = createBullet()
    entities[ 4] = bullets[ 4] = createBullet()
    entities[ 5] = bullets[ 5] = createBullet()
    entities[ 6] = bullets[ 6] = createBullet()
    entities[ 7] = bullets[ 7] = createBullet()
    entities[ 8] = bullets[ 8] = createBullet()
    entities[ 9] = bullets[ 9] = createBullet()
    entities[10] = bullets[10] = createBullet()
    entities[11] = bullets[11] = createBullet()
    entities[12] = bullets[12] = createBullet()
    entities[13] = bullets[13] = createBullet()
    entities[14] = bullets[14] = createBullet()
    entities[15] = bullets[15] = createBullet()
    entities[16] = bullets[16] = createBullet()
    entities[17] = bullets[17] = createBullet()
    entities[18] = bullets[18] = createBullet()
    entities[19] = bullets[19] = createBullet()
    entities[20] = bullets[20] = createBullet()

    entities[21] = enemies[ 0] = createEnemy1()
    entities[22] = enemies[ 1] = createEnemy1()
    entities[23] = enemies[ 2] = createEnemy1()
    entities[24] = enemies[ 3] = createEnemy1()
    entities[25] = enemies[ 4] = createEnemy1()
    entities[26] = enemies[ 5] = createEnemy1()
    entities[27] = enemies[ 6] = createEnemy1()


    let timeToFire = 0
    
    bgd.setScale(3, 3)
    game.addSprite(bgd)
    game.addSprite(player)
    
    while(game.running) {
        game.handleEvents()
        if (game.getKey(KEY_ESC)) break
        else {

            player.x = game.mouse_x
            player.y = game.mouse_y
            for (let e of entities) {
                if (e.active) {
                    e.position.x += e.velocity.x * game.delta_time
                    e.position.y += e.velocity.y * game.delta_time
                    e.sprite.x = e.position.x
                    e.sprite.y = e.position.y
                }
            }
            for (let e of entities) {
                if (e.active && e.position.y < 0) {
                    game.removeSprite(e.sprite)
                    e.active = false
                }
            }
            if (game.mouse_down || game.getKey(KEY_z)) { /* fire system */
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

            game.draw()
        }
    }

}

main()