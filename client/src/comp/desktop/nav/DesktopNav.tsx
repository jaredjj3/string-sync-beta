import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import Logo from './logo';
import Menu from 'comp/menu';
import Icon from 'comp/icon';
import Row from 'comp/row';
import Col from 'comp/col';

import { ClickParam } from 'antd/lib/menu';

import './_nav.less';

import invert from 'util/invert';

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
    '/search' : NavKeys.SEARCH,
  };

  componentWillMount(): void {
    this.setState({ current: Nav.NAV_KEYS_BY_LOCATION[this.props.location.pathname] });
  }

  componentWillReceiveProps(nextProps: NavProps, nextState: NavState): void {
    this.setState({ current: Nav.NAV_KEYS_BY_LOCATION[nextProps.location.pathname] });
  }

  render(): JSX.Element {
    const itemStyle = { paddingTop: '8px', paddingBottom: '6px' };

    return (
      <nav className="Nav--desktop">
        <Row type="flex" justify="space-between" align="middle">
          <Col xs={0} sm={0} md={8} lg={8}>
            <Logo />
          </Col>
          <Col xs={0} sm={0} md={6} lg={6} push={1}>
            <Menu
              selectedKeys={[this.state.current]}
              mode="horizontal"
              style={{ fontSize: '18px', borderBottom: '0' }}
              onClick={this.goTo}
            >
              <Item key={NavKeys.SEARCH} style={itemStyle}>
                <Icon type="search" />
              </Item>
              <Item key={NavKeys.HOME} style={itemStyle}>
                <Icon type="home" />
              </Item>
              <Item key={NavKeys.LOGIN} style={itemStyle}>
                <Icon type="user" />
              </Item>
            </Menu>
          </Col>
        </Row>
      </nav>
    );
  }

  private goTo = (params: ClickParam): void => {
    const location = invert(Nav.NAV_KEYS_BY_LOCATION)[params.key];
    browserHistory.push(location);
  }
}

export default Nav;
