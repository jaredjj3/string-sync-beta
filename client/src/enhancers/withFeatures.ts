import { connect } from 'react-redux';
import { featuresActions as actions } from 'data/ui/features';

const mapStateToProps = ({ features }) => ({
  features
});

const mapDispatchToProps = dispatch => ({
  enableFeatures: features => dispatch(actions.enableFeatures(features)),
  disableFeatures: features => dispatch(actions.disableFeatures(features)),
  resetFeatures: () => dispatch(actions.resetFeatures())
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  features: {
    state: stateProps.features,
    dispatch: dispatchProps
  }
});

const withFeatures = Component => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);

export default withFeatures;
