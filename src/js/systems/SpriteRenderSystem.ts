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

export class SpriteRenderSystem implements IExecuteSystem, ISetPool {

  protected pool:Pool;
  protected group:Group;

  public execute() {
    var entities = this.group.getEntities();
    for (var i = 0, l = entities.length; i < l; i++) {
      var e = entities[i];
      var sprite:Sprite = <Sprite>e.sprite.object;
      sprite.x = e.position.x;
      sprite.y = e.position.y;
    }
  }
  
  public setPool(pool:Pool) {
    this.pool = pool;
    this.group = pool.getGroup(Matcher.allOf(Matcher.Position, Matcher.Sprite));
  }
}
