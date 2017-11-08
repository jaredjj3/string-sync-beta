import React from 'react';
import { withRouter } from 'react-router';
import { lifecycle, compose } from 'recompose';

const MobileLanding = () => (
  <div>
    Redirecting...
  </div>
);

export default compose(
  withRouter,
  lifecycle({
    componentDidMount(): void {
      this.props.history.push('/library');
    }
  })
)(MobileLanding);
