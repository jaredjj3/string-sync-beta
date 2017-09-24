import React from 'react';

import Layout from 'antd/lib/layout';
import DesktopNav from 'comp/desktop/nav';
import Gradient from 'comp/gradient';
import Icon from 'antd/lib/icon';

const { Header, Content, Footer } = Layout;

const DesktopAppLayout = ({ location, children }): JSX.Element => (
  <div>
    <Layout>
      <Header className="AppLayout__header">
        <Gradient />
        <div className="AppLayout__header__content">
          <DesktopNav location={location} />
        </div>
      </Header>
      <Content className="AppLayout__content">
        <div className="AppLayout__content__content">
          {children}
        </div>
      </Content>
      <Footer className="AppLayout__footer--desktop">
        <div className="AppLayout__footer__content">
          <span>StringSync © 2017 Created by Jared Johnson</span>
          <div><Icon type="smile-o" style={{ marginTop: '5px', fontSize: '16px' }} /></div>
        </div>
      </Footer>
    </Layout>
  </div>
);

export default DesktopAppLayout;
