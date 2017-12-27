import * as React from 'react';
import { compose, withHandlers, withState, withProps, lifecycle } from 'recompose';
import { TabRenderer } from 'services';
import { withViewport, withTab } from 'enhancers';

const SCORE_LINE_HEIGHT_PX = 300;

const enhance = compose(
  withTab,
  withViewport,
  withState('tabRenderer', 'setTabRenderer', null),
  withHandlers({
    handleCanvasRef: props => canvas => {
      if (!canvas) {
        return;
      }

      const tabRenderer = new TabRenderer({
        tab: props.tab.state.provider,
        lineNumber: props.number,
        canvas: canvas,
        width: props.viewport.state.width,
        height: SCORE_LINE_HEIGHT_PX
      });

      props.setTabRenderer(tabRenderer);
    }
  }),
  withProps(props => ({
    link: () => {
      const { tabRenderer, tab, number } = props;

      if (tabRenderer) {
        const line = tab.state.provider.select(number);
        line.link(tabRenderer.artist);
      }
    },
    unlink: () => {
      const { tab, number } = props;
      const line = tab.state.provider.select(number);

      if (line.linker) {
        line.linker.unlink();
      }
    }
  })),
  lifecycle({
    componentDidUpdate(): void {
      const { tabRenderer } = this.props;

      if (tabRenderer) {
        tabRenderer.width = this.props.viewport.state.width;
        tabRenderer.setup();
        tabRenderer.render();

        this.props.unlink();
        this.props.link();
      }
    },
    componentWillUnmount(): void {
      this.props.unlink();
    }
  })
);

const ScoreLine = ({ handleCanvasRef }) => (
  <div className="ScoreLine">
    <canvas ref={handleCanvasRef} />
  </div>
);

export default enhance(ScoreLine);
