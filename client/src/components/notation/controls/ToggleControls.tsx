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

const ToggleControlsOuter = styled.span`
`;


const ToggleControls = ({ collapsed, handleClick }) => (
  <ToggleControlsOuter className="ToggleControls">
    <Icon
      type="setting"
      onClick={handleClick}
      className="ToggleControls__menuIcon"
    />
  </ToggleControlsOuter>
);

export default enhance(ToggleControls);
