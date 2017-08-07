import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Logo from 'comp/logo';
import Menu from 'antd/lib/menu';
import Row from 'antd/lib/row';

import { ClickParam } from 'antd/lib/menu';
import { Location } from 'types/location';
import { invert } from 'lodash';

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

  goTo = (params: ClickParam): void => {
    const location = invert(Nav.NAV_KEYS_BY_LOCATION)[params.key];
    browserHistory.push(location);
  }

  render(): JSX.Element {
    const itemStyle = { paddingTop: '8px', paddingBottom: '6px' };

    return (
      <nav className="Nav--desktop">
        <Row type="flex" justify="space-between" align="middle">
          <Col xs={0} sm={0} md={8} lg={8}>
            <Logo showBar={true} />
          </Col>
          <Col xs={0} sm={0} md={6} lg={6} push={1}>
            <Menu
              selectedKeys={[this.state.current]}
              mode="horizontal"
              style={{ fontSize: '18px', borderBottom: '0', background: 'none' }}
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
}

export default Nav;
