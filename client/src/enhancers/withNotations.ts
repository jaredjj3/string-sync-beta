import { reduxConnect } from 'stringSyncUtil';
import { notationsActions as actions } from 'data/api/notations';

const withNotations = reduxConnect(
  state => ({
    notations: state.notations
  }),
  dispatch => ({
    setNotations: notations => dispatch(actions.setNotations(notations)),
    resetNotations: () => dispatch(actions.resetNotations()),
    fetchNotations: () => dispatch(actions.fetchNotations())
  })
);

export default withNotations;
