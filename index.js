/**
 *  Copyright 2017 darkoverlordofdata
 *
 * Simple module loader/gjs helper
 * normalized access to amd, commonjs and gjs imports
 *
 */
Object.defineProperties(window, {
    define: { value: (function (modules) {
            return function (name, deps, callback) {
                if (typeof name !== 'string') {
                    var bundle = deps();
                    for (name in bundle)
                        modules[name] = { id: name, exports: bundle[name] };
                }
                else {
                    modules[name] = { id: name, exports: {} };
                    var args = [function (name) { return modules[name] ? modules[name].exports : imports[name]; },
                        modules[name].exports];
                    for (var i = 2; i < deps.length; i++)
                        args.push(modules[deps[i]].exports);
                    callback.apply(modules[name].exports, args);
                }
            };
        }({
            Lang: { id: 'Lang', exports: imports.lang },
            Sdx: { id: 'Sdx', exports: imports.gi.sdx }
        })) },
    console: { value: {
            log: function () { print.apply(null, arguments); },
            warn: function () { print.apply(null, arguments); },
            error: function () { print.apply(null, arguments); },
            info: function () { print.apply(null, arguments); }
        } },
    _: { value: imports.gettext.gettext }
});
Object.defineProperties(define, {
    amd: { value: true },
    version: { value: '0.1.0' },
    path: { value: function (path) { return imports.searchPath.unshift(path); } },
    imports: { value: function (libs) { return define([], function () { return libs; }); } }
});
Object.defineProperties(String.prototype, {
    printf: { value: imports.format.format }
});
/**
 * Global constants
 */
