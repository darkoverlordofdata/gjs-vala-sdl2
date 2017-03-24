import * as sdx from 'Sdx'
import * as keys from 'keys'
import * as entities from 'entities'
import * as systems from 'systems'

function main() {

    const game = sdx.createGame("ShmupWarz", 640, 640, DATADIR) 
    // const bgd = sdx.createSprite('images/BackdropBlackLittleSparkBlack.png')
    // const player = sdx.createSprite('images/spaceshipspr.png')
    
    // bgd.setScale(3, 3)

    
    // game.addSprite(bgd)
    // game.addSprite(player)
    const player = entities.createAll(game)
    game.start()
    while(game.running) {
        game.handleEvents()
        if (game.getKey(keys.KEY_ESC)) break
        else {
            systems.spawnSystem(game, entities.enemies)
            systems.collisionSystem(game, entities.enemies, entities.bullets, entities.bangs, entities.explosions)
            systems.tweenSystem(game, entities.bangs)
            systems.tweenSystem(game, entities.explosions)
            systems.inputSystem(game, player, entities.bullets)
            systems.expireSystem(game, entities.all)
            systems.removalSystem(game, entities.all)
            systems.physicsSystem(game, entities.all)
            game.draw()
        }
    }

}

main()