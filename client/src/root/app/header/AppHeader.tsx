import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';

import { Layout } from 'antd';
import DesktopNav from 'comp/desktop/nav';
import MobileNav from 'comp/mobile/nav';
import Gradient from 'comp/gradient';
import { withDeviceType, identity } from 'enhancers';

const { Header } = Layout;

const AppHeader = () => (
  <div>
    <Header className="App__header">
      <DesktopNav />
    </Header>
  </div>
);

const shouldShowHeader = ({ isVisible, deviceType }) => isVisible && deviceType === 'DESKTOP';

const mapStateToProps = state => ({
  isVisible: state.feature.navbar
});

export default compose(
  connect(mapStateToProps),
  withDeviceType,
  branch(shouldShowHeader, identity, renderNothing)
)(AppHeader);
