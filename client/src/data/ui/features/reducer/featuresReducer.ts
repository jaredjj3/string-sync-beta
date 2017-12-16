import featuresActions from '../actions';
import { Features } from 'types';

const { ENABLE_FEATURES, DISABLE_FEATURES, RESET_FEATURES } = featuresActions;

const defaultState: Features = Object.freeze({
  fretboard: true,
  autoSave: false,
  scaleVisualization: false,
  navbar: true,
  gradient: true
});

export default (state = defaultState, action): Features => {
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
