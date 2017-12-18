import { connect } from 'react-redux';
import { rafActions as actions } from 'data/ui/raf';

const mapStateToProps = ({ raf }) => ({
  raf
});

const mapDispatchToProps = dispatch => ({
  resetRafLoop: () => dispatch(actions.resetRafLoop())
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  raf: {
    state: stateProps.raf,
    dispatch: dispatchProps
  }
});

const withRaf = Component => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);

export default withRaf;
