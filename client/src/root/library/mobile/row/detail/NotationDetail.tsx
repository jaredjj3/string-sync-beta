import React from 'react';

import Card from 'comp/card';

import './_notationDetail.less';

const NotationDetail = ({ notation }): JSX.Element => (
  <Card
    bordered={false}
    style={{ cursor: 'pointer', marginBottom: '20px' }}
    bodyStyle={{ padding: 0 }}
  >
    <div>
      <div className="NotationDetail--mobile__img">
        <img alt={notation.name} width="100%" src={notation.thumbnailUrl} />
      </div>
      <div className="NotationDetail--mobile__info">
        <h4>{notation.name}</h4>
        <p>{notation.transcriber}</p>
      </div>
    </div>
  </Card>
);

export default NotationDetail;
