import React from 'react';
import { connect } from 'react-redux';

import Logo from './logo';
import Menu from 'antd/lib/menu';
import Icon from 'comp/icon';
import Row from 'comp/row';
import Col from 'comp/col';

import './_nav.scss';

const { Item, ItemGroup } = Menu;

interface NavProps {
  params: any;
}

interface NavState {
  current: string;
}

enum NavKeys {
  LOGO   = 'LOGO',
  SEARCH = 'SEARCH',
  HOME   = 'HOME',
  LOGIN  = 'LOGIN'
}

class Nav extends React.Component<NavProps, NavState> {
  state: NavState = { current: NavKeys.HOME };

  handleClick = (e: any): void => {
    this.setState({ current: e.key });
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
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              style={{ fontSize: '18px', borderBottom: '0' }}
            >
              <Item key={NavKeys.SEARCH} style={{ borderBottom: '0' }}>
                <Icon type="search" />
              </Item>
              <Item key={NavKeys.HOME} style={{ borderBottom: '0' }}>
                <Icon type="home" />
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
