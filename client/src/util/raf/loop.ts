import { sortBy, partition } from 'lodash';

// defintions
type RAFFunc = (dt?: number) => any;

interface RAFSpec {
  name: string;
  precedence?: number;
  onAnimationStart?: RAFFunc;
  onAnimationLoop?: RAFFunc;
  onAnimationEnd?: RAFFunc;
  _n: number; // fallback to perserve order when two specs have the same precedence
}

type EventName = 'onAnimationStart' | 'onAnimationLoop' | 'onAnimationEnd';

// utility functions
const RAF = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame
);

const sortSpecs = <T>(collection: Array<T>): Array<T> => {
  const [withPrecedence, withoutPrecedence] = partition(collection, o => (
    o.hasOwnProperty('precedence'))
  );

  const sortedWithPrecedence = sortBy(withPrecedence, ({ precedence, _n }) => [precedence, _n ]);
  const sortedWithoutPrecedence = sortBy(withoutPrecedence, ({ _n }) => _n);

  return [...sortedWithPrecedence, ...sortedWithoutPrecedence];
};

const hasRafFunc = (spec: RAFSpec): boolean => (
  spec.hasOwnProperty('onAnimationStart') ||
  spec.hasOwnProperty('onAnimationLoop')  ||
  spec.hasOwnProperty('onAnimationEnd')
);

// main
// The RAFLoop's purpose is to centralize functions for requestAnimationFrame() (or RAF).
// This is particularly useful when multiple systems need to RAF and execute consistently.
class RAFLoop {
  throttleMs: number = 0;

  private _isActive: boolean = false; // exposed by the public isActive() getter
  private _specs: Array<RAFSpec> = [];
  private _lastInvokeMs: number = 0;
  private _rafId: number = null;

  get dt(): number {
    if (!this.isActive) {
      return 0;
    } else {
      return Date.now() - this._lastInvokeMs;
    }
  }

  get isActive(): boolean {
    return this._isActive;
  }

  register(spec: RAFSpec): void {
    this._validate(spec);

    const nextSpec = Object.assign({}, spec, { _n: this._specs.length });
    this._specs.push(nextSpec);
    this._specs = sortSpecs(this._specs);
  }

  unregister(specName: string): void {
    this._specs = this._specs.filter(({ name }) => name !== specName);
  }

  start(): void {
    if (!this.isActive) {
      this._invoke('onAnimationStart');
      this._isActive = true;
      this._rafId = RAF(this._loop);
    }
  }

  stop(): void {
    if (this.isActive) {
      this._invoke('onAnimationEnd');
      this._lastInvokeMs = 0;
      this._isActive = false;
      window.cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  has(specName: string): boolean {
    return this._specs.some(({ name }) => name === specName);
  }

  private _loop = (): void => {
    if (this._shouldLoop()) {
      this._invoke('onAnimationLoop');
    }

    this._rafId = RAF(this._loop);
  }

  private _shouldLoop(): boolean {
    return this.isActive && this.dt >= this.throttleMs;
  }

  private _invoke = (eventName: EventName): void => {
    const dt = this.dt;

    this._specs.forEach(spec => {
      const rafFunc: RAFFunc = spec[eventName];

      if (rafFunc) {
        rafFunc(dt);
      }
    });

    this._lastInvokeMs = Date.now();
  }

  private _validate(spec: RAFSpec): void {
    if (!hasRafFunc(spec)) {
      throw `must specify at least one: 'onAnimationStart', 'onAnimationLoop', 'onAnimationEnd'`;
    }
  }
}

export default RAFLoop;
