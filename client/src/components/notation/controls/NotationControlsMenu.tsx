import * as React from 'react';
import { compose, withProps, withState, withHandlers, lifecycle } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon, Switch } from 'antd';
import { Switch as MobileSwitch } from 'antd-mobile';
import { withSession, withNotation, withViewport, withVideo } from 'enhancers';
import styled from 'styled-components';

const { SubMenu, ItemGroup, Item } = Menu;

const enhance = compose (
  withRouter,
  withSession,
  withNotation,
  withViewport,
  withVideo,
  withState('moreNotesChecked', 'setMoreNotesChecked', false),
  withState('showLoopChecked', 'setShowLoopChecked', false),
  withHandlers({
    handleMoreNotesToggle: props => event => {
      // Allow the user to click the switch directly or
      // the menu item container
      if (event.hasOwnProperty('stopPropagation')) {
        event.stopPropagation();
      }

      const checked = !props.moreNotesChecked;
      props.setMoreNotesChecked(checked);
      window.ss.maestro.showMoreNotes = checked;
      window.ss.maestro.queueUpdate();
    },
    handleShowLoopToggle: props => event => {
      if (event.hasOwnProperty('stopPropagation')) {
        event.stopPropagation();
      }

      const checked = !props.showLoopChecked;
      props.setShowLoopChecked(checked);
      window.ss.maestro.showLoop = checked;
      window.ss.maestro.queueUpdate();
    }
  }),
  withProps(props => ({
    isMobile: props.viewport.state.type === 'MOBILE'
  })),
  withProps(props => {
    const { currentUser } = props.session.state;
    const { transcriber } = props.notation.state;

    return {
      showEditItem: (
        currentUser.roles.includes('admin') ||
        currentUser.id === transcriber.id
      )
    };
  }),
  lifecycle({
    componentDidMount(): void {
      const { maestro } = window.ss;
      maestro.showMoreNotes = false;
      maestro.showLoop = false;
    }
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
const SwitchContainer = styled.div`
  .ant-switch {
    background: #aaa;

    &.ant-switch-checked {
      background: #fc354c;
    }
  }
`;
const SwitchDesc = styled.span`
  margin-left: 10px;
`;

const NotationControlsMenu = ({
  match,
  moreNotesChecked,
  showLoopChecked,
  showEditItem,
  collapsed,
  isMobile,
  handleMoreNotesToggle,
  handleShowLoopToggle
}) => (
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
          <SwitchContainer onClick={handleMoreNotesToggle}>
            {
              isMobile
                ? <MobileSwitch
                    checked={moreNotesChecked}
                    onChange={handleMoreNotesToggle}
                    color="#fc354c"
                  />
                : <Switch checked={moreNotesChecked} onChange={handleMoreNotesToggle} />
            }
            <SwitchDesc>more notes</SwitchDesc>
          </SwitchContainer>
        </Item>
        <Item key="show-loop">
          <SwitchContainer onClick={handleShowLoopToggle}>
            {
              isMobile
                ? <MobileSwitch
                    checked={showLoopChecked}
                    onChange={handleShowLoopToggle}
                    color="#fc354c"
                  />
                : <Switch checked={showLoopChecked} onChange={handleShowLoopToggle} />
            }
            <SwitchDesc>show loop</SwitchDesc>
          </SwitchContainer>
        </Item>
        <Item>
          playback rate
        </Item>
      </ItemGroup>
    </Menu>
  </NotationControlsMenuOuter>
);

export default enhance(NotationControlsMenu);
