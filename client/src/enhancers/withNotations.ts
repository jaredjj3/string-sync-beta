import { connect } from 'react-redux';
import { notationsActions as actions } from 'data/api/notations';

const mapStateToProps = ({ notations }) => ({
  notations
});

const mapDispatchToProps = dispatch => ({
  setNotations: notations => dispatch(actions.setNotations(notations)),
  resetNotations: () => dispatch(actions.resetNotations()),
  fetchNotations: () => dispatch(actions.fetchNotations())
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  notations: {
    state: stateProps.notations,
    dispatch: dispatchProps
  }
});

const withNotations = Component => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);

export default withNotations;
