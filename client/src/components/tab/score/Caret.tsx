import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { CaretRenderer, CaretPlan } from 'services';
import { withViewport, withSync } from 'enhancers';

const CARET_HEIGHT_PX = 228;

const enhance = compose(
  withViewport,
  withSync,
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
      caretRenderer.setup();
      
      const { maestro } = props.sync.state;
      if (!maestro.caretPlan) {
        maestro.caretPlan = new CaretPlan();
      }

      props.setCaretRenderer(caretRenderer);
    }
  }),
  lifecycle({
    componentWillUnmount(): void {
      this.props.sync.state.maestro.caretPlan = null;
    }
  })
);

const Caret = ({ handleCanvasRef }) => (
  <div className="Caret">
    <canvas ref={handleCanvasRef} />
  </div>
);

export default enhance(Caret);
