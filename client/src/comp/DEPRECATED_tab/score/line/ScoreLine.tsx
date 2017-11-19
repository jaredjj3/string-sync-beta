import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Overlap from 'comp/overlap';

const { Layer } = Overlap;

interface ScoreLineProps {

}

interface ScoreLineState {

}

class ScoreLine extends React.Component<ScoreLineProps, ScoreLineState> {
  canvas: HTMLCanvasElement = null;

  setCanvas(canvas: HTMLCanvasElement): void {
    if (this.canvas !== canvas) {
      this.canvas = canvas;
    }
  }

  render(): JSX.Element {
    return (
      <Layer>
        <canvas ref={this.setCanvas} />
      </Layer>
    );
  }
}

const mapStateToProps = state => ({
  tabFormatter: state.tab.formatter
});

const mapDispatchToProps = dispatch => ({

});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ScoreLine);
