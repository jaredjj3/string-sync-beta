import * as React from 'react';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { Icon } from 'antd';
import NotationControlsMenu from './NotationControlsMenu';
import * as classNames from 'classnames';

const enhance = compose(
  withState('collapsed', 'setCollapsed', true),
  withHandlers({
    handleClick: props => event => {
      props.setCollapsed(!props.collapsed);
    }
  }),
  withProps(props => ({
    maskClassNames: classNames(
      'NotationControlsMenuMask',
      {
        'NotationControlsMenuMask--hidden': props.collapsed
      }
    )
  }))
);

const ToggleControls = ({ collapsed, maskClassNames, handleClick }) => (
  <span className="ToggleControls">
    <Icon
      type="setting"
      onClick={handleClick}
    />
    <div className="NotationControlsMenuContainer">
      <div
        onClick={handleClick}
        className={maskClassNames}
      />
      <NotationControlsMenu collapsed={collapsed} />
    </div>
  </span>
);

export default enhance(ToggleControls);
