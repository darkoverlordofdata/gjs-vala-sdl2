# sdx

gjs-vala-sdl2

inspired by libGDX, but wraps SDL2 rather than OpenGL
callable from gjs

## install

```
$ git clone git@github.com:darkoverlordofdata/gjs-vala-sdl2.git
$ cd gjs-vala-sdl2
$ npm install
$ ./build
$ ./run
```

generates:
* sdx.so
* sdx.vapi
* sdx-0.1.gir
* sdx-0.1.typelib
* sdx-0.1.d.ts

## example

```javascript
const sdx = imports.gi.sdx; 

function main() {

    const base = "/home/bruce/gjs/sdxjs/data"

    const game = sdx.createGame("ShmupWarz", 640, 640, base) 
    const bgd = sdx.createSprite('images/BackdropBlackLittleSparkBlack.png')
    const player = sdx.createSprite('images/spaceshipspr.png')
    bgd.setScale(3, 3)
    game.addSprite(bgd)
    game.addSprite(player)
    
    while(game.running) {
        game.handleEvents()
        if (game.getKey(27)) break
        else {

            player.x = game.mouse_x
            player.y = game.mouse_y
            game.draw()
        }
    }

}

main()
```

