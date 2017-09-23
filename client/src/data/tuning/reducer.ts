import { UPDATE_TUNING, RESET_TUNING } from './actions';

const defaultState: string = 'EADGBE';

export default (state = defaultState, action) => {
  Object.freeze(state);
  const nextState = state.repeat(1);

  switch (action.type) {
    case UPDATE_TUNING:
      return action.tuning.repeat(1);

    case RESET_TUNING:
      return defaultState;

    default:
      return nextState;
  }
};
