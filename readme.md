# js-sdx

gjs-vala-sdl2

inspired by libGDX, but wraps SDL2 rather than OpenGL
callable from gjs

## notes

#### properties with upper case are imported wierd.

    prop mouseX

can only be accessed as get_mouseX()

or I can define it as mousex or mouse_x. Wtf Gnome?

#### modules are broken
If I import a constant from another gjs module, it throws "can't convert to an integer". Wtf Gnome?
I'll use es6 modules, and transpile backport to es5.

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