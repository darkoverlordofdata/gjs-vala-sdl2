/**
 * Sdx.d.ts
 *
 */
declare module 'Sdx' {
    import * as GObject from "GObject"
    export const PI:number
    export const degreesToRadians:number
    export const VERSION:string
    export function graphics_s2d_texture_filter_from(value: string):any
    export function graphics_s2d_texture_filter_isMipMap():boolean
    export function graphics_s2d_texture_filter_to_string():string
    export function graphics_s2d_texture_wrap_from(value: string):any
    export function graphics_s2d_texture_wrap_to_string():string
    export function graphics_s2d_format_from(value: string):any
    export function graphics_s2d_format_to_string():string
    export function scenes_scene2d_ui_scaling_apply(sourceWidth: number, sourceHeight: number, targetWidth: number, targetHeight: number):any
    export function createJsGame(name: string, height: number, width: number, base: string):GObject.Object
    export function createSprite(path: string):GObject.Object
    export function createSound(path: string):GObject.Object
    export function createFont(path: string, size: number):GObject.Object
    export function createText(text: string, font: GObject.Object, color: GObject.Object):GObject.Object
    export function createColor(r: number, g: number, b: number, a: number):GObject.Object
    export function sdlFailIf(cond: boolean, reason: string):void
    export enum graphicss2dTextureFilter {
        NEAREST,
        LINEAR,
        MIPMAP,
        MIPMAPNEARESTNEAREST,
        MIPMAPLINEARNEAREST,
        MIPMAPNEARESTLINEAR,
        MIPMAPLINEARLINEAR,
    }
    export enum graphicss2dTextureWrap {
        CLAMPTOEDGE,
        REPEAT,
    }
    export enum graphicss2dFormat {
        ALPHA,
        INTENSITY,
        LUMINANCEALPHA,
        RGB565,
        RGBA4444,
        RGB888,
        RGBA8888,
    }
    export enum scenesscene2duiScaling {
        FIT,
        FILL,
        FILLX,
        FILLY,
        STRETCH,
        STRETCHX,
        STRETCHY,
        NONE,
    }
    export enum scenesscene2dutilsFocusEventFocusEventType {
        KEYBOARD,
        SCROLL,
    }
    export enum scenesscene2dTouchable {
        ENABLED,
        DISABLED,
        CHILDRENONLY,
    }
    export enum scenesscene2dInputEventType {
        TOUCHDOWN,
        TOUCHUP,
        TOUCHDRAGGED,
        MOUSEMOVED,
        ENTER,
        EXIT,
        SCROLLED,
        KEYDOWN,
        KEYUP,
        KEYTYPED,
    }
    export enum utilsAlign {
        CENTER,
        TOP,
        BOTTOM,
        LEFT,
        RIGHT,
        TOPLEFT,
        TOPRIGHT,
        BOTTOMLEFT,
        BOTTOMRIGHT,
    }
    export enum FileType {
        INTERNAL,
        RESOURCE,
        EXTERNAL,
        ABSOLUTE,
        LOCAL,
    }
    export enum Exception {
        ILLEGALARGUMENTEXCEPTION,
        ILLEGALSTATEEXCEPTION,
        SDXRUNTIMEEXCEPTION,
        NULLPOINTEREXCEPTION,
        NOSUCHELEMENTEXCEPTION,
        SDLEXCEPTION,
    }
    export enum IOException {
        FILENOTFOUND,
        FILENOPERMISSION,
        FILEISLOCKED,
        INVALIDDATA,
    }
    export enum InputButtons {
        LEFT,
        RIGHT,
        MIDDLE,
        BACK,
        FORWARD,
    }
    export enum InputKeys {
        ESC,
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K,
        L,
        M,
        N,
        O,
        P,
        Q,
        R,
        S,
        T,
        U,
        V,
        W,
        X,
        Y,
        Z,
    }
    export class graphicss2dFont extends GObject.Object {
        constructor(config?: any)
        render(text: string, color: any):any
        get_path():string
        set_path(value: string):void
    }
    export class graphicss2dGlyphLayout extends GObject.Object {
        constructor(config?: any)
        setText(font: any, str: string, start: number, end: number, color: any, targetWidth: number, halign: number, wrap: boolean, truncate: string):void
        truncate(fontData: any, run: any, targetWidth: number, truncate: string, widthIndex: number, glyphRunPool: any):void
        parseColorMarkup(str: string, start: number, end: number, colorPool: any):number
        wrap(fontData: any, first: any, glyphRunPool: any, wrapIndex: number, widthIndex: number):any
    }
    export class graphicss2dGlyphLayoutGlyphRun extends GObject.Object {
        constructor(config?: any)
    }
    export class graphicss2dNinePatch extends GObject.Object {
        constructor(config?: any)
        static textureXY(texture: any, left: number, right: number, top: number, bottom: number):graphicss2dNinePatch
        static ninepatch(ninePatch: any, color: any):graphicss2dNinePatch
        load(patches: any[], patches_length1: number):void
        add(region: any, color: number, isStretchW: boolean, isStretchH: boolean):number
        draw(batch: any, x: number, y: number, width: number, height: number):void
        setColor(color: any):void
        getColor():any
        getLeftWidth():number
        setLeftWidth(leftWidth: number):void
        getRightWidth():number
        setRightWidth(rightWidth: number):void
        getTopHeight():number
        setTopHeight(topHeight: number):void
        getBottomHeight():number
        setBottomHeight(bottomHeight: number):void
        getMiddleWidth():number
        setMiddleWidth(middleWidth: number):void
        getMiddleHeight():number
        setMiddleHeight(middleHeight: number):void
        getTotalWidth():number
        getTotalHeight():number
        setPadding(left: number, right: number, top: number, bottom: number):void
        getPadLeft():number
        setPadLeft(left: number):void
        getPadRight():number
        setPadRight(right: number):void
        getPadTop():number
        setPadTop(top: number):void
        getPadBottom():number
        setPadBottom(bottom: number):void
        scale(scaleX: number, scaleY: number):void
    }
    export class graphicss2dSprite extends GObject.Object {
        constructor(config?: any)
        static file(file: any):graphicss2dSprite
        static region(region: any):graphicss2dSprite
        static text(text: string, font: any, color: any):graphicss2dSprite
        setScale(x: number, y: number):void
        setColor(r: number, g: number, b: number):void
        setText(text: string, font: any, color: any):void
        render(renderer: any, x: number, y: number, clip: any):void
        get_width():number
        set_width(value: number):void
        get_height():number
        set_height(value: number):void
        get_x():number
        set_x(value: number):void
        get_y():number
        set_y(value: number):void
        get_r():number
        set_r(value: number):void
        get_g():number
        set_g(value: number):void
        get_b():number
        set_b(value: number):void
        get_a():number
        set_a(value: number):void
        get_centered():boolean
        set_centered(value: boolean):void
        get_layer():number
        set_layer(value: number):void
    }
    export class graphicss2dTextureAtlas extends GObject.Object {
        static readTuple(reader: any):number
        static readValue(reader: any):string
        constructor(config?: any)
        static file(packFile: any, imageDir: any, flip: boolean):graphicss2dTextureAtlas
        findRegion(name: string, index: number):any
        createSprite(name: string, index: number):any
        load(data: any):void
        get_textures():any
        get_regions():any
    }
    export class graphicss2dTextureAtlasTextureAtlasData extends GObject.Object {
        constructor(config?: any)
        get_pages():any
        set_pages(value: any):void
        get_regions():any
        set_regions(value: any):void
    }
    export class graphicss2dTextureAtlasAtlasRegion extends graphicss2dTextureRegion {
        constructor(config?: any)
        flip(x: boolean, y: boolean):void
        get_index():number
        set_index(value: number):void
        get_name():string
        set_name(value: string):void
        get_offsetX():number
        set_offsetX(value: number):void
        get_offsetY():number
        set_offsetY(value: number):void
        get_packedWidth():number
        set_packedWidth(value: number):void
        get_packedHeight():number
        set_packedHeight(value: number):void
        get_originalWidth():number
        set_originalWidth(value: number):void
        get_originalHeight():number
        set_originalHeight(value: number):void
        get_rotate():boolean
        set_rotate(value: boolean):void
        get_splits(result_length1: number):number[]
        set_splits(value: number[], value_length1: number):void
        get_pads(result_length1: number):number[]
        set_pads(value: number[], value_length1: number):void
    }
    export class graphicss2dTextureRegion extends GObject.Object {
        constructor(config?: any)
        static region(region: any, x: number, y: number, width: number, height: number):graphicss2dTextureRegion
        setRegion(u: number, v: number, u2: number, v2: number):void
        setRegionXY(x: number, y: number, width: number, height: number):void
        setByRegion(region: any):void
        setByRegionXY(region: any, x: number, y: number, width: number, height: number):void
        flip(x: boolean, y: boolean):void
        getU():number
        setU(u: number):void
        getV():number
        setV(v: number):void
        getU2():number
        setU2(u2: number):void
        getV2():number
        setV2(v2: number):void
        getRegionX():number
        setRegionX(x: number):void
        getRegionY():number
        setRegionY(y: number):void
        getRegionWidth():number
        setRegionWidth(width: number):void
        getRegionHeight():number
        setRegionHeight(height: number):void
        isFlipX():boolean
        isFlipY():boolean
        get_texture():any
        set_texture(value: any):void
        get_top():number
        set_top(value: number):void
        get_left():number
        set_left(value: number):void
        get_width():number
        set_width(value: number):void
        get_height():number
        set_height(value: number):void
        get_regionWidth():number
        set_regionWidth(value: number):void
        get_regionHeight():number
        set_regionHeight(value: number):void
        get_u():number
        set_u(value: number):void
        get_v():number
        set_v(value: number):void
        get_u2():number
        set_u2(value: number):void
        get_v2():number
        set_v2(value: number):void
    }
    export class graphicsColor extends GObject.Object {
        static get_CLEAR():any
        static get_BLACK():any
        static get_WHITE():any
        static get_LIGHT_GRAY():any
        static get_GRAY():any
        static get_DARK_GRAY():any
        static get_BLUE():any
        static get_NAVY():any
        static get_ROYAL():any
        static get_SLATE():any
        static get_SKY():any
        static get_CYAN():any
        static get_TEAL():any
        static get_GREEN():any
        static get_CHARTREUSE():any
        static get_LIME():any
        static get_FOREST():any
        static get_OLIVE():any
        static get_YELLOW():any
        static get_GOLD():any
        static get_GOLDENROD():any
        static get_ORANGE():any
        static get_BROWN():any
        static get_TAN():any
        static get_FIREBRICK():any
        static get_RED():any
        static get_SCARLET():any
        static get_SALMON():any
        static get_PINK():any
        static get_MAGENTA():any
        static get_PURPLE():any
        static get_VIOLET():any
        static get_MAROON():any
        static get_TransparentBlack():any
        static get_TransparentWhite():any
        static get_AliceBlue():any
        static get_AntiqueWhite():any
        static get_Aqua():any
        static get_Aquamarine():any
        static get_Azure():any
        static get_Beige():any
        static get_Bisque():any
        static get_Black():any
        static get_BlanchedAlmond():any
        static get_Blue():any
        static get_BlueViolet():any
        static get_Brown():any
        static get_BurlyWood():any
        static get_CadetBlue():any
        static get_Chartreuse():any
        static get_Chocolate():any
        static get_Coral():any
        static get_CornflowerBlue():any
        static get_Cornsilk():any
        static get_Crimson():any
        static get_Cyan():any
        static get_DarkBlue():any
        static get_DarkCyan():any
        static get_DarkGoldenrod():any
        static get_DarkGray():any
        static get_DarkGreen():any
        static get_DarkKhaki():any
        static get_DarkMagenta():any
        static get_DarkOliveGreen():any
        static get_DarkOrange():any
        static get_DarkOrchid():any
        static get_DarkRed():any
        static get_DarkSalmon():any
        static get_DarkSeaGreen():any
        static get_DarkSlateBlue():any
        static get_DarkSlateGray():any
        static get_DarkTurquoise():any
        static get_DarkViolet():any
        static get_DeepPink():any
        static get_DeepSkyBlue():any
        static get_DimGray():any
        static get_DodgerBlue():any
        static get_Firebrick():any
        static get_FloralWhite():any
        static get_ForestGreen():any
        static get_Fuchsia():any
        static get_Gainsboro():any
        static get_GhostWhite():any
        static get_Gold():any
        static get_Goldenrod():any
        static get_Gray():any
        static get_Green():any
        static get_GreenYellow():any
        static get_Honeydew():any
        static get_HotPink():any
        static get_IndianRed():any
        static get_Indigo():any
        static get_Ivory():any
        static get_Khaki():any
        static get_Lavender():any
        static get_LavenderBlush():any
        static get_LawnGreen():any
        static get_LemonChiffon():any
        static get_LightBlue():any
        static get_LightCoral():any
        static get_LightCyan():any
        static get_LightGoldenrodYellow():any
        static get_LightGray():any
        static get_LightGreen():any
        static get_LightPink():any
        static get_LightSalmon():any
        static get_LightSeaGreen():any
        static get_LightSkyBlue():any
        static get_LightSlateGray():any
        static get_LightSteelBlue():any
        static get_LightYellow():any
        static get_Lime():any
        static get_LimeGreen():any
        static get_Linen():any
        static get_Magenta():any
        static get_Maroon():any
        static get_MediumAquamarine():any
        static get_MediumBlue():any
        static get_MediumOrchid():any
        static get_MediumPurple():any
        static get_MediumSeaGreen():any
        static get_MediumSlateBlue():any
        static get_MediumSpringGreen():any
        static get_MediumTurquoise():any
        static get_MediumVioletRed():any
        static get_MidnightBlue():any
        static get_MintCream():any
        static get_MistyRose():any
        static get_Moccasin():any
        static get_MonoGameOrange():any
        static get_NavajoWhite():any
        static get_Navy():any
        static get_OldLace():any
        static get_Olive():any
        static get_OliveDrab():any
        static get_Orange():any
        static get_OrangeRed():any
        static get_Orchid():any
        static get_PaleGoldenrod():any
        static get_PaleGreen():any
        static get_PaleTurquoise():any
        static get_PaleVioletRed():any
        static get_PapayaWhip():any
        static get_PeachPuff():any
        static get_Peru():any
        static get_Pink():any
        static get_Plum():any
        static get_PowderBlue():any
        static get_Purple():any
        static get_Red():any
        static get_RosyBrown():any
        static get_RoyalBlue():any
        static get_SaddleBrown():any
        static get_Salmon():any
        static get_SandyBrown():any
        static get_SeaGreen():any
        static get_SeaShell():any
        static get_Sienna():any
        static get_Silver():any
        static get_SkyBlue():any
        static get_SlateBlue():any
        static get_SlateGray():any
        static get_Snow():any
        static get_SpringGreen():any
        static get_SteelBlue():any
        static get_Tan():any
        static get_Teal():any
        static get_Thistle():any
        static get_Tomato():any
        static get_Turquoise():any
        static get_Violet():any
        static get_Wheat():any
        static get_White():any
        static get_WhiteSmoke():any
        static get_Yellow():any
        static get_YellowGreen():any
        constructor(config?: any)
        static rgba(r: number, g: number, b: number, a: number):graphicsColor
        static clone(color: any):graphicsColor
        set(color: any):any
        clamp():any
        toIntBits():number
    }
    export class graphicsTexture extends GObject.Object {
        static getSurface(ext: string, raw: any):any
        constructor(config?: any)
        static uri(path: string):graphicsTexture
        setFilter(minFilter: number, magFilter: number):void
        setWrap(u: number, v: number):void
        get_path():string
        set_path(value: string):void
        get_width():number
        get_height():number
    }
    export class scenesscene2duiImage extends scenesscene2duiWidget {
        constructor(config?: any)
        static region(region: any):scenesscene2duiImage
        static ninepatch(patch: any):scenesscene2duiImage
        layout():void
        draw(batch: any, parentAlpha: number):void
        setDrawable(drawable: any):void
        getDrawable():any
        setScaling(scaling: any):void
        setAlign(align: number):void
        getMinWidth():number
        getMinHeight():number
        getPrefWidth():number
        getPrefHeight():number
        getImageX():number
        getImageY():number
        getImageWidth():number
        getImageHeight():number
    }
    export class scenesscene2duiLabel extends scenesscene2duiWidget {
        constructor(config?: any)
        layout():void
        draw(batch: any, parentAlpha: number):void
        setStyle(style: any):void
        getStyle():any
        setText(newText: string):void
        textEquals(other: string):boolean
        getText():string
        setAlignment(labelAlign: number, lineAlign: number):void
    }
    export class scenesscene2duiLabelLabelStyle extends GObject.Object {
        constructor(config?: any)
    }
    export class scenesscene2duiWidget extends scenesscene2dActor {
        constructor(config?: any)
        sizeChanged():void
        draw(batch: any, parentAlpha: number):void
    }
    export class scenesscene2dutilsBaseDrawable extends GObject.Object {
        constructor(config?: any)
    }
    export class scenesscene2dutilsClickListener extends scenesscene2dInputListener {
        static get_visualPressedDuration():number
        static set_visualPressedDuration(value: number):void
        constructor(config?: any)
        static with_button(button: number):scenesscene2dutilsClickListener
        touchDown(event: any, x: number, y: number, pointer: number, button: number):boolean
        touchUp(event: any, x: number, y: number, pointer: number, button: number):void
        touchDragged(event: any, x: number, y: number, pointer: number):void
        enter(event: any, x: number, y: number, pointer: number, fromActor: any):void
        exit(event: any, x: number, y: number, pointer: number, toActor: any):void
        cancel():void
        clicked(event: any, x: number, y: number):void
        isOver(actor: any, x: number, y: number):boolean
        inTapSquare(x: number, y: number):boolean
        invalidateTapSquare():void
        isPressed():boolean
        isVisualPressed():boolean
        setTapCountInterval(tapCountInterval: number):void
        get_button():number
        set_button(value: number):void
        get_tapCount():number
        set_tapCount(value: number):void
        get_touchDownX():number
        get_touchDownY():number
        get_pressedPointer():number
        get_pressedButton():number
        get_tapSquareSize():number
        set_tapSquareSize(value: number):void
    }
    export class scenesscene2dutilsFocusEvent extends scenesscene2dEvent {
        constructor(config?: any)
        isFocused():boolean
        setFocused(focused: boolean):void
        getType():any
        setType(focusType: any):void
        getRelatedActor():any
        setRelatedActor(relatedActor: any):void
    }
    export class scenesscene2dutilsFocusListener extends GObject.Object {
        keyboardFocusChanged(event: any, actor: any, focused: boolean):void
        scrollFocusChanged(event: any, actor: any, focused: boolean):void
    }
    export class scenesscene2dutilsNinePatchDrawable extends scenesscene2dutilsBaseDrawable {
        constructor(config?: any)
        static drawable(drawable: any):scenesscene2dutilsNinePatchDrawable
        draw(batch: any, x: number, y: number, width: number, height: number):void
        setPatch(patch: any):void
        getPatch():any
        tint(tint: any):any
    }
    export class scenesscene2dutilsTextureRegionDrawable extends scenesscene2dutilsBaseDrawable {
        constructor(config?: any)
        setRegion(region: any):void
        getRegion():any
    }
    export class scenesscene2dAction extends GObject.Object {
        act(delta: number):boolean
        restart():void
        get_pool():any
        set_pool(value: any):void
        get_target():any
        set_target(value: any):void
        get_actor():any
        set_actor(value: any):void
    }
    export class scenesscene2dActor extends GObject.Object {
        constructor(config?: any)
        draw(batch: any, parentAlpha: number):void
        act(delta: number):void
        fire(event: any):boolean
        notify(property_name: string):void

