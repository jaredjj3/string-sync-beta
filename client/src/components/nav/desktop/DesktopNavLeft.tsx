import * as React from 'react';
import { Link } from 'react-router-dom';
import { LogoImage, LogoText } from 'components/logo';

const DesktopNavLeft = () => (
  <div className="Nav--desktop__left">
    <Link to="/">
      <LogoImage style={{ width: '24px' }} />
      <LogoText style={{ fontSize: '24px' }} />
    </Link>
  </div>
);

export default DesktopNavLeft;
