import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, defaultProps, renderComponent } from 'recompose';

import { identity } from 'enhancers';

const mapStateToProps = state => ({
  provider: state.tab.provider
});

const mapDispatchToProps = dispatch => ({

});

const Loading = () => <div>Loading...</div>;

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ provider }) => provider && provider.isReady,
    identity,
    renderComponent(Loading)
  )
);

export default enhance(({ children }) => (
  <div>
    Provider
  </div>
));
