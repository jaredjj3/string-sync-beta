import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { withSync } from 'enhancers';

const enhance = compose(
  withSync,
  withHandlers({
    handleAnimationLoop: props => () => {
      if (props.lastExecution) {
        const { caretRenderer } = props.lastExecution;
        if (caretRenderer) {
          caretRenderer.clear();
          caretRenderer.posX = 0;
        }
      }

      const { maestro } = props.sync.state;
      // GO BACK
      // if (maestro.caretPlan) {
      //   const { execution } = maestro.caretPlan;

      //   if (execution && execution.caretRenderer) {
      //     execution.caretRenderer.posX = execution.interpolator(maestro.offsetTick);
      //     execution.caretRenderer.render();
      //   }

      //   props.setLastExecution(execution);
      // }
    }
  }),
  withProps(props => {
    const { rafLoop } = props.sync.state;
    const name = 'CaretManager.handleAnimationLoop';

    return ({
      registerRaf: () => {
        rafLoop.register({
          name,
          precedence: 2,
          onAnimationLoop: props.handleAnimationLoop
        });
      },
      unregisterRaf: () => {
        rafLoop.unregister(name);
      }
    });
  }),
  lifecycle({
    componentDidMount(): void {
      this.props.registerRaf();
    },
    componentWillUnmount(): void {
      this.props.unregisterRaf();
    }
  })
);

const CaretManager = () => null;

export default enhance(CaretManager);
