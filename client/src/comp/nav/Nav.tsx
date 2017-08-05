import React from 'react';

import DesktopNav from 'comp/desktop/nav';
import MobileNav from 'comp/mobile/nav';

const Nav = ({ device, location }): JSX.Element => (
  device.type === 'MOBILE' ? <MobileNav location={location} /> : <DesktopNav location={location} />
);

export default Nav;
