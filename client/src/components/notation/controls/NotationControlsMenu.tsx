import * as React from 'react';
import { compose, withProps, withState, withHandlers, lifecycle } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon, Checkbox, Radio } from 'antd';
import { Switch as MobileSwitch } from 'antd-mobile';
import { withSession, withNotation, withViewport } from 'enhancers';
import { Playback } from './';
import styled from 'styled-components';
import * as classNames from 'classnames';
import { get } from 'lodash';

const { SubMenu, ItemGroup, Item } = Menu;
const RadioGroup = Radio.Group;

const enhance = compose (
  withRouter,
  withSession,
  withNotation,
  withViewport,
  withState('moreNotesChecked', 'setMoreNotesChecked', false),
  withState('showLoopChecked', 'setShowLoopChecked', false),
  withState('fretboardChecked', 'setFretboardChecked', true),
  withState('pianoChecked', 'setPianoChecked', false),
  withState('fretboardStyle', 'setFretboardStyle', null),
  withHandlers({
    handleMoreNotesToggle: props => event => {
      const checked = !props.moreNotesChecked;
      props.setMoreNotesChecked(checked);
      window.ss.maestro.enqueue(maestro => {
        maestro.options.showMoreNotes = checked;
      });
    },
    handleShowLoopToggle: props => event => {
      const checked = !props.showLoopChecked;
      props.setShowLoopChecked(checked);
      window.ss.maestro.enqueue(maestro => {
        maestro.options.showLoop = checked
      });
    },
    handleFretboardToggle: props => event => {
      const checked = !props.fretboardChecked;
      props.setFretboardChecked(checked);

      const { fretboard, notationShow, notationEdit } = window.ss.globalProps;
      if (fretboard) {
        const updateAffix = get(notationShow, 'updateAffix') || get(notationEdit, 'updateAffix');
        if (updateAffix) {
          updateAffix(() => fretboard.setVisibility(checked));
        } else {
          fretboard.setVisibility(checked);
        }
      }
    },
    handlePianoToggle: props => event => {
      const checked = !props.pianoChecked;
      props.setPianoChecked(checked);

      const { piano, notationShow, notationEdit } = window.ss.globalProps;
      if (piano) {
        const updateAffix = get(notationShow, 'updateAffix') || get(notationEdit, 'updateAffix');
        if (updateAffix) {
          updateAffix(() => piano.setVisibility(checked));
        } else {
          piano.setVisibility(checked);
        }
      }
    },
    handleFretboardStyleUpdate: props => event => {
      const callback = get(window.ss.globalProps.fretboard, 'handleFretboardStyleUpdate')

      if (typeof callback === 'function') {
        callback(event);
        props.setFretboardStyle(event.target.value);
      }
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
    const { path } = props.match;

    return {
      showEditItem: (
        path === '/n/:id' && (
          currentUser.roles.includes('admin') ||
          parseInt(currentUser.id, 10) === parseInt(transcriber.id, 10)
        )
      ),
      showStudioItem: currentUser.roles.includes('admin'),
      showShowItem: path === '/n/:id/edit'
    };
  }),
  withProps(props => ({
    collapsedClassName: classNames({ 'collapsed': props.collapsed })
  })),
  lifecycle({
    componentDidMount(): void {
      const { maestro } = window.ss;
      maestro.options.showMoreNotes = false;
      maestro.options.showLoop = false;

      const { fretboard, piano } = window.ss.globalProps;
      this.props.setFretboardChecked(!!get(fretboard, 'isVisible'));
      this.props.setPianoChecked(!!get(piano, 'isVisible'));
      this.props.setFretboardStyle(localStorage.getItem('fretboardStyle') || 'FANCY');
    }
  })
);

const Outer = styled.div`
  transition: opacity 200ms ease-in;

  .ant-menu {
    display: block;
  }

  .ant-menu-inline-collapsed {
    width: 0;
  }

  .ant-radio-wrapper, .ant-radio-disabled + span {
    color: rgba(255, 255, 255, 0.65);
  }
`;
const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  background: black;
  z-index: 29;

  &.collapsed {
    z-index: -1;
    opacity: 0;
    display: none;
  }
`;
const Inner = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 30;

  &.collapsed {
    width: 0;
  }

  > * {
    min-width: 200px;
    min-height: 100vh;
    background: black;
  }
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
  fretboardStyle,
  showEditItem,
  showStudioItem,
  showShowItem,
  collapsed,
  isMobile,
  onMaskClick,
  collapsedClassName,
  handleMenuItemClick,
  handleFretboardStyleUpdate
}) => (
  <Outer>
    <Mask
      onClick={onMaskClick}
      className={collapsedClassName}
    />
    <Inner className={collapsedClassName}>
      <Menu
        selectable={false}
        defaultSelectedKeys={[]}
        defaultOpenKeys={[]}
        mode="inline"
        theme="dark"
        onClick={handleMenuItemClick}
        inlineCollapsed={collapsed}
        className={collapsedClassName}
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
              ? <Item key="edit">
                  <Link to={`/n/${match.params.id}/edit`}>
                    <Icon type="edit" />
                    <span>edit</span>
                  </Link>
                </Item>
              : null
          }
          {
            showShowItem
                ? <Item key="show">
                  <Link to={`/n/${match.params.id}`}>
                    <Icon type="picture" />
                    <span>show</span>
                  </Link>
                </Item>
              : null
          }
          {
            showStudioItem
              ? <Item key="studio">
                  <Link to={`/n/${match.params.id}/studio`}>
                    <Icon type="video-camera" />
                    <span>studio</span>
                  </Link>
                </Item>
              : null
          }
        </ItemGroup>
        <ItemGroup title="visuals">
          <Item key="fretboardStyle">
            <RadioGroup
              onChange={handleFretboardStyleUpdate}
              value={fretboardStyle}
              disabled={!fretboardChecked}
            >
              <Radio value={'FANCY'}>fancy</Radio>
              <Radio value={'NONE'}>plain</Radio>
            </RadioGroup>
          </Item>
          <Item key="fretboard">
            <Checkbox checked={fretboardChecked} />
            <CheckDescription>fretboard</CheckDescription>
          </Item>
          <Item key="piano">
            <Checkbox checked={pianoChecked} />
            <CheckDescription>piano</CheckDescription>
          </Item>
        </ItemGroup>
        <ItemGroup title="player">
          <Item key="moreNotes">
            <Checkbox checked={moreNotesChecked} />
            <CheckDescription>suggest notes</CheckDescription>
          </Item>
          <Item key="showLoop">
            <Checkbox checked={showLoopChecked} />
            <CheckDescription>show loop</CheckDescription>
          </Item>
          <Item>
            <Playback />
          </Item>
        </ItemGroup>
      </Menu>
    </Inner>
  </Outer>
);

export default enhance(NotationControlsMenu);
