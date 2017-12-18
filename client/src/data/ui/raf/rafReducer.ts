import { RESET_RAF_LOOP } from './rafConstants';
import { RAFLoop } from 'services';

const getDefaultState = (): Store.RAF => ({
  instance: new RAFLoop()
});

const defaultState: Store.RAF = Object.freeze(getDefaultState());

const rafReducer = (state = defaultState, action): Store.RAF => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RESET_RAF_LOOP:
      return getDefaultState();

    default:
      return state;
  }
};

export default rafReducer;
