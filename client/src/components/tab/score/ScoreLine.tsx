import * as React from 'react';
import { compose, withHandlers } from 'recompose';
import { TabRenderer } from 'services';
import { withViewport, withTab } from 'enhancers';

const SCORE_LINE_HEIGHT_PX = 300;

const enhance = compose(
  withViewport,
  withTab,
  withHandlers({
    handleCanvasRef: props => canvas => {
      if (!canvas) {
        return;
      }

      const tabRenderer = new TabRenderer({
        tab: props.tab.state.provider,
        lineIndex: props.number,
        canvas: canvas,
        width: props.viewport.state.width,
        height: SCORE_LINE_HEIGHT_PX
      });

      tabRenderer.setup();
      tabRenderer.render();
    }
  })
);

const ScoreLine = ({ handleCanvasRef }) => (
  <div className="ScoreLine">
    <canvas ref={handleCanvasRef} />
  </div>
);

export default enhance(ScoreLine);
