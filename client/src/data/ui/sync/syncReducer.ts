import { RESET_SYNC } from './syncConstants';
import { rafLoop, maestro } from 'services';

const getDefaultState = (): Store.Sync => ({
  rafLoop: rafLoop,
  maestro: maestro
});

const defaultState: Store.Sync = Object.freeze(getDefaultState());

const syncReducer = (state = defaultState, action): Store.Sync => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RESET_SYNC:
      return getDefaultState();

    default:
      return state;
  }
};

export default syncReducer;
