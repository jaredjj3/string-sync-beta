import * as React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Card } from 'antd';

const { Meta } = Card;

interface NotationDetailProps {
  notation: Notation | PresentationalNotation;
}

const Tags = ({ notation }) => (
  notation.tags.map(tag => <Tag key={`tag-${tag}-${notation.id}`}>{tag}</Tag>)
);

const MetaDescription = ({ notation }) => (
  <div className="NotationDetail__metaDescription">
    <div className="NotationDetail__metaDescription__transcriber">
      {notation.transcriber.username}
    </div>
    <div className="NotationDetail__metaDescription__tags">
      <Tags notation={notation} />
    </div>
  </div>
);

const NotationDetail = ({ notation }: NotationDetailProps) => (
  <Card
    className="NotationDetail"
    style={{ width: '240px' }}
    cover={<img alt={notation.songName} src={notation.thumbnailUrl} />}
  >
    <Meta
      title={`${notation.songName} by ${notation.artistName}`}
      description={<MetaDescription notation={notation} />}
    />
  </Card>
);

export default NotationDetail;
