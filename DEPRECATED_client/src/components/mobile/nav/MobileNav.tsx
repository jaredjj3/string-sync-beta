import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Col, Icon, Menu, Row } from 'antd';
import NavBar from 'antd-mobile/lib/nav-bar';
import LogoutModal from './logout';
import { Location } from 'types/location';
import { Session } from 'types';
import { isEqual, invert } from 'lodash';
import { withSession } from 'enhancers';
import { ColorBlock } from 'components';
import { ignoreIfExecuting } from 'stringSyncUtil';

const { Item } = Menu;

interface MobileNavProps {
  location: Location;
  isLoggedIn: boolean;
  isVisible: boolean;
  history: any;
  session: Session;
  logout(): void;
}

interface MobileNavState {}

class MobileNav extends React.Component<MobileNavProps, MobileNavState> {

  logout: any = ignoreIfExecuting((e: React.SyntheticEvent<HTMLAllCollection>): void => {
    e.preventDefault();
    e.stopPropagation();

    if (this.props.session.isLoggedIn) {
      this.props.logout();
      this.props.history.push('/library');
    }
  });

  iconStyle = (keys: Array<string>) => {
    return ({
      fontSize: '24px',
      color: keys.some(key => key === this.props.location.pathname) ? '#FC354C' : '#666666'
    });
  }

  render(): JSX.Element {
    const { isLoggedIn, isVisible } = this.props;

    if (!isVisible) {
      return null;
    } else {
      return (
        <nav className="Nav--mobileContainer">
          <NavBar
            mode="light"
            className="Nav--mobile"
            leftContent={
              <Link to="/search">
                <Icon
                  className="Nav--mobile__link"
                  type="search"
                  style={this.iconStyle(['/search'])}
                />
              </Link>
            }
            rightContent={
              isLoggedIn ?
                <LogoutModal logout={this.logout} /> :
                <Link to="/login">
                  <Icon
                    className="Nav--mobile__link"
                    type="user"
                    style={this.iconStyle(['/login', '/signup'])}
                  />
                </Link>
            }
          >
            <Link to="/library">
              <Icon
                className="Nav--mobile__link"
                type="book"
                style={this.iconStyle(['/library'])}
              />
            </Link>
          </NavBar>
          <ColorBlock color="white" />
        </nav>
      );
    }
  }
}

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.session.currentUser.id),
  isVisible: state.features.navbar && state.viewport.type === 'MOBILE'
});

const mapDispatchToProps = dispatch => ({

});

export default compose(
  withRouter,
  withSession,
  connect(mapStateToProps, mapDispatchToProps)
)(MobileNav);
