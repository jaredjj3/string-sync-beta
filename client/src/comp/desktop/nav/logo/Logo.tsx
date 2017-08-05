import React from 'react';
import { Link } from 'react-router';
import Icon from 'comp/icon';

import './_logo.less';

const Logo = (): JSX.Element => (
  <Link to="/" className="Logo">
    <span className="Logo__icon">
      <Icon type="aliwangwang" />
    </span>
    <span className="Logo__name">
      STRING SYNC
    </span>
  </Link>
);

export default Logo;
