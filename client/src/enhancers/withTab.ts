import { connect } from 'react-redux';

import { setProvider, emitUpdate, resetTab } from 'data/tab/actions';

const mapStateToProps = state => ({
  provider: state.tab.provider,
  updatedAt: state.tab.updatedAt
});

const mapDispatchToProps = dispatch => ({
  setProvider: provider => dispatch(setProvider(provider)),
  emitUpdate: () => dispatch(emitUpdate()),
  resetTab: () => dispatch(resetTab())
});

const withTab = (Component: any) => connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default withTab;
