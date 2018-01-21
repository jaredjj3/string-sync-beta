import * as React from 'react';
import { compose, withProps, withState, withHandlers } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon, Switch } from 'antd';
import { withSession, withNotation } from 'enhancers';
import styled from 'styled-components';

const { SubMenu, ItemGroup, Item } = Menu;

const enhance = compose (
  withRouter,
  withSession,
  withNotation,
  withState('moreNotesChecked', 'setMoreNotesChecked', false),
  withHandlers({
    handleMoreNotesSwitchChange: props => checked => {
      props.setMoreNotesChecked(checked);
      window.ss.maestro.showMoreNotes = checked;
      window.ss.maestro.queueUpdate();
    }
  }),
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

  li.ant-menu-item {
    font-size: 20px;
    font-weight: 100;
  }

  div.ant-menu-item-group-title {
    font-size: 24px;
    font-weight: 100;

    &:first-child {
      margin-top: 20px;
    }
  }
`;
const MoreNotesSwitchContainer = styled.div`
  .ant-switch {
    background: #aaa;

    &.ant-switch-checked {
      background: #fc354c;
    }
  }
`;
const MoreNotesDescription = styled.span`
  margin-left: 10px;
`;

const NotationControlsMenu = ({ match, moreNotesChecked, showEditItem, collapsed, handleMoreNotesSwitchChange }) => (
  <NotationControlsMenuOuter>
    <Menu
      selectable={false}
      defaultSelectedKeys={[]}
      defaultOpenKeys={[]}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      onClick={() => null}
    >
      <ItemGroup title="notation">
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
      </ItemGroup>
      <ItemGroup title="player">
        <Item key="more-notes">
          <MoreNotesSwitchContainer>
            <Switch
              checked={moreNotesChecked}
              onChange={handleMoreNotesSwitchChange}
            />
            <MoreNotesDescription>more notes</MoreNotesDescription>
          </MoreNotesSwitchContainer>
        </Item>
      </ItemGroup>
    </Menu>
  </NotationControlsMenuOuter>
);

export default enhance(NotationControlsMenu);
