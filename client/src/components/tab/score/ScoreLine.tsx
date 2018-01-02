import * as React from 'react';
import { compose, withHandlers, withState, withProps, lifecycle, shouldUpdate } from 'recompose';
import { ScoreLineRenderer } from 'services';
import { withTab } from 'enhancers';
import Caret from './Caret';
import { Overlap } from 'components';
import { omit, isEqual } from 'lodash';

const { Layer } = Overlap;

const SCORE_LINE_HEIGHT_PX = 260;

const enhance = compose(
  withTab,
  withState('scoreLineRenderer', 'setScoreLineRenderer', null),
  shouldUpdate((currProps, nextProps) => (
    !isEqual(
      omit(currProps, 'tab'),
      omit(nextProps, 'tab')
    )
  )),
  withProps(props => ({
    line: props.tab.state.instance.select(props.number)
  })),
  withHandlers({
    handleCanvasRef: ({ line, tab, setScoreLineRenderer }) => canvas => {
      if (canvas) {
        const { width } = tab.state.instance;
        const height = SCORE_LINE_HEIGHT_PX;

        const scoreLineRenderer = new ScoreLineRenderer(line, canvas, width, height);
        setScoreLineRenderer(scoreLineRenderer);

        line.renderer = scoreLineRenderer;
      }
    }
  }),
  withProps(({ scoreLineRenderer, line, tab }) => ({
    linkVexInstances: () => {
      if (scoreLineRenderer) {
        line.linkVexInstances(scoreLineRenderer.artist.staves[0]);
      }
    },
    unlinkVexInstances: () => {
      if (line) {
        line.unlinkVexInstances();
      }
    },
    updateScoreLineRendererWidth: () => {
      if (scoreLineRenderer) {
        scoreLineRenderer.width = tab.state.instance.width;
        scoreLineRenderer.setup();
      }
    }
  })),
  withProps(({ tab, linkVexInstances, unlinkVexInstances }) => ({
    refreshLinkedVexInstances: () => {
      unlinkVexInstances();
      linkVexInstances();

      // Force the TabService component to call componentWillReceiveProps()
      tab.dispatch.emitTabUpdate();
    },
  })),
  lifecycle({
    componentDidUpdate(): void {
      const { scoreLineRenderer } = this.props;

      if (scoreLineRenderer) {
        this.props.updateScoreLineRendererWidth();
        scoreLineRenderer.render();

        this.props.refreshLinkedVexInstances();
      }
    },
    componentWillUnmount(): void {
      this.props.unlinkVexInstances();
      this.props.line.renderer = null;
    }
  })
);

const ScoreLine = ({ line, withCaret, handleCanvasRef }) => (
  <div className="ScoreLine">
    <Overlap style={{ height: SCORE_LINE_HEIGHT_PX }}>
      <Layer style={{ zIndex: '10' }}>
        <canvas ref={handleCanvasRef} />
      </Layer>
      <Layer style={{ zIndex: '11' }}>
        {withCaret ? <Caret line={line} /> : null}
      </Layer>
    </Overlap>
  </div>
);

export default enhance(ScoreLine);
