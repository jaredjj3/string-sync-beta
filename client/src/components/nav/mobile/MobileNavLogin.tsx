import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

const MobileNavLogin = () => (
  <div className="Nav--mobile__login">
    <Link to="/login">
      <Icon
        className="Nav--mobile__icon"
        type="user"
      />
    </Link>
  </div>
);

export default MobileNavLogin;
