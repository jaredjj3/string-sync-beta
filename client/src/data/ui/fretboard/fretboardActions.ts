import * as constants from './fretboardConstants';

export const setFretboard = (fretboard: any) => ({
  type: constants.SET_FRETBOARD,
  fretboard
});

export const resetTab = () => ({
  type: constants.RESET_FRETBOARD
});
