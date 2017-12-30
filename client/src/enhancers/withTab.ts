import { connect } from 'react-redux';
import { tabActions as actions } from 'data/ui/tab';

const mapStateToProps = ({ tab }) => ({
  tab
});

const mapDispatchToProps = dispatch => ({
  setTab: instance => dispatch(actions.setTab(instance)),
  emitUpdate: () => dispatch(actions.emitUpdate()),
  resetTab: () => dispatch(actions.resetTab())
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  tab: {
    state: stateProps.tab,
    dispatch: dispatchProps
  }
});

const withRaf = Component => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);

export default withRaf;
