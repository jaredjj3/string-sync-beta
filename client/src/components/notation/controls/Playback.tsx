import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle, branch, renderNothing } from 'recompose';
import styled from 'styled-components';
import { Icon } from 'antd';
import { withVideo, withViewport } from 'enhancers';
import { first, last, isEqual } from 'lodash';

const enhance = compose(
  withVideo,
  withViewport,
  withState('playbackRates', 'setPlaybackRates', [1]),
  withState('playbackRate', 'setPlaybackRate', 1),
  withHandlers({
    handleNextClick: props => event => {
      const index = props.playbackRates.indexOf(props.playbackRate);

      if (index + 1 <= props.playbackRates.length - 1) {
        const playbackRate = props.playbackRates[index + 1];
        props.setPlaybackRate(playbackRate);
        props.video.state.player.setPlaybackRate(playbackRate);
      }
    },
    handlePrevClick: props => event => {
      const index = props.playbackRates.indexOf(props.playbackRate);

      if (index - 1 >= 0) {
        const playbackRate = props.playbackRates[index - 1];
        props.setPlaybackRate(playbackRate);
        props.video.state.player.setPlaybackRate(playbackRate);
      }
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps: any): void {
      const { player } = nextProps.video.state;
      const playbackRates = player && player.getAvailablePlaybackRates();

      const shouldSetPlaybackRates = (
        playbackRates &&
        !isEqual(this.props.playbackRates, playbackRates)
      );

      if (shouldSetPlaybackRates) {
        nextProps.setPlaybackRates(playbackRates);
      }

      const shouldResetPlaybackRate = (
        playbackRates &&
        playbackRates.length === 1 &&
        nextProps.playbackRate !== playbackRates[0]
      );

      if (shouldResetPlaybackRate) {
        nextProps.setPlaybackRate(playbackRates[0]);
      }
    }
  }),
  branch(
    props => props.playbackRates.length > 1,
    i => i,
    renderNothing
  )
);

const Outer = styled.div`
  position: fixed;
`;
const PlaybackHeader = styled.div`
`;
const PlaybackControlOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;
const PlaybackControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  &&& i {
    margin: 0;
    padding: 0;
  }
`;
const PlaybackValue = styled.div`
  margin: 0 10px;
`;

const Playback = ({ playbackRate, handleNextClick, handlePrevClick }) => (
  <Outer>
    <PlaybackHeader>
      playback
    </PlaybackHeader>
    <PlaybackControlOuter>
      <PlaybackControl onClick={handlePrevClick}>
        <Icon type="minus" />
      </PlaybackControl>
      <PlaybackValue>
        {`${playbackRate * 100}%`}
      </PlaybackValue>
      <PlaybackControl onClick={handleNextClick}>
        <Icon type="plus" />
      </PlaybackControl>
    </PlaybackControlOuter>
  </Outer>
);

export default enhance(Playback);
