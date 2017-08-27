import React from 'react';

import Overlap from 'comp/overlap';
import Score from  './score';

const { Layer } = Overlap;

interface TabProps {}

interface TabState {}

class Tab extends React.Component<TabProps, TabState> {
  render(): JSX.Element {

    return (
      <Overlap height="200px" width="100%">
        <Layer>
          <Score />
        </Layer>
      </Overlap>
    );
  }
}

export default Tab;
