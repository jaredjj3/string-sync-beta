const isBetween = (probe: number, val1: number, val2: number): boolean => {
  let lowerBound, upperBound;
  if (val2 < val1) {
    lowerBound = val2;
    upperBound = val1;
  } else {
    lowerBound = val1;
    upperBound = val2;
  }

  return probe >= lowerBound && probe <= upperBound;
};

export default isBetween;
