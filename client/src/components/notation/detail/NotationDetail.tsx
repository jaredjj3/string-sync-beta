import * as React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Card } from 'antd';

interface NotationDetailProps {
  notation: Notation | PresentationalNotation;
}

const Tags = ({ notation }) => (
  notation.tags.map(tag => <Tag key={`tag-${tag}-${notation.id}`}>{tag}</Tag>)
);

const NotationDetail = ({ notation }: NotationDetailProps) => (
  <div className="NotationDetail">
    <div className="NotationDetail__img">
      <img alt={notation.songName} src={notation.thumbnailUrl} />
    </div>
    <div className="NotationDetail__info">
      <h3>{`${notation.songName} by ${notation.artistName}`}</h3>
      <p>{notation.transcriber.username}</p>
      <Tags notation={notation} />
    </div>
  </div>
);

export default NotationDetail;
