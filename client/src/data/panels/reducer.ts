import { TOGGLE_PANEL, RESET_PANELS } from './actions';

interface StorePanel {
  fretboard: boolean;
  fretboardControls: boolean;
}

const defaultState: StorePanel = Object.freeze({
  fretboard: true,
  fretboardControls: true
});

export default (state = defaultState, action): StorePanel => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case TOGGLE_PANEL:
      nextState[action.panel] = !nextState[action.panel];
      return nextState;

    case RESET_PANELS:
      return defaultState;

    default:
      return nextState;
  }
};
