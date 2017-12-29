
import * as constants from './fretboardConstants';

const defaultState: Store.Fretboard = Object.freeze({
  instance: null
});

const dup = (state: Store.Fretboard): Store.Fretboard => Object.assign({}, state);

const tabReducer = (state = defaultState, action): Store.Fretboard => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case constants.SET_FRETBOARD:
      nextState.instance = action.fretboard;
      return nextState;

    case constants.RESET_FRETBOARD:
      nextState.instance = null;
      return nextState;

    default:
      return nextState;
  }
};

export default tabReducer;
