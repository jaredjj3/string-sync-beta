import React from 'react';

import MobileAppLayout from './mobile';
import DesktopAppLayout from './desktop';

const AppLayout = ({ location, device, children }): JSX.Element => {
  return (
    device.type === 'MOBILE' ?
      <MobileAppLayout location={location}>{children}</MobileAppLayout> :
      <DesktopAppLayout location={location}>{children}</DesktopAppLayout>
  );
};

export default AppLayout;
