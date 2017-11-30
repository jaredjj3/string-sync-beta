import React from 'react';

import { Layout } from 'antd';
import Routes from 'root/routes';

const { Content } = Layout;

const AppContent = () => (
  <div className="App__content">
    <Content>
      <Routes />
    </Content>
  </div>
);

export default AppContent;
