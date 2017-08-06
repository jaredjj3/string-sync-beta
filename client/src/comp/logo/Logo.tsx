import React from 'react';
import { Link } from 'react-router';
import Icon from 'antd/lib/icon';

import './_logo.less';

const Logo = ({ showBar }): JSX.Element => (
  <Link to="/" className="Logo">
    <span className={`Logo__icon ${showBar ? 'Logo__icon--bar' : ''}`}>
      <Icon type="aliwangwang" />
    </span>
    <span className="Logo__name">
      STRING SYNC
    </span>
  </Link>
);

export default Logo;
