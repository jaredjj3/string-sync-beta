import * as React from 'react';
import { compose, withState, withProps, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { toTick, toTimeMs } from 'ssUtil';
import { NotationShowBanner, NotationShowVideo, NotationShowScroller } from './';
import { Gradient, Fretboard, MaestroController, Piano, NotationControls, Tab, Footer } from 'components';
import { Affix } from 'antd';
import { Element as ScrollElement, scroller } from 'react-scroll';
import styled from 'styled-components';
import * as classNames from 'classnames';

const enhance = compose(
  withNotation,
  withState('isFetching', 'setIsFetching', false),
  withProps(props => ({
    fetchNotation: async () => {
      const notationId = props.match.params.id;
      props.setIsFetching(true);
      await props.notation.dispatch.fetchNotation(notationId);
      window.ss.loader.clear();
      props.setIsFetching(false);
    }
  })),
  lifecycle({
    componentWillMount(): void {
      window.ss.loader.add('fetchNotation');
      window.setTimeout(window.ss.loader.clear, 3000);
      window.$('body').css({ background: 'black' });
    },
    componentDidMount(): void {
      this.props.fetchNotation();
    },
    componentWillUnmount(): void {
      this.props.notation.dispatch.resetNotation();
      window.ss.loader.clear();
      window.$('body').css({ background: 'white' });
    }
  })
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
const Middle = styled.div`
  flex: 2;
  background: white;
`;
const Bottom = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const NotationShow = ({ isFetching, notation, viewport, scrollButtonClassNames, handleScrollerClick }) => (
  <NotationShowOuter id="NotationShow">
    <Gradient />
    <Top>
      <ScrollElement name="NotationShow__top" />
      <MaestroController />
      <NotationShowScroller />
      <NotationShowBanner
        isFetching={isFetching}
        songName={notation.state.songName}
        artistName={notation.state.artistName}
        createdAt={notation.state.createdAt}
      />
      <NotationShowVideo />
      <Affix
        target={() => document.getElementById('NotationShow')}
        offsetTop={2}
      >
        <Fretboard />
        <Piano />
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
