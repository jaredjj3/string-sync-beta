import React from 'react';

import { Layout } from 'antd';
import Routes from 'root/routes';

const { Content } = Layout;

const AppContent = () => (
  <Content>
    <Routes />
  </Content>
);

export default AppContent;
