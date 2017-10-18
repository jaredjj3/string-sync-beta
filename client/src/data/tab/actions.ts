import isBetween from 'util/isBetween';
import { Artist, Player } from 'services/vexflow';

export const SET_MEASURES_PER_LINE = 'SET_MEASURES_PER_LINE';
export const SET_NUM_MEASURES = 'SET_NUM_MEASURES';
export const SET_ARTIST = 'SET_ARTIST';
export const FOCUS_MEASURE = 'FOCUS_MEASURE';
export const FOCUS_LINE = 'FOCUS_LINE';
export const RESET_TAB = 'RESET_TAB';
export const UPDATE_TUNING = 'UPDATE_TUNING';
export const RESET_TUNING = 'RESET_TUNING';
export const SET_TAB_PARSE_ERROR = 'SET_TAB_PARSE_ERROR';
export const CLEAR_TAB_PARSE_ERROR = 'CLEAR_TAB_PARSE_ERROR';

export const updateTuning = (tuning: Array<string>) => ({
  type: UPDATE_TUNING,
  tuning
});

export const  resetTuning = () => ({
  type: RESET_TUNING
});

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

export const setTabParseError = (parseError: string) => ({
  type: SET_TAB_PARSE_ERROR,
  parseError
});

export const clearTabParseError = () => ({
  type: CLEAR_TAB_PARSE_ERROR
});

export const focusMeasure = (measure: number) => (dispatch, getState) => {
  const { focusedMeasure, numMeasures } = getState().tab;

  const shouldDispatch = (
    typeof measure === 'number' &&
    numMeasures > 0 &&
    measure !== focusedMeasure &&
    isBetween(measure, 0, numMeasures - 1)
  );

  if (shouldDispatch) {
    return dispatch({ type: FOCUS_MEASURE, measure });
  }
};

export const focusNextMeasure = () => (dispatch, getState) => {
  const { focusedMeasure } = getState().tab;
  return dispatch(focusMeasure((focusedMeasure + 1)));
};

export const focusPrevMeasure = () => (dispatch, getState) => {
  const { focusedMeasure } = getState().tab;
  return dispatch(focusMeasure((focusedMeasure - 1)));
};

export const focusLine = (line: number) => (dispatch, getState) => {
  const { focusedLine, numMeasures, measuresPerLine } = getState().tab;
  const numLines = Math.ceil(numMeasures / measuresPerLine);

  const shouldDispatch = (
    typeof line === 'number' &&
    numLines > 0 &&
    line !== getState().tab.focusedLine &&
    isBetween(line, 0, numLines - 1)
  );

  if (shouldDispatch) {
    return dispatch({ type: FOCUS_LINE, line });
  }
};

export const focusNextLine = () => (dispatch, getState) => {
  const { focusedLine } = getState().tab;
  return dispatch(focusLine((focusedLine + 1)));
};

export const focusPrevLine = () => (dispatch, getState) => {
  const { focusedLine } = getState().tab;
  return dispatch(focusLine((focusedLine - 1)));
};

export const resetTab = () => ({
  type: RESET_TAB
});
