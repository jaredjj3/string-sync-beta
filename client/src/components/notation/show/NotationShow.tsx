import * as React from 'react';
import { compose, withState, withProps, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { Gradient, Video, Tab, Fretboard, Maestro } from 'components';
import NotationShowBanner from './NotationShowBanner';
import NotationShowControls from './controls';
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
    componentDidMount(): void {
      // Update the body color so that the extra space in the Instagram
      // browser is consistent with the bottom object, which in this case is
      // the NotationShowControls component.
      this.props.setBodyColor('black');
      this.props.maybeFetchNotation();
    },
    componentWillUnmount(): void {
      this.props.setBodyColor('white');
    }
  })
);

const NotationShow = ({ isFetching, notation }) => (
  <div className="NotationShow">
    <Gradient />
    <Maestro />
    <NotationShowBanner
      isFetching={isFetching}
      songName={notation.state.songName}
      transcriber={notation.state.transcriber}
    />
    <Video />
    <Fretboard />
    <Tab />
    <NotationShowControls />
  </div>
);

export default enhance(NotationShow);
