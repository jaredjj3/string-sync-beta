import { connect } from 'react-redux';
import { notationActions as actions } from 'data/api/notation';

const mapStateToProps = ({ notation }) => ({
  notation
});

const mapDispatchToProps = dispatch => ({
  setNotation: notation => dispatch(actions.setNotation(notation)),
  resetNotation: () => dispatch(actions.resetNotation),
  fetchNotation: notationId => dispatch(actions.fetchNotation(notationId)),
  createNotation: notation => dispatch(actions.createNotation(notation)),
  updateNotation: notation => dispatch(actions.updateNotation(notation)),
  destroyNotation: notationId => dispatch(actions.destroyNotation(notationId))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  notation: {
    state: stateProps.notation,
    dispatch: dispatchProps
  }
});

const withNotation = Component => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);

export default withNotation;
