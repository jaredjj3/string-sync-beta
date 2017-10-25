import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import { Icon, Layout } from 'antd';
import MobileNav from 'comp/mobile/nav';
import { identity, withDeviceType } from 'enhancers';

const { Footer } = Layout;

const AppFooter = () => (
  <Footer>
    <div className="App__footer">
      <span>StringSync © 2017 Created by Jared Johnson</span>
      <div>
        <Icon type="smile-o" style={{ marginTop: '5px', fontSize: '16px' }} />
      </div>
    </div>
  </Footer>
);

export default AppFooter;
