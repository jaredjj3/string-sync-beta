import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { toTick, toTimeMs } from 'ssUtil';
import { NotationShowBanner, NotationShowVideo } from './';
import { Gradient, Fretboard, MaestroController, Piano, NotationControls, Tab, Footer } from 'components';
import { Affix, Button } from 'antd';
import { Element as ScrollElement, scroller } from 'react-scroll';
import styled from 'styled-components';
import * as classNames from 'classnames';

const enhance = compose(
  withNotation,
  withState('isFetching', 'setIsFetching', false),
  withState('isScrolledDown', 'setIsScrolledDown', false),
  withProps(props => ({
    fetchNotation: async () => {
      const notationId = props.match.params.id;
      props.setIsFetching(true);
      await props.notation.dispatch.fetchNotation(notationId);
      window.ss.loader.clear();
      props.setIsFetching(false);
    }
  })),
  withHandlers({
    handleScrollerClick: props => event => {
      const target = props.isScrolledDown ? 'NotationShow__top' : 'NotationShow__tab';
      props.setIsScrolledDown(!props.isScrolledDown);
      scroller.scrollTo(target, {
        duration: 300,
        smooth: true,
        containerId: 'NotationShow'
      });
    }
  }),
  withProps(props => ({
    scrollButtonClassNames: classNames({
      'ScrollerButton--upsideDown': props.isScrolledDown
    })
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
const ScrollerContainer = styled.span`
  position: fixed;
  z-index: 30;
  top: 20px;
  right: 20px;

  .ScrollerButton--upsideDown {
    transform: rotate(180deg);
  }
`;
const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.75;
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
  z-index: 30;
`;

const NotationShow = ({ isFetching, notation, viewport, scrollButtonClassNames, handleScrollerClick }) => (
  <NotationShowOuter id="NotationShow">
    <Gradient />
    <Top>
      <ScrollElement name="NotationShow__top" />
      <MaestroController />
      <ScrollerContainer>
        <Mask />
        <Button
          className={scrollButtonClassNames}
          shape="circle"
          icon="arrow-down"
          onClick={handleScrollerClick}
          type="primary"
        />
      </ScrollerContainer>
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
