
## notes

## api

hierarchical frameworks like sdx are flatten and namemangled by vala, and become
very cumbersome to use. So I'm using some top level functions to interface
javascript to the framework.

Default arguments are lost, and must be supplied by javascript

Gir:
Camel case properties don't work. Properties must be snake case for script access.

Enums and constants can't be calulated, can't have lower case. Can't be nested.
So I need to redefine for javascript.


## performance

using gir/gjs, performance is about 20% slower
using node/ffi, performance is picks back up, about the same as pure vala.


## node or gjs?

this is a no brainer - node:


* node has monumentally more resources than gjs
* node has es6
* node has better performance
* node-ffi is ad-hoc, gir requires alot of setup
* node works on windows, gjs does not
