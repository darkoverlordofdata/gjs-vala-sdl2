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
import {PositionComponent} from 'components'

import * as sdx from 'Sdx'
import Sprite = sdx.graphics.s2d.Sprite;

//declare var viewContainer;

export class RemoveOffscreenShipsSystem implements IExecuteSystem, ISetPool {

  protected pool:Pool;
  protected group:Group;

  public execute() {
    var height = Sdx.app.height;
    var pool = this.pool;
    var entities = this.group.getEntities();
    for (var i = 0, l = entities.length; i < l; i++) {
      var e = entities[i];
      if (e.position.y > height - e.bounds.radius) {
        e.isDestroy = true;
        Sdx.app.removeSprite(<Sprite>e.sprite.object)
        //bosco['viewContainer'].removeChild(e.sprite.object);
        //pool.destroyEntity(e);
      }
    }
  }
  
  public setPool(pool:Pool) {
    this.pool = pool;
    this.group = pool.getGroup(Matcher.allOf(Matcher.Velocity, Matcher.Position, Matcher.Health, Matcher.Bounds));
  }
  


}
