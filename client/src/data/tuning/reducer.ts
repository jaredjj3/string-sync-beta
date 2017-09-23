import { UPDATE_TUNING, RESET_TUNING } from './actions';

interface StoreTuning {
  tuning: string;
}

const defaultState: StoreTuning = Object.freeze({
  tuning: 'EADBGE'
});

export default (state = defaultState, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case UPDATE_TUNING:
      nextState.tuning = action.tuning;
      return nextState;

    case RESET_TUNING:
      return defaultState;

    default:
      return nextState;
  }
};
