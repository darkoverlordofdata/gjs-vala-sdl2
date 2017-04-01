#!/usr/bin/env node
/**
 *  Copyright 2017 darkoverlordofdata
 * 
 * Simple module loader/gjs helper
 * normalized access to amd, commonjs and gjs imports
 * 
 */
require('coffee-script/register')
Object.defineProperties(global, {
    define: { value: (function (modules) {
        return (name, deps, callback) => {
            if (typeof name !== 'string') { /* browserify bundle */
                const bundle = deps()
                for (name in bundle) 
                    modules[name] = { id: name, exports: bundle[name] }

            } else { /* amd module */
                modules[name] = { id: name, exports: {} }
                const args = [(name) => modules[name] ? modules[name].exports : require(name), 
                            modules[name].exports]
                for (let i = 2; i < deps.length; i++) 
                    args.push(modules[deps[i]].exports)
                callback.apply(modules[name].exports, args)
            }
        }
    }({          /* builtin modules */
        Sdx:    { id: 'Sdx',    exports: require('./sdx')}
    }))}
})
Object.defineProperties(define, {
    amd:     { value: true },
    version: { value: '0.1.0' },
})
