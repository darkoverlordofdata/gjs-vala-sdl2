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
import {ScaleComponent} from 'components'
import {ScaleAnimationComponent} from 'components'

import * as sdx from 'Sdx'
import Sprite = sdx.graphics.s2d.Sprite;

export class ScaleAnimationSystem implements IExecuteSystem, ISetPool {

  protected pool:Pool;
  protected group:Group;

  public execute() {
    var delta = Sdx.app.deltaTime;
    var entities = this.group.getEntities();
    for (var i = 0, l = entities.length; i < l; i++) {
      var e = entities[i];

      var scaleAnimation:ScaleAnimationComponent = e.scaleAnimation;

      if (scaleAnimation.active) {
        var scale:ScaleComponent = e.scale

        scale.x += scaleAnimation.speed * delta;
        scale.y = scale.x;

        if (scale.x > scaleAnimation.max) {
          scale.x = scaleAnimation.max;
          scale.y = scale.x;
          scaleAnimation.active = false;
        } else if (scale.x < scaleAnimation.min) {
          scale.x = scaleAnimation.min;
          scale.y = scale.x;
          scaleAnimation.active = false;
        }
        var sprite:Sprite = <Sprite>(e.sprite.object);
        sprite.setScale(scale.x, scale.y)

      }
    }
  }
  
  public setPool(pool:Pool) {
    this.pool = pool;
    this.group = pool.getGroup(Matcher.allOf(Matcher.ScaleAnimation));
  }
  


}
