import { reduxConnect } from 'stringSyncUtil';
import { rafActions as actions } from 'data/ui/raf';

const withRaf = reduxConnect(
  state => ({
    raf: state.raf
  }),
  dispatch => ({
    resetRafLoop: () => dispatch(actions.resetRAFLoop())
  })
);

export default withRaf;
