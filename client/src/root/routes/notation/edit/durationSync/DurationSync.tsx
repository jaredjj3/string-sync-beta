import React from 'react';
import { compose, lifecycle } from 'recompose';
import { withNotation, withVideo } from 'enhancers';
import { Notation, Video } from 'types';

interface DurationSyncProps {
  notation: Notation;
  video: Video;
  updateNotation(notation: any): void;
}

let trying = false;

const enhance = compose(
  withNotation,
  withVideo,
  lifecycle({
    componentWillReceiveProps(nextProps: DurationSyncProps): void {
      const shouldTryUpdateDuration = !nextProps.notation.durationMs && nextProps.video.isActive;

      if (shouldTryUpdateDuration && !trying) {
        trying = true;
        const durationMs = nextProps.video.player.getDuration() * 1000;

        if (durationMs === 0) {
          trying = false;
          return;
        }

        const nextNotation = Object.assign({}, nextProps.notation, { durationMs });
        nextProps.updateNotation(nextNotation);
        trying = false;
      }
    }
  })
);

export default enhance(() => null);
