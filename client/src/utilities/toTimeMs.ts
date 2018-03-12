const toTimeMs = (tick: number, ticksPerMinute: number): number => (
  ((tick / ticksPerMinute) * 60) * 1000
);

export default toTimeMs;
