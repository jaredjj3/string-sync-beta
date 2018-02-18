import * as React from 'react';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { withRaf } from 'enhancers';
import { get } from 'lodash';

const enhance = compose(
  withHandlers({
    handleAnimationLoop: props => () => {
      const { snapshot, tab } = window.ss.maestro;
      const caretRenderer = get(snapshot.data.tab.line, 'caretRenderer', null);
      const lines = get(tab, 'lines', []);

      lines.forEach(({ caretRenderer }) => {
        if (caretRenderer && caretRenderer.isRendered) {
          caretRenderer.clear();
        }
      });

      if (caretRenderer) {
        const { interpolator } = snapshot.data.tab.note;
        const { tick } = snapshot.data.maestro;

        if (interpolator) {
          caretRenderer.posX[0] = interpolator(tick);
        }

        caretRenderer.render();
      }
    }
  }),
  withRaf(
    () => window.ss.rafLoop,
    props => ({
      name: 'CaretController.handleAnimationLoop',
      precedence: 2,
      onAnimationLoop: props.handleAnimationLoop
    })
  )
);

const CaretController = () => null;

export default enhance(CaretController);
