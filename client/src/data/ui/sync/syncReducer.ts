import { RESET_SYNC } from './syncConstants';
import { RAFLoop, Maestro } from 'services';

const getDefaultState = (): Store.Sync => ({
  rafLoop: new RAFLoop(),
  maestro: new Maestro()
});

const defaultState: Store.Sync = Object.freeze(getDefaultState());

const rafReducer = (state = defaultState, action): Store.Sync => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RESET_SYNC:
      return getDefaultState();

    default:
      return state;
  }
};

export default rafReducer;
