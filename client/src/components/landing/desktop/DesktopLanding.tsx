import * as React from 'react';
import { ActionBar, Section1, Section2 } from './';
import { Link } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';
import { withFeatures, withSession } from 'enhancers';
import { Gradient, Footer } from 'components';

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
  <div className="Landing--desktop">
    <Gradient />
    <div className="Landing--desktop__inner">
      <ActionBar />
      <Section1 />
      <Section2 />
      <Footer />
    </div>
  </div>
);

export default enhance(DesktopLanding);
