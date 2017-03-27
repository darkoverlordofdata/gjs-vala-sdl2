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

/**
 * A Simple Timer
 * port of com.artemis.utils.Timer.java
 */
class Timer {
    /**
     * @param delay count of ms
     * @param repeat does the timer repeat?
     */
    delay: number
    repeat: false
    acc: number = 0
    done: boolean = false
    stopped: boolean = false
    execute: Function

    constructor(delay, repeat) {
        if (repeat === void 0) { repeat = false; }
        /**
         * abstract execute method
         * override to provide timed functionality
         */
        this.delay = delay;
        this.repeat = repeat;
        this.acc = 0;
    }
    /**
     * update is caller every game loop
     *
     * @param delta time passed since last update
     */
    update(delta) {
        if (!this.done && !this.stopped) {
            this.acc += delta;
            if (this.acc >= this.delay) {
                this.acc -= this.delay;
                if (this.repeat) {
                    this.reset();
                }
                else {
                    this.done = true;
                }
                this.execute();
            }
        }
    }
    /**
     * reset the timer
     */
    reset() {
        this.stopped = false;
        this.done = false;
        this.acc = 0;
    }
    /**
     * @returns true if timer is finished
     */
    isDone() {
        return this.done;
    }
    /**
     * @returns true if timer is not finished
     */
    isRunning() {
        return !this.done && this.acc < this.delay && !this.stopped;
    }
    /**
     * stop the timer
     */
    stop() {
        this.stopped = true;
    }
    /**
     * set a new delay value
     * @param delay count
     */
    setDelay(delay) {
        this.delay = delay;
    }
    /**
     * @returns the remaining timer as a percentage
     */
    getPercentageRemaining() {
        if (this.done)
            return 100;
        else if (this.stopped)
            return 0;
        else
            return 1 - (this.delay - this.acc) / this.delay;
    }
    /**
     * @returns ths current delay
     */
    getDelay() {
        return this.delay;
    }
}

export class EntitySpawningTimerSystem implements IExecuteSystem, IInitializeSystem, ISetPool {

  protected pool:Pool;
  private timer1:Timer;
  private timer2:Timer;
  private timer3:Timer;

  public execute() {
    var rnd = Math.random();
    if (rnd<.5) rnd = 1-rnd;
    var delta = rnd*Sdx.app.deltaTime

    this.timer1.update(delta);
    this.timer2.update(delta);
    this.timer3.update(delta);
  }

  public initialize() {
    this.timer1 = new Timer(2, true);
    this.timer1.execute = () => {
      this.pool.createEnemy1();
    };

    this.timer2 = new Timer(6, true);
    this.timer2.execute = () => {
      this.pool.createEnemy2();
    };

    this.timer3 = new Timer(12, true);
    this.timer3.execute = () => {
      this.pool.createEnemy3();
    };

  }

  public setPool(pool:Pool) {
    this.pool = pool;
  }

}
