import { featuresActions } from '../actions';

const { ENABLE_FEATURES, DISABLE_FEATURES, RESET_FEATURES } = featuresActions;

interface StoreFeatures {
  fretboard: boolean;
  autoSave: boolean;
  scaleVisualization: boolean;
  navbar: boolean;
}

const defaultState: StoreFeatures = Object.freeze({
  fretboard: true,
  autoSave: false,
  scaleVisualization: false,
  navbar: true
});

export default (state = defaultState, action): StoreFeatures => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case ENABLE_FEATURES:
      action.features.map(feature => nextState[feature] = true);
      return nextState;

    case DISABLE_FEATURES:
      action.features.map(feature => nextState[feature] = false);
      return nextState;

    case RESET_FEATURES:
      return Object.assign({}, defaultState);

    default:
      return nextState;
  }
};
