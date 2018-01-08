import * as React from 'react';
import { compose, withState, withHandlers, mapProps, withProps, lifecycle } from 'recompose';
import { ScoreLineRenderer } from 'services';
import { withTab, withSync } from 'enhancers';
import Caret from './Caret';
import { Overlap } from 'components';

const { Layer } = Overlap;

const SCORE_LINE_HEIGHT_PX = 260;

const enhance = compose(
  withTab,
  withSync,
  mapProps(props => ({
    tab: props.tab,
    maestro: props.sync.state.maestro,
    parseError: props.tab.state.instance.error,
    line: props.line,
    withCaret: props.withCaret
  })),
  withState('canvas', 'setCanvas', null),
  withHandlers({
    handleCanvasRef: props => canvas => {
      props.setCanvas(canvas);
    }
  }),
  lifecycle({
    componentDidUpdate(): void {
      const { line, canvas, parseError } = this.props;

      if (!canvas) {
        return;
      }

      const scoreLineRenderer = new ScoreLineRenderer(line, canvas, line.width, SCORE_LINE_HEIGHT_PX);
      line.scoreLineRenderer = scoreLineRenderer;

      // After rendering, the scoreLineRenderer should have an artist and will
      // have a stave for linking
      scoreLineRenderer.render();
      line.linkVexInstances(scoreLineRenderer.artist.staves[0]);

      // if this is the last ScoreLine rendered, setup the tabPlan to update the
      // ticks
      if (line.next === null && !parseError) {
        const { maestro } = this.props;
        maestro.resetPlans();
        maestro.tabPlan.setup();
      }
    }
  })
);

const ScoreLine = ({ line, withCaret, handleCanvasRef }) => (
  <div className="ScoreLine">
    {console.log('scoreline')}
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
