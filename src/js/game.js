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
            systems.physicsSystem(game, entities.all)
            systems.removalSystem(game, entities.all)
            systems.spawnSystem(game, entities.enemies)
            systems.expireSystem(game, entities.all)
            //systems.tweenSystem(game, entities.explosions)
            //systems.tweenSystem(game, entities.bang)
            systems.inputSystem(game, player, entities.bullets)
            game.draw()
        }
    }

}

main()