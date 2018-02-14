import * as React from 'react';
import { compose, withProps, withState, withHandlers, lifecycle } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon, Checkbox } from 'antd';
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
      const checked = !props.moreNotesChecked;
      props.setMoreNotesChecked(checked);
      window.ss.maestro.options.showMoreNotes = checked;
      window.ss.maestro.queueUpdate();
    },
    handleShowLoopToggle: props => event => {
      const checked = !props.showLoopChecked;
      props.setShowLoopChecked(checked);
      window.ss.maestro.options.showLoop = checked;
      window.ss.maestro.queueUpdate();
    },
    handleFretboardToggle: props => event => {
      const checked = !props.fretboardChecked;
      props.setFretboardChecked(checked);
      window.ss.maestro.fretboardProps.setVisibility(checked);
    },
    handlePianoToggle: props => event => {
      const checked = !props.pianoChecked;
      props.setPianoChecked(checked);
      window.ss.maestro.pianoProps.setVisibility(checked);
    }
  }),
  withProps(props => ({
    handlers: {
      moreNotes: props.handleMoreNotesToggle,
      showLoop: props.handleShowLoopToggle,
      fretboard: props.handleFretboardToggle,
      piano: props.handlePianoToggle
    }
  })),
  withHandlers({
    handleMenuItemClick: props => event => {
      const handler = props.handlers[event.key];
      
      if (typeof handler === 'function') {
        handler(event);
      }
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
  z-index: 30;

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
const CheckOuter = styled.div`
`;
const CheckDescription = styled.span`
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
  handleMenuItemClick
}) => (
  <NotationControlsMenuOuter>
    <Menu
      selectable={false}
      defaultSelectedKeys={[]}
      defaultOpenKeys={[]}
      mode="inline"
      theme="dark"
      onClick={handleMenuItemClick}
      inlineCollapsed={collapsed}
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
          <CheckOuter>
            <Checkbox checked={fretboardChecked} />
            <CheckDescription>fretboard</CheckDescription>
          </CheckOuter>
        </Item>
        <Item key="piano">
          <CheckOuter>
            <Checkbox checked={pianoChecked} />
            <CheckDescription>piano</CheckDescription>
          </CheckOuter>
        </Item>
      </ItemGroup>
      <ItemGroup title="player">
        <Item key="moreNotes">
          <CheckOuter>
            <Checkbox checked={moreNotesChecked} />
            <CheckDescription>more notes</CheckDescription>
          </CheckOuter>
        </Item>
        <Item key="showLoop">
          <CheckOuter>
            <Checkbox checked={showLoopChecked} />
            <CheckDescription>show loop</CheckDescription>
          </CheckOuter>
        </Item>
        <Item>
          <Playback />
        </Item>
      </ItemGroup>
    </Menu>
  </NotationControlsMenuOuter>
);

export default enhance(NotationControlsMenu);
