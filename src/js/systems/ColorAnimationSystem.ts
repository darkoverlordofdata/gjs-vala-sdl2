import {Sdx} from 'Sdx'
import {Pool} from 'entitas';
import {Group} from 'entitas';
import {Entity} from 'entitas';
import {Matcher} from 'entitas';
import {Exception} from 'entitas';
import {TriggerOnEvent} from 'entitas';
import {IExecuteSystem} from 'entitas';
import {IInitializeSystem} from 'entitas';
import {ISetPool} from 'entitas';
import {ColorAnimationComponent} from 'components'

import * as sdx from 'Sdx'
import Sprite = sdx.graphics.s2d.Sprite;

export class ColorAnimationSystem implements IExecuteSystem, ISetPool {

  protected pool:Pool;
  protected group:Group;

  public execute() {
    var delta = Sdx.app.deltaTime;
    var entities = this.group.getEntities();
    for (var i = 0, l = entities.length; i < l; i++) {
      var e = entities[i];
      var c:ColorAnimationComponent = e.colorAnimation;
      var sprite:Sprite = <Sprite>e.sprite.object;

      if(c.alphaAnimate) {
        sprite.a += c.alphaSpeed * delta;

        if(sprite.a > c.alphaMax || sprite.a < c.alphaMin) {
          if(c.repeat) {
            c.alphaSpeed = -c.alphaSpeed;
          } else {
            c.alphaAnimate = false;
          }
        }
      }
    }
  }
  
  public setPool(pool:Pool) {
    this.pool = pool;
    this.group = pool.getGroup(Matcher.allOf(Matcher.ColorAnimation, Matcher.Sprite));
  }
  


}
