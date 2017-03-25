import * as sdx from 'Sdx'
import * as entities from 'entities'
import * as systems from 'systems'

function main() {

    const game = sdx.createGame("ShmupWarz", 640, 640, DATADIR) 
    entities.createPool(game)
    game.profile = true
    game.start()
    while(game.running) {
        game.handleEvents()
        if (game.getKey(sdx.InputKeys.ESC)) break
        // if (game.getKey(keys.KEY_ESC)) break
        else {
            systems.collisionSystem(game, entities)
            systems.expireSystem(game, entities)
            systems.removalSystem(game, entities)
            systems.spawnSystem(game, entities)
            systems.tweenSystem(game, entities)
            systems.inputSystem(game, entities)
            systems.physicsSystem(game, entities)
            game.draw()
        }
    }

}

main()