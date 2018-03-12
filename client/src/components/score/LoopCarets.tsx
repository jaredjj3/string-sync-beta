import * as React from 'react';
import { compose, withState, withHandlers, lifecycle } from 'recompose';
import { LoopCaretRenderer } from 'models';

const CARET_HEIGHT_PX = 228;

const enhance = compose(
  withState('canvas', 'setCanvas', null),
  withHandlers({
    handleCanvasRef: props => canvas => {
      props.setCanvas(canvas);
    }
  }),
  lifecycle({
    componentDidUpdate(): void {
      const { line, canvas } = this.props;

      if (!canvas) {
        return;
      }

      const loopCaretRenderer = new LoopCaretRenderer(line, canvas, line.width, CARET_HEIGHT_PX, '#4286f4');
      line.loopCaretRenderer = loopCaretRenderer;
    }
  })
);

const LoopIndicators = ({ handleCanvasRef }) => (
  <div className="LoopCarets">
    <canvas ref={handleCanvasRef} />
  </div>
);

export default enhance(LoopIndicators);
