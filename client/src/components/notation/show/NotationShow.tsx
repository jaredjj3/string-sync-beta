import * as React from 'react';
import { compose, withState, withProps, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { toTick, toTimeMs } from 'ssUtil';
import styled from 'styled-components';
import { NotationShowBanner, NotationShowVideo } from './';
import {
  Gradient, Tab, Fretboard, MaestroController,
  Piano, NotationControls, Footer
} from 'components';

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
    },
    componentDidMount(): void {
      this.props.fetchNotation();
    },
    componentWillUnmount(): void {
      this.props.notation.dispatch.resetNotation();
      window.ss.loader.clear();
    }
  })
);

const NotationShowOuter = styled.section`
  display: flex;
  flex-flow: column;
  height: calc(100vh - 125px);
  overflow-x: hidden;
`;
const Top = styled.header`
  margin-top: 1px;
`;
const Middle = styled.div`
  flex: 2;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`;
const Bottom = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 20;
`;

const NotationShow = ({ isFetching, notation, viewport }) => (
  <NotationShowOuter>
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
      <Fretboard />
      <Piano />
    </Top>
    <Middle id="TabScroller"
    >
      <Tab withCaret />
      <Footer />
    </Middle>
    <Bottom>
      <NotationControls />
    </Bottom>
  </NotationShowOuter>
);

export default enhance(NotationShow);
