import React from 'react';

import DesktopNav from 'comp/desktop/nav';
import MobileNav from 'comp/mobile/nav';

import { Device } from 'types/device';

const Nav = ({ device, params }): JSX.Element => (
  device.type === 'MOBILE' ? <MobileNav params={params} /> : <DesktopNav params={params} />
);

export default Nav;
