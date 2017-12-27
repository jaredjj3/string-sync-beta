import * as React from 'react';
import { compose, withHandlers, withState, withProps, lifecycle } from 'recompose';
import { ScoreLineRenderer } from 'services';
import { withViewport, withTab } from 'enhancers';
import Caret from './Caret';
import { Overlap } from 'components';

const { Layer } = Overlap;

const SCORE_LINE_HEIGHT_PX = 300;

const enhance = compose(
  withTab,
  withViewport,
  withState('scoreLineRenderer', 'setScoreLineRenderer', null),
  withProps(props => ({
    line: props.tab.state.provider.select(props.number)
  })),
  withHandlers({
    handleCanvasRef: props => canvas => {
      if (!canvas) {
        return;
      }

      const scoreLineRenderer = new ScoreLineRenderer(
        props.line,
        canvas,
        props.viewport.state.width,
        SCORE_LINE_HEIGHT_PX
      );

      props.setScoreLineRenderer(scoreLineRenderer);
    }
  }),
  withProps(props => ({
    link: () => {
      const { scoreLineRenderer } = props;

      if (scoreLineRenderer) {
        props.line.linkVexInstances(scoreLineRenderer.artist.staves[0]);
      }
    },
    unlink: () => {
      const { line } = props;

      if (line.linker) {
        line.linker.unlinkVexInstances();
      }
    }
  })),
  lifecycle({
    componentDidUpdate(): void {
      const { scoreLineRenderer } = this.props;

      if (scoreLineRenderer) {
        scoreLineRenderer.width = this.props.viewport.state.width;
        scoreLineRenderer.setup();
        scoreLineRenderer.render();

        this.props.unlink();
        this.props.link();
      }
    },
    componentWillUnmount(): void {
      this.props.unlink();
    }
  })
);

const ScoreLine = ({ line, handleCanvasRef }) => (
  <div className="ScoreLine">
    <Overlap style={{ height: '300px' }}>
      <Layer style={{ zIndex: '10' }}>
        <canvas ref={handleCanvasRef} />
      </Layer>
      <Layer style={{ zIndex: '11' }}>
        <Caret line={line} />
      </Layer>
    </Overlap>
  </div>
);

export default enhance(ScoreLine);
