export const SET_MEASURES_PER_LINE = 'SET_MEASURES_PER_LINE';
export const SET_NUM_MEASURES = 'SET_NUM_MEASURES';
export const FOCUS_MEASURE = 'FOCUS_MEASURE';
export const FOCUS_LINE = 'FOCUS_LINE';

export const setMeasuresPerLine = (measuresPerLine: number) => ({
  type: SET_MEASURES_PER_LINE,
  measuresPerLine
});

export const setNumMeasures = (numMeasures: number) => ({
  type: SET_NUM_MEASURES,
  numMeasures
});

export const focusMeasure = (measure: number) => ({
  type: FOCUS_MEASURE,
  measure
});

export const focusLine = (line: number) => ({
  type: FOCUS_LINE,
  line
});
