import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import { Icon, Layout } from 'antd';
import { identity } from 'enhancers';

const { Footer } = Layout;

const AppFooter = () => (
  <Footer>
    <div className="App__footer">
      <span>StringSync © 2017 Created by Jared Johnson</span>
      <div className="App__footer__smile">
        <Icon type="smile-o" style={{ marginTop: '5px', fontSize: '16px' }} />
      </div>
    </div>
  </Footer>
);

export default AppFooter;
