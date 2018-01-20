import * as React from 'react';
import { Link } from 'react-router-dom';
import { LogoImage, LogoText } from 'components';
import styled from 'styled-components'

const DesktopNavLeftOuter = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const DesktopNavLeftInner = styled.div`
  display: flex;
  align-items: center;
`;

const DesktopNavLeft = () => (
  <DesktopNavLeftOuter className="Nav--desktop__left">
    <Link to="/">
      <DesktopNavLeftInner>
        <LogoImage style={{ width: '24px' }} />
        <LogoText style={{ fontSize: '24px', marginLeft: '15px', color: 'black' }} />
      </DesktopNavLeftInner>
    </Link>
  </DesktopNavLeftOuter>
);

export default DesktopNavLeft;
