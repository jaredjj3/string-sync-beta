import * as React from 'react';
import { compose, withProps, withState, withHandlers, lifecycle } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon, Switch } from 'antd';
import { Switch as MobileSwitch } from 'antd-mobile';
import { withSession, withNotation, withViewport } from 'enhancers';
import { Playback } from './';
import styled from 'styled-components';

const { SubMenu, ItemGroup, Item } = Menu;

const enhance = compose (
  withRouter,
  withSession,
  withNotation,
  withViewport,
  withState('moreNotesChecked', 'setMoreNotesChecked', false),
  withState('showLoopChecked', 'setShowLoopChecked', false),
  withState('fretboardChecked', 'setFretboardChecked', true),
  withState('pianoChecked', 'setPianoChecked', false),
  withHandlers({
    handleMoreNotesToggle: props => event => {
      // Allow the user to click the switch directly or
      // the menu item container
      if (event.hasOwnProperty('stopPropagation')) {
        event.stopPropagation();
      }

      const checked = !props.moreNotesChecked;
      props.setMoreNotesChecked(checked);
      window.ss.maestro.options.showMoreNotes = checked;
      window.ss.maestro.queueUpdate();
    },
    handleShowLoopToggle: props => event => {
      if (event.hasOwnProperty('stopPropagation')) {
        event.stopPropagation();
      }

      const checked = !props.showLoopChecked;
      props.setShowLoopChecked(checked);
      window.ss.maestro.options.showLoop = checked;
      window.ss.maestro.queueUpdate();
    },
    handleFretboardToggle: props => event => {
      if (event.hasOwnProperty('stopPropagation')) {
        event.stopPropagation();
      }

      const checked = !props.fretboardChecked;
      props.setFretboardChecked(checked);
      window.ss.maestro.fretboardProps.setVisibility(checked);
    },
    handlePianoToggle: props => event => {
      if (event.hasOwnProperty('stopPropagation')) {
        event.stopPropagation();
      }

      const checked = !props.pianoChecked;
      props.setPianoChecked(checked);
      window.ss.maestro.pianoProps.setVisibility(checked);
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
      maestro.options.showMoreNotes = false;
      maestro.options.showLoop = false;

      this.props.setFretboardChecked(Boolean(window.ss.maestro.fretboardProps.isVisible));
      this.props.setPianoChecked(Boolean(window.ss.maestro.pianoProps.isVisible));
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
  fretboardChecked,
  pianoChecked,
  showEditItem,
  collapsed,
  isMobile,
  handleMoreNotesToggle,
  handleShowLoopToggle,
  handleFretboardToggle,
  handlePianoToggle
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
      <ItemGroup title="visuals">
        <Item key="fretboard">
          <SwitchContainer onClick={handleFretboardToggle}>
            <Switch checked={fretboardChecked} onChange={handleFretboardToggle} />
            <SwitchDesc>fretboard</SwitchDesc>
          </SwitchContainer>
        </Item>
        <Item key="piano">
          <SwitchContainer onClick={handlePianoToggle}>
            <Switch checked={pianoChecked} onChange={handlePianoToggle} />
            <SwitchDesc>piano</SwitchDesc>
          </SwitchContainer>
        </Item>
      </ItemGroup>
      <ItemGroup title="player">
        <Item key="more-notes">
          <SwitchContainer onClick={handleMoreNotesToggle}>
            <Switch checked={moreNotesChecked} onChange={handleMoreNotesToggle} />
            <SwitchDesc>more notes</SwitchDesc>
          </SwitchContainer>
        </Item>
        <Item key="show-loop">
          <SwitchContainer onClick={handleShowLoopToggle}>
            <Switch checked={showLoopChecked} onChange={handleShowLoopToggle} />
            <SwitchDesc>show loop</SwitchDesc>
          </SwitchContainer>
        </Item>
        <Item>
          <Playback />
        </Item>
      </ItemGroup>
    </Menu>
  </NotationControlsMenuOuter>
);

export default enhance(NotationControlsMenu);
