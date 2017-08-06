import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import Row from 'comp/row';
import Col from 'comp/col';
import Menu from 'comp/menu';
import Icon from 'comp/icon';

import { ClickParam } from 'antd/lib/menu';
import { Location } from 'types/location';

import './_nav.less';

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
    const itemStyle = { textAlign: 'center', borderWidth: '5px' };

    return (
      <nav className="Nav--mobile">
        <Row type="flex" justify="space-between" align="middle">
          <Col xs={24} sm={24} md={0} lg={0}>
            <Menu
              selectedKeys={[this.state.current]}
              mode="horizontal"
              style={{ borderBottom: '0', background: 'none' }}
              onClick={this.goTo}
              className="Nav--mobile__menu"
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
