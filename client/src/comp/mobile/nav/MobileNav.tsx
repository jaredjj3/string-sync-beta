import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import NavBar from 'antd-mobile/lib/nav-bar';

import { ClickParam } from 'antd/lib/menu';
import { Location } from 'types/location';

import './_mobileNav.less';

import invert from 'util/invert';

const { Item } = Menu;

interface NavProps {
  location: Location;
}

interface NavState {
  current: string;
}

enum NavKeys {
  SEARCH = 'SEARCH',
  HOME   = 'HOME',
  LOGIN  = 'LOGIN'
}

class Nav extends React.Component<NavProps, NavState> {
  static NAV_KEYS_BY_LOCATION: object = {
    '/'       : NavKeys.HOME,
    '/login'  : NavKeys.LOGIN,
    '/search' : NavKeys.SEARCH,
  };

  componentWillMount(): void {
    this.setState({ current: Nav.NAV_KEYS_BY_LOCATION[this.props.location.pathname] });
  }

  componentWillReceiveProps(nextProps: NavProps, nextState: NavState): void {
    this.setState({ current: Nav.NAV_KEYS_BY_LOCATION[nextProps.location.pathname] });
  }

  render(): JSX.Element {
    const iconStyle = { fontSize: '0.5rem' };

    return (
      <nav>
        <NavBar
          mode="light"
          iconName="null"
          leftContent={
            <Link to="/search">
              <Icon type="search" style={iconStyle} />
            </Link>
          }
          rightContent={
            <Link to="/login">
              <Icon type="user" style={iconStyle}  />
            </Link>
          }
        >
          <Link to="/">
            <Icon type="home" style={iconStyle} />
          </Link>
        </NavBar>
      </nav>
    );
  }
}

export default Nav;
