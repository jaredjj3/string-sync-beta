import * as React from 'react';
import { Link } from 'react-router-dom';
import { LogoImage, LogoText } from 'components/logo';

const DesktopNavLeft = () => (
  <div className="Nav--desktop__left">
    <Link to="/">
      <div className="Nav--desktop__left__inner">
        <LogoImage style={{ width: '24px' }} />
        <LogoText style={{ fontSize: '24px', marginLeft: '15px', color: 'black' }} />
      </div>
    </Link>
  </div>
);

export default DesktopNavLeft;