        hit(x: number, y: number, touchable: boolean):any
        remove():boolean
        addListener(listener: any):boolean
        removeListener(listener: any):boolean
        getListeners():any
        addCaptureListener(listener: any):boolean
        removeCaptureListener(listener: any):boolean
        getCaptureListeners():any
        addAction(action: any):void
        removeAction(action: any):void
        getActions():any
        hasActions():boolean
        clearActions():void
        clearListeners():void
        clear():void
        isDescendantOf(actor: any):boolean
        isAscendantOf(actor: any):boolean
        firstAscendant(type: any):any
        hasParent():boolean
        isTouchable():boolean
        isVisible():boolean
        setVisible(visible: boolean):void
        getX():number
        setX(x: number):void
        getY():number
        setY(y: number):void
        setPosition(x: number, y: number):void
        moveBy(x: number, y: number):void
        getWidth():number
        setWidth(width: number):void
        getHeight():number
        setHeight(height: number):void
        getTop():number
        getRight():number
        positionChanged():void
        sizeChanged():void
        rotationChanged():void
        setSize(width: number, height: number):void
        sizeBy(size: number):void
        setBounds(x: number, y: number, width: number, height: number):void
        getOriginX():number
        setOriginX(originX: number):void
        getOriginY():number
        setOriginY(originY: number):void
        setOrigin(originX: number, originY: number):void
        getScaleX():number
        setScaleX(scaleX: number):void
        getScaleY():number
        setScaleY(scaleXY: number):void
        setScale(scaleX: number, scaleY: number):void
        scaleBy(scaleX: number, scaleY: number):void
        getRotation():number
        setRotation(degrees: number):void
        rotateBy(amountInDegrees: number):void
        toFront():void
        toBack():void
        setZIndex(index: number):void
        getZIndex():number
        screenToLocalCoordinates(screenCoords: any):any
        stageToLocalCoordinates(stageCoords: any):any
        localToStageCoordinates(localCoords: any):any
        localToParentCoordinates(localCoords: any):any
        localToAscendantCoordinates(ascendant: any, localCoords: any):any
        parentToLocalCoordinates(parentCoords: any):any
        get_stage():any
        set_stage(value: any):void
        get_parent():any
        set_parent(value: any):void
        get_touchable():any
        set_touchable(value: any):void
        get_userObject():GObject.Object
        set_userObject(value: GObject.Object):void
        get_color():any
        set_color(value: any):void
        get_name():string
        set_name(value: string):void
    }
    export class scenesscene2dEvent extends GObject.Object {
        constructor(config?: any)
        handle():void
        cancel():void
        stop():void
        getTarget():any
        setTarget(targetActor: any):void
        getListenerActor():any
        setListenerActor(listenerActor: any):void
        getBubbles():boolean
        setBubbles(bubbles: boolean):void
        isHandled():boolean
        isStopped():boolean
        isCancelled():boolean
        setCapture(capture: boolean):void
        isCapture():boolean
        setStage(stage: any):void
        getStage():any
    }
    export class scenesscene2dGroup extends scenesscene2dActor {
        constructor(config?: any)
        act(delta: number):void
        draw(batch: any, parentAlpha: number):void
        drawChildren(batch: any, parentAlpha: number):void
        getCullingArea():any
        hit(x: number, y: number, touchable: boolean):any
        childrenChanged():void
        addActor(actor: any):void
        addActorAt(index: number, actor: any):void
        addActorBefore(actorBefore: any, actor: any):void
        addActorAfter(actorAfter: any, actor: any):void
        removeActor(actor: any, unfocus: boolean):boolean
        clearChildren():void
        clear():void
        findActor(name: string):any
        hasChildren():boolean
        setTransform(transform: boolean):void
        isTransform():boolean
        localToDescendantCoordinates(descendant: any, localCoords: any):any
        get_children():any
        set_children(value: any):void
        get_stage():any
        set_stage(value: any):void
    }
    export class scenesscene2dInputEvent extends scenesscene2dEvent {
        constructor(config?: any)
        getStageX():number
        setStageX(stageX: number):void
        getStageY():number
        setStageY(stageY: number):void
        getType():any
        setType(type: any):void
        getPointer():number
        setPointer(pointer: number):void
        getButton():number
        setButton(button: number):void
        getKeyCode():number
        setKeyCode(keyCode: number):void
        getCharacter():number
        setCharacter(character: number):void
        getScrollAmount():number
        setScrollAmount(scrollAmount: number):void
        getRelatedActor():any
        setRelatedActor(relatedActor: any):void
        toCoordinates(actor: any, actorCoords: any):any
        isTouchFocusCancel():boolean
        to_string():string
    }
    export class scenesscene2dInputListener extends GObject.Object {
        constructor(config?: any)
        touchDown(event: any, x: number, y: number, pointer: number, button: number):boolean
        touchUp(event: any, x: number, y: number, pointer: number, button: number):void
        touchDragged(event: any, x: number, y: number, pointer: number):void
        mouseMoved(event: any, x: number, y: number):boolean
        enter(event: any, x: number, y: number, pointer: number, fromActor: any):void
        exit(event: any, x: number, y: number, pointer: number, toActor: any):void
        scrolled(event: any, x: number, y: number, amount: number):boolean
        keyDown(event: any, keycode: number):boolean
        keyUp(event: any, keycode: number):boolean
        keyTyped(event: any, character: number):boolean
    }
    export class scenesscene2dTouchFocus extends GObject.Object {
        constructor(config?: any)
    }
    export class scenesscene2dStage extends InputAdapter {
        constructor(config?: any)
        draw():void
        act(delta: number):void
        fireEnterAndExit(overLast: any, screenX: number, screenY: number, pointer: number):any
        touchDown(screenX: number, screenY: number, pointer: number, button: number):boolean
        touchDragged(screenX: number, screenY: number, pointer: number):boolean
        touchUp(screenX: number, screenY: number, pointer: number, button: number):boolean
        mouseMoved(screenX: number, screenY: number):boolean
        scrolled(amount: number):boolean
        keyDown(keyCode: number):boolean
        keyUp(keyCode: number):boolean
        keyTyped(character: number):boolean
        addTouchFocus(listener: any, listenerActor: any, target: any, pointer: number, button: number):void
        removeTouchFocus(listener: any, listenerActor: any, target: any, pointer: number, button: number):void
        cancelTouchFocus(actor: any):void
        cancelTouchFocusExcept(exceptListener: any, exceptActor: any):void
        addActor(actor: any):void
        addAction(action: any):void
        getActors():any
        addListener(listener: any):boolean
        removeListener(listener: any):boolean
        addCaptureListener(listener: any):boolean
        removeCaptureListener(listener: any):boolean
        clear():void
        unfocusAll():void
        unfocus(actor: any):void
        setKeyboardFocus(actor: any):boolean
        getKeyboardFocus():any
        setScrollFocus(actor: any):boolean
        getScrollFocus():any
        hit(stageX: number, stageY: number, touchable: boolean):any
        screenToStageCoordinates(screenCoords: any):any
        stageToScreenCoordinates(stageCoords: any):any
        get_viewport():any
        set_viewport(value: any):void
        get_batch():any
        set_batch(value: any):void
        get_root():any
        set_root(value: any):void
        get_width():number
        get_height():number
    }
    export class audioSound extends GObject.Object {
        constructor(config?: any)
        play(loops: number):void
    }
    export class filesFileHandle extends GObject.Object {
        constructor(config?: any)
        getRWops():any
        getType():any
        getName():string
        getExt():string
        getPath():string
        getParent():any
        exists():boolean
        child(name: string):any
        read():any
        bytes():any
        get_file():any
        get_path():string
    }
    export class mathRectangle extends GObject.Object {
        constructor(config?: any)
        static rectangle(rect: any):mathRectangle
    }
    export class mathVector2 extends GObject.Object {
        static get_X():any
        static get_Y():any
        static get_Zero():any
        constructor(config?: any)
        static vector(v: any):mathVector2
        setZero():any
        set(x: number, y: number):any
    }
    export class utilsJSON extends GObject.Object {
        static parse(stream: any):any
        constructor(config?: any)
    }
    export class utilsPool extends GObject.Object {
        newObject():GObject.Object
        obtain():GObject.Object
        free(object: GObject.Object):void
        reset(object: GObject.Object):void
        freeAll(objects: GObject.Object[], objects_length1: number):void
        clear():void
        getFree():number
    }
    export class utilsPools extends GObject.Object {
        static get(type: any):any
        static set(type: any, pool: any):void
        static obtain(type: any):any
        static free(object: GObject.Object):void
        constructor(config?: any)
    }
    export class JsGame extends GObject.Object {
        constructor(config?: any)
        addSprite(sprite: GObject.Object):void
        addOnce(sprite: GObject.Object):void
        removeSprite(sprite: GObject.Object):void
        setApplicationListener(listener: any):void
        initialize():void
        start():void
        getKey(code: number):number
        handleEvents():number
        draw():void
        get_yield_for_events_ms():number
        set_yield_for_events_ms(value: number):void
        get_profile():boolean
        set_profile(value: boolean):void
        get_mouse_down():boolean
        set_mouse_down(value: boolean):void
        get_mouse_x():number
        set_mouse_x(value: number):void
        get_mouse_y():number
        set_mouse_y(value: number):void
        get_running():boolean
        set_running(value: boolean):void
        get_name():string
        set_name(value: string):void
        get_base():string
        set_base(value: string):void
        get_fps():number
        set_fps(value: number):void
        get_show_fps():boolean
        set_show_fps(value: boolean):void
        get_delta_time():number
        set_delta_time(value: number):void
        get_font():any
        set_font(value: any):void
    }
    export class Application extends GObject.Object {
        constructor(config?: any)
        setApplicationListener(listener: any):void
        run():number
        draw():void
        dispose():void
        initialize():boolean
    }
    export class Audio extends GObject.Object {
        constructor(config?: any)
        newSound(file: any):any
    }
    export class Files extends GObject.Object {
        constructor(config?: any)
        getHandle(path: string, type: any):any
        internal(path: string):any
        resource(path: string):any
        external(path: string):any
        absolute(path: string):any
        local(path: string):any
        get_isResource():boolean
        get_resourcePath():string
    }
    export class Game extends Application {
        create():void
        setScreen(screen: any):void
        getScreen():any
    }
    export class Graphics extends GObject.Object {
        constructor(config?: any)
        setSize(width: number, height: number):any
        updateTime():void
        get_deltaTime():number
        get_frames():number
        get_fps():number
        get_width():number
        get_height():number
        get_scale():number
        get_pixelFactor():number
    }
    export class Input extends GObject.Object {
        constructor(config?: any)
        setInputProcessor(processor: any):void
        processEvents():boolean
        get_keys(result_length1: number):number[]
    }
    export class InputAdapter extends GObject.Object {
        constructor(config?: any)
    }
    export class Net extends GObject.Object {
        constructor(config?: any)
    }
    export class Sdx extends GObject.Object {
        static get_app():any
        static get_graphics():any
        static get_audio():any
        static get_input():any
        static get_files():any
        static get_net():any
        constructor(config?: any)
    }
}