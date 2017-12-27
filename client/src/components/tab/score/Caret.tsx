import * as React from 'react';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { CaretRenderer } from 'services';

const enhance = compose(
  withState('caretRenderer', 'setCaretRenderer', null),
  withHandlers({
    handleCanvasRef: props => canvas => {
      if (!canvas) {
        return;
      }

      const caretRenderer = new CaretRenderer(props.line, canvas);

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
