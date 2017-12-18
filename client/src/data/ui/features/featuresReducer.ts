import * as constants from './featuresConstants';

const defaultState: Store.Features = Object.freeze({
  fretboard: true,
  autoSave: false,
  scaleVisualization: false,
  navbar: true,
  gradient: true
});

export default (state = defaultState, action): Store.Features => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case constants.ENABLE_FEATURES:
      action.features.map(feature => nextState[feature] = true);
      return nextState;

    case constants.DISABLE_FEATURES:
      action.features.map(feature => nextState[feature] = false);
      return nextState;

    case constants.RESET_FEATURES:
      return Object.assign({}, defaultState);

    default:
      return nextState;
  }
};
