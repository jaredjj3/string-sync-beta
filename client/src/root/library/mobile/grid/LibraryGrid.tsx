import React from 'react';
import { Link } from 'react-router';

import Grid from 'antd-mobile/lib/grid';

import shuffle from 'util/shuffle';

import './_libraryGrid.less';

const LibraryGrid = ({ tagNotations }): JSX.Element => {
  const data = tagNotations.notations.map(notation => ({
      icon: notation.thumbnailUrl,
      text: notation.name,
      url: `/${notation.id}`
    })
  );
  shuffle(data);

  return (
    <div>
      <Grid
        className="LibraryGrid"
        data={data}
        columnNum={3}
        renderItem={(el, index) => (
            <Link to={el.url} className="LibraryGrid__item">
              <div className="LibraryGrid__item__imageContainer">
                <img src={el.icon} />
              </div>
            </Link>
          )
        }
      />
    </div>
  );
};

export default LibraryGrid;
