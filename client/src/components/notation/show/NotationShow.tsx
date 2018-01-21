import * as React from 'react';
import { compose, withState, withProps, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { Gradient, Video, Tab, Fretboard, MaestroAdapter } from 'components';
import { NotationShowBanner } from './';
import { NotationControls } from 'components';
import { toTick, toTimeMs } from 'ssUtil';
import styled from 'styled-components';

const enhance = compose(
  withNotation,
  withState('isFetching', 'setIsFetching', false),
  withProps(props => ({
    maybeFetchNotation: async () => {
      const notationId = props.match.params.id;

      if (props.notation.state.id !== notationId) {
        props.setIsFetching(true);
        await props.notation.dispatch.fetchNotation(notationId);
        props.setIsFetching(false);
      }
    }
  })),
  lifecycle({
    componentWillMount(): void {
      window.ss.loader.add('initializeVideo');
      window.setTimeout(window.ss.loader.clear, 6000);
    },
    componentDidMount(): void {
      this.props.maybeFetchNotation();
    },
    componentWillUnmount(): void {
      window.ss.loader.clear();
    }
  })
);

const NotationShowOuter = styled.div`
  .NotationShow {
    color: white;
    overflow-x: hidden;

    .Video {
      background: black;
      height: 30vh;
      width: 100%;

      iframe {
        height: 100%;
        width: 100%;
        min-height: 30vh;
      }
    }
  }
`;
const NotationShowInner = styled.div``

const NotationShow = ({ isFetching, notation }) => (
  <NotationShowOuter>
    <NotationShowInner className="NotationShow">
      <Gradient />
      <MaestroAdapter />
      <NotationShowBanner
        isFetching={isFetching}
        songName={notation.state.songName}
        transcriber={notation.state.transcriber}
      />
      <Video withInitializer />
      <Fretboard />
      <Tab withCaret />
      <NotationControls />
      </NotationShowInner>
  </NotationShowOuter>
);

export default enhance(NotationShow);
