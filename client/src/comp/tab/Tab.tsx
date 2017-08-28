import React from 'react';

import Overlap from 'comp/overlap';
import Score from './score';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';

const { Layer } = Overlap;

interface TabProps {}

interface TabState {}

class Tab extends React.Component<TabProps, TabState> {
  render(): JSX.Element {

    return (
      <div className="TabContainer">
        <Row className="TabContainer__iconContainer" type="flex" justify="center" align="middle" >
          <Icon type="up" />
        </Row>
        <Overlap className="Tab" height="300px" width="100vw">
          <Layer>
            <Score />
          </Layer>
        </Overlap>
        <Row className="TabContainer__iconContainer" type="flex" justify="center" align="middle" >
          <Icon type="down" />
        </Row>
      </div>
    );
  }
}

export default Tab;
