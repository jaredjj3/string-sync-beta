import * as React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'antd-mobile';

interface LibraryGridItemData {
  thumbnail: string;
  text: string;
  url: string;
}

const getLibraryGridItemData = (notations) => (
  notations.map(notation => ({
    thumbnail: notation.thumbnailUrl,
    text: notation.songName,
    url: `/n/${notation.id}`
  }))
);

const LibraryGridItem = ({ data }) => (
  <div className="LibraryGridItem">
    <Link to={data.url}>
      <img alt={data.text} src={data.thumbnail} />
    </Link>
  </div>
);

const LibraryGrid = ({ notations }) => (
  <div className="LibraryGrid--container">
    <Grid
      square
      hasLine={false}
      className="LibraryGrid"
      columnNum={3}
      data={getLibraryGridItemData(notations)}
      renderItem={(gridData: LibraryGridItemData) => <LibraryGridItem data={gridData} />}
    />
  </div>
);

export default LibraryGrid;
