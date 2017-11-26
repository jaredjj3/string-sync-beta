import React from 'react';
import { compose } from 'recompose';

import Play from 'comp/video/controls/play';
import Scrubber from 'comp/video/controls/scrubber';
import FretboardToggle from 'comp/fretboard/toggle';

const enhance = compose(

);

const NotationControls = enhance(() => (
  <div className="NotationControls">
    <div className="NotationControls__row1">
      NotationControls Row1
    </div>
    <div className="NotationControls__row2">
      <Play />
      <Scrubber />
      <FretboardToggle />
    </div>
  </div>
));

export default NotationControls;
