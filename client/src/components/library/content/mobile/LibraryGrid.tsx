import * as React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'antd-mobile';
import styled from 'styled-components';

interface LibraryGridItemData {
  thumbnail: string;
  text: string;
  url: string;
}

const LibraryGridOuter = styled.div`
  border-right: 1px solid white;

  .am-grid-text {
    font-size: 12px !important;
  }

  .am-grid-item-content {
    padding: 0 !important;
  }

  .am-grid-null-item {
    background: #efefef !important;
    border: none !important;
  }

  .am-grid-null-item:after {
    content: none !important;
  }

  .am-grid-item-content {
    background: #efefef;
  }

  .am-grid-item-content .LibraryGridItem {
    border-left: 1px solid white;
  }
`;
const LibraryGridItemOuter = styled.div`
  border-top: 1px solid white;

  .LibraryGridItem__imageContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .LibraryGridItem__imgContainer__img {
    flex-shrink: 0;
    max-width: 100%;
    max-height: 100%;
  }
`;

const getLibraryGridItemData = (notations) => (
  notations.map(notation => ({
    thumbnail: notation.thumbnailUrl,
    text: notation.songName,
    url: `/n/${notation.id}`
  }))
);

const LibraryGridItem = ({ data }) => (
  <LibraryGridItemOuter>
    <Link to={data.url}>
      <div className="LibraryGridItem__imgContainer">
        <img
          className="LibraryGridItem__imgContainer__img"
          alt={data.text}
          src={data.thumbnail}
        />
      </div>
    </Link>
  </LibraryGridItemOuter>
);

const LibraryGrid = ({ notations }) => (
  <LibraryGridOuter>
    <Grid
      square
      hasLine={false}
      className="LibraryGrid"
      columnNum={3}
      data={getLibraryGridItemData(notations)}
      renderItem={(gridData: LibraryGridItemData) => <LibraryGridItem data={gridData} />}
    />
  </LibraryGridOuter>
);

export default LibraryGrid;
