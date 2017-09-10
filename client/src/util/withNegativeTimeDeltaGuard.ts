// The purpose of this method is to fix YouTube's videoPlayer.getCurrentTime
// function. Its default behavior returns the wrong time, such that its last
// time is greater than the current reporting time. Ultimately, this results
// in negative time deltas towards the start of any video. This function
// overrides the getCurrentTime method to keep track of the last reported
// time and to handle the value if the time delta is negative.

import { isVideoActive } from './videoStateCategory';
import PLAYER_STATES from 'util/const/PLAYER_STATES';

const YOUTUBE_PREDICTION_OFFSET: number = 0.2;

const _shouldHaveDefaultBehavior = (videoPlayer: any, lastCalledAt: number) => {
  return (
    Date.now() - lastCalledAt > YOUTUBE_PREDICTION_OFFSET ||
    !isVideoActive(PLAYER_STATES[videoPlayer.getPlayerState])
  );
};

const _getCurrentTime = (videoPlayer: any) => {
  const getCurrentTime = videoPlayer.getCurrentTime.bind(videoPlayer);

  let lastCurrentTime: number = 0;
  let lastCalledAt: number = Date.now();

  return () => {
    const possibleCurrentTime = getCurrentTime();
    const shouldHaveDefaultBehavior = _shouldHaveDefaultBehavior(videoPlayer, lastCalledAt);
    const delta = possibleCurrentTime - lastCurrentTime;

    lastCalledAt = Date.now();

    if (!shouldHaveDefaultBehavior && delta <= 0) {
      lastCurrentTime += YOUTUBE_PREDICTION_OFFSET;
    } else {
      lastCurrentTime = possibleCurrentTime;
    }

    return lastCurrentTime;
  };
};

export const withNegativeTimeDeltaGuard = (videoPlayer: any): any => {
  videoPlayer.getCurrentTime = _getCurrentTime(videoPlayer);
  videoPlayer.hasNegativeTimeDeltaGuard = true;
  return videoPlayer;
};
