
import * as constants from './fretboardConstants';
import { Fretboard } from 'services';

const getDefaultState = (): Store.Fretboard => ({
  instance: new Fretboard,
  updatedAt: Date.now()
});

const defaultState: Store.Fretboard = Object.freeze(getDefaultState());

const dup = (state: Store.Fretboard): Store.Fretboard => Object.assign({}, state);

const tabReducer = (state = defaultState, action): Store.Fretboard => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case constants.RESET_FRETBOARD:
      return getDefaultState();

    default:
      return nextState;
  }
};

export default tabReducer;
