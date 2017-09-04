import React from 'react';
import { connect } from 'react-redux';

import Controls from './controls';
import Overlap from 'comp/overlap';
import Score from './score';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';

import { Artist } from 'services/vexflow';

const { Layer } = Overlap;

interface TabProps {
  focusedLine: number;
  artist: Artist;
  showControls?: boolean;
}

interface TabState {}

class Tab extends React.PureComponent<TabProps, TabState> {
  static defaultProps: any = {
    showControls: false
  };

  scoreOverlap: any;

  componentWillReceiveProps(nextProps: TabProps): void {
    this.maybeScroll(nextProps.artist, nextProps.focusedLine);
  }

  maybeScroll(artist: Artist, focusedLine: number): void {
    if (!artist) {
      return;
    }

    const tabstavePosY = artist.staves.map(stave => stave.note.bounds.y);
    this.scoreOverlap.container.scrollTop = tabstavePosY[focusedLine] - tabstavePosY[0];
  }

  render(): JSX.Element {
    return (
      <div className="TabContainer">
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
        {this.props.showControls ? <Controls /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  focusedLine: state.tab.focusedLine,
  artist: state.tab.artist
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tab);
