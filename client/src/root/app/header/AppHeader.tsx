import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';
import Gradient from 'comp/gradient';

import { Layout } from 'antd';
import DesktopNav from 'comp/desktop/nav';
import { withDeviceType, identity } from 'enhancers';

const { Header } = Layout;

const AppHeader = () => (
  <div>
    <Gradient />
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
  branch(shouldShowHeader, identity, renderComponent(Gradient))
)(AppHeader);
