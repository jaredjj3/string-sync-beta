import React from 'react';
import { connect } from 'react-redux';

import Menu from 'antd/lib/menu';
const { Item } = Menu;
import Icon from 'comp/icon';

interface NavProps {}

interface NavState {
  current: string;
}

enum NavKeys {
  SEARCH = 'SEARCH',
  HOME   = 'HOME',
  LOGIN  = 'LOGIN'
}

class Nav extends React.Component<NavProps, NavState> {
  state: NavState = { current: NavKeys.HOME };

  handleClick = (e: any): void => {
    console.log('click ', e);
    this.setState({ current: e.key });
  }

  render(): JSX.Element {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        style={{ lineHeight: '64px', fontSize: '24px' }}
      >
        <Item key={NavKeys.SEARCH}>
          <Icon type="search" />
        </Item>
        <Item key={NavKeys.HOME}>
          <Icon type="home" />
        </Item>
        <Item key={NavKeys.LOGIN}>
          <Icon type="user" />
        </Item>
      </Menu>
    );
  }
}

export default Nav;
