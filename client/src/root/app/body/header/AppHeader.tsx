import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';

import { Layout } from 'antd';
import DesktopNav from 'comp/desktop/nav';
import { withDeviceType, identity } from 'enhancers';

const { Header } = Layout;

const shouldShowHeader = ({ isVisible, deviceType }) => isVisible && deviceType === 'DESKTOP';

const mapStateToProps = state => ({
  isVisible: state.feature.navbar
});

const enhance = compose(
  connect(mapStateToProps),
  withDeviceType,
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
