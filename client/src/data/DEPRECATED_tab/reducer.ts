import {
  SET_MEASURES_PER_LINE,
  SET_NUM_MEASURES,
  SET_ARTIST,
  SET_TICKMAN,
  FOCUS_MEASURE,
  FOCUS_LINE,
  RESET_TAB,
  UPDATE_TUNING,
  RESET_TUNING,
  SET_TAB_PARSE_ERROR,
  CLEAR_TAB_PARSE_ERROR,
  SET_VEX_PLAYER
} from './actions';

import {
  Artist,
  VexPlayer,
  Formatter,
  Fretman,
  Tickman,
  ScaleVisualizer
} from 'services/vexflow';

interface StoreTab {
  focusedMeasure: number;
  focusedLine: number;
  measuresPerLine: number;
  numMeasures: number;
  artist: Artist;
  vexPlayer: VexPlayer;
  formatter: Formatter;
  tickman: Tickman;
  scaleVisualizer: ScaleVisualizer;
  fretman: Fretman;
  tuning: Array<string>;
  parseError: string;
}

const fretman = new Fretman();
const scaleVisualizer = new ScaleVisualizer(fretman);

const defaultState: StoreTab = Object.freeze({
  focusedMeasure: 0,
  focusedLine: 0,
  measuresPerLine: 1,
  numMeasures: 0,
  artist: null,
  vexPlayer: null,
  tickman: null,
  formatter: new Formatter(),
  fretman,
  scaleVisualizer,
  tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
  parseError: null
});

const dup = (state: StoreTab): StoreTab => {
  const nextState = Object.assign({}, state);
  nextState.tuning = Object.assign([], state.tuning);
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

    case SET_VEX_PLAYER:
      nextState.vexPlayer = action.vexPlayer;
      return nextState;

    case SET_TICKMAN:
      nextState.tickman = action.tickman;
      return nextState;

    case UPDATE_TUNING:
      nextState.tuning = action.tuning;
      return nextState;

    case RESET_TUNING:
      nextState.tuning = Object.assign([], defaultState.tuning);
      return nextState;

    case CLEAR_TAB_PARSE_ERROR:
      nextState.parseError = null;
      return nextState;

    case SET_TAB_PARSE_ERROR:
      nextState.parseError = action.parseError;
      return nextState;

    case RESET_TAB:
      const dupDefaultState = dup(defaultState);
      const fretman = new Fretman();
      dupDefaultState.fretman = fretman;
      dupDefaultState.scaleVisualizer = new ScaleVisualizer(fretman);
      return dupDefaultState;

    default:
      return nextState;
  }
};
