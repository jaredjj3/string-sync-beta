import * as React from 'react';
import { NavBar } from 'antd-mobile';
import { MobileNavLeft, MobileNavRight, MobileNavCenter } from './';

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
