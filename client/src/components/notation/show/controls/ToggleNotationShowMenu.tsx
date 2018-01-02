import * as React from 'react';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { Icon } from 'antd';
import NotationShowMenu from './NotationShowMenu';
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
      'NotationShowMenuMask',
      {
        'NotationShowMenuMask--hidden': props.collapsed
      }
    )
  }))
);

const ToggleNotationShowMenu = ({ collapsed, maskClassNames, handleClick }) => (
  <span className="ToggleNotationShowMenu">
    <Icon
      type="setting"
      onClick={handleClick}
    />
    <div className="NotationShowMenuContainer">
      <div
        onClick={handleClick}
        className={maskClassNames}
      />
      <NotationShowMenu collapsed={collapsed} />
    </div>
  </span>
);

export default enhance(ToggleNotationShowMenu);