var DATADIR = '/home/bruce/gjs/sdxjs/data';
define("entities", ["require", "exports", "Sdx"], function (require, exports, sdx) {
    "use strict";
    var Tau = 6.28318;
    var BULLETS = 20;
    var ENEMY1 = 9;
    var ENEMY2 = 7;
    var ENEMY3 = 5;
    var ENEMIES = ENEMY1 + ENEMY2 + ENEMY3;
    var EXPLOSIONS = 8;
    var BANGS = 16;
    var PARTICLES = 40;
    var bulletQ = [];
    var particleQ = [];
    var explosionQ = [];
    var bangQ = [];
    var enemy1Q = [];
    var enemy2Q = [];
    var enemy3Q = [];
    exports.pool = new Array(2 + BULLETS + ENEMIES + EXPLOSIONS + BANGS + PARTICLES);
    exports.active = [];
    var uniqueId = 0;
    Array.prototype.remove = function (e) {
        var i = this.indexOf(e);
        if (i > -1) {
            if (this[i].id !== e.id)
                throw new Error("Invalid remove id");
            return this.splice(i, 1);
        }
        else {
            print(JSON.stringify(e, null, 2));
            throw new Error("Unable to remove " + e.id);
        }
    };
    function createPool(game) {
        var z = 0;
        exports.active.push(exports.pool[z++] = createPlayer());
        exports.active.push(exports.pool[z++] = createBackground());
        for (var i = 0; i < BULLETS; i++)
            bulletQ.push(exports.pool[z++] = createBullet());
        for (var i = 0; i < ENEMY1; i++)
            enemy1Q.push(exports.pool[z++] = createEnemy1());
        for (var i = 0; i < ENEMY2; i++)
            enemy2Q.push(exports.pool[z++] = createEnemy2());
        for (var i = 0; i < ENEMY3; i++)
            enemy3Q.push(exports.pool[z++] = createEnemy3());
        for (var i = 0; i < EXPLOSIONS; i++)
            explosionQ.push(exports.pool[z++] = createExplosion());
        for (var i = 0; i < BANGS; i++)
            bangQ.push(exports.pool[z++] = createBang());
        for (var i = 0; i < PARTICLES; i++)
            particleQ.push(exports.pool[z++] = createParticle());
        game.addSprite(exports.active[0].sprite);
        game.addSprite(exports.active[1].sprite);
        Object.freeze(exports.pool);
    }
    exports.createPool = createPool;
    function deactivate(game, e) {
        e.active = false;
        var z = exports.active.remove(e);
        if (z[0].id !== e.id) {
            throw new Error("removed wrong entity");
        }
        game.removeSprite(e.sprite);
        if (e.bang)
            bangQ.push(e);
        else if (e.particle)
            particleQ.push(e);
        else if (e.explosion)
            explosionQ.push(e);
        else if (e.bullet)
            bulletQ.push(e);
        else if (e.enemy)
            switch (e.model) {
                case 1:
                    enemy1Q.push(e);
                    break;
                case 2:
                    enemy2Q.push(e);
                    break;
                case 3:
                    enemy3Q.push(e);
                    break;
            }
    }
    exports.deactivate = deactivate;
    function bang(game, x, y) {
        if (bangQ.length) {
            var e = bangQ.pop();
            e.active = true;
            e.position.x = x;
            e.position.y = y;
            e.scale.x = 0.2;
            e.scale.y = 0.2;
            e.tween.active = true;
            e.expires = 0.2;
            game.addSprite(e.sprite);
            exports.active.push(e);
        }
        else {
            throw new Error("Unable to allocate bang");
        }
    }
    exports.bang = bang;
    function particle(game, x, y) {
        if (particleQ.length) {
            var e = particleQ.pop();
            e.active = true;
            e.position.x = x;
            e.position.y = y;
            e.expires = 0.2;
            game.addSprite(e.sprite);
            exports.active.push(e);
        }
        else {
            throw new Error("Unable to allocate particle");
        }
    }
    exports.particle = particle;
    function explosion(game, x, y) {
        if (explosionQ.length) {
            var e = explosionQ.pop();
            e.active = true;
            e.position.x = x;
            e.position.y = y;
            e.tween.active = true;
            e.scale.x = 0.5;
            e.scale.y = 0.5;
            e.expires = 0.2;
            game.addSprite(e.sprite);
            exports.active.push(e);
        }
        else {
            throw new Error("Unable to allocate explosion");
        }
    }
    exports.explosion = explosion;
    function bullet(game, x, y) {
        if (bulletQ.length) {
            var e = bulletQ.pop();
            e.active = true;
            e.position.x = x;
            e.position.y = y;
            game.addSprite(e.sprite);
            exports.active.push(e);
        }
        else {
            throw new Error("Unable to allocate bullet");
        }
    }
    exports.bullet = bullet;
    function enemy1(game) {
        if (enemy1Q.length) {
            var e = enemy1Q.pop();
            e.position.x = Math.random() * (game.width - e.bounds.w) + e.bounds.w / 2;
            e.position.y = e.bounds.h;
            e.health.current = e.health.maximum;
            e.active = true;
            game.addSprite(e.sprite);
            exports.active.push(e);
        }
        else {
            throw new Error("Unable to allocate enemy1");
        }
    }
    exports.enemy1 = enemy1;
    function enemy2(game) {
        if (enemy2Q.length) {
            var e = enemy2Q.pop();
            e.position.x = Math.random() * (game.width - e.bounds.w) + e.bounds.w / 2;
            e.position.y = e.bounds.h;
            e.health.current = e.health.maximum;
            e.active = true;
            game.addSprite(e.sprite);
            exports.active.push(e);
        }
        else {
            throw new Error("Unable to allocate enemy2");
        }
    }
    exports.enemy2 = enemy2;
    function enemy3(game) {
        if (enemy3Q.length) {
            var e = enemy3Q.pop();
            e.position.x = Math.random() * (game.width - e.bounds.w) + e.bounds.w / 2;
            e.position.y = e.bounds.h;
            e.health.current = e.health.maximum;
            e.active = true;
            game.addSprite(e.sprite);
            exports.active.push(e);
        }
        else {
            throw new Error("Unable to allocate enemy3");
        }
    }
    exports.enemy3 = enemy3;
    function createBackground() {
        // sprite defaults to layer 0
        return {
            id: uniqueId++,
            active: true,
            scale: { x: 3, y: 3 },
            position: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            sprite: sdx.createSprite('images/BackdropBlackLittleSparkBlack.png')
        };
    }
    function createPlayer() {
        var sprite = sdx.createSprite('images/spaceshipspr.png');
        sprite.layer = 8;
        return {
            id: uniqueId++,
            player: true,
            active: true,
            bounds: { x: 0, y: 0, w: sprite.width, h: sprite.height },
            position: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            sprite: sprite
        };
    }
    function createBullet() {
        var sprite = sdx.createSprite('images/bullet.png');
        sprite.layer = 9;
        return {
            id: uniqueId++,
            bullet: true,
            active: false,
            bounds: { x: 0, y: 0, w: sprite.width, h: sprite.height },
            position: { x: 0, y: 0 },
            velocity: { x: 0, y: -800 },
            tint: { r: 0xd2, g: 0xfa, b: 0, a: 0xff },
            sprite: sprite
        };
    }
    function createEnemy1() {
        var sprite = sdx.createSprite('images/enemy1.png');
        sprite.layer = 5;
        return {
            id: uniqueId++,
            enemy: true,
            active: false,
            model: 1,
            bounds: { x: 0, y: 0, w: sprite.width, h: sprite.height },
            position: { x: 0, y: 0 },
            velocity: { x: 0, y: 40 },
            health: { current: 10, maximum: 10 },
            sprite: sprite
        };
    }
    function createEnemy2() {
        var sprite = sdx.createSprite('images/enemy2.png');
        sprite.layer = 6;
        return {
            id: uniqueId++,
            enemy: true,
            active: false,
            model: 2,
            bounds: { x: 0, y: 0, w: sprite.width, h: sprite.height },
            position: { x: 0, y: 0 },
            velocity: { x: 0, y: 30 },
            health: { current: 20, maximum: 20 },
            sprite: sprite
        };
    }
    function createEnemy3() {
        var sprite = sdx.createSprite('images/enemy3.png');
        sprite.layer = 7;
        return {
            id: uniqueId++,
            enemy: true,
            active: false,
            model: 3,
            bounds: { x: 0, y: 0, w: sprite.width, h: sprite.height },
            position: { x: 0, y: 0 },
            velocity: { x: 0, y: 20 },
            health: { current: 60, maximum: 60 },
            sprite: sprite
        };
    }
    function createExplosion() {
        var sprite = sdx.createSprite('images/explosion.png');
        sprite.layer = 10;
        return {
            id: uniqueId++,
            explosion: true,
            active: false,
            bounds: { x: 0, y: 0, w: sprite.width, h: sprite.height },
            position: { x: 0, y: 0 },
            scale: { x: 0.5, y: 0.5 },
            tween: { min: 0.5 / 100, max: 0.5, speed: -3, repeat: false, active: true },
            tint: { r: 0xd2, g: 0xfa, b: 0xd2, a: 0xfa },
            expires: 0.2,
            sprite: sprite
        };
    }
    function createBang() {
        var sprite = sdx.createSprite('images/explosion.png');
        sprite.layer = 10;
        return {
            id: uniqueId++,
            bang: true,
            active: false,
            bounds: { x: 0, y: 0, w: sprite.width, h: sprite.height },
            position: { x: 0, y: 0 },
            scale: { x: 0.2, y: 0.2 },
            tween: { min: 0.2 / 100, max: 0.2, speed: -3, repeat: false, active: true },
            tint: { r: 0xd2, g: 0xfa, b: 0xd2, a: 0xfa },
            expires: 0.2,
            sprite: sprite
        };
    }
    function createParticle() {
        var radians = Math.random() * Tau;
        var magnitude = Math.ceil(Math.random() * 200);
        var velocityX = magnitude * Math.cos(radians);
        var velocityY = magnitude * Math.sin(radians);
        var scale = Math.random();
        var sprite = sdx.createSprite('images/star.png');
        sprite.layer = 10;
        return {
            id: uniqueId++,
            particle: true,
            active: false,
            bounds: { x: 0, y: 0, w: sprite.width, h: sprite.height },
            position: { x: 0, y: 0 },
            scale: { x: scale, y: scale },
            velocity: { x: velocityX, y: velocityY },
            tint: { r: 0xfa, g: 0xfa, b: 0xd2, a: 0xff },
            expires: 0.4,
            sprite: sprite
        };
    }
});
define("systems", ["require", "exports", "Sdx"], function (require, exports, sdx) {
    "use strict";
    var fireRate = 0.1;
    var timeToFire = 0;
    var enemyT1 = 2;
    var enemyT2 = 7;
    var enemyT3 = 13;
    function inputSystem(game, entities) {
        var player = entities.pool[0];
        player.position.x = game.mouse_x;
        player.position.y = game.mouse_y;
        if (game.mouse_down || game.getKey(sdx.InputKeys.z)) {
            timeToFire -= game.delta_time;
            if (timeToFire < 0) {
                timeToFire = fireRate;
                entities.bullet(game, game.mouse_x + 27, game.mouse_y + 2);
                entities.bullet(game, game.mouse_x - 27, game.mouse_y + 2);
            }
        }
    }
    exports.inputSystem = inputSystem;
    function physicsSystem(game, entities) {
        for (var _i = 0, _a = entities.active; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.active) {
                if (e.velocity) {
                    e.position.x += e.velocity.x * game.delta_time;
                    e.position.y += e.velocity.y * game.delta_time;
                }
                if (e.bounds) {
                    e.bounds.x = e.position.x - e.bounds.w / 8;
                    e.bounds.y = e.position.y - e.bounds.h / 2;
                }
                // update the sprite object
                e.sprite.x = e.position.x;
                e.sprite.y = e.position.y;
                if (e.scale)
                    e.sprite.setScale(e.scale.x, e.scale.y);
                if (e.tint)
                    e.sprite.setColor(e.tint.r, e.tint.g, e.tint.b);
            }
        }
    }
    exports.physicsSystem = physicsSystem;
    function expireSystem(game, entities) {
        for (var _i = 0, _a = entities.active; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.player)
                continue;
            if (e.active && e.expires) {
                e.expires -= game.delta_time;
                if (e.expires < 0) {
                    entities.deactivate(game, e);
                }
            }
        }
    }
    exports.expireSystem = expireSystem;
    function removalSystem(game, entities) {
        for (var _i = 0, _a = entities.active; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.player)
                continue;
            if (e.active && e.position.y < 0 || e.position.y > game.height) {
                entities.deactivate(game, e);
            }
        }
    }
    exports.removalSystem = removalSystem;
    function tweenSystem(game, entities) {
        for (var _i = 0, _a = entities.active; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.active && e.tween) {
                var tween = e.tween;
                var x = e.scale.x + (tween.speed * game.delta_time);
                var y = e.scale.y + (tween.speed * game.delta_time);
                var active = e.tween.active;
                if (x > tween.max) {
                    x = tween.max;
                    y = tween.max;
                    active = false;
                }
                else if (x < tween.min) {
                    x = tween.min;
                    y = tween.min;
                    active = false;
                }
                e.scale.x = x;
                e.scale.y = y;
                e.tween.active = active;
            }
        }
    }
    exports.tweenSystem = tweenSystem;
    function spawnSystem(game, entities) {
        function spawn(t, enemy) {
            var d1 = t - game.delta_time;
            if (d1 < 0) {
                switch (enemy) {
                    case 1:
                        entities.enemy1(game);
                        return 2;
                    case 2:
                        entities.enemy2(game);
                        return 7;
                    case 3:
                        entities.enemy3(game);
                        return 13;
                    default: throw new Error("WTF");
                }
            }
            else
                return d1;
        }
        enemyT1 = spawn(enemyT1, 1);
        enemyT2 = spawn(enemyT2, 2);
        enemyT3 = spawn(enemyT3, 3);
    }
    exports.spawnSystem = spawnSystem;
    function collisionSystem(game, entities) {
        for (var _i = 0, _a = entities.active; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.active && e.enemy)
                for (var _b = 0, _c = entities.active; _b < _c.length; _b++) {
                    var b = _c[_b];
                    if (b.active && b.bullet)
                        if (intersects(e, b))
                            handleCollision(game, e, b, entities);
                }
        }
    }
    exports.collisionSystem = collisionSystem;
    function intersects(a, b) {
        var r1 = a.bounds;
        var r2 = b.bounds;
        return ((r1.x < r2.x + r2.w) &&
            (r1.x + r1.w > r2.x) &&
            (r1.y < r2.y + r2.h) &&
            (r1.y + r1.h > r2.y));
    }
    function handleCollision(game, enemy, bullet, entities) {
        var x = bullet.position.x;
        var y = bullet.position.y;
        entities.bang(game, x, y);
        entities.deactivate(game, bullet);
        for (var i = 0; i < 4; i++) {
            entities.particle(game, x, y);
        }
        if (enemy.health) {
            enemy.health.current -= 2;
            if (enemy.health.current < 0) {
                x = enemy.position.x;
                y = enemy.position.y;
                entities.deactivate(game, enemy);
                entities.explosion(game, x, y);
            }
        }
    }
});
define("game", ["require", "exports", "Sdx", "entities", "systems"], function (require, exports, sdx, entities, systems) {
    "use strict";
    function main() {
        var game = sdx.createGame("ShmupWarz", 640, 640, DATADIR);
        entities.createPool(game);
        game.profile = true;
        game.start();
        while (game.running) {
            game.handleEvents();
            if (game.getKey(sdx.InputKeys.ESC))
                break;
            else {
                systems.collisionSystem(game, entities);
                systems.expireSystem(game, entities);
                systems.removalSystem(game, entities);
                systems.spawnSystem(game, entities);
                systems.tweenSystem(game, entities);
                systems.inputSystem(game, entities);
                systems.physicsSystem(game, entities);
                game.draw();
            }
        }
    }
    main();
});
