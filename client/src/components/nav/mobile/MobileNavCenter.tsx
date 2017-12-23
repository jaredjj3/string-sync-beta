import * as React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

const MobileNavCenter = () => (
  <div className="Nav--mobile--left">
    <Link to="/library">
      <Icon
        className="Nav--mobile--icon"
        type="book"
      />
    </Link>
  </div>
);

export default MobileNavCenter;
