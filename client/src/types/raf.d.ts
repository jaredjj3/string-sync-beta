declare namespace RAF {
  type Callback = (dt?: number) => any;

  interface Spec {
    name: string;
    precedence?: number;
    onAnimationStart?: Callback;
    onAnimationLoop?: Callback;
    onAnimationEnd?: Callback;
    _n?: number; // fallback to perserve order when two specs have the same precedence
  }

  type EventName = 'onAnimationStart' | 'onAnimationLoop' | 'onAnimationEnd';
}
