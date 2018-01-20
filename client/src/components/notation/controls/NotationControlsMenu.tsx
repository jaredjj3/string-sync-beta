import * as React from 'react';
import { compose, withProps } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon, Switch } from 'antd';
import { withSession, withNotation } from 'enhancers';
import styled from 'styled-components';

const { SubMenu, ItemGroup, Item } = Menu;

const enhance = compose (
  withRouter,
  withSession,
  withNotation,
  withProps(props => {
    const { currentUser } = props.session.state;
    const { transcriber } = props.notation.state;

    return ({
      showEditItem: (
        currentUser.roles.includes('admin') ||
        currentUser.id === transcriber.id
      )
    });
  })
);

const NotationControlsMenuOuter = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 20;

  > * {
    max-width: 200px;
    height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 20;
    background: black;
  }

  .ant-menu-inline-collapsed {
    width: 0;
  }

  li.ant-menu-item:first-child {
    margin-top: 15px;
  }

  li.ant-menu-item {
    font-size: 20px;
  }
`;

const NotationControlsMenu = ({ match, showEditItem, collapsed }) => (
  <NotationControlsMenuOuter>
    <Menu
      defaultSelectedKeys={[]}
      defaultOpenKeys={[]}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      onClick={() => null}
    >
      <Item key="print">
        <Link to={`/n/${match.params.id}/print`}>
          <Icon type="printer" />
          <span>print</span>
        </Link>
      </Item>
      {
        showEditItem
          ? <Item>
              <Link to={`/n/${match.params.id}/edit`}>
                <Icon type="edit" />
                <span>edit</span>
              </Link>
            </Item>
          : null
      }
    </Menu>
  </NotationControlsMenuOuter>
);

export default enhance(NotationControlsMenu);
