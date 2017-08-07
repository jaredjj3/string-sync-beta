import React from 'react';
import { Link } from 'react-router';

import Grid from 'antd-mobile/lib/grid';
import LazyLoad from 'react-lazy-load';

import { shuffle } from 'lodash';

const LibraryGrid = ({ tagNotations }): JSX.Element => {
  const data = tagNotations.notations.map(notation => ({
      thumbnail: notation.thumbnailUrl,
      text: notation.name,
      url: `/${notation.id}`
    })
  );

  return (
    <div>
      <Grid
        className="LibraryGrid"
        data={shuffle(data)}
        columnNum={3}
        renderItem={(el, index) => (
            <Link to={el.url} className="LibraryGrid__item">
              <div className="LibraryGrid__item__imageContainer">
                <LazyLoad>
                  <img src={el.thumbnail} />
                </LazyLoad>
              </div>
            </Link>
          )
        }
      />
    </div>
  );
};

export default LibraryGrid;
