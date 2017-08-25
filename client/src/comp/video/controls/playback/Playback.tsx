import React from 'react';

import Row from 'antd/lib/row';
import Icon from 'antd/lib/icon';

const Playback = ({ onClick, playbackRate }) => (
  <div
    className="VideoControls__playbackRate"
    onClick={onClick}
  >
    <Row type="flex" align="middle">
      <Icon type="clock-circle" style={{ marginRight: '4px' }}/>
      <span style={{ fontSize: '10px' }}>
        {`${playbackRate * 100}%`}
      </span>
    </Row>
  </div>
);

export default Playback;
