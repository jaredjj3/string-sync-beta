import * as React from 'react';
import * as classNames from 'classnames';
import { Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { compose, withProps } from 'recompose';

const enhance = compose(
  withRouter,
  withProps(props => ({
    iconClassNames: classNames(
      'Nav--mobile__icon',
      {
        'Nav--mobile__icon--active': props.location.pathname === '/library'
      }
    )
  }))
);

const MobileNavCenter = ({ iconClassNames }) => (
  <div className="Nav--mobile--left">
    <Link to="/library">
      <Icon
        className={iconClassNames}
        type="book"
      />
    </Link>
  </div>
);

export default enhance(MobileNavCenter);
