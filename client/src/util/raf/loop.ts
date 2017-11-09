import { sortBy, partition } from 'lodash';

type RAFFunc = (dt?: number) => any;

interface RAFSpec {
  name: string;
  precedence?: number;
  onAnimationStart?: RAFFunc;
  onAnimationLoop?: RAFFunc;
  onAnimationEnd?: RAFFunc;
}

type EventName = 'onAnimationStart' | 'onAnimationLoop' | 'onAnimationEnd';

const sortByPrecedence = <T>(collection: Array<T>): Array<T> => {
  const [withPrecedence, withoutPrecedence] = partition(collection, o => (
    o.hasOwnProperty('precedence'))
  );

  return [...sortBy(withPrecedence, ({ precedence }) => precedence ), ...withoutPrecedence];
};

class RAFLoop {
  public throttleMs: number = 0;

  private _isActive: boolean = false; // exposed by the public isActive() getter
  private _specs: Array<RAFSpec> = [];
  private _lastInvokeMs: number = 0;
  private _rafId: number = null;

  public get dt(): number {
    if (!this.isActive) {
      return 0;
    } else {
      return this._lastInvokeMs - Date.now();
    }
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public register(spec: RAFSpec): void {
    this._specs.push(spec);
    this._specs = sortByPrecedence(this._specs);
  }

  public unregister(specName: string): void {
    this._specs = this._specs.filter(({ name }) => name !== specName);
  }

  public start(): void {
    if (!this.isActive) {
      this._invoke('onAnimationStart');
      this._isActive = true;
      this._rafId = window.requestAnimationFrame(this._loop);
    }
  }

  public stop(): void {
    if (this.isActive) {
      this._invoke('onAnimationEnd');
      this._lastInvokeMs = 0;
      this._isActive = false;
      window.cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  private _loop = (): void => {
    if (this._shouldLoop()) {
      this._invoke('onAnimationLoop');
      this._rafId = window.requestAnimationFrame(this._loop);
    }
  }

  private _shouldLoop(): boolean {
    return Date.now() - this._lastInvokeMs >= this.throttleMs;
  }

  private _invoke(eventName: EventName): void {
    const dt = this.dt;

    this._specs.forEach(spec => {
      const rafFunc: RAFFunc = spec[eventName];

      if (rafFunc) {
        rafFunc(dt);
      }
    });

    this._lastInvokeMs = Date.now();
  }
}

export default RAFLoop;
