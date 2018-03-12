import * as React from 'react';
import { compose, withState, withHandlers, lifecycle } from 'recompose';
import { CaretRenderer } from 'models';

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

      const caretRenderer = new CaretRenderer(line, canvas, line.width, CARET_HEIGHT_PX, '#fc354c');
      line.caretRenderer = caretRenderer;
    }
  })
);

const Caret = ({ handleCanvasRef }) => (
  <div className="Caret">
    <canvas ref={handleCanvasRef} />
  </div>
);

export default enhance(Caret);
