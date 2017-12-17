declare interface Point {
  x: number;
  y: number;
}

export type Interpolator = (target: number, offset?: number) => number;

const interpolator = (point1: Point, point2: Point): Interpolator => {
  const [p1, p2] = point1.y > point2.y ? [point1, point2] : [point2, point1];
  const [x1, x2] = [p1.x, p2.x];
  const [y1, y2] = [p1.y, p2.y];

  const slope = (y2 - y1) / (x2 - x1);
  const intercept = y1 - (slope * x1);

  return (target: number, offset: number = 0): number => (slope * target) + intercept + offset;
};

export default interpolator;
