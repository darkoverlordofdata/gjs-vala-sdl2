
## notes

#### properties with upper case are imported wierd.

    prop mouseX

can only be accessed as get_mouseX()

or I can define it as mousex or mouse_x. Wtf Gnome?

#### modules are broken
If I import a constant from another gjs module, it throws "can't convert to an integer". Wtf Gnome?
I'll use es6 modules, and transpile backport to es5.


## performance

preliminary profiling looks pretty good, 
using the same functional ecs style, I get performance similar to fsharp and scala-native.

0.001651
0.001902
0.001992

0.002080
0.002304
0.002322

fsharp          0.001651
scala-native    0.001812
ooc             0.002586
nim             0.003331	
vala	        0.003586	
scala-jvm       0.008185	


