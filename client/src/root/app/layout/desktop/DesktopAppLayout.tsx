import React from 'react';

import Layout from 'antd/lib/layout';
import DesktopNav from 'comp/desktop/nav';

const { Header, Content, Footer } = Layout;

const DesktopAppLayout = ({ location, children }): JSX.Element => (
  <Layout>
    <Header
      className="AppLayout__header"
      style={{ marginBottom: '3em' }}
    >
      <div className="AppLayout__header__content">
        <DesktopNav location={location} />
      </div>
    </Header>
    <Content className="AppLayout__content">
      <div className="AppLayout__content__content">
        {children}
      </div>
    </Content>
    <Footer className="AppLayout__footer--mobile">
      <div className="AppLayout__footer__content">
        <span>StringSync ©2017 Created by Jared Johnson</span>
      </div>
    </Footer>
  </Layout>
);

export default DesktopAppLayout;
