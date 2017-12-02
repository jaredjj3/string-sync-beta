import { reduxConnect } from 'stringSyncUtil';
import { featuresActions as actions } from 'data/ui/features';

const withFeatures = reduxConnect(
  state => ({
    features: state.features
  }),
  dispatch => ({
    enableFeatures: features => dispatch(actions.enableFeatures(features)),
    disableFeatures: features => dispatch(actions.disableFeatures(features)),
    resetFeatures: () => dispatch(actions.resetFeatures())
  })
);

export default withFeatures;
