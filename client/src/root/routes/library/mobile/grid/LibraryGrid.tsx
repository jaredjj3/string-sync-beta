import React from 'react';
import { Link } from 'react-router-dom';

import { Grid } from 'antd-mobile';
import LibraryGridItem from './item';

import { TagNotations } from '../../Library';

import { shuffle, drop, take } from 'lodash';

interface GridData {
  thumbnail: string;
  text: string;
  url: string;
}

interface LibraryGridProps {
  tagNotations: TagNotations;
}

interface LibraryGridState {

}

class LibraryGrid extends React.PureComponent<LibraryGridProps, LibraryGridState> {
  render(): JSX.Element {
    const { tagNotations } = this.props;
    const data: Array<GridData> = tagNotations.notations.map(notation => ({
        thumbnail: notation.thumbnailUrl,
        text: notation.songName,
        url: `/n/${notation.id}`
      })
    );

    const shuffledData    = shuffle(data);
    const divisbleBy3Data = drop(shuffledData, data.length > 3 ? data.length % 3 : 0);
    const upTo18Data      = take(divisbleBy3Data, 18);

    return (
      <div>
        <Grid
          square
          hasLine={false}
          className="LibraryGrid"
          data={upTo18Data}
          columnNum={3}
          renderItem={(gridData: GridData, index) => <LibraryGridItem data={gridData} />}
        />
      </div>
    );
  }
}

export default LibraryGrid;
