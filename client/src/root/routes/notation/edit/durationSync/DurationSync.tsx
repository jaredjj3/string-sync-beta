import React from 'react';
import { compose, lifecycle } from 'recompose';
import { withNotation, withVideo } from 'enhancers';
import { Notation, Video } from 'types';
import { ignoreIfExecuting } from 'stringSyncUtil';

interface DurationSyncProps {
  notation: Notation;
  video: Video;
  updateNotation(notation: any): void;
}

const syncDuration = ignoreIfExecuting((props) => {
  const durationMs = props.video.player.getDuration() * 1000;

  if (durationMs > 0) {
    const nextNotation = Object.assign({}, props.notation, { durationMs });
    props.updateNotation(nextNotation);
  }
});

const enhance = compose(
  withNotation,
  withVideo,
  lifecycle({
    componentWillReceiveProps(nextProps: DurationSyncProps): void {
      const shouldSyncDuration = !nextProps.notation.durationMs && nextProps.video.isActive;

      if (shouldSyncDuration) {
        syncDuration(nextProps);
      }
    }
  })
);

export default enhance(() => null);
