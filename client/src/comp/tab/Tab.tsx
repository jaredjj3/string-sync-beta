import React from 'react';

import Overlap from 'comp/overlap';
import Score from  './score';

const { Layer } = Overlap;

interface TabProps {}

interface TabState {}

class Tab extends React.Component<TabProps, TabState> {
  render(): JSX.Element {

    return (
      <Overlap className="Tab" height="200px" width="100vw">
        <Layer>
          <Score />
        </Layer>
      </Overlap>
    );
  }
}

export default Tab;
