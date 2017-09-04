import React from 'react';
import { connect } from 'react-redux';

import Controls from './controls';
import Overlap from 'comp/overlap';
import Score from './score';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';

const { Layer } = Overlap;

interface TabProps {
  focusedLine: number;
}

interface TabState {}

class Tab extends React.PureComponent<TabProps, TabState> {
  scoreOverlap: any;

  componentWillReceiveProps(nextProps: TabProps): void {
    this.scoreOverlap.container.scrollTop = nextProps.focusedLine * 290;
  }

  render(): JSX.Element {
    return (
      <div className="TabContainer">
        <Controls />
        <Overlap
          className="Tab"
          height="300px"
          width="100vw"
          ref={c => this.scoreOverlap = c}
        >
          <Layer>
            <Score />
          </Layer>
        </Overlap>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  focusedLine: state.tab.focusedLine
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tab);
