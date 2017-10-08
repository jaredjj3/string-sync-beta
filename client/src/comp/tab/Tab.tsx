import React from 'react';
import { connect } from 'react-redux';

import Controls from './controls';
import Caret from './caret';
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

class Tab extends React.Component<TabProps, TabState> {
  static defaultProps: any = {
    showControls: false
  };

  scoreLayer: any;

  componentWillReceiveProps(nextProps: TabProps): void {
    this.maybeScroll(nextProps.artist, nextProps.focusedLine);
  }

  maybeScroll(artist: Artist, focusedLine: number): void {
    if (!artist) {
      return;
    }

    const tabstavePosY = artist.staves.map(stave => stave.note.bounds.y);
    this.scoreLayer.container.scrollTop = tabstavePosY[focusedLine] - tabstavePosY[0];
  }

  render(): JSX.Element {
    return (
      <div className="TabContainer">
        <Overlap height="300px" width="100vw">
          <Layer
            className="ScoreContainer"
            ref={c => this.scoreLayer = c}
          >
            <Score />
          </Layer>
          <Layer>
            <Caret />
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
