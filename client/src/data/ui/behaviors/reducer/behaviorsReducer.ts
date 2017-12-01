import { ENABLE_BEHAVIORS, DISABLE_BEHAVIORS } from './actions';

interface StoreBehaviors {
  present: boolean;
  record: boolean;
}

const defaultState: StoreBehaviors = Object.freeze({
  present: false,
  record: false
});

export default (state = defaultState, action): StoreBehaviors => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case ENABLE_BEHAVIORS:
      action.behaviors.map(behavior => nextState[behavior] = true);
      return nextState;

    case DISABLE_BEHAVIORS:
      action.behaviors.map(behavior => nextState[behavior] = false);
      return nextState;

    default:
      return nextState;
  }
};
