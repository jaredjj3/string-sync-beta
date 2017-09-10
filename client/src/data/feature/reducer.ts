import { ENABLE_FEATURES, DISABLE_FEATURES } from './actions';

interface StoreFeatures {
  fretboard: boolean;
  autoSave: boolean;
}

const defaultState: StoreFeatures = Object.freeze({
  fretboard: true,
  autoSave: false
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

    default:
      return nextState;
  }
};
