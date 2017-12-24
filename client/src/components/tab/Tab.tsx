import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';

const enhance = compose(
  withNotation,
  lifecycle({
    componentDidMount(): void {
      const { vextabString } = this.props.notation.state;

    }
  })
);

const Tab = () => (
  <div className="Tab">
    Tab
  </div>
);

export default Tab;
