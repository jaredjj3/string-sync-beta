import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Logo from './logo';
import Menu from 'comp/menu';
import Icon from 'comp/icon';
import Row from 'comp/row';
import Col from 'comp/col';

import './_nav.scss';

const { Item, ItemGroup } = Menu;

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
    '/signup' : NavKeys.LOGIN,
    '/search' : NavKeys.SEARCH,
  };

  componentWillMount(): void {
    this.setState({ current: Nav.NAV_KEYS_BY_LOCATION[this.props.location.pathname] });
  }

  componentWillReceiveProps(nextProps: NavProps, nextState: NavState): void {
    this.setState({ current: Nav.NAV_KEYS_BY_LOCATION[nextProps.location.pathname] });
  }

  render(): JSX.Element {
    return (
      <nav className="Nav--desktop">
        <Row type="flex" justify="space-between" align="middle">
          <Col xs={0} sm={0} md={8} lg={8} push={4}>
            <Logo />
          </Col>
          <Col xs={0} sm={0} md={8} lg={8}>
            <Menu
              selectedKeys={[this.state.current]}
              mode="horizontal"
              style={{ fontSize: '18px', borderBottom: '0' }}
            >
              <Item key={NavKeys.SEARCH} style={{ borderBottom: '0' }}>
                <Icon type="search" />
              </Item>
              <Item key={NavKeys.HOME} style={{ borderBottom: '0' }}>
                <Link to="/">
                  <Icon type="home" />
                </Link>
              </Item>
              <Item key={NavKeys.LOGIN} style={{ borderBottom: '0' }}>
                <Icon type="user" />
              </Item>
            </Menu>
          </Col>
        </Row>
      </nav>
    );
  }
}

export default Nav;
