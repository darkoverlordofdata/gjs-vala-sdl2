[indent=4]

uses SDL
uses SDL.Video
uses Gee
uses sdx.graphics.s2d
namespace sdx 

    class JsGame : Object implements IApplication

        const YieldForEventsMS: int = 1000
        prop mouse_down: bool
        prop mouse_x: int = 0
        prop mouse_y: int = 0
        prop running:bool = false    
        prop name:string
        prop base: string
        prop fps: int
        prop show_fps: bool = false
        prop delta_time: double
        prop width: int = 800
        prop height: int = 640
        prop renderer : unowned Renderer
            get
                return _renderer

        window : Window
        _renderer : Renderer
        keys : array of uint8// = new array of uint8[255]
        evt : private Event
        frames: int
        fpsSprite: private Sprite
        font: Font
        scale: double = 1.0
        pixelFactor: double = 1.0
        defaultFont:string = "fonts/OpenDyslexic-Bold.otf"
        sprites : list of Sprite = new list of Sprite
        onetime : list of Sprite = new list of Sprite
        app: private ApplicationListener

        lastTime: private double //= (double)GLib.get_real_time()/1000000.0
        currentTime: private double = 0 
        elapsed: private double = 0


        construct(name:string, height:int, width:int, base:string)
            new Sdx(this, width, height, base) 
            this.name = name
            this.width = width
            this.height = height
            this.base = base
            initialize()

        def addSprite(sprite:Object)
            var ordinal = ((Sprite)sprite).layer
            if sprites.size == 0
                sprites.add((Sprite)sprite)
            else
                var i = 0
                for s in sprites
                    if ordinal <= s.layer
                        sprites.insert(i, (Sprite)sprite)
                        return
                    else
                        i++
                sprites.add((Sprite)sprite)


        def removeSprite(sprite:Object)
            sprites.remove((Sprite)sprite)

        def setApplicationListener(listener: ApplicationListener)
            app = listener

        def initialize()
            sdlFailIf(SDL.init(SDL.InitFlag.VIDEO | SDL.InitFlag.TIMER | SDL.InitFlag.EVENTS) < 0, 
                "SDL could not initialize! SDL Error: %s")

            sdlFailIf(SDLImage.init(SDLImage.InitFlags.PNG) < 0, 
                "SDL_image could not initialize!")

            sdlFailIf(!SDL.Hint.set_hint(Hint.RENDER_SCALE_QUALITY, "1"), 
                "Warning: Linear texture filtering not enabled!!")

            window = new Window(name, Window.POS_CENTERED, Window.POS_CENTERED, width, height, WindowFlags.SHOWN)
            sdlFailIf(window == null, "Window could not be created!")

            _renderer = Renderer.create(window, -1, RendererFlags.ACCELERATED | RendererFlags.PRESENTVSYNC)
            sdlFailIf(_renderer == null, "Renderer could not be created!")

            _renderer.set_draw_color(0xFF, 0xFF, 0xFF, 0)

            sdlFailIf(SDLTTF.init() == -1, "SDL_ttf could not initialize!")

            if defaultFont != ""
                var f = Sdx.files.resource(defaultFont)
                font = new Font(Sdx.files.resource(defaultFont), 16)
                if font == null
                    show_fps = false
                    print "Failed to load font, show_fps set to false. SDL Error: %s", SDL.get_error()
                else
                    show_fps = true
            
            sdlFailIf(SDLMixer.open(22050, SDL.Audio.AudioFormat.S16LSB, 2, 4096) == -1,
                "SDL_mixer unable to initialize!")

            keys = new array of uint8[255]
            print "Game Initialized "

        def start()
            running = true
            lastTime = (double)GLib.get_real_time()/1000000.0        
                
        def getKey(i:int):int
            return keys[i]

        def handleEvents():int

            while Event.poll(out evt) != 0
                case evt.type // patch for keyboardGetState
                    when SDL.EventType.KEYDOWN
                        keys[evt.key.keysym.sym] = 1
                    when SDL.EventType.KEYUP
                        keys[evt.key.keysym.sym] = 0
                    when  SDL.EventType.MOUSEMOTION
                        _mouse_x = (int)evt.motion.x
                        _mouse_y = (int)evt.motion.y
                    when  SDL.EventType.MOUSEBUTTONDOWN
                        _mouse_down = true
                    when  SDL.EventType.MOUSEBUTTONUP
                        _mouse_down = false
                    when SDL.EventType.QUIT
                        _running = false

            Sdx.graphics.updateTime()
            _delta_time = Sdx.graphics.deltaTime
            if (_delta_time > 1) do _delta_time = 1.0/60.0
            _fps = Sdx.graphics.fps
            return evt.type

        def draw()
            renderer.set_draw_color(0x0, 0x0, 0x0, 0x0)
            renderer.clear()

            for var sprite in sprites
                sprite.render(_renderer, sprite.x, sprite.y)

            if show_fps && fpsSprite != null do fpsSprite.render(_renderer, 0, 0)

            for var sprite in onetime  
                sprite.render(_renderer, sprite.x, sprite.y)
                
            onetime = new list of Sprite           
            if YieldForEventsMS > 0 do GLib.Thread.usleep(YieldForEventsMS) 
            renderer.present()



