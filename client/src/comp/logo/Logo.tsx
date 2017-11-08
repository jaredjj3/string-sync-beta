import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'antd/lib/icon';

import './_logo.less';

const Logo = ({ showLogo }): JSX.Element => (
  <Link to="/" className="Logo">
    <span className={`Logo__icon ${showLogo ? 'Logo__icon--bar' : 'Logo__icon--hide'}`}>
      ♩
    </span>
    <span className="Logo__name">
      STRING SYNC
    </span>
  </Link>
);

export default Logo;
