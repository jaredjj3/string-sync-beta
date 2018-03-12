const toTick = (timeMs: number, ticksPerMinute: number): number => (
  ticksPerMinute * ((timeMs / 1000) / 60)
);

export default toTick;
