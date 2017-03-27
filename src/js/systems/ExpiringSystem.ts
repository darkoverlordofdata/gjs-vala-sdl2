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


export class ExpiringSystem implements IExecuteSystem, ISetPool {

  protected pool:Pool;
  protected group:Group;

  public execute() {
    var pool = this.pool;
    var entities = this.group.getEntities();
    for (var i = 0, l = entities.length; i < l; i++) {
      var e = entities[i];
      if ((e.expires.delay -= Sdx.app.deltaTime) <= 0) {
        e.isDestroy = true;
        //bosco['viewContainer'].removeChild(e.sprite.object);
        //pool.destroyEntity(e);
      }
    }
  }
  
  public setPool(pool:Pool) {
    this.pool = pool;
    this.group = pool.getGroup(Matcher.allOf(Matcher.Expires));
  }
  


}
