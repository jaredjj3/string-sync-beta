const interpolate = (x: number, x1: number, x2: number, y1: number, y2: number): number => {
  const m = (y2 - y1)  / (x2 - x1); // slope
  const b = y1 - (m * x1);          // y-intercept
  return (m * x) + b;
};

export default interpolate;
