import React from 'react';

import Card from 'antd/lib/card';

import './_notationDetail.less';

const NotationDetail = ({ notation }): JSX.Element => (
  <Card style={{ width: '280px', height: '240px', cursor: 'pointer' }} bodyStyle={{ padding: 0 }}>
    <div>
      <div className="NotationDetail--desktop__img">
        <img alt={notation.name} width="100%" src={notation.thumbnailUrl} />
      </div>
      <div className="NotationDetail--desktop__info">
        <h3>{`${notation.name} by ${notation.artist}`}</h3>
        <p>{notation.transcriber}</p>
      </div>
    </div>
  </Card>
);

export default NotationDetail;
