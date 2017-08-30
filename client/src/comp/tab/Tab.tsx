import React from 'react';

import Controls from './controls';
import Overlap from 'comp/overlap';
import Score from './score';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';

const { Layer } = Overlap;

interface TabProps {}

interface TabState {}

class Tab extends React.PureComponent<TabProps, TabState> {
  render(): JSX.Element {

    return (
      <div className="TabContainer">
        <Controls />
        <Overlap className="Tab" height="300px" width="100vw">
          <Layer>
            <Score />
          </Layer>
        </Overlap>
      </div>
    );
  }
}

export default Tab;
