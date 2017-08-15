import React from 'react';
import { Link } from 'react-router';

import LazyLoad from 'react-lazyload';

const LibraryGridItem = ({ data }): JSX.Element => (
  <div className="LibraryGridItem" style={{ overflow: 'hidden'}}>
    <Link to={data.url}>
      <div className="LibraryGridItem__imgContainer">
        <LazyLoad
          once
          throttle
          resize
          height="100%"
          offset={500}
          placeholder={<div className="LibraryGridItem__placeholder" />}
        >
          <img src={data.thumbnail} className="LibraryGridItem__imgContainer__img" />
        </LazyLoad>
      </div>
    </Link>
  </div>
);

export default LibraryGridItem;
