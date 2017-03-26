
## notes

## api

hierarchical frameworks like sdx are flatten and namemangled by vala, and become
very cumbersome to use. So I'm using some top level functions to interface
javascript to the framework.

Default arguments are lost, and must be supplied by javascript

Camel case properties don't work. Properties must be snake case for script access.

Enums and constants can't be calulated, can't have lower case. Can't be nested.
So I need to redefine for javascript.


## performance

preliminary profiling looks pretty good, 

    0.001322
    0.001774
    0.001792
    0.001430
    0.001758
    0.001537

compared to:

    gjs-vala        0.001602
    fsharp          0.001651
    scala-native    0.001812
    ooc             0.002586
    nim             0.003331	
    vala	        0.003586	
    scala-jvm       0.008185	


## why?

Why is it faster than a pure vala solution?

* Game logic is pojs, which is I assume less overhead than GObject
* SpiderMonkey is a Mozilla flagship product. I assume it's better at optimization than valac.
* JS code is much more simple. Less code runs faster is especially true for JS.

It allows me to dramatically increase the activity level of the game - this is a game changer.