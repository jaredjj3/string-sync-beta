import * as React from 'react';
import { compose, withState, withProps, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { Gradient, Video, Tab } from 'components';
import NotationShowBanner from './NotationShowBanner';
import NotationShowControls from './NotationShowControls';

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
    <NotationShowBanner
      isFetching={isFetching}
      songName={notation.state.songName}
      transcriber={notation.state.transcriber}
    />
    <Video />
    <div
      className="NotationShow__tabContainer"
      style={{ height: '260px' }}
    >
      <Tab />
    </div>
    <NotationShowControls />
  </div>
);

export default enhance(NotationShow);
