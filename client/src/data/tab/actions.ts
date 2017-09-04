import { Artist } from 'services/vexflow';

export const SET_MEASURES_PER_LINE = 'SET_MEASURES_PER_LINE';
export const SET_NUM_MEASURES = 'SET_NUM_MEASURES';
export const SET_ARTIST = 'SET_ARTIST';
export const FOCUS_MEASURE = 'FOCUS_MEASURE';
export const FOCUS_LINE = 'FOCUS_LINE';
export const RESET_TAB = 'RESET_TAB';

export const setMeasuresPerLine = (measuresPerLine: number) => ({
  type: SET_MEASURES_PER_LINE,
  measuresPerLine
});

export const setNumMeasures = (numMeasures: number) => ({
  type: SET_NUM_MEASURES,
  numMeasures
});

export const setArtist = (artist: Artist) => ({
  type: SET_ARTIST,
  artist
});

export const focusMeasure = (measure: number) => ({
  type: FOCUS_MEASURE,
  measure
});

export const focusLine = (line: number) => ({
  type: FOCUS_LINE,
  line
});

export const resetTab = () => ({
  type: RESET_TAB
});
