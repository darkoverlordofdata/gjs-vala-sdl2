
valac   --pkg gee-0.8 \
        --pkg SDL2_image \
        --pkg SDL2_mixer \
        --pkg SDL2_ttf \
        --pkg json-glib-1.0 \
        --pkg sdl2 \
        --pkg gio-2.0 \
        --pkg glib-2.0 \
        --pkg gobject-2.0 \
        --disable-warnings \
        --vapidir src/vapis \
        --library=sdx \
        -X -fPIC \
        -X -shared \
        --vapi=../../.local/lib//sdx.vapi \
        --gir ../../.local/lib//sdx-0.1.gir \
        -o ../../.local/lib/sdx.so \
        src/JsGame.gs  \
        src/JsFactory.gs  \
        src/Application.gs \
        src/ApplicationListener.gs \
        src/Audio.gs \
        src/Exceptions.gs \
        src/Files.gs \
        src/Game.gs \
        src/Graphics.gs \
        src/Input.gs \
        src/InputAdapter.gs \
        src/InputProcessor.gs \
        src/Net.gs \
        src/Screen.gs \
        src/Sdx.gs \
        src/Version.gs \
        src/audio/Sound.gs \
        src/files/FileHandle.gs \
        src/graphics/Color.gs \
        src/graphics/Texture.gs \
        src/graphics/s2d/Batch.gs \
        src/graphics/s2d/BitmapFont.gs \
        src/graphics/s2d/Font.gs \
        src/graphics/s2d/GlyphLayout.gs \
        src/graphics/s2d/NinePatch.gs \
        src/graphics/s2d/Sprite.gs \
        src/graphics/s2d/TextureAtlas.gs \
        src/graphics/s2d/TextureEnums.vala \
        src/graphics/s2d/TextureRegion.gs \
        src/libsdx.vala \
        src/math/Rectangle.gs \
        src/math/Vector2.gs \
        src/scenes/scene2d/Action.gs \
        src/scenes/scene2d/Actor.gs \
        src/scenes/scene2d/Event.gs \
        src/scenes/scene2d/Group.gs \
        src/scenes/scene2d/InputEvent.gs \
        src/scenes/scene2d/InputListener.gs \
        src/scenes/scene2d/Stage.gs \
        src/scenes/scene2d/ui/Image.gs \
        src/scenes/scene2d/ui/Label.gs \
        src/scenes/scene2d/ui/Scaling.vala \
        src/scenes/scene2d/ui/Widget.gs \
        src/scenes/scene2d/utils/BaseDrawable.gs \
        src/scenes/scene2d/utils/ClickListener.gs \
        src/scenes/scene2d/utils/Drawable.gs \
        src/scenes/scene2d/utils/FocusEvent.gs \
        src/scenes/scene2d/utils/FocusListener.gs \
        src/scenes/scene2d/utils/Layout.gs \
        src/scenes/scene2d/utils/NinePatchDrawable.gs \
        src/scenes/scene2d/utils/TextureRegionDrawable.gs \
        src/scenes/scene2d/utils/TransformDrawable.gs \
        src/utils/Align.gs \
        src/utils/Json.gs \
        src/utils/Pool.gs \
        src/utils/Pools.gs \
        src/utils/StringTokenizer.gs \
        src/utils/viewport/Viewport.gs 

g-ir-compiler ../../.local/lib//sdx-0.1.gir \
        --shared-library=../../.local/lib//sdx.so \
        --output=../../.local/lib//sdx-0.1.typelib 
        

