/**
 * Script facing factory methods
 */
[indent=4]

uses SDL
uses SDL.Video
uses Gee
uses sdx.graphics.s2d
namespace sdx 

    def createGame(name:string, height:int, width:int, base:string):Object
        return (Object)(new JsGame(name, height, width, base))

    def createSprite(path:string):Object
        return (Object)(new Sprite(path))

    def createJz():Object
        return (Object)(new JzGame())


    class JzGame : Object

        const YieldForEventsMS: int = 1000
        prop mouseDown: bool
        prop mousex: int = 0
        prop mousey: int = 0
        prop running:bool = false    
        prop name:string
        prop @base: string
        prop fps: int
        prop showFps: bool = false
        prop deltaTime: double
        prop width: int = 800
        prop height: int = 640
