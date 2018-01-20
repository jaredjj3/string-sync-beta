import * as React from 'react';
import { ActionBar, Section1, Section2 } from './';
import { Link } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';
import { withFeatures, withSession } from 'enhancers';
import { Gradient, Footer } from 'components';
import styled from 'styled-components';

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

const DesktopLandingOuter = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
`;
const DesktopLandingInner = styled.div`
  width: 100%;
  max-width: 980px;
`;

const DesktopLanding = () => (
  <DesktopLandingOuter className="Landing--desktop">
    <Gradient />
    <DesktopLandingInner>
      <ActionBar />
      <Section1 />
      <Section2 />
      <Footer />
    </DesktopLandingInner>
  </DesktopLandingOuter>
);

export default enhance(DesktopLanding);
