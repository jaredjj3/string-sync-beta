import React from 'react';

import Video from 'comp/video';

const DesktopNotationShow = ({ notation }): JSX.Element => (
  <div className="NotationShow--mobile">
    <Video youtubeVideoId={notation.youtubeVideoId} />
  </div>
);

export default DesktopNotationShow;
