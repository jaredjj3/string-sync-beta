import * as React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Icon } from 'antd';
import NotationControlsMenu from './NotationControlsMenu';
import * as classNames from 'classnames';
import styled from 'styled-components';

const enhance = compose(
  withState('collapsed', 'setCollapsed', true),
  withHandlers({
    handleClick: props => event => {
      props.setCollapsed(!props.collapsed);
    }
  })
);

const NotationControlsMenuOuter = (styled.div as any)`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 20;

  .ant-menu-inline-collapsed {
    width: 0;
  }

  .NotationControlsMenuMask {
    background: black;
    opacity: ${props => props.collapsed ? 0 : 0.65};
    width: 100vw;
    height: 100vh;
    z-index: ${props => props.collapsed ? -1 : 19};;
    display: ${props => props.collapsed ? 'none' : 'block'};
    transition: opacity 200ms ease-in;
  }
`;
const NotationControlsMenuMask = (styled.div as any)``;

const ToggleControls = ({ collapsed, handleClick }) => (
  <span className="ToggleControls">
    <Icon
      type="setting"
      onClick={handleClick}
      className="ToggleControls__menuIcon"
    />
    <NotationControlsMenuOuter collapsed={collapsed}>
      <NotationControlsMenuMask
        className="NotationControlsMenuMask"
        onClick={handleClick}
      />
      <NotationControlsMenu collapsed={collapsed} />
    </NotationControlsMenuOuter>
  </span>
);

export default enhance(ToggleControls);
