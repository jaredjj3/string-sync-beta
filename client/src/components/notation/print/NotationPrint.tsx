import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withProps, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { Gradient, Tab } from 'components';

const enhance = compose(
  withNotation,
  withRouter,
  withProps(props => ({
    fetchNotation: () => {
      props.notation.dispatch.fetchNotation(props.match.params.id);
    }
  })),
  lifecycle({
    componentDidMount(): void {
      this.props.fetchNotation();
    }
  })
);

const NotationPrint = () => (
  <div className="NotationPrint">
    <Gradient />
    <Tab allowOverflow />
  </div>
);

export default enhance(NotationPrint);
