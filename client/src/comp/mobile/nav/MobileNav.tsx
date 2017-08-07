import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import NavBar from 'antd-mobile/lib/nav-bar';
import Row from 'antd/lib/row';

import { ClickParam } from 'antd/lib/menu';
import { Location } from 'types/location';
import { isEqual, invert } from 'lodash';

const { Item } = Menu;

interface OnClickFunction {
  (e: React.SyntheticEvent<HTMLElement>): void;
}

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
    this.setState({ current: Nav.NAV_KEYS_BY_LOCATION[this.props.location.pathname] });
  }

  componentWillReceiveProps(nextProps: NavProps, nextState: NavState): void {
    this.setState({ current: Nav.NAV_KEYS_BY_LOCATION[nextProps.location.pathname] });
  }

  shouldComponentUpdate(nextProps: NavProps, nextState: NavState): boolean {
    return !isEqual(this.state, nextState);
  }

  goTo = (navKey: NavKeys): OnClickFunction => {
    return (e: React.SyntheticEvent<any>): void => {
      this.setState({ current: navKey }, () => {
        // Change the location after the component has rerendered due to setState for a
        // more responsive feel (as opposed to rendering the component after the location)
        // has changed.
        browserHistory.push(invert(Nav.NAV_KEYS_BY_LOCATION)[navKey]);
      });
    };
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
            <Icon
              className="Nav--mobile__link"
              onClick={this.goTo(NavKeys.SEARCH)}
              type="search"
              style={iconStyle(NavKeys.SEARCH)}
            />
          }
          rightContent={
            <Icon
              className="Nav--mobile__link"
              onClick={this.goTo(NavKeys.LOGIN)}
              type="user"
              style={iconStyle(NavKeys.LOGIN)}
            />
          }
        >
          <Icon
            className="Nav--mobile__link"
            onClick={this.goTo(NavKeys.HOME)}
            type="home"
            style={iconStyle(NavKeys.HOME)}
          />
        </NavBar>
      </nav>
    );
  }
}

export default Nav;
