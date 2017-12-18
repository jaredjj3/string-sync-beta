import * as React from 'react';
import ActionBar from './ActionBar';
import { Link } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';
import { withFeatures, withSession } from 'enhancers';
import Section1 from 'components/landing/desktop/Section1';
import Section2 from 'components/landing/desktop/Section2';

const DesktopLanding = ({ session }) => {
  const { isLoggedIn } = session.state;

  return (
    <div className="Landing--desktop">
      <ActionBar isLoggedIn={isLoggedIn} />
      <Section1 isLoggedIn={isLoggedIn} />
      <Section2 />
    </div>
  );
};

const enhance = compose(
  withFeatures,
  withSession,
  lifecycle({
    componentDidMount(): void {
      this.props.features.dispatch.disableFeatures(['navbar']);
    },
    componentWillUnmount(): void {
      this.props.features.dispatch.enableFeatures(['navbar']);
    }
  })
);

export default enhance(DesktopLanding);
