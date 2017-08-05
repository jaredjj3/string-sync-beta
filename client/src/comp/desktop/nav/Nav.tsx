import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

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
                <Icon type="search" onClick={(e: React.SyntheticEvent<any>) => this.goTo('/search')}/>
              </Item>
              <Item key={NavKeys.HOME} style={{ borderBottom: '0' }}>
                <Icon type="home" onClick={(e: React.SyntheticEvent<any>) => this.goTo('/')}/>
              </Item>
              <Item key={NavKeys.LOGIN} style={{ borderBottom: '0' }}>
                <Icon type="user" onClick={(e: React.SyntheticEvent<any>) => this.goTo('/login')}/>
              </Item>
            </Menu>
          </Col>
        </Row>
      </nav>
    );
  }

  private goTo(location: string): void {
    browserHistory.push(location);
  }
}

export default Nav;
