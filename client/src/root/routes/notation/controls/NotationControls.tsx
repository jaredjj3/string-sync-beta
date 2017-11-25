import React from 'react';
import { compose } from 'recompose';

import Play from 'comp/video/controls/play';

const enhance = compose(

);

const NotationControls = enhance(() => (
  <div className="NotationControls">
    <div className="NotationControls__row1">
      NotationControls Row1
    </div>
    <div className="NotationControls__row2">
      <Play />
    </div>
  </div>
));

export default NotationControls;
