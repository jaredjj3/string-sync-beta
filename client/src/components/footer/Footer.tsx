import * as React from 'react';

import { Icon } from 'antd';

const Footer = () => (
  <div className="Footer">
    <span>StringSync © 2017 Created by Jared Johnson</span>
    <div className="Footer__iconContainer">
      <Icon type="smile-o" style={{ marginTop: '5px', fontSize: '16px' }} />
    </div>
  </div>
);

export default Footer;
