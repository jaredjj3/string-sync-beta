import { connect } from 'react-redux';
import { viewportActions as actions } from 'data/ui/viewport';

const mapStateToProps = ({ viewport }) => ({
  viewport
});

const mapDispatchToProps = dispatch => ({
  setViewport: viewport => dispatch(actions.setViewport(viewport))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  viewport: {
    state: stateProps.viewport,
    dispatch: dispatchProps
  }
});

const withViewport = Component => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);

export default withViewport;
