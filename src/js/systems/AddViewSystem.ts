import {Sdx} from 'Sdx'
import {Pool} from 'entitas';
import {Group} from 'entitas';
import {Entity} from 'entitas';
import {Matcher} from 'entitas';
import {Exception} from 'entitas';
import {IComponent} from 'entitas';
import {TriggerOnEvent} from 'entitas';
import {ISetPool} from 'entitas';
import {PositionComponent} from 'components'

import * as sdx from 'Sdx'
import Sprite = sdx.graphics.s2d.Sprite;

export class AddViewSystem implements ISetPool {
  protected pool:Pool;
  protected group:Group;

  /**
   * Watch for Resource Added
   *
   * @param pool
   */
  public setPool(pool:Pool) {
    this.pool = pool;
    pool.getGroup(Matcher.Resource).onEntityAdded.add(this.onEntityAdded);
  }

  /**
   * OnEntityAdded - Resource component.
   *
   * Load & configure the sprite for this resource component
   *
   * @param group
   * @param e
   * @param index
   * @param component
   */
  protected onEntityAdded = (group:Group, e:Entity, index:number, component:IComponent) => {
    var sprite:Sprite = sdx.createSprite(e.resource.name);
    var position = e.position;

    sprite.x = position.x;
    sprite.y = position.y;
    if (e.hasScale) {
      var scale = e.scale;
      sprite.setScale(scale.x, scale.y);
    }

    Sdx.app.addSprite(sprite)

    e.addSprite(sprite.layer, sprite);
  };


}
