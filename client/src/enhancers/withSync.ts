import { connect } from 'react-redux';
import { syncActions as actions } from 'data/ui/sync';

const mapStateToProps = ({ sync }) => ({
  sync
});

const mapDispatchToProps = dispatch => ({
  resetRafLoop: () => dispatch(actions.resetSync())
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  sync: {
    state: stateProps.sync,
    dispatch: dispatchProps
  }
});

const withRaf = Component => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);

export default withRaf;
