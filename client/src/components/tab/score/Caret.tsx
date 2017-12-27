import * as React from 'react';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { CaretRenderer } from 'services';
import { withViewport } from 'enhancers';

const CARET_HEIGHT_PX = 228;

const enhance = compose(
  withViewport,
  withState('caretRenderer', 'setCaretRenderer', null),
  withHandlers({
    handleCanvasRef: props => canvas => {
      if (!canvas) {
        return;
      }

      const { line, viewport } = props;
      const width = viewport.state.width;
      const height = CARET_HEIGHT_PX;

      const caretRenderer = new CaretRenderer(props.line, canvas, width, height);

      props.setCaretRenderer(caretRenderer);
    }
  })
);

const Caret = ({ handleCanvasRef }) => (
  <div className="Caret">
    <canvas ref={handleCanvasRef} />
  </div>
);

export default enhance(Caret);
