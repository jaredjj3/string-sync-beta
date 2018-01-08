import * as React from 'react';
import { ActionBar, Section1, Section2 } from './';
import { Link } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';
import { withFeatures, withSession } from 'enhancers';

const enhance = compose(
  withFeatures,
  lifecycle({
    componentDidMount(): void {
      this.props.features.dispatch.disableFeatures(['navbar']);
    },
    componentWillUnmount(): void {
      this.props.features.dispatch.enableFeatures(['navbar']);
    }
  })
);

const DesktopLanding = () => (
  <div className="RouteEntry Landing--desktop">
    <ActionBar />
    <Section1 />
    <Section2 />
  </div>
);

export default enhance(DesktopLanding);
