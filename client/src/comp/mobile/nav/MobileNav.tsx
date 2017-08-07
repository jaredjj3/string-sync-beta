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

  state: NavState = { current: NavKeys.HOME };

  componentWillMount(): void {
    this.maybeSetState({ current: Nav.NAV_KEYS_BY_LOCATION[this.props.location.pathname] });
  }

  componentWillReceiveProps(nextProps: NavProps, nextState: NavState): void {
    this.maybeSetState({ current: Nav.NAV_KEYS_BY_LOCATION[nextProps.location.pathname] });
  }

  render(): JSX.Element {
    const iconStyle = (key: string) => ({
      fontSize: '24px',
      color: key === this.state.current ? '#FC354C' : '#666666'
    });

    return (
      <nav>
        <NavBar
          mode="light"
          iconName="up"
          className="Nav--mobile"
          leftContent={
            <Link
              to="/search"
              className="Nav--mobile__link"
              onClick={this.selectIconFor(NavKeys.SEARCH)}
            >
              <Icon type="search" style={iconStyle(NavKeys.SEARCH)} />
            </Link>
          }
          rightContent={
            <Link
              to="/login"
              className="Nav--mobile__link"
              onClick={this.selectIconFor(NavKeys.SEARCH)}
            >
              <Icon type="user" style={iconStyle(NavKeys.LOGIN)}  />
            </Link>
          }
        >
          <Link
            to="/"
            className="Nav--mobile__link"
            onClick={this.selectIconFor(NavKeys.SEARCH)}
          >
            <Icon type="home" style={iconStyle(NavKeys.HOME)} />
          </Link>
        </NavBar>
      </nav>
    );
  }

  private selectIconFor = (navKey: NavKeys): Function => {
    return (e: React.SyntheticEvent<HTMLAnchorElement>): void => {
      // FIXME: Fix this, nephew
      e.preventDefault();
      this.maybeSetState({ current: navKey });
      browserHistory.push(Nav.NAV_KEYS_BY_LOCATION[navKey]);
    };
  }

  private maybeSetState = (state: NavState): void => {
    const shouldSetState = Object.keys(state).some( key => state[key] !== this.state[key]);

    if (shouldSetState) {
      this.setState(state);
    }
  }
}

export default Nav;
