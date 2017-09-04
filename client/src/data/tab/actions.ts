export const SET_MEASURES_PER_LINE = 'SET_MEASURES_PER_LINE';
export const FOCUS_MEASURE = 'FOCUS_MEASURE';

export const setMeasuresPerLine = (measuresPerLine: number) => ({
  type: SET_MEASURES_PER_LINE,
  measuresPerLine
});

export const focusMeasure = (measure: number) => ({
  type: FOCUS_MEASURE,
  measure
});
