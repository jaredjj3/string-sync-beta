import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, withState, withProps, withHandlers, lifecycle, shouldUpdate } from 'recompose';
import { withNotation } from 'enhancers';
import { toTick, toTimeMs } from 'ssUtil';
import { NotationShowBanner, NotationShowVideo, NotationShowScroller } from './';
import Library, { Gradient, Fretboard, MaestroController, Piano, NotationControls, Tab, Footer } from 'components';
import { Affix, Button } from 'antd';
import { Element as ScrollElement, scroller } from 'react-scroll';
import styled from 'styled-components';
import * as classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { isEqual } from 'lodash';

const enhance = compose(
  withNotation,
  withState('isFetching', 'setIsFetching', false),
  withState('affixed', 'setAffixed', false),
  withProps(props => ({
    fetchNotation: async () => {
      const notationId = props.match.params.id;
      props.setIsFetching(true);
      await props.notation.dispatch.fetchNotation(notationId);
      window.ss.loader.clear();
      props.setIsFetching(false);
    }
  })),
  withProps(props => ({
    getAffixedHeight: () => {
      const node = document.getElementById('ScoreAffix');
      return node ? (node.offsetHeight + 2) || 0 : 0;
    }
  })),
  withHandlers({
    handleAffixChange: props => affixed => {
      if (props.affixed !== affixed) {
        props.setAffixed(affixed);
      }

      const scrollOffset = Math.max(affixed ? props.getAffixedHeight() : 0, 0);
      window.ss.maestro.scoreScrollerProps.setScrollOffset(-scrollOffset);
    }
  }),
  withHandlers({
    updateAffix: props => () => {
      // FIXME: The piano component has to fully show before this returns
      // the correct height. Fix this so this does not rely on the DOM change
      // finishing.
      window.setTimeout(() => props.handleAffixChange(props.affixed), 1500);
    }
  }),
  lifecycle({
    componentWillMount(): void {
      window.ss.loader.add('fetchNotation');
      window.setTimeout(window.ss.loader.clear, 3000);
      window.$('body').css({ background: 'black' });
    },
    componentDidMount(): void {
      this.props.fetchNotation();
      window.ss.maestro.notationShowProps = this.props;
    },
    componentWillUnmount(): void {
      this.props.notation.dispatch.resetNotation();
      window.ss.loader.clear();
      window.$('body').css({ background: 'white' });
      window.ss.maestro.notationShowProps = null;
    }
  }),
  shouldUpdate((props, nextProps) => (
    !isEqual(props.notation, nextProps.notation)) ||
    props.isFetching !== nextProps.isFetching
  )
);

const NotationShowOuter = styled.section`
  display: flex;
  flex-flow: column;
  overflow: hidden;
  height: calc(100vh - 125px);
`;
const Top = styled.header`
  margin-top: 1px;

  .ant-affix {
    z-index: 25;
  }
`;
const Affixed = styled.div`
`;
const Middle = styled.div`
  flex: 2;
  background: white;
`;
const Bottom = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 28;
`;
const LibraryLinkContainer = styled.span`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 30;

  button {
    opacity: 0.5;
  }

  button:hover {
    opacity: 1;
  }
`;

const NotationShow = ({ isFetching, notation, viewport, handleAffixChange }) => (
  <NotationShowOuter id="NotationShow">
    <Gradient />
    <Top>
      <ScrollElement name="NotationShow__top" />
      <MaestroController />
      <NotationShowScroller />
      <LibraryLinkContainer>
        <Link to="/library">
          <Button
            shape="circle"
            icon="arrow-left"
            type="primary"
          />
        </Link>
      </LibraryLinkContainer>
      <NotationShowVideo />
      <Affix
        target={() => document.getElementById('NotationShow')}
        offsetTop={2}
        onChange={handleAffixChange}
      >
        <Affixed id="ScoreAffix">
          <Fretboard />
          <Piano />
        </Affixed>
      </Affix>
    </Top>
    <Middle>
      <ScrollElement name="NotationShow__tab"/>
      <Tab withCaret />
    </Middle>
    <Bottom>
      <NotationControls />
    </Bottom>
  </NotationShowOuter>
);

export default enhance(NotationShow);
