const sdx = imports.gi.sdx; 

function main() {

    const KEY_z = 122
    const KEY_ESC = 27
    const fireRate = 0.1
    const base = "/home/bruce/gjs/sdxjs/data"

    const game = sdx.createGame("ShmupWarz", 640, 640, base) 
    const bgd = sdx.createSprite('images/BackdropBlackLittleSparkBlack.png')
    const player = sdx.createSprite('images/spaceshipspr.png')
    const entities = [
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        {active: false, position: {x:0, y:0}, velocity: {x:0, y:-800}, sprite: sdx.createSprite('images/bullet.png')},
        
    ]

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
                    for (let e of entities) {
                        if (!e.active) {
                            e.active = true
                            e.position.x = game.mouse_x+27
                            e.position.y = game.mouse_y+2
                            game.addSprite(e.sprite)
                            break
                        }
                    }
                    for (let e of entities) {
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