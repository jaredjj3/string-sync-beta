import React from 'react';
import { Link } from 'react-router';

import Grid from 'antd-mobile/lib/grid';
import LibraryGridItem from './item';

import { shuffle, drop, take } from 'lodash';

interface GridData {
  thumbnail: string;
  text: string;
  url: string;
}

const LibraryGrid = ({ tagNotations }): JSX.Element => {
  const data: Array<GridData> = tagNotations.notations.map(notation => ({
      thumbnail: notation.thumbnailUrl,
      text: notation.name,
      url: `/n/${notation.id}`
    })
  );

  const shuffledData    = shuffle(data);
  const divisbleBy3Data = drop(shuffledData, data.length > 3 ? data.length % 3 : 0);
  // const upTo18Data      = take(divisbleBy3Data, 18);

  return (
    <div>
      <Grid
        hasLine={false}
        className="LibraryGrid"
        data={divisbleBy3Data}
        columnNum={3}
        renderItem={(gridData: GridData, index) => <LibraryGridItem data={gridData} />}
      />
    </div>
  );
};

export default LibraryGrid;
