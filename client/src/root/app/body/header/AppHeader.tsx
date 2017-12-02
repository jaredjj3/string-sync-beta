import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import { Layout } from 'antd';
import { DesktopNav } from 'components';
import { withViewport, identity, withFeatures } from 'enhancers';

const { Header } = Layout;

const shouldShowHeader = ({ features, viewport }) => {
  return features.navbar && viewport.type === 'DESKTOP';
};

const enhance = compose(
  withFeatures,
  withViewport,
  branch(shouldShowHeader, identity, renderNothing)
);

const AppHeader = () => (
  <div>
    <Header className="App__header">
      <DesktopNav />
    </Header>
  </div>
);

export default enhance(AppHeader);
