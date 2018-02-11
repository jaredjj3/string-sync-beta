import * as React from 'react';
import { compose, withState, withProps, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { Gradient, Video, Tab, Fretboard, MaestroController, Piano } from 'components';
import { NotationShowBanner, NotationShowVideo } from './';
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
  withProps(props => ({
    setBodyColor: color => {
      window.$('body').css({ background: color })
    }
  })),
  lifecycle({
    componentWillMount(): void {
      window.ss.loader.add('initializeVideo');
      window.setTimeout(window.ss.loader.clear, 6000);
    },
    componentDidMount(): void {
      this.props.setBodyColor('black');
      this.props.maybeFetchNotation();
    },
    componentWillUnmount(): void {
      this.props.setBodyColor('white');
      window.ss.loader.clear();
    }
  })
);

const NotationShowOuter = styled.div`
  .NotationShow {
    color: white;
    overflow-x: hidden;
  }
`;
const NotationShowInner = styled.div``

const NotationShow = ({ isFetching, notation }) => (
  <NotationShowOuter>
    <NotationShowInner className="NotationShow">
      <Gradient />
      <MaestroController />
      <NotationShowBanner
        isFetching={isFetching}
        songName={notation.state.songName}
        artistName={notation.state.artistName}
      />
      <NotationShowVideo />
      <Fretboard />
      <Piano />
      <Tab withCaret />
      <NotationControls />
    </NotationShowInner>
  </NotationShowOuter>
);

export default enhance(NotationShow);
