import * as React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Icon } from 'antd';
import styled from 'styled-components';
import { NotationControlsMenu } from './';

const enhance = compose(
  withState('collapsed', 'setCollapsed', true),
  withHandlers({
    handleClick: props => event => {
      props.setCollapsed(!props.collapsed);
    }
  })
);

const ToggleControlsOuter = styled.span`
`;


const ToggleControls = ({ collapsed, handleClick }) => (
  <ToggleControlsOuter className="ToggleControls">
    <Icon
      type="setting"
      onClick={handleClick}
      className="ToggleControls__menuIcon"
    />
    <NotationControlsMenu
      collapsed={collapsed}
      onMaskClick={handleClick}
    />
  </ToggleControlsOuter>
);

export default enhance(ToggleControls);
