import * as React from 'react';
import { NavBar } from 'antd-mobile';
import { MobileNavLeft, MobileNavRight, MobileNavCenter } from './';
import styled from 'styled-components';

const NavOuter = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 10;
  background: white;
  width: 100%;
  border-top: 1px solid lightgray;

  i {
    font-size: 24px;
    padding: 5px;
  }

  i:active {
    text-shadow: 0 0 10px #fc354c;
  }
`;

const MobileNav = () => (
  <NavOuter className="Nav--mobile">
    <NavBar
      mode="light"
      className="Nav--mobile__navBar"
      leftContent={<MobileNavLeft />}
      rightContent={<MobileNavRight />}
    >
      <MobileNavCenter />
    </NavBar>
  </NavOuter>
);

export default MobileNav;
