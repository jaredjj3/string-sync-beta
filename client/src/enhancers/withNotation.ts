import { reduxConnect } from 'stringSyncUtil';
import { notationActions as actions } from 'data/api/notation';

const withNotation = reduxConnect(
  state => ({
    notation: state.notation
  }),
  dispatch => ({
    setNotation: notation => dispatch(actions.setNotation(notation)),
    resetNotation: () => dispatch(actions.resetNotation),
    fetchNotation: notationId => dispatch(actions.fetchNotation(notationId)),
    createNotation: notation => dispatch(actions.createNotation(notation)),
    updateNotation: notation => dispatch(actions.updateNotation(notation)),
    destroyNotation: notationId => dispatch(actions.destroyNotation(notationId))
  })
);

export default withNotation;
