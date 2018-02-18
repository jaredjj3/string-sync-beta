import * as React from 'react';
import { compose, mapProps, withState, withHandlers, withProps, shouldUpdate, lifecycle } from 'recompose';
import { ScoreLineRenderer } from 'services';
import { withTab } from 'enhancers';
import { Caret, LoopCarets } from './';
import { Overlap, Layer } from 'components';
import { isEqual } from 'lodash';
import { Element as ScrollElement } from 'react-scroll';

const SCORE_LINE_HEIGHT_PX = 260;

const enhance = compose(
  withTab,
  mapProps(props => ({
    tab: props.tab.state.instance,
    line: props.line,
    withCaret: props.withCaret,
    emitTabUpdate: props.tab.dispatch.emitTabUpdate
  })),
  withState('canvas', 'setCanvas', null),
  withHandlers({
    handleCanvasRef: props => canvas => {
      props.setCanvas(canvas);
    }
  }),
  shouldUpdate((currProps, nextProps) => nextProps.tab && !nextProps.tab.error),

  lifecycle({
    componentDidUpdate(): void {
      const { line, canvas, tab } = this.props;
      const { maestro } = window.ss;

      if (!canvas || !tab) {
        return;
      }

      const scoreLineRenderer = new ScoreLineRenderer(
        line, canvas, line.width, SCORE_LINE_HEIGHT_PX
      );
      line.scoreLineRenderer = scoreLineRenderer;

      try {
        scoreLineRenderer.setup(window.ss.maestro).render();

        // if this is the last ScoreLine rendered, populate the tickRanges on the tab
        if (line.next === null && !tab.error) {
          maestro.enqueue(() => {
            tab.hydrateNotes()
          });
        }
      } catch (error) {
        tab.error = tab.error
          ? `${tab.error}\n${error.message}`
          : error.message;

        this.props.emitTabUpdate();
      }
    }
  })
);

const ScoreLine = ({ line, withCaret, handleCanvasRef }) => (
  <div className="ScoreLine">
    <ScrollElement name={`score-line-${line.number}`} />
    <Overlap style={{ height: SCORE_LINE_HEIGHT_PX }}>
      <Layer style={{ zIndex: '10' }}>
        <canvas ref={handleCanvasRef} />
      </Layer>
      <Layer style={{ zIndex: '11' }}>
        {withCaret ? <Caret line={line} /> : null}
      </Layer>
      <Layer style={{ zIndex: '12' }}>
        {withCaret ? <LoopCarets line={line} /> : null} 
      </Layer>
    </Overlap>
  </div>
);

export default enhance(ScoreLine);
