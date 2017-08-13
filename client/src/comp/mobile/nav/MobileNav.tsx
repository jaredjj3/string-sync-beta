import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import NavBar from 'antd-mobile/lib/nav-bar';
import Row from 'antd/lib/row';
import Drawer from 'antd-mobile/lib/drawer';
import List from 'antd-mobile/lib/list';

import { ClickParam } from 'antd/lib/menu';
import { Location } from 'types/location';
import { isEqual, invert } from 'lodash';

const { Item } = Menu;

interface OnClickFunction {
  (e: React.SyntheticEvent<HTMLElement>): void;
}

interface MobileNavProps {
  location: Location;
  isLoggedIn: boolean;
  logout(): void;
}

interface MobileNavState {
  current: string;
}

enum MobileNavKeys {
  SEARCH = 'SEARCH',
  HOME   = 'HOME',
  LOGIN  = 'LOGIN',
}

class MobileNav extends React.Component<MobileNavProps, MobileNavState> {
  static NAV_KEYS_BY_LOCATION: object = {
    '/'       : MobileNavKeys.HOME,
    '/login'  : MobileNavKeys.LOGIN,
    '/search' : MobileNavKeys.SEARCH,
  };

  componentWillMount(): void {
    this.setState({ current: MobileNav.NAV_KEYS_BY_LOCATION[this.props.location.pathname] });
  }

  componentWillReceiveProps(nextProps: MobileNavProps, nextState: MobileNavState): void {
    this.setState({ current: MobileNav.NAV_KEYS_BY_LOCATION[nextProps.location.pathname] });
  }

  shouldComponentUpdate(nextProps: MobileNavProps, nextState: MobileNavState): boolean {
    return (
      !isEqual(this.state, nextState) ||
      this.props.isLoggedIn !== nextProps.isLoggedIn
    );
  }

  goTo = (navKey: MobileNavKeys): OnClickFunction => {
    return (e: React.SyntheticEvent<any>): void => {
      this.setState({ current: navKey });
      browserHistory.push(invert(MobileNav.NAV_KEYS_BY_LOCATION)[navKey]);
    };
  }

  logout = (e: React.SyntheticEvent<HTMLAllCollection>): void => {
    e.preventDefault();
    e.stopPropagation();
    this.props.logout();
    browserHistory.push('/');
  }

  render(): JSX.Element {
    const { isLoggedIn } = this.props;
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
              onClick={this.goTo(MobileNavKeys.SEARCH)}
              type="search"
              style={iconStyle(MobileNavKeys.SEARCH)}
            />
          }
          rightContent={
            isLoggedIn ?
              <Icon
                type="logout"
                style={iconStyle(MobileNavKeys.LOGIN)}
                className="Nav--mobile__link"
                onClick={this.logout}
              /> :
              <Icon
                className="Nav--mobile__link"
                onClick={this.goTo(MobileNavKeys.LOGIN)}
                type="user"
                style={iconStyle(MobileNavKeys.LOGIN)}
              />
          }
        >
          <Icon
            className="Nav--mobile__link"
            onClick={this.goTo(MobileNavKeys.HOME)}
            type="home"
            style={iconStyle(MobileNavKeys.HOME)}
          />
        </NavBar>
      </nav>
    );
  }
}

import { logout } from 'data/session/actions';

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.session.currentUser.id)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileNav);
