import * as React from 'react';
import { NavBar } from 'antd-mobile';
import MobileNavLeft from './MobileNavLeft';
import MobileNavRight from './MobileNavRight';
import MobileNavCenter from './MobileNavCenter';

const MobileNav = () => (
  <div className="Nav--mobile">
    <NavBar
      mode="light"
      className="Nav--mobile__navBar"
      leftContent={<MobileNavLeft />}
      rightContent={<MobileNavRight />}
    >
      <MobileNavCenter />
    </NavBar>
  </div>
);

export default MobileNav;
