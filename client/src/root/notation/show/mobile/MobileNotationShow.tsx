import React from 'react';

import Video from 'comp/video';

import { Notation } from 'types/notation';

const MobileNotationShow = ({ notation }): JSX.Element => (
  <div className="NotationShow--mobile">
    <Video youtubeVideoId={notation.youtubeVideoId} />
  </div>
);

export default MobileNotationShow;
