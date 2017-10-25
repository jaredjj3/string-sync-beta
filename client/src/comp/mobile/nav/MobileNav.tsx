import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import NavBar from 'antd-mobile/lib/nav-bar';
import Row from 'antd/lib/row';
import Drawer from 'antd-mobile/lib/drawer';
import List from 'antd-mobile/lib/list';
import LogoutModal from './logout';

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
  isVisible: boolean;
  history: any;
  logout(): void;
}

interface MobileNavState {
  current: string;
}

enum MobileNavKeys {
  SEARCH = 'SEARCH',
  HOME   = 'HOME',
  LOGIN  = 'LOGIN',
  SIGNUP = 'SIGNUP'
}

class MobileNav extends React.Component<MobileNavProps, MobileNavState> {
  static NAV_KEYS_BY_LOCATION: object = {
    '/library' : MobileNavKeys.HOME,
    '/login'   : MobileNavKeys.LOGIN,
    '/search'  : MobileNavKeys.SEARCH,
    '/signup'  : MobileNavKeys.SIGNUP
  };

  state: MobileNavState = { current: null };

  componentWillMount(): void {
    this.setState({ current: MobileNav.NAV_KEYS_BY_LOCATION[this.props.location.pathname] });
  }

  componentWillReceiveProps(nextProps: MobileNavProps, nextState: MobileNavState): void {
    this.setState({ current: MobileNav.NAV_KEYS_BY_LOCATION[nextProps.location.pathname] || null });
  }

  goTo = (navKey: MobileNavKeys): OnClickFunction => {
    return (e: React.SyntheticEvent<any>): void => {
      this.setState({ current: navKey });
      this.props.history.push(invert(MobileNav.NAV_KEYS_BY_LOCATION)[navKey]);
    };
  }

  logout = (e: React.SyntheticEvent<HTMLAllCollection>): void => {
    e.preventDefault();
    e.stopPropagation();
    this.props.logout();
    this.props.history.push('/library');
  }

  render(): JSX.Element {
    const { isLoggedIn, isVisible } = this.props;
    const iconStyle = (keys: Array<string>) => ({
      fontSize: '24px',
      color: keys.some(key => key === this.state.current) ? '#FC354C' : '#666666'
    });

    if (!isVisible) {
      return null;
    } else {
      return (
        <nav className="Nav--mobileContainer">
          <NavBar
            mode="light"
            iconName="up"
            className="Nav--mobile"
            leftContent={
              <Icon
                className="Nav--mobile__link"
                onClick={this.goTo(MobileNavKeys.SEARCH)}
                type="search"
                style={iconStyle([MobileNavKeys.SEARCH])}
              />
            }
            rightContent={
              isLoggedIn ?
                <LogoutModal logout={this.logout} /> :
                <Icon
                  className="Nav--mobile__link"
                  onClick={this.goTo(MobileNavKeys.LOGIN)}
                  type="user"
                  style={iconStyle([MobileNavKeys.LOGIN, MobileNavKeys.SIGNUP])}
                />
            }
          >
            <Icon
              className="Nav--mobile__link"
              onClick={this.goTo(MobileNavKeys.HOME)}
              type="book"
              style={iconStyle([MobileNavKeys.HOME])}
            />
          </NavBar>
        </nav>
      );
    }
  }
}

import { logout } from 'data/session/actions';

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.session.currentUser.id),
  isVisible: state.feature.navbar
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(MobileNav);
