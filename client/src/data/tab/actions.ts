import isBetween from 'util/isBetween';
import { Artist, Player } from 'services/vexflow';

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

export const focusMeasure = (measure: number) => (dispatch, getState) => {
  const { focusedMeasure, numMeasures } = getState().tab;

  const shouldDispatch = (
    numMeasures > 0 &&
    measure !== focusedMeasure &&
    isBetween(measure, 0, numMeasures - 1)
  );

  if (shouldDispatch) {
    return dispatch({ type: FOCUS_MEASURE, measure });
  }
};

export const focusLine = (line: number) => (dispatch, getState) => {
  const { focusedLine, numMeasures, measuresPerLine } = getState().tab;
  const numLines = numMeasures / measuresPerLine;

  const shouldDispatch = (
    numLines > 0 &&
    line !== getState().tab.focusedLine &&
    isBetween(line, 0, numLines - 1)
  );

  if (shouldDispatch) {
    return dispatch({ type: FOCUS_LINE, line });
  }
};

export const resetTab = () => ({
  type: RESET_TAB
});