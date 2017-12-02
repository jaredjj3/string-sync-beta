import { connect } from 'react-redux';

import { actions } from 'data/viewport';
const { setViewport } = actions;

const mapStateToProps = ({ viewport }) => ({
  viewport
});

const mapDispatchToProps = dispatch => ({
  setViewport: viewport => dispatch(setViewport(viewport))
});

const withViewport = (Component: any) => connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default withViewport;
