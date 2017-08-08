import React from 'react';
import { Link } from 'react-router';

import Grid from 'antd-mobile/lib/grid';
import LibraryGridItem from './item';

import { shuffle } from 'lodash';

export interface GridData {
  thumbnail: string;
  text: string;
  url: string;
}

const LibraryGrid = ({ tagNotations }): JSX.Element => {
  const data: Array<GridData> = tagNotations.notations.map(notation => ({
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
        renderItem={(gridData: GridData, index) => <LibraryGridItem data={gridData} />}
      />
    </div>
  );
};

export default LibraryGrid;
