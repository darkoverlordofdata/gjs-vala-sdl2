//0.000121
//0.000096


//import * as sdx from 'Sdx'
import {createGame, createAtlas, Sdx, Input} from 'Sdx'

const game = createGame("Frodo", 400, 600, "/home/bruce/gjs/gjs-vala-sdl2/data/")
game.start()

const atlas = createAtlas('pack.atlas')

for (let i=0; i<20; i++) {
  const sprite = atlas.createSprite('spaceshipspr', -1)
  sprite.x = i*2
  sprite.y = i*4
  Sdx.app.addSprite(sprite)
  
  // game.addSprite(sprite)
}



game.profile = true

while (game.running) {
  game.handleEvents()
  if (game.getKey(Input.Keys.Esc)) {
    break
  } else {
    game.draw()
  }
}
