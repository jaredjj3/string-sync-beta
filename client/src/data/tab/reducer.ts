import {
  SET_MEASURES_PER_LINE,
  SET_NUM_MEASURES,
  SET_ARTIST,
  FOCUS_MEASURE,
  FOCUS_LINE,
  RESET_TAB
} from './actions';

import { Artist, Player, Formatter, Fretman } from 'services/vexflow';

interface StoreTab {
  focusedMeasure: number;
  focusedLine: number;
  measuresPerLine: number;
  numMeasures: number;
  artist: Artist;
  player: Player;
  formatter: Formatter;
  fretman: Fretman;
}

const defaultState: StoreTab = Object.freeze({
  focusedMeasure: 0,
  focusedLine: 0,
  measuresPerLine: 1,
  numMeasures: 0,
  artist: null,
  player: new Player(),
  formatter: new Formatter(),
  fretman: new Fretman()
});

const dup = (state: StoreTab): StoreTab => {
  const nextState = Object.assign({}, state);
  return nextState;
};

export default (state = defaultState, action): StoreTab => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case SET_MEASURES_PER_LINE:
      nextState.measuresPerLine = action.measuresPerLine;
      return nextState;

    case SET_NUM_MEASURES:
      nextState.numMeasures = action.numMeasures;
      return nextState;

    case FOCUS_MEASURE:
      nextState.focusedMeasure = action.measure;
      nextState.focusedLine = Math.floor(nextState.focusedMeasure / nextState.measuresPerLine);
      return nextState;

    case FOCUS_LINE:
      nextState.focusedLine = action.line;
      nextState.focusedMeasure = nextState.focusedLine * nextState.measuresPerLine;
      return nextState;

    case SET_ARTIST:
      nextState.artist = action.artist;
      return nextState;

    case RESET_TAB:
      return defaultState;

    default:
      return nextState;
  }
};
