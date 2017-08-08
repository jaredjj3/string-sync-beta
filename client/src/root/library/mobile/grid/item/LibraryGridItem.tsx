import React from 'react';
import { Link } from 'react-router';

const LibraryGridItem = ({ data }): JSX.Element => (
  <div style={{ overflow: 'hidden'}}>
    <Link to={data.url} className="LibraryGridItem">
      <div className="LibraryGridItem__imgContainer">
        <img src={data.thumbnail} className="LibraryGridItem__imgContainer__img" />
      </div>
    </Link>
  </div>
);

export default LibraryGridItem;
