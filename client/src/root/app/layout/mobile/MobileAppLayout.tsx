import React from 'react';

import MobileNav from 'comp/mobile/nav';
import Layout from 'antd/lib/layout';
import Gradient from 'comp/gradient';

import './_mobileAppLayout.less';

const { Content, Footer } = Layout;

const MobileAppLayout = ({ location, children }): JSX.Element => {
  return (
    <div>
      <Layout>
        <Gradient />
        <Content className="AppLayout__content">
          <div className="AppLayout__content__content">
            {children}
          </div>
        </Content>
        <Footer className="AppLayout__footer--mobile">
          <div className="AppLayout__footer__content">
            <MobileNav location={location} />
          </div>
        </Footer>
      </Layout>
    </div>
  );
};

export default MobileAppLayout;
