import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { Tag, Card } from 'antd';

import './_notationDetail.less';

const style = { width: '240px', height: '240px', cursor: 'pointer' };

const NotationDetail = ({ notation }): JSX.Element => (
  <div className="NotationDetail">
    <Link to={`/n/${notation.id}`}>
      <LazyLoad
        height={style.height}
        offset={500}
        placeholder={<Card loading {...style} />}
      >
        <Card {...style}>
          <div>
            <div className="NotationDetail__img">
              <img alt={notation.songName} width="100%" src={notation.thumbnailUrl} />
            </div>
            <div className="NotationDetail__info">
              <h3>{`${notation.songName} by ${notation.artistName}`}</h3>
              <p>{notation.transcriber.username}</p>
              <div className="NotationDetail__info__tag">
                {
                  notation.tags.map(tag => <Tag key={`tag-${tag}-${notation.id}`}>{tag}</Tag>)
                }
              </div>
            </div>
          </div>
        </Card>
      </LazyLoad>
    </Link>
  </div>
);

export default NotationDetail;
