import * as React from 'react';
import { compose, withState, withProps, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { Gradient, Video, Tab, Fretboard, MaestroAdapter } from 'components';
import { NotationShowBanner } from './';
import { NotationControls } from 'components';
import { toTick, toTimeMs } from 'ssUtil';

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
    },
    setBodyColor: backgroundColor => {
      window.$('body').css('background-color', backgroundColor);
    }
  })),
  lifecycle({
    componentWillMount(): void {
      window.ss.loader.add('initializeVideo');
      window.setTimeout(window.ss.loader.clear, 6000);
    },
    componentDidMount(): void {
      // Update the body color so that the extra space in the Instagram
      // browser is consistent with the bottom object, which in this case is
      // the NotationShowControls component.
      this.props.setBodyColor('black');
      this.props.maybeFetchNotation();
    },
    componentWillUnmount(): void {
      this.props.setBodyColor('white');
      window.ss.loader.clear();
    }
  })
);

const NotationShow = ({ isFetching, notation }) => (
  <div className="NotationShow">
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
  </div>
);

export default enhance(NotationShow);
