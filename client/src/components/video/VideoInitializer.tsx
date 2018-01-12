import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { withVideo, withSync } from 'enhancers';

// FIXME: This component depends on another component calling rafLoop.start().
//
// The purpose of this component is to start the metadata loading of the
// parent <Video />. It accomplishes this uses setTimeouts, which is hacky
// solution and should be addressed more precisely in the future. The video
// is considered initialized when videoPlayer.getDuration() returns a value
// greater than 0.
const enhance = compose (
  withVideo,
  withSync,
  withState('wasVideoPlayerMuted', 'setWasVideoPlayerMuted', false),
  withState('isVideoInitialized', 'setIsVideoInitialized', false),
  withState('isVideoInitializing', 'setIsVideoInitializing', false),
  withProps(props => ({
    getIsVideoInitialized: () => {
      const { player } = props.video.state;
      return (
        props.isVideoInitialized ||
        (player && (player.getDuration() > 0))
      )
    }
  })),
  withProps(props => ({
    unregisterRaf: () => {
      props.sync.state.rafLoop.unregister('VideoInitializer.handleAnimationLoop');
    }
  })),
  withHandlers({
    handleAnimationLoop: props => () => {
      const { player, isActive } = props.video.state;
      const shouldStartInitialize = Boolean(
        !props.isVideoInitializing &&
        !props.getIsVideoInitialized() &&
        !isActive &&
        player &&
        typeof player.isMuted() === 'boolean'
      );

      if (shouldStartInitialize) {
        props.setIsVideoInitializing(true);
        props.setWasVideoPlayerMuted(player.isMuted());
        player.mute();
        player.playVideo();
      }

      if (props.getIsVideoInitialized()) {
        props.unregisterRaf();
        player.pauseVideo();

        // preserve the muted state on mount
        if (!props.wasVideoPlayerMuted) {
          player.unMute();
        }

        player.seekTo(0);
        props.setIsVideoInitializing(false);
        props.setIsVideoInitialized(true);

        props.sync.state.maestro.queueUpdate();
      }
    }
  }),
  withProps(props => ({
    registerRaf: () => {
      props.sync.state.rafLoop.register({
        name: 'VideoInitializer.handleAnimationLoop',
        precedence: 0,
        onAnimationLoop: props.handleAnimationLoop
      })
    }
  })),
  lifecycle({
    componentWillReceiveProps(nextProps: any): void {
      if (!nextProps.getIsVideoInitialized()) {
        nextProps.registerRaf();
      }
    }
  })
);

const VideoInitializer = () => null;

export default enhance(VideoInitializer);
