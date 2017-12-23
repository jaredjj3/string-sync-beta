import * as React from 'react';
import { compose, withProps, withHandlers } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import classNames from 'classnames';

const enhance = compose(
  withRouter,
  withHandlers({
    handleClick: props => event => {
      props.history.goBack();
    }
  })
);

const MobileNavLeft = ({ handleClick }) => (
  <div
    className="Nav--mobile--left"
    onClick={handleClick}
  >
    <Icon
      className="Nav--mobile__icon"
      type="left"
    />
  </div>
);

export default enhance(MobileNavLeft);
