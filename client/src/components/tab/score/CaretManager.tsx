import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { withSync } from 'enhancers';
import { CaretPlan } from 'services';

const enhance = compose(
  withSync,
  withState('lastExecution', 'setLastExecution', null),
  withHandlers({
    handleAnimationLoop: props => () => {
      if (props.lastExecution) {
        props.lastExecution.caretRenderer.clear();
        props.lastExecution.caretRenderer.posX = 0;
      }

      const { maestro } = props.sync.state;

      if (maestro.caretPlan) {
        const { execution } = maestro.caretPlan;

        if (execution) {
          execution.caretRenderer.posX = execution.interpolator(maestro.offsetTick);
          execution.caretRenderer.render();
        }

        props.setLastExecution(execution);
      }
    }
  }),
  withProps(props => {
    const { rafLoop } = props.sync.state;
    const name = 'CaretManager.handleAnimationLoop';

    return ({
      registerRaf: () => {
        rafLoop.register({
          name,
          precedence: 1,
          onAnimationLoop: props.handleAnimationLoop
        });
      },
      unregisterRaf: () => {
        rafLoop.unregister(name);
      }
    })
  }),
  lifecycle({
    componentDidMount(): void {
      this.props.sync.state.maestro.caretPlan = new CaretPlan();
      this.props.registerRaf();
    },
    componentWillUnmount(): void {
      this.props.sync.state.maestro.caretPlan = null;
      this.props.unregisterRaf();
    }
  })
);

const CaretManager = () => null;

export default enhance(CaretManager);
