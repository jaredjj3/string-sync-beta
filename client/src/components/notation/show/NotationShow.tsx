import * as React from 'react';
import { compose, withState, withProps, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { toTick, toTimeMs } from 'ssUtil';
import { NotationShowBanner, NotationShowVideo } from './';
import { Gradient, Fretboard, MaestroController, Piano, NotationControls, Tab, Footer } from 'components';
import { Affix } from 'antd';
import styled from 'styled-components';

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
  /* overflow: hidden; */
  overflow-x: hidden;
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
  overflow: hidden;
  background: white;
  min-height: 100vh;
  height: 100%;
`;
const Bottom = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 30;
`;

const NotationShow = ({ isFetching, notation, viewport, setAutoScroll, handleTabContainerScroll }) => (
  <NotationShowOuter id="NotationShow">
    <Gradient />
    <Top>
      <MaestroController />
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
      <Tab withCaret />
    </Middle>
    <Bottom>
      <NotationControls />
    </Bottom>
  </NotationShowOuter>
);

export default enhance(NotationShow);
